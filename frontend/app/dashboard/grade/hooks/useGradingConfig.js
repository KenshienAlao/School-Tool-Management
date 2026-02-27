"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/app/lib/api";

export function useGradingConfig(sectionId) {
  const [columns, setColumns] = useState([]);
  const [categoryWeights, setCategoryWeights] = useState({});
  const [manualGrades, setManualGrades] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get(`/api/sections`);
        const section = res.data.data.sections.find(
          (s) => s.section_id === parseInt(sectionId),
        );
        if (section && section.grading_config) {
          const config =
            typeof section.grading_config === "string"
              ? JSON.parse(section.grading_config)
              : section.grading_config;

          const priority = [
            "Performance Task",
            "Quiz",
            "Recitation",
            "Group Project",
            "Exam",
          ];

          const sortedCols = (config.columns || []).sort((a, b) => {
            const typeA = priority.indexOf(a.type);
            const typeB = priority.indexOf(b.type);
            if (typeA !== typeB) {
              if (typeA === -1) return 1;
              if (typeB === -1) return -1;
              return typeA - typeB;
            }
            return a.label.localeCompare(b.label, undefined, {
              numeric: true,
            });
          });

          setColumns(sortedCols);
          setCategoryWeights(config.categoryWeights || {});
          setManualGrades(config.manualGrades || {});
        }
      } catch (err) {
        console.error("Error fetching grading config:", err);
      }
    };
    if (sectionId) fetchConfig();
  }, [sectionId]);

  const saveConfig = useCallback(
    async (newCols, newWeights, newManual) => {
      try {
        await api.put(`/api/sections/${sectionId}`, {
          grading_config: {
            columns: newCols || columns,
            categoryWeights: newWeights || categoryWeights,
            manualGrades: newManual || manualGrades,
          },
        });
      } catch (err) {
        console.error("Error saving grading config:", err);
      }
    },
    [sectionId, columns, categoryWeights, manualGrades],
  );

  return {
    columns,
    setColumns,
    categoryWeights,
    setCategoryWeights,
    manualGrades,
    setManualGrades,
    saveConfig,
  };
}
