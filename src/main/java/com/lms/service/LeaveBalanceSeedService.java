package com.lms.service;

import com.lms.entity.LeaveBalance;
import com.lms.entity.User;
import com.lms.enums.LeaveType;
import com.lms.repository.LeaveBalanceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Responsible for seeding default leave balances for newly registered employees.
 *
 * <p>Design decisions:
 * <ul>
 *   <li>Only ROLE_EMPLOYEE gets automatic balances; managers and admins do not
 *       consume leave in this system.</li>
 *   <li>The database table {@code leave_balances} has a UNIQUE constraint on
 *       {@code (user_id, leave_type, year)}, so a duplicate INSERT would fail
 *       at the DB level even if this guard is bypassed.</li>
 *   <li>We do an explicit existence check first (via repository) to avoid
 *       relying on exception-based control flow for the happy path.</li>
 *   <li>The method is {@code @Transactional} so all three balance rows are
 *       committed atomically — either all succeed or none are persisted.</li>
 * </ul>
 */
@Service
public class LeaveBalanceSeedService {

    // Default entitlements (days per year)
    private static final Map<LeaveType, Integer> DEFAULT_BALANCES = Map.of(
            LeaveType.CASUAL,  12,
            LeaveType.SICK,     8,
            LeaveType.EARNED,  15
    );

    private final LeaveBalanceRepository leaveBalanceRepository;

    public LeaveBalanceSeedService(LeaveBalanceRepository leaveBalanceRepository) {
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    /**
     * Seeds the three standard leave types for {@code user} in the current calendar year.
     *
     * <p>Idempotent: if any balance already exists for this user + type + year
     * it is silently skipped.  Calling this method twice for the same user is safe.
     *
     * @param user the newly registered employee (must already be persisted with a non-null id)
     */
    @Transactional
    public void seedDefaultBalances(User user) {
        int currentYear = LocalDate.now().getYear();

        List<LeaveBalance> toSave = new ArrayList<>();

        for (Map.Entry<LeaveType, Integer> entry : DEFAULT_BALANCES.entrySet()) {
            LeaveType type  = entry.getKey();
            int       days  = entry.getValue();

            // Skip if this leave type already has a balance row for the current year.
            // The DB unique constraint is the ultimate safety net, but checking here
            // avoids a redundant INSERT attempt on re-registration or admin seeding.
            boolean alreadyExists = leaveBalanceRepository
                    .findByUserIdAndLeaveTypeAndYear(user.getId(), type, currentYear)
                    .isPresent();

            if (!alreadyExists) {
                toSave.add(LeaveBalance.builder()
                        .user(user)
                        .leaveType(type)
                        .totalDays(days)
                        .usedDays(0)
                        .remainingDays(days)
                        .year(currentYear)
                        .build());
            }
        }

        if (!toSave.isEmpty()) {
            leaveBalanceRepository.saveAll(toSave);
        }
    }
}
