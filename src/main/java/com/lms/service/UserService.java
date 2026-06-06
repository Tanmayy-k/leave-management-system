package com.lms.service;

import com.lms.dto.response.UserProfileResponse;
import com.lms.entity.User;
import com.lms.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Loads user by email and maps to a profile DTO
    public UserProfileResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .department(user.getDepartment())
                .build();
    }

    // Reads email from SecurityContext (set by JWT filter as UserDetails username)
    public static String extractEmail(Authentication authentication) {
        return authentication.getName();
    }
}
