"use client";
// react hooks
import { useState, useEffect } from "react";
// icons
import { ClockIcon } from "@/app/components/ui/icons";

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
        <ClockIcon size={24} />
        <span className="font-mono text-lg font-bold tracking-tight">
          {formattedTime}
        </span>
      </div>
      <span className="mt-1 px-1 text-xs font-medium">{formattedDate}</span>
    </div>
  );
}
