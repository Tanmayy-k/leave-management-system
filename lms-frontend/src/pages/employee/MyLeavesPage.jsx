import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { useLeaves } from "../../hooks/useLeaves";
import { formatDate } from "../../utils/dateUtils";

export default function MyLeavesPage() {
  const { requests, loading, error } = useLeaves();

  return (
    <div>
      <PageHeader
        title="My Leave Requests"
        subtitle="All leave requests you have submitted"
      />

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            Loading…
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-sm text-red-500">
            {error}
          </div>
        ) : requests.length === 0 ? (
          <EmptyState message="You haven't submitted any leave requests yet." />
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
                <th className="text-left px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-700 font-medium">{leave.leaveType ?? leave.type}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(leave.startDate ?? leave.from)}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(leave.endDate ?? leave.to)}</td>
                  <td className="px-5 py-3.5 text-gray-700">{leave.numberOfDays ?? leave.days}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={leave.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/employee/leaves/${leave.id}`}
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark font-medium"
                    >
                      <Eye size={13} />
                      View
                    </Link>
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
