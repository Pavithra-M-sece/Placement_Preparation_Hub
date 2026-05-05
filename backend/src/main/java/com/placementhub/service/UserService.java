package com.placementhub.service;

import com.placementhub.dto.ProfileUpdateRequest;
import com.placementhub.model.User;
import com.placementhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    public User updateProfile(ProfileUpdateRequest req) {
        User user = getCurrentUser();
        if (req.getName() != null) user.setName(req.getName());
        if (req.getSkills() != null) user.setSkills(req.getSkills());
        if (req.getResumeLink() != null) user.setResumeLink(req.getResumeLink());
        return userRepository.save(user);
    }
}
