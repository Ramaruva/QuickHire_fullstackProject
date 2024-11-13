package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.Payments;

import java.util.List;

public class EmployerRegistrationRequest {
    // Fields for UserProfile information
    private String address;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String city;
    private String state;
    private String pincode;
    private String username;

    public Integer getPrequestid() {
        return prequestid;
    }

    public void setPrequestid(Integer prequestid) {
        this.prequestid = prequestid;
    }

    private  Integer prequestid;

    // Fields specific to EmployerRequest
    private AllTypesEnums.UserRequestType requestType;
    private String companyName;

    private  Integer userprofileid;

    public List<Payments> getPayments() {
        return payments;
    }

    public void setPayments(List<Payments> payments) {
        this.payments = payments;
    }

    private List<Payments> payments;

    // Getters and setters for all fields

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

    public AllTypesEnums.UserRequestType getRequestType() {
        return requestType;
    }

    public void setRequestType(AllTypesEnums.UserRequestType requestType) {
        this.requestType = requestType;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public  void  setUserprofileid(Integer userprofileid){this.userprofileid=userprofileid;}
    public Integer getUserprofileid(){
        return  this.userprofileid;
    }
}
