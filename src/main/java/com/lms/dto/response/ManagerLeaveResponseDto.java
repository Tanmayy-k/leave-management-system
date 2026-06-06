package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManagerLeaveResponseDto {

    private Long id; // Leave request primary key

    private String employeeName; // Requesting employee display name

    private String employeeEmail; // Requesting employee email

    private String employeeDepartment; // Employee department, may be null

    private String leaveType; // Leave category as enum name

    private LocalDate startDate; // First day of absence

    private LocalDate endDate; // Last day of absence

    private int totalDays; // Inclusive calendar days requested

    private String reason; // Employee justification

    private String status; // Approval state as enum name

    private LocalDateTime appliedOn; // Submission timestamp

    private LocalDateTime reviewedOn; // Manager action timestamp

    private String reviewedByName; // Name of reviewing manager, if set

    private String rejectionReason; // Rejection explanation, if any
}
