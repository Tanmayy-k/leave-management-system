import axiosInstance from "./axiosInstance";

export const getPendingRequests = () =>
  axiosInstance.get("/api/manager/leaves/pending");

export const getAllRequests = () =>
  axiosInstance.get("/api/manager/leaves/all");

export const approveLeave = (id) =>
  axiosInstance.put(`/api/manager/leaves/${id}/approve`, {});

export const rejectLeave = (id, rejectionReason) =>
  axiosInstance.put(`/api/manager/leaves/${id}/reject`, { rejectionReason });
