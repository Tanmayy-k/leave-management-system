package com.lms.service;

import com.lms.dto.request.LeaveDecisionDto;
import com.lms.dto.response.ManagerLeaveResponseDto;
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
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ManagerLeaveService {

    private static final Logger log = LoggerFactory.getLogger(ManagerLeaveService.class);

    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final UserRepository userRepository;

    public ManagerLeaveService(LeaveRequestRepository leaveRequestRepository,
                               LeaveBalanceRepository leaveBalanceRepository,
                               UserRepository userRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.userRepository = userRepository;
    }

    // Lists PENDING leave requests for employees reporting to this manager
    public List<ManagerLeaveResponseDto> getPendingRequests(String managerEmail) {
        User manager = userRepository.findByEmail(managerEmail)
                .orElseThrow(() -> new UserNotFoundException("Manager not found with email: " + managerEmail));

        return leaveRequestRepository
                .findByEmployee_ManagerIdAndStatus(manager.getId(), LeaveStatus.PENDING)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // Lists all leave requests for employees reporting to this manager
    public List<ManagerLeaveResponseDto> getAllRequests(String managerEmail) {
        User manager = userRepository.findByEmail(managerEmail)
                .orElseThrow(() -> new UserNotFoundException("Manager not found with email: " + managerEmail));

        return leaveRequestRepository.findByEmployee_ManagerId(manager.getId()).stream()
                .map(this::mapToDto)
                .toList();
    }

    // Approves a PENDING request and deducts leave balance when a record exists
    public ManagerLeaveResponseDto approveLeave(Long leaveId, String managerEmail) {
        User manager = userRepository.findByEmail(managerEmail)
                .orElseThrow(() -> new UserNotFoundException("Manager not found with email: " + managerEmail));

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new LeaveRequestNotFoundException("Leave request not found with id: " + leaveId));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new InvalidLeaveRequestException("Only PENDING requests can be approved");
        }

        leaveRequest.setStatus(LeaveStatus.APPROVED);
        leaveRequest.setReviewedBy(manager);
        leaveRequest.setReviewedOn(LocalDateTime.now());

        LeaveRequest saved = leaveRequestRepository.save(leaveRequest);

        int year = saved.getStartDate().getYear();
        Optional<LeaveBalance> balanceOpt = leaveBalanceRepository.findByUserIdAndLeaveTypeAndYear(
                saved.getEmployee().getId(),
                saved.getLeaveType(),
                year);

        if (balanceOpt.isPresent()) {
            LeaveBalance balance = balanceOpt.get();
            balance.setUsedDays(balance.getUsedDays() + saved.getTotalDays());
            int remaining = balance.getRemainingDays() - saved.getTotalDays();
            balance.setRemainingDays(Math.max(remaining, 0));
            leaveBalanceRepository.save(balance);
        } else {
            log.warn("No leave balance found for user {}", saved.getEmployee().getId());
        }

        return mapToDto(saved);
    }

    // Rejects a PENDING request without changing leave balance
    public ManagerLeaveResponseDto rejectLeave(Long leaveId, String managerEmail, LeaveDecisionDto dto) {
        User manager = userRepository.findByEmail(managerEmail)
                .orElseThrow(() -> new UserNotFoundException("Manager not found with email: " + managerEmail));

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new LeaveRequestNotFoundException("Leave request not found with id: " + leaveId));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new InvalidLeaveRequestException("Only PENDING requests can be rejected");
        }

        leaveRequest.setStatus(LeaveStatus.REJECTED);
        leaveRequest.setReviewedBy(manager);
        leaveRequest.setReviewedOn(LocalDateTime.now());
        leaveRequest.setRejectionReason(dto.getRejectionReason());

        LeaveRequest saved = leaveRequestRepository.save(leaveRequest);
        return mapToDto(saved);
    }

    // Maps LeaveRequest entity to manager-facing response DTO
    private ManagerLeaveResponseDto mapToDto(LeaveRequest lr) {
        return ManagerLeaveResponseDto.builder()
                .id(lr.getId())
                .employeeName(lr.getEmployee().getName())
                .employeeEmail(lr.getEmployee().getEmail())
                .employeeDepartment(lr.getEmployee().getDepartment())
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
}
