import axios from "axios";
import { getToken, clearAuth } from "../utils/tokenUtils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor ──────────────────────────────────────────────────────
// Attach JWT Bearer token to every outgoing request if one exists in storage.
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
// On 401 Unauthorized, wipe local auth state and hard-redirect to /login.
// This handles token expiry or revocation transparently for all API calls.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
