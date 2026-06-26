import { useState } from "react";
import { Layers } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email,    setEmail   ] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">LMS</span>
        </div>

        {/* Hero text */}
        <div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage leaves<br />effortlessly.
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            A modern leave management platform built for teams that move fast.
            Apply, approve, and track in seconds.
          </p>
        </div>

        {/* Footer */}
        <p className="text-blue-300 text-xs">© 2026 LMS · All rights reserved</p>
      </div>

      {/* ── Right panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Layers size={15} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">LMS</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className={`w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-primary-dark"
              }`}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            Need help?{" "}
            <button type="button" className="text-primary hover:underline">
              Contact your HR admin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
