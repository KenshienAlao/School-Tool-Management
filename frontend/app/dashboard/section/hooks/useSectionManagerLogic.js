"use client";

import { useState, useMemo, useCallback } from "react";
import { useSectionStatus } from "./useSectionStatus";

export function useSectionManagerLogic(sections, groupedSections, addSection) {
  const [isAdding, setIsAdding] = useState(false);
  const [scheduleFilter, setScheduleFilter] = useState("All");

  const { summaryCounts, getFilteredSections } = useSectionStatus(
    sections,
    groupedSections,
  );

  const filteredGroupedSections = useMemo(
    () => getFilteredSections(scheduleFilter),
    [getFilteredSections, scheduleFilter, groupedSections],
  );

  const handleAddSubmit = useCallback(
    (sectionData) => {
      addSection(sectionData);
      setIsAdding(false);
    },
    [addSection],
  );

  const toggleAdding = useCallback(() => {
    setIsAdding((prev) => !prev);
  }, []);

  return {
    isAdding,
    setIsAdding,
    toggleAdding,
    scheduleFilter,
    setScheduleFilter,
    summaryCounts,
    filteredGroupedSections,
    handleAddSubmit,
  };
}
