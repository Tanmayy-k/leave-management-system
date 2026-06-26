import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarPlus,
  FileText,
  Clock,
  List,
  Shield,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// Role-based nav config — single source of truth, no per-role JSX conditionals
const NAV = {
  ROLE_EMPLOYEE: [
    { label: "Dashboard",   path: "/employee/dashboard", icon: LayoutDashboard },
    { label: "Apply Leave", path: "/employee/apply",     icon: CalendarPlus },
    { label: "My Leaves",   path: "/employee/my-leaves", icon: FileText },
  ],
  ROLE_MANAGER: [
    { label: "Dashboard",        path: "/manager/dashboard", icon: LayoutDashboard },
    { label: "Pending Requests", path: "/manager/pending",   icon: Clock },
    { label: "All Requests",     path: "/manager/all",       icon: List },
  ],
  ROLE_ADMIN: [
    { label: "Admin Dashboard", path: "/admin/dashboard", icon: Shield },
  ],
};

/**
 * Sidebar — fixed left nav with role-based links and collapse toggle.
 * Reads role directly from AuthContext — no currentRole prop needed.
 * @param {{ isCollapsed: boolean, toggleCollapse: () => void, mobileOpen?: boolean }} props
 */
export default function Sidebar({ isCollapsed, toggleCollapse, mobileOpen = false }) {
  const { user } = useAuth();
  const links = NAV[user?.role] ?? [];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#f8fafc] border-r border-[#e2e8f0] flex flex-col z-40 transition-all duration-200
        ${isCollapsed ? "w-16" : "w-60"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center border-b border-[#e2e8f0] px-4 gap-2.5 overflow-hidden">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Layers size={15} className="text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-sm font-bold text-gray-900 tracking-tight whitespace-nowrap">
            LMS
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {links.map(({ label, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
                title={isCollapsed ? label : undefined}
              >
                <Icon size={17} className="flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[#e2e8f0] p-2">
        <button
          id="sidebar-collapse-btn"
          onClick={toggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!isCollapsed && (
            <span className="ml-2 text-xs text-gray-400">Collapse</span>
          )}
        </button>
      </div>
    </aside>
  );
}
