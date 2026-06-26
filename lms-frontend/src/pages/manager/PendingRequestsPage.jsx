import { useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Toast from "../../components/ui/Toast";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useManagerLeaves } from "../../hooks/useManagerLeaves";
import { formatDate } from "../../utils/dateUtils";

export default function PendingRequestsPage() {
  const { requests, loading, actionLoading, approve, reject } =
    useManagerLeaves("pending");

  const [toast, setToast] = useState(null);

  // Approve modal state
  const [approveTarget, setApproveTarget] = useState(null); // id

  // Reject modal state
  const [rejectTarget, setRejectTarget]   = useState(null); // id
  const [rejectReason, setRejectReason]   = useState("");

  /* ── Handlers ── */
  const handleApproveConfirm = async () => {
    const result = await approve(approveTarget);
    setApproveTarget(null);
    setToast({
      message: result.success ? "Leave approved successfully." : result.message,
      type: result.success ? "success" : "error",
    });
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) return;
    const result = await reject(rejectTarget, rejectReason);
    setRejectTarget(null);
    setRejectReason("");
    setToast({
      message: result.success ? "Leave rejected." : result.message,
      type: result.success ? "success" : "error",
    });
  };

  return (
    <div>
      <PageHeader
        title="Pending Requests"
        subtitle="Review and action leave requests awaiting your decision"
      />

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            Loading…
          </div>
        ) : requests.length === 0 ? (
          <EmptyState message="No pending requests — your team is all caught up!" />
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
                <th className="text-left px-5 py-3 font-medium">Actions</th>
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
                    <div className="flex items-center gap-2">
                      <button
                        id={`approve-btn-${req.id}`}
                        onClick={() => setApproveTarget(req.id)}
                        disabled={actionLoading}
                        className="inline-flex items-center px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors border border-green-200 disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        id={`reject-btn-${req.id}`}
                        onClick={() => { setRejectTarget(req.id); setRejectReason(""); }}
                        disabled={actionLoading}
                        className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Approve confirmation modal */}
      {approveTarget !== null && (
        <ConfirmModal
          title="Approve Leave Request"
          message="Are you sure you want to approve this leave request? This action cannot be undone."
          confirmLabel="Approve"
          confirmClass="bg-green-600 hover:bg-green-700 text-white"
          loading={actionLoading}
          onConfirm={handleApproveConfirm}
          onCancel={() => setApproveTarget(null)}
        />
      )}

      {/* Reject confirmation modal with reason */}
      {rejectTarget !== null && (
        <ConfirmModal
          title="Reject Leave Request"
          message="Please provide a reason for rejecting this leave request."
          confirmLabel="Reject"
          confirmClass="bg-red-600 hover:bg-red-700 text-white"
          showReason
          reason={rejectReason}
          onReasonChange={setRejectReason}
          loading={actionLoading}
          onConfirm={handleRejectConfirm}
          onCancel={() => { setRejectTarget(null); setRejectReason(""); }}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
