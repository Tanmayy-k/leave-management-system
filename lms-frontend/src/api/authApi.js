import axiosInstance from "./axiosInstance";

/**
 * loginApi — POST /api/auth/login
 * The request interceptor only attaches a token if one exists in storage,
 * so this call is safely unauthenticated on first visit.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<AxiosResponse<{ token: string, email: string, name: string, role: string }>>}
 */
export const loginApi = (email, password) =>
  axiosInstance.post("/api/auth/login", { email, password });
