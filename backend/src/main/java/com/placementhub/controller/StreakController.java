package com.placementhub.controller;

import com.placementhub.model.Streak;
import com.placementhub.service.StreakService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/streak")
@RequiredArgsConstructor
public class StreakController {

    private final StreakService streakService;

    @GetMapping
    public ResponseEntity<Streak> getStreak() {
        return ResponseEntity.ok(streakService.getMyStreak());
    }

    @PostMapping("/record")
    public ResponseEntity<Streak> record() {
        return ResponseEntity.ok(streakService.recordActivity());
    }
}
