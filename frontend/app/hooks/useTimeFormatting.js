"use client";

import { useCallback, useEffect, useState } from "react";

export function useTimeFormatting() {
  const [currentTime, setCurrentTime] = useState("");

  const formatTime12hr = useCallback((time24) => {
    if (!time24) return "";
    const [hour, min] = time24.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return min === "00" ? `${h}${ampm}` : `${h}:${min}${ampm}`;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time24 = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      setCurrentTime(formatTime12hr(time24));
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [formatTime12hr]);

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

  return { formatTime12hr, formatTimeRange, currentTime };
}
