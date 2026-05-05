package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "streaks")
@Getter @Setter
public class Streak {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private int currentStreak = 0;
    private int longestStreak = 0;
    private LocalDate lastActiveDate;
}
