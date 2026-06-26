import axiosInstance from "./axiosInstance";

export const getMyBalances = () =>
  axiosInstance.get("/api/employee/leaves/my-balances");

export const getMyRequests = () =>
  axiosInstance.get("/api/employee/leaves/my-requests");

export const getLeaveById = (id) =>
  axiosInstance.get(`/api/employee/leaves/${id}`);

export const applyLeave = (data) =>
  axiosInstance.post("/api/employee/leaves/apply", data);
