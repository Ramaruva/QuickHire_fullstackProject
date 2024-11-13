package com.example.quickhirebackend.dto;
import com.example.quickhirebackend.model.Qualification;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

public class JobPostRequest {
    private String jobId;
    private String positionName;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private Date startDate;
    private Date endDate;
    private String payPerHour;
    private LocalTime startTime;
    private LocalTime endTime;
    private int empid;
    private String qualificationType;
    private String qualificationKeywords;
    private List<QualificationRecord> qualifications;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    private String companyName;

    public Integer getJobdescId() {
        return jobdescId;
    }

    public void setJobdescId(Integer jobdescId) {
        this.jobdescId = jobdescId;
    }

    private Integer jobdescId;

    public List<Qualification> getQualification() {
        return qualification;
    }

    public void setQualification(List<Qualification> qualification) {
        this.qualification = qualification;
    }

    private  List<Qualification> qualification;

    public List<QualificationRecord> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<QualificationRecord> qualificationRecords) {
        this.qualifications= qualificationRecords;
    }


    // Getters
    public String getJobId() { return jobId; }
    public String getPositionName() { return positionName; }
    public String getFirstname() { return firstname; }
    public String getLastname() { return lastname; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public Date getStartDate() { return startDate; }
    public Date getEndDate() { return endDate; }
    public String getPayPerHour() { return payPerHour; }
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public int getEmpid() { return empid; }
    public String getQualificationType() { return qualificationType; }
    public String getQualificationKeywords() { return qualificationKeywords; }

    // Setters
    public void setJobId(String jobId) { this.jobId = jobId; }
    public void setPositionName(String positionName) { this.positionName = positionName; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public void setLastname(String lastname) { this.lastname = lastname; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }
    public void setPayPerHour(String payPerHour) { this.payPerHour = payPerHour; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public void setEmpid(int empid) { this.empid = empid; }
    public void setQualificationType(String qualificationType) { this.qualificationType = qualificationType; }
    public void setQualificationKeywords(String qualificationKeywords) { this.qualificationKeywords = qualificationKeywords; }
}
