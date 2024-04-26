package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.Qualification;
import com.example.quickhirebackend.model.UserProfile;

import java.util.List;

public record EmployerMatchResponse(Integer matchId, UserProfile userProfile, double matchPercentage, List<Qualification> professionalQualifications) {
}
