package com.placementhub.service;

import com.placementhub.model.*;
import com.placementhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;
    private final TestResultRepository testResultRepository;

    public List<Map<String, Object>> getLeaderboard() {
        List<User> users = userRepository.findAll();

        return users.stream().map(user -> {
            List<Submission> subs = submissionRepository.findByUserId(user.getId());
            long solved = subs.stream()
                    .filter(s -> s.getStatus() == Submission.Status.ACCEPTED)
                    .map(s -> s.getProblem().getId())
                    .distinct().count();

            List<TestResult> results = testResultRepository.findByUserId(user.getId());
            double avgScore = results.stream()
                    .mapToDouble(r -> r.getTotalQuestions() > 0
                            ? (r.getScore() * 100.0 / r.getTotalQuestions()) : 0)
                    .average().orElse(0);

            long points = (solved * 10) + (long) avgScore;

            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("name", user.getName());
            entry.put("email", user.getEmail());
            entry.put("problemsSolved", solved);
            entry.put("avgTestScore", Math.round(avgScore));
            entry.put("points", points);
            return entry;
        })
        .sorted((a, b) -> Long.compare((long) b.get("points"), (long) a.get("points")))
        .collect(Collectors.toList());
    }
}
