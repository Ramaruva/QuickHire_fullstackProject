package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.JobDescription;
import com.example.quickhirebackend.model.UserProfile;

public record MatchResponse(Integer matchID, AllTypesEnums.MatchType matchType, UserProfile userProfile, JobDescription jobDescription) {
}
