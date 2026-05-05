package com.placementhub.repository;

import com.placementhub.model.RoadmapItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadmapItemRepository extends JpaRepository<RoadmapItem, Long> {
    List<RoadmapItem> findByCategoryOrderByOrderIndex(String category);
}
