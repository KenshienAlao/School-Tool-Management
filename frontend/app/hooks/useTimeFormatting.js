"use client";

import { useCallback } from "react";

export function useTimeFormatting() {
  const formatTime12hr = useCallback((time24) => {
    if (!time24) return "";
    const [hour, min] = time24.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return min === "00" ? `${h}${ampm}` : `${h}:${min}${ampm}`;
  }, []);

  const formatTimeRange = useCallback(
    (rangeText) => {
      if (!rangeText || !rangeText.includes("-")) return rangeText;
      const [start, end] = rangeText.split("-");
      const formattedStart = formatTime12hr(start);
      const formattedEnd = formatTime12hr(end);
      return `${formattedStart}–${formattedEnd}`;
    },
    [formatTime12hr],
  );

  return { formatTime12hr, formatTimeRange };
}
