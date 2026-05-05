package com.placementhub.service;

import com.placementhub.dto.DashboardStats;
import com.placementhub.model.*;
import com.placementhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final SubmissionRepository submissionRepository;
    private final TestResultRepository testResultRepository;
    private final UserService userService;

    public DashboardStats getStats() {
        Long userId = userService.getCurrentUser().getId();

        List<Submission> submissions = submissionRepository.findByUserId(userId);
        long total = submissions.size();
        long accepted = submissions.stream()
                .filter(s -> s.getStatus() == Submission.Status.ACCEPTED).count();
        double accuracy = total > 0 ? (accepted * 100.0 / total) : 0;

        List<TestResult> results = testResultRepository.findByUserId(userId);
        double avgScore = results.stream()
                .mapToInt(TestResult::getScore).average().orElse(0);

        return new DashboardStats(total, accepted, accuracy, results.size(), avgScore);
    }
}
