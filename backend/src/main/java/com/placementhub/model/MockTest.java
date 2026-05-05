package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "tests")
@Data
public class MockTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int durationMinutes;
    private String company; // optional: company-specific test

    @ElementCollection
    @CollectionTable(name = "test_questions", joinColumns = @JoinColumn(name = "test_id"))
    @Column(name = "problem_id")
    private List<Long> problemIds;
}
