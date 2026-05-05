package com.placementhub.controller;

import com.placementhub.model.RoadmapItem;
import com.placementhub.service.RoadmapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/roadmap")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService roadmapService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getMyProgress() {
        return ResponseEntity.ok(roadmapService.getMyProgress());
    }

    @PostMapping("/{itemId}/toggle")
    public ResponseEntity<Void> toggle(@PathVariable Long itemId) {
        roadmapService.toggleProgress(itemId);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RoadmapItem> create(@RequestBody RoadmapItem item) {
        return ResponseEntity.ok(roadmapService.saveItem(item));
    }
}
