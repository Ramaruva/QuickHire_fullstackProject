package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.JobDescription;

public record StaffMatchProcessing(double matchPercentage, JobDescription jobDescription) {
}
