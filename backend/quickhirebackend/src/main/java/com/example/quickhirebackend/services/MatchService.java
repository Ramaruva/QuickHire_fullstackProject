package com.example.quickhirebackend.services;
import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.customExceptions.CustomMatchException;
import com.example.quickhirebackend.dao.MatchRepository;
import com.example.quickhirebackend.dao.ProfessionalDetailsRepository;
import com.example.quickhirebackend.dao.QualificationRepository;
import com.example.quickhirebackend.dto.JobMatchRequestRecord;
import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.Matches;
import com.example.quickhirebackend.model.ProfessionalDetails;
import com.example.quickhirebackend.model.Qualification;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    @PersistenceContext
    private EntityManager entityManager;
    private final MatchRepository matchRepository;

    private  final QualificationRepository qualificationRepository;
    private  final ProfessionalDetailsRepository professionalDetailsRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository, QualificationRepository qualificationRepository, ProfessionalDetailsRepository professionalDetailsRepository) {
        this.matchRepository = matchRepository;
        this.qualificationRepository = qualificationRepository;
        this.professionalDetailsRepository = professionalDetailsRepository;
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
            entityManager.clear();
            Matches matches = new Matches();
            //matches.setMatchType(AllTypesEnums.MatchType.PROFESSIONAL_REQUEST);
            matches.setJobId(jobRequest.jobId());
            matches.setMatchPercentage(0);
            Integer profid = professionalDetailsRepository.findByProfid(jobRequest.userProfileID()).stream().findFirst().orElseThrow().getProfessionalId();
            matches.setProfessionalId(profid);
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


}
