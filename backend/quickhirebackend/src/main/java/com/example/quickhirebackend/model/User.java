package com.example.quickhirebackend.model;
import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "user")
public class User {


    private Integer profid; // Corresponds to the "profid" column
    private String password; // Corresponds to the "password" column stored as varbinary
    @Id
    @Column(name = "username", length = 30)
    private String username; // Corresponds to the "username" column
    @Enumerated(EnumType.STRING)
    private AllTypesEnums.UserType usertype; // Corresponds to the "usertype" column
    @Enumerated(EnumType.STRING)
    private AllTypesEnums.UserStatus status; // Corresponds to the "status" column, nullable

    private  String ispasswordchanged;

    // Constructors, getters, and setters

    public User() {
        // Default constructor
    }

    public int getProfId() {
        return profid;
    }

    public void setProfId(int profId) {
        this.profid = profId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public  AllTypesEnums.UserType getUserType() {
        return usertype;
    }

    public void setUserType(AllTypesEnums.UserType userType) {
        this.usertype = userType;
    }

    public AllTypesEnums.UserStatus getStatus() {
        return status;
    }

    public void setStatus(AllTypesEnums.UserStatus status) {
        this.status = status;
    }

    public  void  setIsPasswordChanged(String isPasswordChanged){this.ispasswordchanged=isPasswordChanged;}

    public  String getIsPasswordChanged(){return  ispasswordchanged;}


    // Override equals and hashCode if needed

    // toString() method for debugging purposes, don't include the password field to avoid security risks
    @Override
    public String toString() {
        return "User{" +
                "profId=" + profid +
                ", username='" + username + '\'' +
                ", userType='" + usertype + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
