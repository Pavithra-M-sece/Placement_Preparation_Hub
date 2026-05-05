package com.placementhub.service;

import com.placementhub.model.Streak;
import com.placementhub.model.User;
import com.placementhub.repository.StreakRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class StreakService {

    private final StreakRepository streakRepository;
    private final UserService userService;

    public Streak getMyStreak() {
        User user = userService.getCurrentUser();
        return streakRepository.findByUserId(user.getId())
                .orElseGet(() -> createStreak(user));
    }

    @Transactional
    public Streak recordActivity() {
        User user = userService.getCurrentUser();
        Streak streak = streakRepository.findByUserId(user.getId())
                .orElseGet(() -> createStreak(user));

        LocalDate today = LocalDate.now();
        LocalDate last = streak.getLastActiveDate();

        if (last == null || last.isBefore(today.minusDays(1))) {
            streak.setCurrentStreak(1);
        } else if (last.isEqual(today.minusDays(1))) {
            streak.setCurrentStreak(streak.getCurrentStreak() + 1);
        }
        // same day — no change

        if (streak.getCurrentStreak() > streak.getLongestStreak()) {
            streak.setLongestStreak(streak.getCurrentStreak());
        }
        streak.setLastActiveDate(today);
        return streakRepository.save(streak);
    }

    private Streak createStreak(User user) {
        Streak s = new Streak();
        s.setUser(user);
        return streakRepository.save(s);
    }
}
