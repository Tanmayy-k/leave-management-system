import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import { useManagerLeaves } from "../../hooks/useManagerLeaves";
import { formatDate } from "../../utils/dateUtils";

export default function AllRequestsPage() {
  const { requests, loading, error } = useManagerLeaves("all");

  return (
    <div>
      <PageHeader
        title="All Requests"
        subtitle="Complete history of leave requests across your team"
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
          <EmptyState message="No leave requests found for your team." />
        ) : (
          <div className="overflow-x-auto">
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
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{req.employeeName ?? req.employee}</td>
                  <td className="px-5 py-3.5 text-gray-600">{req.leaveType ?? req.type}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(req.startDate ?? req.from)}</td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(req.endDate ?? req.to)}</td>
                  <td className="px-5 py-3.5 text-gray-700">{req.numberOfDays ?? req.days}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={req.status} />
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
