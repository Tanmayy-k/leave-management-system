import { useEffect, useState } from "react";

/**
 * Self-dismissing toast notification. No external library needed.
 * @param {{ message: string, type?: "success"|"error", onClose?: () => void }} props
 */
export default function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!visible) return null;

  const colors =
    type === "success"
      ? "bg-green-50 border-green-400 text-green-800"
      : "bg-red-50 border-red-400 text-red-800";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium shadow-sm ${colors}`}
      role="alert"
    >
      {message}
    </div>
  );
}

// Usage: {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
