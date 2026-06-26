import { Clock, List } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { useManagerLeaves } from "../../hooks/useManagerLeaves";
import { formatDate } from "../../utils/dateUtils";

export default function ManagerDashboard() {
  // Fetch pending requests for the live preview and derive stat counts
  const { requests: pending, loading: pendingLoading } = useManagerLeaves("pending");
  const { requests: all, loading: allLoading } = useManagerLeaves("all");

  const pendingCount = pendingLoading ? "—" : pending.length;
  const totalCount   = allLoading    ? "—" : all.length;

  // Show only top 5 pending on the dashboard preview
  const preview = pending.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Manager Dashboard"
        subtitle="Overview of your team's leave activity"
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Awaiting action"
          icon={Clock}
          color="text-yellow-500"
        />
        <StatCard
          title="Total Requests"
          value={totalCount}
          subtitle="All time"
          icon={List}
          color="text-primary"
        />
      </div>

      {/* Pending requests preview */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Recent Pending Requests</h2>
          <Link to="/manager/pending" className="text-xs text-primary hover:underline">
            View all
          </Link>
        </div>

        {pendingLoading ? (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            Loading…
          </div>
        ) : preview.length === 0 ? (
          <EmptyState message="No pending requests — your team is all caught up!" />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Employee</th>
                <th className="text-left px-5 py-3 font-medium">Type</th>
                <th className="text-left px-5 py-3 font-medium">From</th>
                <th className="text-left px-5 py-3 font-medium">To</th>
                <th className="text-left px-5 py-3 font-medium">Days</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {preview.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{req.employeeName ?? req.employee}</td>
                  <td className="px-5 py-3.5 text-gray-600">{req.leaveType ?? req.type}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(req.startDate ?? req.from)}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(req.endDate ?? req.to)}</td>
                  <td className="px-5 py-3.5 text-gray-700">{req.numberOfDays ?? req.days}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status="PENDING" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
