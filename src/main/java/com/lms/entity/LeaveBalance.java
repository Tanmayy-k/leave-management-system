package com.lms.entity;

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
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "leave_balances",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "leave_type", "year"})
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Owner of this balance row

    @Enumerated(EnumType.STRING)
    @Column(name = "leave_type", nullable = false)
    private LeaveType leaveType; // Type of leave being tracked

    @Column(nullable = false, columnDefinition = "int default 12")
    private int totalDays; // Annual entitlement for this type

    @Column(nullable = false, columnDefinition = "int default 0")
    private int usedDays; // Days already consumed

    @Column(nullable = false, columnDefinition = "int default 12")
    private int remainingDays; // Days still available (total - used)

    @Column(nullable = false)
    private int year; // Calendar year this balance applies to
}
