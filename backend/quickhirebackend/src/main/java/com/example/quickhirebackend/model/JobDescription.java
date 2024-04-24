package com.example.quickhirebackend.model;
import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.Date;
import java.util.Timer;


@Entity
@Table(name = "jobdescription")
public class JobDescription {

    private Integer empid; // Corresponds to "empid" column, auto-incremented
    private String email; // Corresponds to "email" column
    private java.util.Date enddate; // Corresponds to "enddate" column
    private LocalTime endtime; // Corresponds to "endtime" column
    private String firstname; // Corresponds to "firstname" column

    public int getJobdescriptionid() {
        return jobdescriptionid;
    }

    public void setJobdescriptionid(int jobdescriptionid) {
        this.jobdescriptionid = jobdescriptionid;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobdescriptionid; // Corresponds to "jobdescriptionid" column, auto-incremented
    private String jobid; // Corresponds to "jobid" column
    private String lastname; // Corresponds to "lastname" column
    private String payperhour; // Corresponds to "payperhour" column
    private String phone; // Corresponds to "phone" column
    private String positionname; // Corresponds to "positionname" column
    private java.util.Date startdate; // Corresponds to "startdate" column
    private LocalTime starttime; // Corresponds to "starttime" column

    // Getters and setters
    public Integer getEmpId() {
        return empid;
    }

    // Typically, no setter for auto-incremented ID
    // public void setEmpId(int empId) {
    //     this.empId = empId;
    // }

    public void setEmpid(Integer id){
        this.empid=id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getEndDate() {
        return enddate;
    }

    public void setEndDate(Date endDate) {
        this.enddate = endDate;
    }

    public LocalTime getEndTime() {
        return endtime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endtime = endTime;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public int getJobdescriptionId() {
        return jobdescriptionid;
    }

    // Typically, no setter for auto-incremented ID
    // public void setJobdescriptionId(int jobdescriptionId) {
    //     this.jobdescriptionId = jobdescriptionId;
    // }

    public String getJobId() {
        return jobid;
    }

    public void setJobId(String jobId) {
        this.jobid = jobId;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPayPerHour() {
        return payperhour;
    }

    public void setPayPerHour(String payPerHour) {
        this.payperhour = payPerHour;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPositionName() {
        return positionname;
    }

    public void setPositionName(String positionName) {
        this.positionname = positionName;
    }

    public Date getStartDate() {
        return startdate;
    }

    public void setStartDate(Date startDate) {
        this.startdate = startDate;
    }

    public LocalTime getStartTime() {
        return starttime;
    }

    public void setStartTime(LocalTime startTime) {
        this.starttime = startTime;
    }

    // toString method for debugging purposes
    @Override
    public String toString() {
        return "JobDescription{" +
                "empId=" + empid +
                ", email='" + email + '\'' +
                ", endDate=" + enddate +
                ", endTime=" + endtime +
                ", firstname='" + firstname + '\'' +
                ", jobdescriptionId=" + jobdescriptionid +
                ", jobId=" + jobid +
                ", lastname='" + lastname + '\'' +
                ", payPerHour='" + payperhour + '\'' +
                ", phone='" + phone + '\'' +
                ", positionName='" + positionname + '\'' +
                ", startDate=" + startdate +
                ", startTime=" + starttime +
                '}';
    }
}

