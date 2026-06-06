package com.lms.service;

import com.lms.dto.request.LeaveRequestCreateDto;
import com.lms.dto.response.LeaveBalanceResponseDto;
import com.lms.dto.response.LeaveRequestResponseDto;
import com.lms.entity.LeaveBalance;
import com.lms.entity.LeaveRequest;
import com.lms.entity.User;
import com.lms.enums.LeaveStatus;
import com.lms.exception.InvalidLeaveRequestException;
import com.lms.exception.LeaveRequestNotFoundException;
import com.lms.exception.UserNotFoundException;
import com.lms.repository.LeaveBalanceRepository;
import com.lms.repository.LeaveRequestRepository;
import com.lms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final UserRepository userRepository;

    public LeaveService(LeaveRequestRepository leaveRequestRepository,
                        LeaveBalanceRepository leaveBalanceRepository,
                        UserRepository userRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.userRepository = userRepository;
    }

    // Submits a new PENDING leave request for the authenticated employee
    public LeaveRequestResponseDto applyLeave(String employeeEmail, LeaveRequestCreateDto dto) {
        User employee = userRepository.findByEmail(employeeEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + employeeEmail));

        if (!dto.getStartDate().isBefore(dto.getEndDate())
                && !dto.getStartDate().isEqual(dto.getEndDate())) {
            throw new InvalidLeaveRequestException("End date must be on or after start date");
        }

        long days = ChronoUnit.DAYS.between(dto.getStartDate(), dto.getEndDate()) + 1;
        if (days <= 0) {
            throw new InvalidLeaveRequestException("Invalid leave duration calculated");
        }

        LeaveRequest leaveRequest = LeaveRequest.builder()
                .employee(employee)
                .leaveType(dto.getLeaveType())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .totalDays((int) days)
                .reason(dto.getReason())
                .status(LeaveStatus.PENDING)
                .build();

        LeaveRequest saved = leaveRequestRepository.save(leaveRequest);
        return mapToResponseDto(saved);
    }

    // Returns all leave requests belonging to the authenticated employee
    public List<LeaveRequestResponseDto> getMyLeaveRequests(String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + employeeEmail));

        return leaveRequestRepository.findByEmployeeId(employee.getId()).stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    // Returns one leave request if it belongs to the authenticated employee
    public LeaveRequestResponseDto getLeaveRequestById(Long leaveId, String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + employeeEmail));

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new LeaveRequestNotFoundException("Leave request not found with id: " + leaveId));

        if (!leaveRequest.getEmployee().getId().equals(employee.getId())) {
            throw new InvalidLeaveRequestException("Access denied: this leave request does not belong to you");
        }

        return mapToResponseDto(leaveRequest);
    }

    // Returns current-year leave balances for the authenticated employee
    public List<LeaveBalanceResponseDto> getMyLeaveBalances(String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + employeeEmail));

        int year = LocalDate.now().getYear();

        return leaveBalanceRepository.findByUserIdAndYear(employee.getId(), year).stream()
                .map(this::mapToBalanceResponseDto)
                .toList();
    }

    // Maps LeaveRequest entity to API response DTO
    private LeaveRequestResponseDto mapToResponseDto(LeaveRequest lr) {
        return LeaveRequestResponseDto.builder()
                .id(lr.getId())
                .employeeName(lr.getEmployee().getName())
                .employeeEmail(lr.getEmployee().getEmail())
                .leaveType(lr.getLeaveType().name())
                .startDate(lr.getStartDate())
                .endDate(lr.getEndDate())
                .totalDays(lr.getTotalDays())
                .reason(lr.getReason())
                .status(lr.getStatus().name())
                .appliedOn(lr.getAppliedOn())
                .reviewedOn(lr.getReviewedOn())
                .reviewedByName(lr.getReviewedBy() != null ? lr.getReviewedBy().getName() : null)
                .rejectionReason(lr.getRejectionReason())
                .build();
    }

    // Maps LeaveBalance entity to API response DTO
    private LeaveBalanceResponseDto mapToBalanceResponseDto(LeaveBalance balance) {
        return LeaveBalanceResponseDto.builder()
                .id(balance.getId())
                .leaveType(balance.getLeaveType().name())
                .totalDays(balance.getTotalDays())
                .usedDays(balance.getUsedDays())
                .remainingDays(balance.getRemainingDays())
                .year(balance.getYear())
                .build();
    }
}
