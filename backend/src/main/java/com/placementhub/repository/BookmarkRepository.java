package com.placementhub.repository;

import com.placementhub.model.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUserId(Long userId);
    Optional<Bookmark> findByUserIdAndProblemId(Long userId, Long problemId);
    void deleteByUserIdAndProblemId(Long userId, Long problemId);
    boolean existsByUserIdAndProblemId(Long userId, Long problemId);
}
