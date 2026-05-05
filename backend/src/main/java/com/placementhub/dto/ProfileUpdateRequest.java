package com.placementhub.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String name;
    private String skills;
    private String resumeLink;
}
