package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token; // JWT for subsequent authenticated requests

    private String role; // Granted authority name (e.g. ROLE_EMPLOYEE)

    private String name; // Display name of the authenticated user

    private String email; // Login email echoed back to the client
}
