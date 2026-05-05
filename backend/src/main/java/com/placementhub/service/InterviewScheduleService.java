package com.placementhub.service;

import com.placementhub.model.InterviewSchedule;
import com.placementhub.repository.InterviewScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewScheduleService {

    private final InterviewScheduleRepository scheduleRepository;
    private final UserService userService;

    public List<InterviewSchedule> getMySchedules() {
        Long userId = userService.getCurrentUser().getId();
        return scheduleRepository.findSchedulesForUser(userId);
    }

    public List<InterviewSchedule> getAll() {
        return scheduleRepository.findAll();
    }

    public InterviewSchedule save(InterviewSchedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }
}
