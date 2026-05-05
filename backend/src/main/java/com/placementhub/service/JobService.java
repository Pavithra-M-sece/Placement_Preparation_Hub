package com.placementhub.service;

import com.placementhub.model.Job;
import com.placementhub.model.JobApplication;
import com.placementhub.repository.JobApplicationRepository;
import com.placementhub.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;
    private final UserService userService;

    public List<Job> getActiveJobs(String type) {
        if (type != null && !type.isBlank()) return jobRepository.findByTypeAndActiveTrue(type);
        return jobRepository.findByActiveTrue();
    }

    public List<Job> getAllJobs() { return jobRepository.findAll(); }

    public Job save(Job job) { return jobRepository.save(job); }

    public void toggleActive(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setActive(!job.isActive());
        jobRepository.save(job);
    }

    public JobApplication apply(Long jobId) {
        Long userId = userService.getCurrentUser().getId();
        if (applicationRepository.existsByJobIdAndUserId(jobId, userId))
            throw new IllegalStateException("Already applied");
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        JobApplication app = new JobApplication();
        app.setJob(job);
        app.setUser(userService.getCurrentUser());
        return applicationRepository.save(app);
    }

    public List<JobApplication> getMyApplications() {
        return applicationRepository.findByUserId(userService.getCurrentUser().getId());
    }

    public List<JobApplication> getApplicants(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public JobApplication updateStatus(Long applicationId, String status) {
        JobApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(JobApplication.Status.valueOf(status.toUpperCase(java.util.Locale.ROOT)));
        return applicationRepository.save(app);
    }
}
