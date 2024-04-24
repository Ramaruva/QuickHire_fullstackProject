package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.JobDescription;
import com.example.quickhirebackend.model.Matches;

public record ProfessionalMatchResponse(Matches matches, JobDescription jobDescription) {
}
