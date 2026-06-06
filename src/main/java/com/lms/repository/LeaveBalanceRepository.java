package com.lms.repository;

import com.lms.entity.LeaveBalance;
import com.lms.enums.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Long> {

    @Query("SELECT lb FROM LeaveBalance lb WHERE lb.user.id = :userId AND lb.leaveType = :leaveType AND lb.year = :year")
    Optional<LeaveBalance> findByUserIdAndLeaveTypeAndYear(
            @Param("userId") Long userId,
            @Param("leaveType") LeaveType leaveType,
            @Param("year") int year);

    @Query("SELECT lb FROM LeaveBalance lb WHERE lb.user.id = :userId AND lb.year = :year")
    List<LeaveBalance> findByUserIdAndYear(@Param("userId") Long userId, @Param("year") int year);
}
