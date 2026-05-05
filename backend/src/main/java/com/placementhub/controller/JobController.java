package com.placementhub.controller;

import com.placementhub.model.Job;
import com.placementhub.model.JobApplication;
import com.placementhub.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getJobs(@RequestParam(required = false) String type) {
        return ResponseEntity.ok(jobService.getActiveJobs(type));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Job> create(@RequestBody Job job) {
        return ResponseEntity.ok(jobService.save(job));
    }

    @PutMapping("/{id}/toggle")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> toggle(@PathVariable Long id) {
        jobService.toggleActive(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<JobApplication> apply(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.apply(id));
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<JobApplication>> myApplications() {
        return ResponseEntity.ok(jobService.getMyApplications());
    }

    @GetMapping("/{id}/applicants")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<JobApplication>> applicants(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getApplicants(id));
    }

    @PutMapping("/applications/{applicationId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobApplication> updateStatus(@PathVariable Long applicationId,
                                                        @RequestParam String status) {
        return ResponseEntity.ok(jobService.updateStatus(applicationId, status));
    }
}
