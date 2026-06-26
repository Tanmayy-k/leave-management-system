import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

/**
 * AppShell — root layout for authenticated pages.
 * Manages sidebar collapse state (desktop) and mobile overlay state.
 */
export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile overlay — click backdrop to close sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — overlays on mobile, fixed at left on desktop */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
      />

      {/* Topbar — always full-width; hamburger triggers mobile sidebar */}
      <Topbar
        isCollapsed={isCollapsed}
        onMenuClick={() => setMobileOpen((p) => !p)}
      />

      {/* Main content
          - Mobile: no left margin (sidebar overlays, doesn't push)
          - Desktop md+: margin-left matches sidebar width */}
      <main
        className={`pt-16 min-h-screen transition-all duration-200 ${
          isCollapsed ? "md:ml-16" : "md:ml-60"
        }`}
      >
        <div className="p-6 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
