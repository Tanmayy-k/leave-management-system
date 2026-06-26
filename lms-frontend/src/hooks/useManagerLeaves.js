import { useState, useEffect, useCallback } from "react";
import {
  getPendingRequests,
  getAllRequests,
  approveLeave as approveApi,
  rejectLeave as rejectApi,
} from "../api/managerApi";

/**
 * Hook for the manager leave pages.
 * @param {"pending"|"all"} mode
 */
export function useManagerLeaves(mode = "pending") {
  const [requests, setRequests]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError]                 = useState(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    const call = mode === "all" ? getAllRequests() : getPendingRequests();
    call
      .then((r) => setRequests(r.data))
      .catch((e) =>
        setError(e.response?.data?.message || "Failed to load requests.")
      )
      .finally(() => setLoading(false));
  }, [mode]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  /**
   * Approve a leave request by id. Returns { success, message }.
   */
  const approve = async (id) => {
    setActionLoading(true);
    try {
      await approveApi(id);
      fetch(); // refresh list
      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Failed to approve request.",
      };
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Reject a leave request by id with a mandatory reason.
   * Returns { success, message }.
   */
  const reject = async (id, reason) => {
    setActionLoading(true);
    try {
      await rejectApi(id, reason);
      fetch(); // refresh list
      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Failed to reject request.",
      };
    } finally {
      setActionLoading(false);
    }
  };

  return { requests, loading, actionLoading, error, approve, reject, refresh: fetch };
}
