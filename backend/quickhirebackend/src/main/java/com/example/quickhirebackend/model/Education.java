package com.example.quickhirebackend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "education")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "education_id")
    private Integer educationId;

    @Column(name = "schoolname")
    private String schoolName;

    @Column(name = "major")
    private String major;

    @Column(name = "completiontime")
    private Date completionTime;

    @Column(name = "profid")
    private Integer profId;

    // Constructors, getters and setters

    public Education() {
        // Default constructor
    }

    // Getters and setters for each field
    public Integer getEducationId() {
        return educationId;
    }

    public void setEducationId(Integer educationId) {
        this.educationId = educationId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Date getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(Date completionTime) {
        this.completionTime = completionTime;
    }

    public Integer getProfId() {
        return profId;
    }

    public void setProfId(Integer profId) {
        this.profId = profId;
    }
}
