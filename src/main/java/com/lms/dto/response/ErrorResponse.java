package com.lms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {

    private LocalDateTime timestamp; // When the error occurred

    private int status; // HTTP status code

    private String error; // HTTP status reason phrase

    private String message; // Human-readable error detail

    private String path; // Request URI that caused the error
}
