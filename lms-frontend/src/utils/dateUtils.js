// Format "2025-08-01" → "01 Aug 2025"
export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Format ISO datetime → "01 Aug 2025, 10:30 AM"
export const formatDateTime = (dtStr) => {
  if (!dtStr) return "—";
  return new Date(dtStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
