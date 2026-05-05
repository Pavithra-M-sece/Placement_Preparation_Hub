package com.placementhub.service;

import com.placementhub.dto.SubmissionRequest;
import com.placementhub.model.*;
import com.placementhub.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final ProblemService problemService;
    private final UserService userService;
    private final StreakService streakService;

    public Submission submit(SubmissionRequest req) {
        Submission submission = new Submission();
        submission.setUser(userService.getCurrentUser());
        submission.setProblem(problemService.getById(req.getProblemId()));
        submission.setCode(req.getCode());
        submission.setLanguage(req.getLanguage());
        submission.setStatus(Submission.Status.ACCEPTED);
        Submission saved = submissionRepository.save(submission);
        streakService.recordActivity();
        return saved;
    }

    public List<Submission> getMySubmissions() {
        return submissionRepository.findByUserId(userService.getCurrentUser().getId());
    }
}
