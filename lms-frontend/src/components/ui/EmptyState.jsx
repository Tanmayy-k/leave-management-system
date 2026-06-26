import { Inbox } from "lucide-react";

/**
 * EmptyState — shown when a list/table has no data.
 * @param {{ message: string }} props
 */
export default function EmptyState({ message = "No data found." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Inbox size={40} strokeWidth={1.5} className="mb-3 text-gray-300" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
