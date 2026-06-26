import { LogOut, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Maps path segments to readable page titles
const PAGE_TITLES = {
  dashboard:   "Dashboard",
  apply:       "Apply for Leave",
  "my-leaves": "My Leave Requests",
  leaves:      "Leave Details",
  pending:     "Pending Requests",
  all:         "All Requests",
};

// Must stay in sync with Sidebar.jsx Tailwind width classes:
//   expanded  → w-60 = 240 px
//   collapsed → w-16 = 64 px
const SIDEBAR_EXPANDED  = 240;
const SIDEBAR_COLLAPSED = 64;

/**
 * Topbar — fixed top bar.
 *
 * Layout contract
 * ───────────────
 * Desktop (≥ md):
 *   • header `left` = sidebar width  →  header starts exactly where sidebar ends
 *   • page title is the first visible element, never behind the sidebar
 *
 * Mobile (< md):
 *   • header `left` = 0  →  header spans full width
 *   • sidebar overlays content (doesn't push); hamburger opens it
 *
 * Using a window.innerWidth check would be unreliable (SSR / resize).
 * Instead we use a CSS custom property injected on the wrapper div which is
 * toggled via Tailwind's responsive variant — giving us a JS-controlled value
 * that respects the breakpoint without a JS media-query listener.
 *
 * Simpler equivalent: two nested divs — one `md:hidden` mobile bar, one
 * `hidden md:flex` desktop bar. We use the single-bar approach with a
 * CSS-variable to keep the DOM lean.
 */
export default function Topbar({ isCollapsed, onMenuClick }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const segments  = location.pathname.split("/").filter(Boolean);
  const lastSeg   = segments[segments.length - 1] ?? "dashboard";
  const pageTitle = PAGE_TITLES[lastSeg] ?? "Leave Management";

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";
  const displayName = user?.name ?? user?.email ?? "User";

  // On desktop the header's left edge must sit at the sidebar's right edge.
  // On mobile the sidebar overlays content so the header spans full width (left=0).
  // We achieve this by rendering two separate <header> elements:
  //   1. A mobile bar  (md:hidden) — left:0, contains hamburger
  //   2. A desktop bar (hidden md:flex) — left=sidebarWidth, no hamburger
  // Both are z-30. This is the most reliable approach with Tailwind.

  const desktopLeft = isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  const rightSection = (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold select-none">
        {initials}
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-gray-800 leading-none">{displayName}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {user?.role?.replace("ROLE_", "") ?? ""}
        </p>
      </div>
      <button
        id="topbar-logout-btn"
        onClick={logout}
        className="ml-2 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        title="Logout"
      >
        <LogOut size={16} />
      </button>
    </div>
  );

  return (
    <>
      {/* ── Mobile Topbar (< md) ────────────────────────────────────
          Spans full width (left:0 right:0). Hamburger opens sidebar overlay. */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            id="topbar-hamburger-btn"
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={onMenuClick}
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-gray-600">{pageTitle}</span>
        </div>
        {rightSection}
      </header>

      {/* ── Desktop Topbar (≥ md) ────────────────────────────────────
          left = sidebar width so the header never overlaps the sidebar.
          Transitions smoothly when sidebar collapses/expands. */}
      <header
        className="hidden md:flex fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-30 items-center justify-between px-6 transition-all duration-200"
        style={{ left: desktopLeft }}
      >
        <span className="text-sm font-medium text-gray-600">{pageTitle}</span>
        {rightSection}
      </header>
    </>
  );
}
