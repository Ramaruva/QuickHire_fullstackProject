package com.example.quickhirebackend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "professionalrequest")
public class ProfessionalRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prequestid;
    @Enumerated(EnumType.STRING)
    private AllTypesEnums.UserRequestType requesttype;
    private String schoolname;
    private String major;
    private Date completiontime;
    private Integer profid;

    // Constructors, getters, and setters

    public ProfessionalRequest() {
        // Default constructor
    }

    // You might use a constructor for all fields or just required fields, based on your application's needs

    // Getters and setters for each field

    public Integer getRequestId() {
        return prequestid;
    }

    public void setRequestId(int requestId) {
        this.prequestid = requestId;
    }

    public AllTypesEnums.UserRequestType getRequestType() {
        return requesttype;
    }

    public void setRequestType(AllTypesEnums.UserRequestType requestType) {
        this.requesttype = requestType;
    }

    public String getSchoolName() {
        return schoolname;
    }

    public void setSchoolName(String schoolName) {
        this.schoolname = schoolName;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Date getCompletionTime() {
        return completiontime;
    }

    public void setCompletionTime(Date completionTime) {
        this.completiontime = completionTime;
    }

    public Integer getProfId() {
        return profid;
    }

    public void setProfId(int profId) {
        this.profid = profId;
    }

    // Override toString() if necessary for logging or debugging purposes
    @Override
    public String toString() {
        return "ProfessionalRequest{" +
                "requestId=" + prequestid +
                ", requestType='" + requesttype + '\'' +
                ", schoolName='" + schoolname + '\'' +
                ", major='" + major + '\'' +
                ", completionTime=" + completiontime +
                ", profId=" + profid +
                '}';
    }
}
