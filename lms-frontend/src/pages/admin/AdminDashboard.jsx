import PageHeader from "../../components/layout/PageHeader";
import { Users, Settings, CalendarDays, Shield } from "lucide-react";

const cards = [
  {
    title: "User Management",
    desc: "Register employees, set roles, deactivate accounts",
    icon: Users,
    color: "blue",
  },
  {
    title: "Assign Manager",
    desc: "Link employees to their reporting manager",
    icon: Settings,
    color: "purple",
  },
  {
    title: "Leave Balance Management",
    desc: "Seed and adjust annual leave entitlements per employee",
    icon: CalendarDays,
    color: "green",
  },
  {
    title: "System Overview",
    desc: "Platform-wide statistics, audit logs, and health checks",
    icon: Shield,
    color: "gray",
  },
];

const colorMap = {
  blue:   "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  green:  "bg-green-50 text-green-600",
  gray:   "bg-gray-100 text-gray-500",
};

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="System-wide configuration and management"
      />

      {/* Module cards — Coming Soon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[c.color]}`}>
                  <Icon size={18} />
                </div>
                {/* Badge */}
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
                  Coming Soon
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Roadmap notice */}
      <div className="max-w-2xl border border-dashed border-gray-200 rounded-xl p-6">
        <p className="text-sm font-medium text-gray-600 mb-1">Admin API Roadmap</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          Admin management features are part of the backend roadmap. Employee
          registration, manager assignment, and leave balance seeding are
          currently performed directly via the database or Postman/Swagger.
        </p>
      </div>
    </div>
  );
}
