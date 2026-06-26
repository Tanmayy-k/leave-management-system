/**
 * LoadingSpinner — full-page centered spinner for route-level loading.
 * @param {{ message?: string }} props
 */
export default function LoadingSpinner({ message = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Spinning ring */}
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-primary animate-spin" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
