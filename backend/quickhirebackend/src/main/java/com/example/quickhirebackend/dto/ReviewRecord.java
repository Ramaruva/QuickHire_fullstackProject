package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.AllTypesEnums;

public record ReviewRecord(int id, AllTypesEnums.UserRequestType requestType, String reviewMessage) {
}
