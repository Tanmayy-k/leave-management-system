package com.lms.entity;

import com.lms.enums.LeaveStatus;
import com.lms.enums.LeaveType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "leave_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private User employee; // Employee who submitted the request

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveType leaveType; // Category of leave requested

    @Column(nullable = false)
    private LocalDate startDate; // First day of absence

    @Column(nullable = false)
    private LocalDate endDate; // Last day of absence (inclusive)

    @Column(nullable = false)
    private int totalDays; // Business days covered by this request

    @Column(length = 500)
    private String reason; // Employee justification for the leave

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveStatus status; // Current approval state

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime appliedOn; // When the request was submitted

    @Column(nullable = true)
    private LocalDateTime reviewedOn; // When a manager acted on the request

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by", nullable = true)
    private User reviewedBy; // Manager or admin who approved/rejected

    @Column(length = 500, nullable = true)
    private String rejectionReason; // Explanation when status is REJECTED
}
