package com.example.quickhirebackend.dto;

import com.example.quickhirebackend.model.AllTypesEnums;

public record UserActiveInfo(String username, AllTypesEnums.UserType usertype, AllTypesEnums.UserStatus status, Integer profid, String ispasswordchanged) {
}
 