package com.placementhub.repository;

import com.placementhub.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByActiveTrue();
    List<Job> findByTypeAndActiveTrue(String type);
}
