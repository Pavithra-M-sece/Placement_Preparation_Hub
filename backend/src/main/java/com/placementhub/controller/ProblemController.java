package com.placementhub.controller;

import com.placementhub.model.Problem;
import com.placementhub.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @GetMapping
    public ResponseEntity<List<Problem>> getAll(
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String topic) {
        if (difficulty != null) return ResponseEntity.ok(problemService.getByDifficulty(difficulty));
        if (topic != null) return ResponseEntity.ok(problemService.getByTopic(topic));
        return ResponseEntity.ok(problemService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(problemService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Problem> create(@RequestBody Problem problem) {
        return ResponseEntity.ok(problemService.save(problem));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Problem> update(@PathVariable Long id, @RequestBody Problem problem) {
        problem.setId(id);
        return ResponseEntity.ok(problemService.save(problem));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        problemService.delete(id);
        return ResponseEntity.ok().build();
    }
}
