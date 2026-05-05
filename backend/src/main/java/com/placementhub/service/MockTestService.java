package com.placementhub.service;

import com.placementhub.model.*;
import com.placementhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MockTestService {

    private final MockTestRepository testRepository;
    private final TestResultRepository resultRepository;
    private final UserService userService;

    public List<MockTest> getAll() { return testRepository.findAll(); }

    public MockTest save(MockTest test) { return testRepository.save(test); }

    public void delete(Long id) { testRepository.deleteById(id); }

    public TestResult submitTest(Long testId, Map<Long, String> answers) {
        MockTest test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        // Basic scoring: count non-null answers as attempted
        int score = (int) answers.values().stream().filter(a -> a != null && !a.isBlank()).count();

        TestResult result = new TestResult();
        result.setUser(userService.getCurrentUser());
        result.setTest(test);
        result.setScore(score);
        result.setTotalQuestions(test.getProblemIds().size());
        return resultRepository.save(result);
    }

    public List<TestResult> getMyResults() {
        return resultRepository.findByUserId(userService.getCurrentUser().getId());
    }
}
