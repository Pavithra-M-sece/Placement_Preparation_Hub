package com.placementhub.repository;

import com.placementhub.model.UserRoadmapProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRoadmapProgressRepository extends JpaRepository<UserRoadmapProgress, Long> {
    List<UserRoadmapProgress> findByUserId(Long userId);
    Optional<UserRoadmapProgress> findByUserIdAndRoadmapItemId(Long userId, Long itemId);
}
