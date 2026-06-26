import { useState, useEffect, useCallback } from "react";
import {
  getMyRequests,
  getMyBalances,
  applyLeave as applyLeaveApi,
} from "../api/leaveApi";

/**
 * Hook that loads the current employee's leave requests and balance summary.
 * Also exposes an `applyLeave` action that posts a new request and refreshes.
 */
export function useLeaves() {
  const [requests, setRequests] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchAll = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getMyRequests(), getMyBalances()])
      .then(([reqRes, balRes]) => {
        setRequests(reqRes.data);
        setBalances(balRes.data);
      })
      .catch((e) =>
        setError(e.response?.data?.message || "Failed to load leave data.")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  /**
   * Submit a new leave application. Returns { success, message }.
   * Callers can await this and show a toast based on the result.
   */
  const applyLeave = async (formData) => {
    try {
      await applyLeaveApi(formData);
      fetchAll(); // refresh list & balances
      return { success: true };
    } catch (e) {
      return {
        success: false,
        message: e.response?.data?.message || "Failed to submit leave request.",
      };
    }
  };

  return { requests, balances, loading, error, refresh: fetchAll, applyLeave };
}
