package com.example.quickhirebackend.services;
import com.example.quickhirebackend.dao.EmployerDetailsRepository;
import com.example.quickhirebackend.dao.JobDescriptionRepository;
import com.example.quickhirebackend.dao.QualificationRepository;
import com.example.quickhirebackend.dto.JobPostRequest;
import com.example.quickhirebackend.dto.QualificationRecord;
import com.example.quickhirebackend.model.JobDescription;
import com.example.quickhirebackend.model.Qualification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private  final QualificationRepository qualificationRepository;
    private final EmployerDetailsRepository employerDetailsRepository;

    @Autowired
    public JobService(JobDescriptionRepository jobDescriptionRepository, QualificationRepository qualificationRepository, EmployerDetailsRepository employerDetailsRepository) {
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.qualificationRepository = qualificationRepository;
        this.employerDetailsRepository = employerDetailsRepository;
    }

    @Transactional
    public JobDescription createJobDescription(JobDescription jobDescription) {
        // Here you can add any additional business logic before saving the job description
        return jobDescriptionRepository.save(jobDescription);
    }

    @Transactional(readOnly = true)
    public List<JobDescription> findAllJobDescriptions() {
        return jobDescriptionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<JobDescription> findJobDescriptionById(int jobDescriptionId) {
        return jobDescriptionRepository.findById(jobDescriptionId);
    }

    @Transactional
    public JobDescription updateJobDescription(int jobDescriptionId, JobDescription jobDescription) {
        return jobDescriptionRepository.findById(jobDescriptionId)
                .map(existingJobDescription -> {
                    // Update the properties of the existing job description
                    existingJobDescription.setJobId(jobDescription.getJobId());
                    existingJobDescription.setPositionName(jobDescription.getPositionName());
                    existingJobDescription.setFirstname(jobDescription.getFirstname());
                    existingJobDescription.setLastname(jobDescription.getLastname());
                    existingJobDescription.setEmail(jobDescription.getEmail());
                    existingJobDescription.setPhone(jobDescription.getPhone());
                    existingJobDescription.setStartDate(jobDescription.getStartDate());
                    existingJobDescription.setEndDate(jobDescription.getEndDate());
                    existingJobDescription.setPayPerHour(jobDescription.getPayPerHour());
                    existingJobDescription.setStartTime(jobDescription.getStartTime());
                    existingJobDescription.setEndTime(jobDescription.getEndTime());
                    existingJobDescription.setEmpid(jobDescription.getEmpId());
                    // More fields can be set here if necessary

                    // Save the updated job description
                    return jobDescriptionRepository.save(existingJobDescription);
                })
                .orElseThrow(() -> new RuntimeException("JobDescription not found with id " + jobDescriptionId));
    }

    @Transactional
    public void deleteJobDescription(int jobDescriptionId) {
        jobDescriptionRepository.deleteById(jobDescriptionId);
    }

    public int newJobPost(JobPostRequest jobData) throws Exception {
        try{
            //first need to parse the time and date
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

            //Date startDate = dateFormat.parse(jobData.getStartDate());
            //need to create a job details table
            //get employ id
             Integer empid = employerDetailsRepository.findByProfid(jobData.getEmpid()).stream().findFirst().orElseThrow().getEmployerId();
            JobDescription newJobDesc = new JobDescription();
            newJobDesc.setJobId(jobData.getJobId());
            newJobDesc.setPositionName(jobData.getPositionName());
            newJobDesc.setFirstname(jobData.getFirstname());
            newJobDesc.setLastname(jobData.getLastname());
            newJobDesc.setEmail(jobData.getEmail());
            newJobDesc.setPhone(jobData.getPhone());
            newJobDesc.setStartDate(jobData.getStartDate());
            newJobDesc.setEndDate(jobData.getEndDate());
            newJobDesc.setStartTime(jobData.getStartTime());
            newJobDesc.setEndTime(jobData.getEndTime());
            newJobDesc.setEmpid(empid);
            newJobDesc.setPayPerHour(jobData.getPayPerHour());
           int jobdescriptionId= createJobDescription(newJobDesc).getJobdescriptionId();

           //need to assign qualifications with jobdescid;
            for (QualificationRecord qualificationRecord:jobData.getQualifications()){
                Qualification jobQualification = new Qualification();
                jobQualification.setJobId(jobdescriptionId);
                jobQualification.setType(qualificationRecord.type());
                jobQualification.setKeywords(qualificationRecord.keywords());
                qualificationRepository.save(jobQualification);
            }

            return  jobdescriptionId;
        }
        catch (Exception e){
             throw  new Exception(e.getMessage());
        }
    }

    public List<JobPostRequest> employerSpecificJobs(Integer userProfileId){
        try{
            Integer empid = employerDetailsRepository.findByProfid(userProfileId).stream().findFirst().orElseThrow().getEmployerId();
            List<JobDescription> jobDescriptions = jobDescriptionRepository.findByempid(empid);
            List<JobPostRequest> jobPostRequests = new ArrayList<>();
            for(JobDescription jobDescription:jobDescriptions){
               List<Qualification> qualifications = qualificationRepository.findByJobid(jobDescription.getJobdescriptionId());
                JobPostRequest jobPostRequest = getJobPostRequest(jobDescription, qualifications);
                jobPostRequests.add(jobPostRequest);
            }
            return jobPostRequests;
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private static JobPostRequest getJobPostRequest(JobDescription jobDescription, List<Qualification> qualifications) {
        JobPostRequest jobPostRequest = new JobPostRequest();

        jobPostRequest.setQualification(qualifications);
        jobPostRequest.setPositionName(jobDescription.getPositionName());
        jobPostRequest.setEmail(jobDescription.getEmail());
        jobPostRequest.setFirstname(jobDescription.getFirstname());
        jobPostRequest.setLastname(jobDescription.getLastname());
        jobPostRequest.setPhone(jobDescription.getPhone());
        jobPostRequest.setStartDate(jobDescription.getStartDate());
        jobPostRequest.setEndDate(jobDescription.getEndDate());
        jobPostRequest.setStartTime(jobDescription.getStartTime());
        jobPostRequest.setEndTime(jobDescription.getEndTime());
        jobPostRequest.setPayPerHour(jobDescription.getPayPerHour());
        jobPostRequest.setJobId(jobDescription.getJobId());
        jobPostRequest.setJobdescId(jobDescription.getJobdescriptionId());
        return jobPostRequest;
    }

}

