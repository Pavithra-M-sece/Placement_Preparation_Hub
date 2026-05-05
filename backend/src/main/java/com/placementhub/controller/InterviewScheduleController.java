package com.placementhub.controller;

import com.placementhub.model.InterviewSchedule;
import com.placementhub.service.InterviewScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class InterviewScheduleController {

    private final InterviewScheduleService scheduleService;

    @GetMapping("/my")
    public ResponseEntity<List<InterviewSchedule>> mySchedules() {
        return ResponseEntity.ok(scheduleService.getMySchedules());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<InterviewSchedule>> getAll() {
        return ResponseEntity.ok(scheduleService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InterviewSchedule> create(@RequestBody InterviewSchedule schedule) {
        return ResponseEntity.ok(scheduleService.save(schedule));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InterviewSchedule> update(@PathVariable Long id,
                                                     @RequestBody InterviewSchedule schedule) {
        schedule.setId(id);
        return ResponseEntity.ok(scheduleService.save(schedule));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        scheduleService.delete(id);
        return ResponseEntity.ok().build();
    }
}
