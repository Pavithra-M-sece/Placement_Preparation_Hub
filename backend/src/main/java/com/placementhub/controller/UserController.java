package com.placementhub.controller;

import com.placementhub.dto.ProfileUpdateRequest;
import com.placementhub.model.User;
import com.placementhub.repository.UserRepository;
import com.placementhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateProfile(@RequestBody ProfileUpdateRequest req) {
        return ResponseEntity.ok(userService.updateProfile(req));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
