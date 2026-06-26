import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, User, FileText, Tag } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import { getLeaveById } from "../../api/leaveApi";
import { formatDate, formatDateTime } from "../../utils/dateUtils";

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={15} className="text-gray-400" />
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value ?? "—"}</p>
      </div>
    </div>
  );
}

export default function LeaveDetailPage() {
  const { id } = useParams();
  const [leave, setLeave]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getLeaveById(id)
      .then((res) => setLeave(res.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Failed to load leave details.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      {/* Back link */}
      <Link
        to="/employee/my-leaves"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to My Leaves
      </Link>

      {loading && (
        <div className="flex items-center justify-center py-20 text-sm text-gray-400">
          Loading…
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20 text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && leave && (
        <>
          <div className="flex items-start justify-between mb-6">
            <PageHeader
              title="Leave Request Details"
              subtitle={`Request ID: #${id} · Applied on ${formatDateTime(leave.appliedOn ?? leave.createdAt)}`}
            />
            <StatusBadge status={leave.status} />
          </div>

          <div className="max-w-lg border border-gray-200 rounded-xl p-1 bg-white divide-y divide-gray-100">
            <DetailRow icon={User}        label="Employee"    value={leave.employeeName ?? leave.employee} />
            <DetailRow icon={Tag}         label="Leave Type"  value={leave.leaveType ?? leave.type} />
            <DetailRow icon={CalendarDays} label="From"       value={formatDate(leave.startDate ?? leave.from)} />
            <DetailRow icon={CalendarDays} label="To"         value={formatDate(leave.endDate ?? leave.to)} />
            <DetailRow
              icon={Clock}
              label="Duration"
              value={`${leave.numberOfDays ?? leave.days ?? "—"} day${(leave.numberOfDays ?? leave.days) > 1 ? "s" : ""}`}
            />
            <DetailRow icon={FileText}    label="Reason"      value={leave.reason} />
            <DetailRow icon={User}        label="Approved By" value={leave.approvedBy ?? leave.reviewedBy} />
            <DetailRow icon={FileText}    label="Comments"    value={leave.rejectionReason ?? leave.comments} />
          </div>
        </>
      )}
    </div>
  );
}
