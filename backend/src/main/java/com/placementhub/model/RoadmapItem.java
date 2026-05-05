package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "roadmap_items")
@Getter @Setter
public class RoadmapItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;      // Arrays, LinkedList, Trees...
    private String category;   // DSA, OS, CN, DBMS
    private int orderIndex;

    @Column(columnDefinition = "TEXT")
    private String description;
}
