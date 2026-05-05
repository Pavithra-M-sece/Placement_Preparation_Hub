package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String pattern;

    private String difficulty;

    @ElementCollection
    @CollectionTable(name = "company_rounds", joinColumns = @JoinColumn(name = "company_id"))
    @Column(name = "round")
    private List<String> rounds;

    @ElementCollection
    @CollectionTable(name = "company_topics", joinColumns = @JoinColumn(name = "company_id"))
    @Column(name = "topic")
    private List<String> suggestedTopics;
}
