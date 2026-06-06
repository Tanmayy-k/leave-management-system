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
public class LeaveRequestResponseDto {

    private Long id; // Leave request primary key

    private String employeeName; // Name of the requesting employee

    private String employeeEmail; // Email of the requesting employee

    private String leaveType; // Leave category as enum name

    private LocalDate startDate; // First day of absence

    private LocalDate endDate; // Last day of absence

    private int totalDays; // Inclusive calendar days requested

    private String reason; // Employee-provided justification

    private String status; // Approval state as enum name

    private LocalDateTime appliedOn; // Submission timestamp

    private LocalDateTime reviewedOn; // Manager action timestamp, if any

    private String reviewedByName; // Name of reviewer, if any

    private String rejectionReason; // Rejection explanation, if any
}
