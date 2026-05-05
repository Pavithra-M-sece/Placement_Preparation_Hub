package com.placementhub.repository;

import com.placementhub.model.InterviewSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InterviewScheduleRepository extends JpaRepository<InterviewSchedule, Long> {

    // Schedules where invitedUserIds is empty (open to all) OR contains the userId
    @Query("SELECT s FROM InterviewSchedule s WHERE s.invitedUserIds IS EMPTY OR :userId MEMBER OF s.invitedUserIds")
    List<InterviewSchedule> findSchedulesForUser(@Param("userId") Long userId);
}
