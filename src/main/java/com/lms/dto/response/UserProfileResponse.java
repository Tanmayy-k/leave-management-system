package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {

    private Long id; // User primary key

    private String name; // Display name

    private String email; // Login email

    private String role; // Authority name (e.g. ROLE_EMPLOYEE)

    private String department; // Organizational unit, may be null
}
