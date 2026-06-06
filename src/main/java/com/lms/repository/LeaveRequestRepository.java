package com.lms.repository;

import com.lms.entity.LeaveRequest;
import com.lms.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.id = :employeeId")
    List<LeaveRequest> findByEmployeeId(@Param("employeeId") Long employeeId);

    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.id = :employeeId AND lr.status = :status")
    List<LeaveRequest> findByEmployeeIdAndStatus(
            @Param("employeeId") Long employeeId,
            @Param("status") LeaveStatus status);

    List<LeaveRequest> findByStatus(LeaveStatus status);

    List<LeaveRequest> findByEmployee_ManagerId(Long managerId);

    List<LeaveRequest> findByEmployee_ManagerIdAndStatus(Long managerId, LeaveStatus status);
}
