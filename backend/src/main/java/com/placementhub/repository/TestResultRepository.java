package com.placementhub.repository;

import com.placementhub.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    List<TestResult> findByUserId(Long userId);
}
