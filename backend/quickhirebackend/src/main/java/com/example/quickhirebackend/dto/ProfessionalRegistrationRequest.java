package com.example.quickhirebackend.dto;

import java.util.Date;
import java.util.List;

public class ProfessionalRegistrationRequest {
    // Fields for the UserProfile
    private String address;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String city;
    private String state;
    private String pincode;
    private String username;

    // Fields for the Qualification
    private String qualificationType;
    private String qualificationKeywords;


    // Fields for the ProfessionalRequest
    private String requestType;
    private String major;
    private String schoolName;

    private  Integer userprofileid;

    private  List<QualificationRecord> qualifications;

    private Date completiontime;
    public Date getCompletiontime() {
        return completiontime;
    }

    public void setCompletiontime(Date completiontime) {
        this.completiontime = completiontime;
    }



    // Getters and Setters
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getQualificationType() {
        return qualificationType;
    }

    public void setQualificationType(String qualificationType) {
        this.qualificationType = qualificationType;
    }

    public String getQualificationKeywords() {
        return qualificationKeywords;
    }

    public void setQualificationKeywords(String qualificationKeywords) {
        this.qualificationKeywords = qualificationKeywords;
    }


    public  void  setQualifications(List<QualificationRecord> qualifications){
        this.qualifications=qualifications;
    }

    public List<QualificationRecord> getQualifications() {
        return qualifications;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public  void  setUserprofileid(Integer userprofileid){this.userprofileid=userprofileid;}
    public Integer getUserprofileid(){
        return  this.userprofileid;
    }
}

