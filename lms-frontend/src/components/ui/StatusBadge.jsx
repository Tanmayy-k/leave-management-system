import { STATUS_COLORS } from "../../utils/constants";

/**
 * StatusBadge — renders a pill-shaped badge for a given leave status.
 * @param {{ status: string }} props
 */
export default function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
}
