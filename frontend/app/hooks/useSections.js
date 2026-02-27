"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import api from "@/app/lib/api";

export function useSections(options = { autoFetch: true }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(options.autoFetch);
  const [error, setError] = useState(null);

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/api/sections");
      if (data.success) {
        const mapped = (data.data?.sections || []).map((s) => {
          const config = s.grading_config || {};
          return {
            ...s,
            id: s.section_id,
            courseName: s.course_name,
            sectionName: s.section_name,
            schedule: config.schedule || {},
          };
        });
        setSections(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch sections:", err);
      setError(err.response?.data?.message || "Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.autoFetch) {
      fetchSections();
    }
  }, [options.autoFetch, fetchSections]);

  const addSection = useCallback(
    async (sectionData) => {
      try {
        const { data } = await api.post("/api/sections", {
          section_name: sectionData.sectionName,
          course_id: sectionData.course_id,
          grading_config: {
            ...(sectionData.grading_config || {
              columns: [],
              categoryWeights: {},
            }),
            schedule: sectionData.schedule || {},
          },
        });

        if (data.success) {
          fetchSections();
          return true;
        }
      } catch (err) {
        console.error("Failed to add section:", err);
      }
      return false;
    },
    [fetchSections],
  );

  const updateSection = useCallback(
    async (id, updatedFields) => {
      try {
        const payload = {};
        if (updatedFields.sectionName)
          payload.section_name = updatedFields.sectionName;
        if (updatedFields.course_id)
          payload.course_id = updatedFields.course_id;

        if (updatedFields.grading_config || updatedFields.schedule) {
          const existing = sections.find((s) => s.id === id);
          payload.grading_config = {
            ...(existing?.grading_config || {}),
            ...(updatedFields.grading_config || {}),
            schedule: updatedFields.schedule || existing?.schedule || {},
          };
        }

        const { data } = await api.put(`/api/sections/${id}`, payload);
        if (data.success) {
          fetchSections();
          return true;
        }
      } catch (err) {
        console.error("Failed to update section:", err);
      }
      return false;
    },
    [sections, fetchSections],
  );

  const deleteSection = useCallback(
    async (id) => {
      try {
        await api.delete(`/api/sections/${id}`);
        setSections((prev) => prev.filter((sec) => sec.id !== id));
        return true;
      } catch (err) {
        console.error("Failed to delete section:", err);
        fetchSections();
      }
      return false;
    },
    [fetchSections],
  );

  const groupedSections = useMemo(() => {
    return sections.reduce((acc, current) => {
      const cName = current.courseName || "Unknown Course";
      if (!acc[cName]) {
        acc[cName] = [];
      }
      acc[cName].push(current);
      return acc;
    }, {});
  }, [sections]);

  return {
    sections,
    setSections,
    loading,
    setLoading,
    error,
    fetchSections,
    addSection,
    updateSection,
    deleteSection,
    groupedSections,
    refresh: fetchSections,
  };
}
