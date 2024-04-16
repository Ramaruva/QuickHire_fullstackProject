package com.example.quickhirebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name="userprofile")
public class UserProfile {
    private String address;
    private String city;
    private String email;
    private String firstname;
    private String lastname;
    private String phone;
    private String pincode;
    private String state;
    @Enumerated(EnumType.STRING)
    private AllTypesEnums.UserProfileStatus status;
    private String username;
    // Assuming 'userprofileid' is a foreign key to another table, we'll represent it as an integer.
    // If it's an object relation to another class, you'll need to use the class type instead.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userprofileid;

    // Getters and setters for each field


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public AllTypesEnums.UserProfileStatus getStatus() {
        return status;
    }

    public void setStatus(AllTypesEnums.UserProfileStatus status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUserprofileid() {
        return userprofileid;
    }

    public void setUserprofileid(int userprofileid) {
        this.userprofileid = userprofileid;
    }
  public  UserProfile(){}

    // Optionally, if needed
    // toString() method for easy printing of User object properties
    @Override
    public String toString() {
        return "User{" +

                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", email='" + email + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", phone='" + phone + '\'' +
                ", pincode='" + pincode + '\'' +
                ", state='" + state + '\'' +
                ", status='" + status + '\'' +
                ", username='" + username + '\'' +
                ", userprofileid=" + userprofileid +
                '}';
    }

}

