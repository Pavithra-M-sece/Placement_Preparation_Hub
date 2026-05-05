package com.placementhub.repository;

import com.placementhub.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findByDifficulty(Problem.Difficulty difficulty);
    List<Problem> findByTopic(String topic);
}
