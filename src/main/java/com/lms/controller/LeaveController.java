package com.lms.controller;

import com.lms.dto.request.LeaveRequestCreateDto;
import com.lms.dto.response.LeaveBalanceResponseDto;
import com.lms.dto.response.LeaveRequestResponseDto;
import com.lms.service.LeaveService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employee/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    // ROLE_EMPLOYEE — submit a new leave application
    @PostMapping("/apply")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYEE')")
    public ResponseEntity<LeaveRequestResponseDto> applyLeave(
            @Valid @RequestBody LeaveRequestCreateDto dto,
            Authentication authentication) {
        LeaveRequestResponseDto response = leaveService.applyLeave(authentication.getName(), dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ROLE_EMPLOYEE — list all leave requests for the caller
    @GetMapping("/my-requests")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYEE')")
    public ResponseEntity<List<LeaveRequestResponseDto>> getMyLeaveRequests(Authentication authentication) {
        List<LeaveRequestResponseDto> requests = leaveService.getMyLeaveRequests(authentication.getName());
        return ResponseEntity.ok(requests);
    }

    // ROLE_EMPLOYEE — fetch one own leave request by id
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYEE')")
    public ResponseEntity<LeaveRequestResponseDto> getLeaveRequestById(
            @PathVariable Long id,
            Authentication authentication) {
        LeaveRequestResponseDto response = leaveService.getLeaveRequestById(id, authentication.getName());
        return ResponseEntity.ok(response);
    }

    // ROLE_EMPLOYEE — current-year leave balances for the caller
    @GetMapping("/my-balances")
    @PreAuthorize("hasAuthority('ROLE_EMPLOYEE')")
    public ResponseEntity<List<LeaveBalanceResponseDto>> getMyLeaveBalances(Authentication authentication) {
        List<LeaveBalanceResponseDto> balances = leaveService.getMyLeaveBalances(authentication.getName());
        return ResponseEntity.ok(balances);
    }
}
