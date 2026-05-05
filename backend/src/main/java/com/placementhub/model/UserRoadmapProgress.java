package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_roadmap_progress", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "roadmap_item_id"}))
@Getter @Setter
public class UserRoadmapProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_item_id")
    private RoadmapItem roadmapItem;

    private boolean completed = false;
}
