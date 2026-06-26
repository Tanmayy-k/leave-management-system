package com.lms.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI 3 configuration for the Leave Management System.
 *
 * Registers a global "Bearer Authentication" security scheme so that the
 * Swagger UI shows an "Authorize" button.  After pasting a JWT the UI will
 * send "Authorization: Bearer <token>" on every protected endpoint.
 *
 * All REST controllers and their endpoints are picked up automatically by
 * springdoc — no extra @Operation or @Tag annotations are required.
 *
 * Swagger UI URL  : http://localhost:8080/swagger-ui/index.html
 * OpenAPI JSON    : http://localhost:8080/v3/api-docs
 */
@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

    @Bean
    public OpenAPI lmsOpenAPI() {
        return new OpenAPI()
                // ── Application metadata shown in the UI header ───────────────
                .info(new Info()
                        .title("Leave Management System API")
                        .description(
                                "REST API for the Leave Management System.\n\n" +
                                "**Authentication**: Use `POST /api/auth/login` to obtain a JWT, " +
                                "then click the **Authorize** button and paste the token " +
                                "(without the 'Bearer ' prefix — Swagger adds it automatically).\n\n" +
                                "**Roles**: `ROLE_EMPLOYEE` · `ROLE_MANAGER` · `ROLE_ADMIN`"
                        )
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("LMS Development Team")
                        )
                )
                // ── Global JWT Bearer security scheme ─────────────────────────
                // Registers the scheme once; SecurityConfig already enforces it.
                // This just tells Swagger UI to attach the header on every call.
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                new SecurityScheme()
                                        .name(SECURITY_SCHEME_NAME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}
