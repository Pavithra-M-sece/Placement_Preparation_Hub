package com.placementhub.controller;

import com.placementhub.model.*;
import com.placementhub.service.MockTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class MockTestController {

    private final MockTestService testService;

    @GetMapping
    public ResponseEntity<List<MockTest>> getAll() {
        return ResponseEntity.ok(testService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MockTest> create(@RequestBody MockTest test) {
        return ResponseEntity.ok(testService.save(test));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MockTest> update(@PathVariable Long id, @RequestBody MockTest test) {
        test.setId(id);
        return ResponseEntity.ok(testService.save(test));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        testService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Body: { problemId: answer, ... }
    @PostMapping("/{id}/submit")
    public ResponseEntity<TestResult> submit(@PathVariable Long id,
                                             @RequestBody Map<Long, String> answers) {
        return ResponseEntity.ok(testService.submitTest(id, answers));
    }

    @GetMapping("/results")
    public ResponseEntity<List<TestResult>> myResults() {
        return ResponseEntity.ok(testService.getMyResults());
    }
}
