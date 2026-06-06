package com.lms.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lms.enums.LeaveType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequestCreateDto {

    @NotNull(message = "Leave type is required")
    private LeaveType leaveType; // Category of leave being requested

    @NotNull(message = "Start date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate; // First day of leave (inclusive)

    @NotNull(message = "End date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate; // Last day of leave (inclusive)

    @NotBlank(message = "Reason is required")
    @Size(max = 500)
    private String reason; // Justification for the leave request
}
