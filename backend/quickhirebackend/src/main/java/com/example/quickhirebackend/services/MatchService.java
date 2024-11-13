package com.example.quickhirebackend.services;
import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.customExceptions.CustomMatchException;
import com.example.quickhirebackend.dao.*;
import com.example.quickhirebackend.dto.*;
import com.example.quickhirebackend.model.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {


    private final MatchRepository matchRepository;

    private  final QualificationRepository qualificationRepository;
    private  final ProfessionalDetailsRepository professionalDetailsRepository;
    private  final JobDescriptionRepository jobDescriptionRepository;
    private final UserProfileRepository userProfileRepository;
    private final StaffDetailsRepository staffDetailsRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository, QualificationRepository qualificationRepository, ProfessionalDetailsRepository professionalDetailsRepository, JobDescriptionRepository jobDescriptionRepository, UserProfileRepository userProfileRepository, StaffDetailsRepository staffDetailsRepository) {
        this.matchRepository = matchRepository;
        this.qualificationRepository = qualificationRepository;
        this.professionalDetailsRepository = professionalDetailsRepository;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.userProfileRepository = userProfileRepository;
        this.staffDetailsRepository = staffDetailsRepository;
    }

    // Create or Update a Match record
    public Matches saveMatch(Matches match) {
        try{
            return matchRepository.save(match);
        }
        catch (DataIntegrityViolationException e){
            throw new RuntimeException(e.getMessage());
           // return matchRepository.findByProfessionalidAndJobid(match.getProfessionalId(),match.getJobId()).stream().findFirst().orElse(null);
        }

    }

    // Retrieve all Match records
    public List<Matches> findAllMatches() {
        return matchRepository.findAll();
    }

    // Retrieve a Match by its ID
    public Optional<Matches> findMatchById(Integer id) {
        return matchRepository.findById(id);
    }

    // Update a Match record
    public Matches updateMatch(Integer id, Matches matchDetails) {
        return matchRepository.findById(id)
                .map(match -> {
                    match.setMatchPercentage(matchDetails.getMatchPercentage());
                    match.setProfessionalId(matchDetails.getProfessionalId());
                    match.setJobId(matchDetails.getJobId());
                    match.setStaffId(matchDetails.getStaffId());
                    return matchRepository.save(match);
                })
                .orElseThrow(() -> new IllegalStateException("Match with ID " + id + " does not exist"));
    }

    // Delete a Match record
    public void deleteMatch(Integer id) {
        matchRepository.deleteById(id);
    }

    public boolean professionalJobRequest(JobMatchRequestRecord jobRequest){
        try{
            Integer professionalId = professionalDetailsRepository.findByProfid(jobRequest.userProfileID()).stream().findFirst().orElseThrow().getProfessionalId();
            Matches matches = matchRepository.findByProfessionalIdAndJobId(professionalId, jobRequest.jobId()).stream().findFirst().orElse(new Matches());
            //matches.setMatchType(AllTypesEnums.MatchType.PROFESSIONAL_REQUEST);
            matches.setJobId(jobRequest.jobId());
            matches.setMatchPercentage(0);
            matches.setProfessionalId(professionalId);
            matches.setStatus(AllTypesEnums.MatchType.PROFESSIONAL_REQUEST);
            System.out.println(matches);
            matchRepository.save(matches);
             return true;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw  new RuntimeException(e.getMessage());
        }
    }


    public  List<ProfessionalMatchResponse> getAllMatchedJobs(Integer profid){
        try{
              // need to get profid
            Integer professionalID = professionalDetailsRepository.findByProfid(profid).stream().findFirst().orElseThrow().getProfessionalId();
             List<Matches> matches = matchRepository.findByStatusAndProfessionalId(AllTypesEnums.MatchType.STAFF_ACCEPTED,professionalID);
             List<ProfessionalMatchResponse> matchResponses = new ArrayList<>();
             for(Matches matche:matches){
                  JobDescription jobDescription =  jobDescriptionRepository.findById(matche.getJobId()).stream().findFirst().orElseThrow();
                  matchResponses.add(new ProfessionalMatchResponse(matche,jobDescription));
             }
             return matchResponses;
        }
        catch (Exception e){
            throw  new RuntimeException();
        }
    }
    public  JobMatchRequestRecord  professionalJobMatch(JobMatchRequestRecord jobMatchData) throws Exception {
        //need to bring the qualifications of job and professional from table
        List<Qualification> jobQualifications =  qualificationRepository.findByJobid(jobMatchData.jobId());
        //need to get the userprofileid
        Integer userProfilId = professionalDetailsRepository.findById(jobMatchData.professionalId()).stream().findFirst().orElse(new ProfessionalDetails()).getProfId();
        List<Qualification> professionalQualifications = qualificationRepository.findByProfid(userProfilId);
        try{
           if(jobMatchData.matchId()==null){

               //need to write logic for match percentage based on qualifications
               Matches matchData = new Matches();
               matchData.setJobId(jobMatchData.jobId());
               matchData.setMatchPercentage(70);
               matchData.setProfessionalId(jobMatchData.professionalId());
               if(jobMatchData.staffId()!=null){
                   matchData.setStaffId(jobMatchData.staffId());
               }
               Matches savedMatch= saveMatch(matchData);
              return   new JobMatchRequestRecord(savedMatch.getMatchId(), savedMatch.getProfessionalId(), savedMatch.getJobId(), savedMatch.getStaffId(), userProfilId,jobQualifications,professionalQualifications);
           }
        }
        catch (Exception e){
         throw  new Exception(e.getMessage());
        }
        return jobMatchData;
    }

    public  List<StaffMatchProcessing> staffProfessionalJobMatch(Integer profId){
        try{
            //first get professional qualifications
            List<Qualification> professionalQualifications = qualificationRepository.findByProfid(profId);
            //now get all jobs
            List<JobDescription> jobDescriptions = jobDescriptionRepository.findAll();
            List<StaffMatchProcessing> matchedJobs = new ArrayList<>();
            for(JobDescription jobDescription:jobDescriptions){
                List<Qualification> jbQualifications = qualificationRepository.findByJobid(jobDescription.getJobdescriptionId());
                double matchPercentage = matchAlgorithm(jbQualifications,professionalQualifications);
                if(matchPercentage>50){
                    StaffMatchProcessing staffMatchProcessing = new StaffMatchProcessing(matchPercentage,jobDescription);
                    matchedJobs.add(staffMatchProcessing);
                }
            }
            return matchedJobs;
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public boolean staffJobMatchAcceptance(Integer userProfileId, Integer jobId,double percentage,Integer staffUserProfileId){
        try{
            //get match data
            Integer professionalID = professionalDetailsRepository.findByProfid(userProfileId).stream().findFirst().orElseThrow().getProfessionalId();
            Matches matches = matchRepository.findByProfessionalIdAndJobId(professionalID,jobId).stream().findFirst().orElse(new Matches());
            Integer staffId = staffDetailsRepository.findByStaffUserProfileId(staffUserProfileId).stream().findFirst().orElseThrow().getStaffId();
            matches.setStaffId(staffId);
            int per = (int) percentage;
            matches.setMatchPercentage(per);
            matches.setJobId(jobId);
            matches.setProfessionalId(professionalID);
            matches.setStatus(AllTypesEnums.MatchType.STAFF_ACCEPTED);
            //matches.setNotification("YES");
            saveMatch(matches);
            return  true;
        }
        catch (Exception e){
            throw  new RuntimeException(e.getMessage());
        }
    }

    public List<EmployerMatchResponse> getMatchedJobsForEmployer(Integer jobId){
        try{
           //get all matches
            List<Matches> matches = matchRepository.findByStatusAndJobId(AllTypesEnums.MatchType.STAFF_ACCEPTED,jobId);
                    //matchRepository.findByJobIdAndNotification(jobId,"YES");
            List<EmployerMatchResponse> jobMatchRequestRecords = new ArrayList<>();
            for(Matches match:matches){
                Integer professionalId = match.getProfessionalId();
                Integer userProfileId = professionalDetailsRepository.findById(professionalId).stream().findFirst().orElse(new ProfessionalDetails()).getProfId();
                if(userProfileId==null){
                    continue;
                }
                UserProfile userProfile = userProfileRepository.findById(userProfileId).stream().findFirst().orElse(null);
                if(userProfile==null){
                    continue;
                }
                List<Qualification> professionalQualifications =qualificationRepository.findByProfid(userProfileId);
                EmployerMatchResponse jobMatchRequestRecord = new EmployerMatchResponse(match.getMatchId(), userProfile,match.getMatchPercentage(),professionalQualifications);
                jobMatchRequestRecords.add(jobMatchRequestRecord);
            }
            return  jobMatchRequestRecords;
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    public double getJobMatchPercentageForSingleJob(Integer userProfileId, Integer jobId){
        try{
            //get job qualifications
            List<Qualification> jobQualifications = qualificationRepository.findByJobid(jobId);
            List<Qualification> professionalQualifications = qualificationRepository.findByProfid(userProfileId);
            return matchAlgorithm(jobQualifications,professionalQualifications);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public String matchMechanism(Integer staffId, Integer matchId, AllTypesEnums.MatchType status){
         try{
             Matches matches = findMatchById(matchId).stream().findFirst().orElseThrow();
             Integer staffID = staffDetailsRepository.findByStaffUserProfileId(staffId).stream().findFirst().orElseThrow().getStaffId();
              if(status== AllTypesEnums.MatchType.STAFF_ACCEPTED){
                  //need to get jobqualifictions
                  List<Qualification> jobQualifications = qualificationRepository.findByJobid(matches.getJobId());
                  Integer userProfileid = professionalDetailsRepository.findById(matches.getProfessionalId()).stream().findFirst().orElseThrow().getProfId();
                  List<Qualification> profQualifications = qualificationRepository.findByProfid(userProfileid);
                  double matchPercentage = matchAlgorithm(jobQualifications,profQualifications);
                  matches.setStatus(status);
                  System.out.println(matchPercentage);
                  matches.setMatchPercentage((int) matchPercentage);
                 // matches.setNotification("YES");
              }
              else {
                  matches.setStatus(status);
              }
              matches.setStaffId(staffID);
              saveMatch(matches);
              return  "Matched saved"+matches.getMatchPercentage();
         }
         catch (Exception e){
             System.out.println(e.getMessage());
            throw new RuntimeException();
         }
    }
    public  List<MatchResponse> getAllJobMatch(){
        try{
            List<Matches> matches = matchRepository.findBystatus(AllTypesEnums.MatchType.PROFESSIONAL_REQUEST);
            List<MatchResponse> matchResponses = new ArrayList<>();
            for(Matches match: matches){
                //need to find jobdetails
                JobDescription jobDescription = jobDescriptionRepository.findById(match.getJobId()).stream().findFirst().orElseThrow();
                //need to find the userprofil
                Integer profid = professionalDetailsRepository.findById(match.getProfessionalId()).stream().findFirst().orElseThrow().getProfId();
                UserProfile userProfile = userProfileRepository.findById(profid).stream().findFirst().orElseThrow();
                MatchResponse matchResponse = new MatchResponse(match.getMatchId(), match.getStatus(),userProfile,jobDescription);
                matchResponses.add(matchResponse);
            }
           return matchResponses;
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

  public Double matchAlgorithm(List<Qualification> jobQualifications, List<Qualification> profQualifications){
        try{
            double totalMatchPercentage =0.0;
            double categoryMatch= (double) 100 /jobQualifications.size();
            for(Qualification jbqualification: jobQualifications){
                for(Qualification prqualification:profQualifications){
                    String jbcategory = jbqualification.getType();
                    String prcategory = prqualification.getType();
                    boolean exactMatch = jbcategory.equalsIgnoreCase(prcategory);
                    boolean partialSubstring = isSubstring(jbcategory,prcategory);
                    boolean partialMatch = false;
                    if(!exactMatch||!partialSubstring){
                        partialMatch = minDistance(prcategory,jbcategory)<((jbcategory.length())/2);
                    }
                    if(exactMatch||partialSubstring||partialMatch){
                        String[] jbkey = jbqualification.getKeywords().split(",");
                        String[] prKey = prqualification.getKeywords().split(",");
                        int numofMatch =0;
                        int keywords = jbkey.length;
                        for (String string : jbkey) {
                            for (String s : prKey) {
                                if (string.equalsIgnoreCase(s) || isSubstring(string,s) || (minDistance(s,string)<string.length()/2)) {
                                    numofMatch++;
                                }

                            }
                        }
                        totalMatchPercentage= (totalMatchPercentage)+ (categoryMatch) * ((double) numofMatch /(double) keywords);
                    }
                }
            }
            return totalMatchPercentage;
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
  }

    public boolean isSubstring(String w1, String w2){
        if(w1.length()>w2.length()){
            return w1.contains(w2);
        }
        return w2.contains(w1);
    }
    public int minDistance(String profword, String jobWord){
        int m = profword.length() - 1;
        int n = jobWord.length()-1;
        int [][] dp = new int[m+2][n+2];
        for (int[]d:dp){
            Arrays.fill(d,-1);
        }
        return helper(profword,jobWord,m,n,dp);
    }

    public int helper(String word1, String word2, int m, int n, int[][] dp){
        //the strings are null
        if(m+1==0&&n+1==0){
            return  0;
        }
        //one of the strings are null
        if(m+1==0||n+1==0){
            return Math.max(m+1,n+1);
        }

        //both values at the index are equal
        if(dp[m][n]!=-1){
            return dp[m][n];
        }
        if(word1.charAt(m)==word2.charAt(n)){
            dp[m][n]=helper(word1,word2,m-1,n-1,dp);
            return dp[m][n];
        }
        else {
            // try deletion
            int delete = 1+helper(word1,word2,m-1,n,dp);
            // try insertion
            int insert = 1+helper(word1,word2,m,n-1,dp);
            // try replacing
            int replace = 1+helper(word1,word2,m-1,n-1,dp);
            //now choosing min out of these 3 things and add 1 for operation
            dp[m][n] = Math.min(Math.min(delete,insert),replace);
            return  dp[m][n];
        }
    }
}



