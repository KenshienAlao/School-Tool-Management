"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/app/lib/api";

export function useCourses(options = { autoFetch: true }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(options.autoFetch);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/api/courses");
      if (data.success) {
        setCourses(data.data?.courses || []);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError(err.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.autoFetch) {
      fetchCourses();
    }
  }, [options.autoFetch, fetchCourses]);

  const addCourse = useCallback(
    async (courseName) => {
      try {
        const { data } = await api.post("/api/courses", {
          course_name: courseName,
        });
        if (data.success) {
          fetchCourses();
          return data;
        }
      } catch (err) {
        console.error("Failed to add course:", err);
      }
      return null;
    },
    [fetchCourses],
  );

  return {
    courses,
    setCourses,
    loading,
    setLoading,
    error,
    fetchCourses,
    addCourse,
    refresh: fetchCourses,
  };
}
