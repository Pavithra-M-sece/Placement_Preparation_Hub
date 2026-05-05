package com.placementhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubmissionRequest {
    @NotNull private Long problemId;
    @NotBlank private String code;
    @NotBlank private String language;
}
