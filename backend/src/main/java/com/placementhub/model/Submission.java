package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @Column(columnDefinition = "TEXT")
    private String code;

    private String language; // C++, Java, Python

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime submittedAt = LocalDateTime.now();

    public enum Status { ACCEPTED, WRONG_ANSWER, PENDING }
}
