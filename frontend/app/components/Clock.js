"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setTime(new Date());

    // update immediately
    updateTime();

    // calculate delay until next minute
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;

    // first timeout to sync at the start of the next minute
    const timeout = setTimeout(() => {
      updateTime();

      // then update every full minute
      const interval = setInterval(updateTime, 60 * 1000);
      // store interval id in ref to clear later
      window.__clockInterval = interval;
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(window.__clockInterval);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });

  const formattedDate = time.toLocaleDateString("en-PH", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Manila",
  });

  return (
    <div className="flex flex-col items-start sm:items-end">
      <div className="flex items-center gap-2 rounded-xl px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span className="font-mono text-lg font-bold tracking-tight">
          {formattedTime}
        </span>
      </div>
      <span className="mt-1 px-1 text-xs font-medium">{formattedDate}</span>
    </div>
  );
}
