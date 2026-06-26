/**
 * StatCard — summary card with big number, icon, and subtitle.
 * @param {{ title: string, value: string|number, subtitle: string, icon: React.ElementType, color: string }} props
 */
export default function StatCard({ title, value, subtitle, icon: Icon, color = "text-primary" }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {Icon && (
          <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
