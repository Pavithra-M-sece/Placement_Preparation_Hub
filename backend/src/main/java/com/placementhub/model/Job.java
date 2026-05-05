package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String companyName;
    private String location;
    private String type; // Full-time, Internship, Part-time

    @Column(columnDefinition = "TEXT")
    private String description;

    private String eligibility;   // e.g. "CGPA >= 7.0, CSE/IT"
    private String package_;      // e.g. "6 LPA" (package is reserved keyword)
    private LocalDate deadline;
    private boolean active = true;

    @ElementCollection
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> requiredSkills;
}
