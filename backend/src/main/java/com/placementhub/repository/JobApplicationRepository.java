package com.placementhub.repository;

import com.placementhub.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
    List<JobApplication> findByJobId(Long jobId);
    Optional<JobApplication> findByJobIdAndUserId(Long jobId, Long userId);
    boolean existsByJobIdAndUserId(Long jobId, Long userId);
}
