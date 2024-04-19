package com.example.quickhirebackend.dto;

public class UserDTO {

    private String username;
    private String password; // Consider this carefully, as passwords should be handled securely
    private String usertype;
    private String status;
    private Integer profid; // Assuming this is an Integer based on the NULL values and other numbers
    private Boolean ispasswordchanged;

    // Getters and setters for each field

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return usertype;
    }

    public void setUserType(String userType) {
        this.usertype = userType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getProfId() {
        return profid;
    }

    public void setProfId(Integer profId) {
        this.profid = profId;
    }

    public Boolean getIsPasswordChanged() {
        return ispasswordchanged;
    }

    public void setIsPasswordChanged(Boolean isPasswordChanged) {
        this.ispasswordchanged = isPasswordChanged;
    }

    // You might want to add a constructor, toString(), and other methods as necessary

}

