// User roles
export const ROLES = {
  EMPLOYEE: "ROLE_EMPLOYEE",
  MANAGER: "ROLE_MANAGER",
  ADMIN: "ROLE_ADMIN",
};

// Leave types
export const LEAVE_TYPES = [
  "CASUAL",
  "SICK",
  "EARNED",
  "MATERNITY",
  "PATERNITY",
  "UNPAID",
];

// Leave statuses
export const LEAVE_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
};

// Tailwind classes for each status
export const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
};
