package com.placementhub.service;

import com.placementhub.model.Bookmark;
import com.placementhub.model.User;
import com.placementhub.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserService userService;
    private final ProblemService problemService;

    public List<Bookmark> getMyBookmarks() {
        return bookmarkRepository.findByUserId(userService.getCurrentUser().getId());
    }

    public Bookmark addBookmark(Long problemId) {
        User user = userService.getCurrentUser();
        if (bookmarkRepository.existsByUserIdAndProblemId(user.getId(), problemId))
            throw new IllegalArgumentException("Already bookmarked");
        Bookmark b = new Bookmark();
        b.setUser(user);
        b.setProblem(problemService.getById(problemId));
        return bookmarkRepository.save(b);
    }

    @Transactional
    public void removeBookmark(Long problemId) {
        bookmarkRepository.deleteByUserIdAndProblemId(
                userService.getCurrentUser().getId(), problemId);
    }

    public boolean isBookmarked(Long problemId) {
        return bookmarkRepository.existsByUserIdAndProblemId(
                userService.getCurrentUser().getId(), problemId);
    }
}
