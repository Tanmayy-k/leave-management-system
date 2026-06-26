import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * ProtectedRoute — guards routes by authentication and optional role check.
 *
 * @param {{ allowedRoles?: string[] }} props
 *   allowedRoles  — array of permitted role strings, e.g. ["ROLE_EMPLOYEE"].
 *                   Pass undefined / omit to allow any authenticated user.
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  // Not logged in → redirect to login, preserving intent implicitly.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role → redirect to the user's own dashboard.
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    if (user?.role === "ROLE_MANAGER") return <Navigate to="/manager/dashboard" replace />;
    if (user?.role === "ROLE_ADMIN")   return <Navigate to="/admin/dashboard"   replace />;
    return <Navigate to="/employee/dashboard" replace />;
  }

  // All checks passed — render the nested route.
  return <Outlet />;
}
