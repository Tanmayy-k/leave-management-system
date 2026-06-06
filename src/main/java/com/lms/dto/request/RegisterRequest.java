package com.lms.dto.request;

import com.lms.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name; // Full name of the new user

    @NotBlank
    @Email(message = "Valid email is required")
    private String email; // Unique login email

    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password; // Raw password (min 6 chars, encoded before save)

    private Role role; // Optional; defaults to ROLE_EMPLOYEE when null

    private String department; // Optional organizational unit

    private Long managerId; // Optional soft FK to approving manager
}
