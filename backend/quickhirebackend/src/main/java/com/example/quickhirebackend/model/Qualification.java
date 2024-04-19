package com.example.quickhirebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "qualifications")
public class Qualification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer qualificationid;
    private String type;
    private String keywords;
    private Integer profid;
    private Integer jobid;

    // Getters and setters

    public Integer getQualificationId() {
        return qualificationid;
    }

    public void setQualificationId(Integer qualificationId) {
        this.qualificationid = qualificationId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public Integer getProfId() {
        return profid;
    }

    public void setProfId(Integer profId) {
        this.profid = profId;
    }

    public Integer getJobId() {
        return jobid;
    }

    public void setJobId(int jobId) {
        this.jobid = jobId;
    }

    // toString method for debugging purposes
    @Override
    public String toString() {
        return "Qualification{" +
                "qualificationId=" + qualificationid +
                ", type='" + type + '\'' +
                ", keywords='" + keywords + '\'' +
                ", profId=" + profid +
                ", jobId=" + jobid +
                '}';
    }
}

