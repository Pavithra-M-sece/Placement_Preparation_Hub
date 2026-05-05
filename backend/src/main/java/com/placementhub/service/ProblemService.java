package com.placementhub.service;

import com.placementhub.model.Problem;
import com.placementhub.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepository;

    public List<Problem> getAll() { return problemRepository.findAll(); }

    public List<Problem> getByDifficulty(String difficulty) {
        return problemRepository.findByDifficulty(Problem.Difficulty.valueOf(difficulty.toUpperCase(Locale.ROOT)));
    }

    public List<Problem> getByTopic(String topic) {
        return problemRepository.findByTopic(topic);
    }

    public Problem save(Problem problem) { return problemRepository.save(problem); }

    public void delete(Long id) { problemRepository.deleteById(id); }

    public Problem getById(Long id) {
        return problemRepository.findById(id).orElseThrow(() -> new RuntimeException("Problem not found"));
    }
}
