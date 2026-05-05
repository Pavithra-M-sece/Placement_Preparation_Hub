package com.placementhub.controller;

import com.placementhub.model.Bookmark;
import com.placementhub.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping
    public ResponseEntity<List<Bookmark>> getMyBookmarks() {
        return ResponseEntity.ok(bookmarkService.getMyBookmarks());
    }

    @PostMapping("/{problemId}")
    public ResponseEntity<Bookmark> add(@PathVariable Long problemId) {
        return ResponseEntity.ok(bookmarkService.addBookmark(problemId));
    }

    @DeleteMapping("/{problemId}")
    public ResponseEntity<Void> remove(@PathVariable Long problemId) {
        bookmarkService.removeBookmark(problemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{problemId}/status")
    public ResponseEntity<Map<String, Boolean>> status(@PathVariable Long problemId) {
        return ResponseEntity.ok(Map.of("bookmarked", bookmarkService.isBookmarked(problemId)));
    }
}
