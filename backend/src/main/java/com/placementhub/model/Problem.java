package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "problems")
@Data
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String constraints;

    @Column(columnDefinition = "TEXT")
    private String examples;

    @Column(columnDefinition = "TEXT")
    private String hints;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private String topic; // DSA, Aptitude, OS, CN, DBMS

    public enum Difficulty { EASY, MEDIUM, HARD }
}
