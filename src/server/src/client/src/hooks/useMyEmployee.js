import { useState, useEffect, useCallback } from "react";
import { getAllEmployees } from "../services/employeeService";
import { useAuth } from "../context/AuthContext";

/**
 * Resolves the logged-in user's Employee record.
 * The getAllEmployees API returns: { success, data: { employees: [...], totalEmployees, ... } }
 * Matching strategy (priority order):
 *   1. email match (exact, case-insensitive)
 *   2. username exactly matches firstName
 *   3. username exactly matches lastName
 *   4. username is substring of full name (or vice versa)
 */
export const useMyEmployee = () => {
  const { user } = useAuth();
  const [myEmployee, setMyEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolve = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch all employees (large limit to ensure we get the right person)
      const res = await getAllEmployees({ limit: 500 });
      // Response shape: res.data.employees (from getAllEmployees service which returns response.data)
      const list = res?.data?.employees || res?.employees || [];

      if (list.length === 0) {
        setMyEmployee(null);
        setLoading(false);
        return;
      }

      const userEmail = user.email?.toLowerCase()?.trim();
      const userName = user.username?.toLowerCase()?.trim();

      let matched = null;

      // 1. Email match — most reliable
      if (userEmail) {
        matched = list.find((e) => e.email?.toLowerCase()?.trim() === userEmail);
      }

      // 2. Username exactly equals firstName
      if (!matched && userName) {
        matched = list.find((e) => e.firstName?.toLowerCase()?.trim() === userName);
      }

      // 3. Username exactly equals lastName
      if (!matched && userName) {
        matched = list.find((e) => e.lastName?.toLowerCase()?.trim() === userName);
      }

      // 4. Full name contains username (or username contains first name)
      if (!matched && userName) {
        matched = list.find((e) => {
          const fullName = `${e.firstName || ""} ${e.lastName || ""}`.toLowerCase().trim();
          const fn = e.firstName?.toLowerCase()?.trim() || "";
          return fullName.includes(userName) || (fn.length > 2 && userName.includes(fn));
        });
      }

      setMyEmployee(matched || null);
    } catch (err) {
      console.error("useMyEmployee: failed to resolve employee", err);
      setMyEmployee(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    resolve();
  }, [resolve]);

  return {
    myEmployee,
    myEmployeeId: myEmployee?._id || null,
    loading,
    refresh: resolve,
  };
};
