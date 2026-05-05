package com.placementhub.service;

import com.placementhub.model.*;
import com.placementhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final RoadmapItemRepository roadmapItemRepository;
    private final UserRoadmapProgressRepository progressRepository;
    private final UserService userService;

    public List<RoadmapItem> getAllItems() {
        return roadmapItemRepository.findAll();
    }

    public Map<String, Object> getMyProgress() {
        Long userId = userService.getCurrentUser().getId();
        List<RoadmapItem> all = roadmapItemRepository.findAll();
        List<UserRoadmapProgress> progress = progressRepository.findByUserId(userId);

        Set<Long> completedIds = progress.stream()
                .filter(UserRoadmapProgress::isCompleted)
                .map(p -> p.getRoadmapItem().getId())
                .collect(Collectors.toSet());

        Map<String, List<Map<String, Object>>> grouped = new LinkedHashMap<>();
        for (RoadmapItem item : all) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("id", item.getId());
            entry.put("topic", item.getTopic());
            entry.put("description", item.getDescription());
            entry.put("orderIndex", item.getOrderIndex());
            entry.put("completed", completedIds.contains(item.getId()));
            grouped.computeIfAbsent(item.getCategory(), k -> new ArrayList<>()).add(entry);
        }

        int total = all.size();
        int completed = completedIds.size();
        double percent = total > 0 ? (completed * 100.0 / total) : 0;

        Map<String, Object> result = new HashMap<>();
        result.put("items", grouped);
        result.put("total", total);
        result.put("completed", completed);
        result.put("percent", Math.round(percent));
        return result;
    }

    public void toggleProgress(Long itemId) {
        Long userId = userService.getCurrentUser().getId();
        RoadmapItem item = roadmapItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        UserRoadmapProgress progress = progressRepository
                .findByUserIdAndRoadmapItemId(userId, itemId)
                .orElseGet(() -> {
                    UserRoadmapProgress p = new UserRoadmapProgress();
                    p.setUser(userService.getCurrentUser());
                    p.setRoadmapItem(item);
                    return p;
                });

        progress.setCompleted(!progress.isCompleted());
        progressRepository.save(progress);
    }

    public RoadmapItem saveItem(RoadmapItem item) {
        return roadmapItemRepository.save(item);
    }
}
