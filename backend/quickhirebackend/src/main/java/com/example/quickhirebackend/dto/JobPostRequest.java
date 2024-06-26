package com.example.quickhirebackend.dto;
import java.time.LocalTime;
import java.util.Date;

public class JobPostRequest {
    private int jobId;
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

    // Getters
    public int getJobId() { return jobId; }
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
    public void setJobId(int jobId) { this.jobId = jobId; }
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
