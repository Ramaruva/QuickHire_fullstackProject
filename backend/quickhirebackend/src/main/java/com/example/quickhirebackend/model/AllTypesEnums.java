package com.example.quickhirebackend.model;

public class AllTypesEnums {
    public enum UserStatus{
        ACTIVE,
        INACTIVE
    }
    public enum UserType{
        STAFF,
        EMPLOYER,
        PROFESSIONAL,
        ROOT
    }
    public enum UserProfileStatus{
        ACTIVATED,
        DELETED
    }
    public enum UserRequestType{
        NEW_ACCOUNT,
        ACCOUNT_ACCEPTED,
        DELETE_REQUESTED,
        DELETE_ACCEPTED,
        ACCOUNT_REJECTED,
        DELETE_REJECTED
    }
    public enum MatchType{
        PROFESSIONAL_REQUEST,
        STAFF_ACCEPTED,
        STAFF_REJECTED
    }
}
