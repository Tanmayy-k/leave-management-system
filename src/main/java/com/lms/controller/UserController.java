package com.lms.controller;

import com.lms.dto.response.UserProfileResponse;
import com.lms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Any authenticated role — returns the caller's profile
    @GetMapping("/api/user/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile(Authentication authentication) {
        String email = UserService.extractEmail(authentication);
        return ResponseEntity.ok(userService.getCurrentUser(email));
    }

    // ROLE_EMPLOYEE only — profile wrapped with access level label
    @GetMapping("/api/employee/profile")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYEE')")
    public ResponseEntity<Map<String, Object>> getEmployeeProfile(Authentication authentication) {
        String email = UserService.extractEmail(authentication);
        Map<String, Object> response = Map.of(
                "profile", userService.getCurrentUser(email),
                "accessLevel", "EMPLOYEE");
        return ResponseEntity.ok(response);
    }

    // ROLE_MANAGER only — manager dashboard stub with profile
    @GetMapping("/api/manager/dashboard")
    @PreAuthorize("hasAuthority('ROLE_MANAGER')")
    public ResponseEntity<Map<String, Object>> getManagerDashboard(Authentication authentication) {
        String email = UserService.extractEmail(authentication);
        Map<String, Object> response = Map.of(
                "message", "Manager dashboard",
                "manager", userService.getCurrentUser(email));
        return ResponseEntity.ok(response);
    }

    // ROLE_ADMIN only — admin dashboard stub with profile
    @GetMapping("/api/admin/dashboard")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboard(Authentication authentication) {
        String email = UserService.extractEmail(authentication);
        Map<String, Object> response = Map.of(
                "message", "Admin dashboard",
                "admin", userService.getCurrentUser(email));
        return ResponseEntity.ok(response);
    }
}
