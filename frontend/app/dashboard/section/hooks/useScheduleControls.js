"use client";

import { useState } from "react";

export function useScheduleControls(setSchedule) {
  const [selectDay, setSelectDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddTime = () => {
    if (startTime && endTime) {
      setSchedule((prev) => ({
        ...prev,
        [selectDay]: [...(prev[selectDay] || []), `${startTime}-${endTime}`],
      }));
      setStartTime("");
      setEndTime("");
    }
  };

  const handleRemoveTime = (day, idx) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx),
    }));
  };

  return {
    selectDay,
    setSelectDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleAddTime,
    handleRemoveTime,
  };
}
