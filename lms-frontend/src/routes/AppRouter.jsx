import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AppShell from "../components/layout/AppShell";

// Auth
import LoginPage from "../pages/auth/LoginPage";

// Employee pages
import EmployeeDashboard  from "../pages/employee/EmployeeDashboard";
import ApplyLeavePage     from "../pages/employee/ApplyLeavePage";
import MyLeavesPage       from "../pages/employee/MyLeavesPage";
import LeaveDetailPage    from "../pages/employee/LeaveDetailPage";

// Manager pages
import ManagerDashboard     from "../pages/manager/ManagerDashboard";
import PendingRequestsPage  from "../pages/manager/PendingRequestsPage";
import AllRequestsPage      from "../pages/manager/AllRequestsPage";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";

import { ROLES } from "../utils/constants";

export default function AppRouter() {
  return (
    // BrowserRouter must wrap AuthProvider because AuthProvider calls useNavigate().
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ── Root ──────────────────────────────────────────────────────── */}
          <Route path="/"      element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ── Employee routes ───────────────────────────────────────────── */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]} />
            }
          >
            <Route element={<AppShell />}>
              <Route path="/employee"           element={<Navigate to="/employee/dashboard" replace />} />
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/apply"     element={<ApplyLeavePage />} />
              <Route path="/employee/my-leaves" element={<MyLeavesPage />} />
              <Route path="/employee/leaves/:id" element={<LeaveDetailPage />} />
            </Route>
          </Route>

          {/* ── Manager routes ────────────────────────────────────────────── */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[ROLES.MANAGER]} />
            }
          >
            <Route element={<AppShell />}>
              <Route path="/manager"            element={<Navigate to="/manager/dashboard" replace />} />
              <Route path="/manager/dashboard"  element={<ManagerDashboard />} />
              <Route path="/manager/pending"    element={<PendingRequestsPage />} />
              <Route path="/manager/all"        element={<AllRequestsPage />} />
            </Route>
          </Route>

          {/* ── Admin routes ──────────────────────────────────────────────── */}
          <Route
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />
            }
          >
            <Route element={<AppShell />}>
              <Route path="/admin"           element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* ── Catch-all ─────────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
