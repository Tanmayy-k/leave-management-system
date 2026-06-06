package com.lms.controller;

import com.lms.dto.request.LeaveDecisionDto;
import com.lms.dto.response.ManagerLeaveResponseDto;
import com.lms.service.ManagerLeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/manager/leaves")
public class ManagerController {

    private final ManagerLeaveService managerLeaveService;

    public ManagerController(ManagerLeaveService managerLeaveService) {
        this.managerLeaveService = managerLeaveService;
    }

    // ROLE_MANAGER — pending requests from direct reports
    @GetMapping("/pending")
    @PreAuthorize("hasAuthority('ROLE_MANAGER')")
    public ResponseEntity<List<ManagerLeaveResponseDto>> getPendingRequests(Authentication authentication) {
        List<ManagerLeaveResponseDto> requests = managerLeaveService.getPendingRequests(authentication.getName());
        return ResponseEntity.ok(requests);
    }

    // ROLE_MANAGER — all requests from direct reports (any status)
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_MANAGER')")
    public ResponseEntity<List<ManagerLeaveResponseDto>> getAllRequests(Authentication authentication) {
        List<ManagerLeaveResponseDto> requests = managerLeaveService.getAllRequests(authentication.getName());
        return ResponseEntity.ok(requests);
    }

    // ROLE_MANAGER — approve a PENDING request and deduct balance
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAuthority('ROLE_MANAGER')")
    public ResponseEntity<ManagerLeaveResponseDto> approveLeave(
            @PathVariable Long id,
            Authentication authentication) {
        ManagerLeaveResponseDto response = managerLeaveService.approveLeave(id, authentication.getName());
        return ResponseEntity.ok(response);
    }

    // ROLE_MANAGER — reject a PENDING request with optional reason
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('ROLE_MANAGER')")
    public ResponseEntity<ManagerLeaveResponseDto> rejectLeave(
            @PathVariable Long id,
            @RequestBody LeaveDecisionDto dto,
            Authentication authentication) {
        ManagerLeaveResponseDto response = managerLeaveService.rejectLeave(id, authentication.getName(), dto);
        return ResponseEntity.ok(response);
    }
}
