import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Toast from "../../components/ui/Toast";
import { useLeaves } from "../../hooks/useLeaves";
import { LEAVE_TYPES } from "../../utils/constants";

const EMPTY_FORM = { leaveType: "", startDate: "", endDate: "", reason: "" };

export default function ApplyLeavePage() {
  const { applyLeave } = useLeaves();
  const navigate = useNavigate();

  const [form, setForm]       = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]     = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleClear = () => setForm(EMPTY_FORM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.leaveType || !form.startDate || !form.endDate || !form.reason.trim()) {
      setToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }
    if (new Date(form.startDate) > new Date(form.endDate)) {
      setToast({ message: "Start date cannot be after end date.", type: "error" });
      return;
    }

    setSubmitting(true);
    const result = await applyLeave(form);
    setSubmitting(false);

    if (result.success) {
      setToast({ message: "Leave request submitted successfully!", type: "success" });
      setForm(EMPTY_FORM);
      // Navigate to my leaves after a short delay so the user sees the toast
      setTimeout(() => navigate("/employee/my-leaves"), 1500);
    } else {
      setToast({ message: result.message, type: "error" });
    }
  };

  return (
    <div>
      <PageHeader
        title="Apply for Leave"
        subtitle="Fill in the details below to submit a leave request"
      />

      <div className="max-w-lg">
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Leave Type */}
            <div>
              <label htmlFor="apply-leave-type" className="block text-sm font-medium text-gray-700 mb-1.5">
                Leave Type
              </label>
              <select
                id="apply-leave-type"
                name="leaveType"
                value={form.leaveType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
              >
                <option value="">Select a type…</option>
                {LEAVE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="apply-start-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start Date
                </label>
                <input
                  id="apply-start-date"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="apply-end-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  End Date
                </label>
                <input
                  id="apply-end-date"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="apply-reason" className="block text-sm font-medium text-gray-700 mb-1.5">
                Reason
              </label>
              <textarea
                id="apply-reason"
                name="reason"
                rows={4}
                value={form.reason}
                onChange={handleChange}
                placeholder="Briefly describe the reason for your leave…"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                id="apply-submit-btn"
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : "Submit Request"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={submitting}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

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
