package com.placementhub.controller;

import com.placementhub.dto.SubmissionRequest;
import com.placementhub.model.Submission;
import com.placementhub.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<Submission> submit(@Valid @RequestBody SubmissionRequest req) {
        return ResponseEntity.ok(submissionService.submit(req));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Submission>> mySubmissions() {
        return ResponseEntity.ok(submissionService.getMySubmissions());
    }
}
