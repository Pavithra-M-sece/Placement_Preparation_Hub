package com.placementhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {
    private long totalSubmissions;
    private long acceptedSubmissions;
    private double accuracyPercent;
    private long testsTaken;
    private double averageScore;
}
