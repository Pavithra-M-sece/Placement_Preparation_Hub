package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "interview_schedules")
@Data
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String roundName;       // e.g. Aptitude Test, Technical Round 1, HR
    private String venue;           // e.g. Hall A / Google Meet link
    private LocalDateTime scheduledAt;
    private String instructions;    // what to bring, dress code, etc.

    @Enumerated(EnumType.STRING)
    private ScheduleType type = ScheduleType.OFFLINE;

    // Which students are invited (by user IDs) — empty means all students
    @ElementCollection
    @CollectionTable(name = "schedule_invitees", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "user_id")
    private List<Long> invitedUserIds;

    public enum ScheduleType { OFFLINE, ONLINE }
}
