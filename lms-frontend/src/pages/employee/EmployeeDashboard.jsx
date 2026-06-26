import { CalendarDays, HeartPulse, TrendingUp, Layers, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { useLeaves } from "../../hooks/useLeaves";
import { formatDate } from "../../utils/dateUtils";
import { useAuth } from "../../contexts/AuthContext";

// Per-leave-type display config — icon, colour, display label
const LEAVE_TYPE_CONFIG = {
  CASUAL: {
    label: "Casual Leave",
    subtitle: "Remaining days",
    icon: CalendarDays,
    color: "text-primary",
  },
  SICK: {
    label: "Sick Leave",
    subtitle: "Remaining days",
    icon: HeartPulse,
    color: "text-rose-500",
  },
  EARNED: {
    label: "Earned Leave",
    subtitle: "Remaining days",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
};

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { requests, balances, loading } = useLeaves();

  // Look up a specific leave type from the API response array
  const getBalance = (type) =>
    balances.find((b) => b.leaveType === type);

  // Total remaining across all balance types
  const totalRemaining = balances.reduce((sum, b) => sum + (b.remainingDays ?? 0), 0);

  // Show only the 5 most recent requests on the dashboard
  const recent = [...requests]
    .sort((a, b) => new Date(b.appliedOn ?? b.startDate) - new Date(a.appliedOn ?? a.startDate))
    .slice(0, 5);

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${user?.name ?? "there"} 👋`}
      />

      {/* ── Leave Balance Cards ─────────────────────────────────────── */}
      {!loading && balances.length === 0 ? (
        // Empty state — no balances assigned yet
        <div className="flex items-start gap-3 p-4 mb-8 bg-amber-50 border border-amber-200 rounded-xl max-w-xl">
          <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">No leave balances assigned yet</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Please contact HR or your Admin to have your annual leave balances set up.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Row 1 — individual leave type cards: Casual · Sick · Earned */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {["CASUAL", "SICK", "EARNED"].map((type) => {
              const cfg     = LEAVE_TYPE_CONFIG[type];
              const balance = getBalance(type);
              return (
                <StatCard
                  key={type}
                  title={cfg.label}
                  value={loading ? "—" : (balance?.remainingDays ?? 0)}
                  subtitle={
                    loading
                      ? "Loading…"
                      : balance
                      ? `of ${balance.totalDays} allocated · ${balance.usedDays} used`
                      : "Not assigned"
                  }
                  icon={cfg.icon}
                  color={cfg.color}
                />
              );
            })}
          </div>

          {/* Row 2 — Total remaining + Pending */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <StatCard
              title="Total Remaining"
              value={loading ? "—" : totalRemaining}
              subtitle="Combined balance across all leave types"
              icon={Layers}
              color="text-indigo-500"
            />
            <StatCard
              title="Pending Requests"
              value={loading ? "—" : pendingCount}
              subtitle="Awaiting manager approval"
              icon={Clock}
              color="text-yellow-500"
            />
          </div>
        </>
      )}

      {/* ── Recent Leave Requests table ─────────────────────────────── */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Recent Leave Requests</h2>
          <Link to="/employee/my-leaves" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            Loading…
          </div>
        ) : recent.length === 0 ? (
          <EmptyState message="No leave requests yet. Apply for your first leave!" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-left px-5 py-3 font-medium">From</th>
                  <th className="text-left px-5 py-3 font-medium">To</th>
                  <th className="text-left px-5 py-3 font-medium">Days</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-700 font-medium">{leave.leaveType ?? leave.type}</td>
                    <td className="px-5 py-3.5 text-gray-500">{formatDate(leave.startDate ?? leave.from)}</td>
                    <td className="px-5 py-3.5 text-gray-500">{formatDate(leave.endDate ?? leave.to)}</td>
                    <td className="px-5 py-3.5 text-gray-700">{leave.numberOfDays ?? leave.days}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={leave.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
