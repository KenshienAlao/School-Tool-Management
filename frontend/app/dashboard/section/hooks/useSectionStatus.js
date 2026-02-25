"use client";

import { useMemo, useCallback } from "react";
import { dayOrder } from "@/app/data/dayOrder";

export function useSectionStatus(sections, groupedSections) {
  const getScheduleStatus = useCallback((sectionSchedule) => {
    const now = new Date();
    const currentDay = dayOrder[now.getDay() === 0 ? 6 : now.getDay() - 1];
    const currentTimeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const safeSchedule = sectionSchedule || {};
    const hasAnyClasses = Object.values(safeSchedule).some(
      (times) => times && times.length > 0,
    );
    if (!hasAnyClasses) return "No Classes";

    const todayClasses = safeSchedule[currentDay] || [];
    let hasUpcomingToday = false;
    for (const range of todayClasses) {
      const [start, end] = range.split("-");
      if (currentTimeStr >= start && currentTimeStr <= end) return "Ongoing";
      if (start > currentTimeStr) hasUpcomingToday = true;
    }

    if (hasUpcomingToday) return "Upcoming";

    const currentDayIdx = dayOrder.indexOf(currentDay);
    for (let i = currentDayIdx + 1; i < dayOrder.length; i++) {
      const nextDay = dayOrder[i];
      if (safeSchedule[nextDay] && safeSchedule[nextDay].length > 0)
        return "Upcoming";
    }

    return "No Classes";
  }, []);

  const summaryCounts = useMemo(() => {
    const counts = { Ongoing: 0, Upcoming: 0, "No Classes": 0 };
    sections.forEach((section) => {
      const status = getScheduleStatus(section.schedule);
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    return counts;
  }, [sections, getScheduleStatus]);

  const getFilteredSections = useCallback(
    (filter) => {
      if (filter === "All") return groupedSections;

      const filtered = {};
      Object.keys(groupedSections).forEach((course) => {
        const matches = groupedSections[course].filter((section) => {
          const status = getScheduleStatus(section.schedule);
          return status === filter;
        });
        if (matches.length > 0) {
          filtered[course] = matches;
        }
      });
      return filtered;
    },
    [groupedSections, getScheduleStatus],
  );

  return { getScheduleStatus, summaryCounts, getFilteredSections };
}
