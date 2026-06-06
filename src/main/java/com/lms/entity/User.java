package com.lms.entity;

import com.lms.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @Column(nullable = false)
    private String name; // Display name of the employee

    @Column(nullable = false, unique = true)
    private String email; // Login identifier and unique contact

    @Column(nullable = false)
    private String password; // BCrypt-hashed credential

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Authorization role (EMPLOYEE, MANAGER, ADMIN)

    @Column(nullable = true)
    private String department; // Organizational unit, optional

    @Column(name = "manager_id", nullable = true)
    private Long managerId; // Soft FK to another User who approves leave

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt; // Record creation time

    @UpdateTimestamp
    private LocalDateTime updatedAt; // Last modification time

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
