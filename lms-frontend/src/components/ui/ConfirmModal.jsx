/**
 * Approve / Reject confirmation modal with optional rejection reason textarea.
 * @param {{
 *   title: string,
 *   message: string,
 *   onConfirm: () => void,
 *   onCancel: () => void,
 *   showReason?: boolean,
 *   reason?: string,
 *   onReasonChange?: (value: string) => void,
 *   confirmLabel?: string,
 *   confirmClass?: string,
 *   loading?: boolean,
 * }} props
 */
export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  showReason = false,
  reason = "",
  onReasonChange,
  confirmLabel = "Confirm",
  confirmClass = "bg-primary hover:bg-primary-dark text-white",
  loading = false,
}) {
  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-6 shadow-lg">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{message}</p>

        {/* Optional rejection reason */}
        {showReason && (
          <div className="mb-4">
            <label
              htmlFor="modal-reason"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              id="modal-reason"
              rows={3}
              value={reason}
              onChange={(e) => onReasonChange?.(e.target.value)}
              placeholder="Provide a reason for rejection…"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading || (showReason && !reason.trim())}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${confirmClass}`}
          >
            {loading ? "Processing…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
