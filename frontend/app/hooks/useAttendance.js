"use client";

import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "@/app/lib/services/attendanceService";
export function useAttendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const attendanceData = await attendanceService.getAttendance();
      setData(attendanceData);
    } catch (err) {
      console.error("Failed to fetch attendance:", err); //checking
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { data, loading, error, refresh: fetchAttendance };
}
