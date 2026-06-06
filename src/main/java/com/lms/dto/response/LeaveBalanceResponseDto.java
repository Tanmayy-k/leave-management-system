package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveBalanceResponseDto {

    private Long id; // Balance record primary key

    private String leaveType; // Leave category as enum name

    private int totalDays; // Annual entitlement

    private int usedDays; // Days consumed so far

    private int remainingDays; // Days still available

    private int year; // Calendar year for this balance
}
