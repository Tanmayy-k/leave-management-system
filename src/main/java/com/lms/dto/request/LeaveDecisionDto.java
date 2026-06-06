package com.lms.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDecisionDto {

    @Size(max = 500)
    private String rejectionReason; // Optional explanation when rejecting; ignored on approval
}
