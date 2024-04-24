package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.Qualification;

import java.util.List;

public record JobMatchRequestRecord(Integer matchId, Integer professionalId, Integer jobId, Integer staffId,Integer userProfileID, List<Qualification> jobQualifications, List<Qualification> professionalQualifications) {

}
