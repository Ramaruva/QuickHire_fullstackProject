package com.example.quickhirebackend.dto;

import java.util.Date;

public record EducationRecord(Integer education_id, String schoolname, String major, Date completiontime, Integer profid ,boolean delete) {
}
