package com.example.quickhirebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "staffdetails")
public class StaffDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staffid; // auto-incremented primary key
    private Integer staff_userprofileid; // nullable foreign key reference to a user profile

    // Constructors, getters, and setters

    public StaffDetails() {
        // Default constructor
    }

    public int getStaffId() {
        return staffid;
    }

    // No setter for auto-incremented primary key
    // public void setStaffId(int staffId) {
    //     this.staffId = staffId;
    // }

    public Integer getStaffUserProfileId() {
        return staff_userprofileid;
    }

    public void setStaffUserProfileId(Integer staffUserProfileId) {
        this.staff_userprofileid = staffUserProfileId;
    }

    // toString() method for debugging purposes
    @Override
    public String toString() {
        return "StaffDetails{" +
                "staffId=" + staffid +
                ", staffUserProfileId=" + staff_userprofileid +
                '}';
    }
}
