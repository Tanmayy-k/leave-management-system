import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUser, clearAuth, getToken, getUser } from "../utils/tokenUtils";
import { loginApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialise from localStorage so a page refresh keeps the user logged in.
  const [user,    setUser   ] = useState(getUser);
  const [token,   setToken  ] = useState(getToken);
  const [loading, setLoading] = useState(false);
  const [error,   setError  ] = useState(null);

  // useNavigate requires AuthProvider to be rendered inside a Router.
  // AppRouter places <AuthProvider> inside <BrowserRouter> — see AppRouter.jsx.
  const navigate = useNavigate();

  // ── login ──────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(email, password);
      const { token: jwt, email: userEmail, name, role } = res.data;
      const userData = { email: userEmail, name, role };

      // Persist to localStorage then sync React state.
      saveToken(jwt);
      saveUser(userData);
      setToken(jwt);
      setUser(userData);

      // Role-based redirect after successful login.
      if (role === "ROLE_MANAGER")      navigate("/manager/dashboard");
      else if (role === "ROLE_ADMIN")   navigate("/admin/dashboard");
      else                              navigate("/employee/dashboard");

    } catch (err) {
      const msg =
        err.response?.status === 403
          ? "Invalid email or password."
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    clearAuth();
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, error, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── useAuth hook ───────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
