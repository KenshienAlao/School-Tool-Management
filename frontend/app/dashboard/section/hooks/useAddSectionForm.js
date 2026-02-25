"use client";

import { useState } from "react";

export function useAddSectionForm(onSubmit) {
  const [courseName, setCourseName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [schedule, setSchedule] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseName.trim() && sectionName.trim()) {
      onSubmit({
        courseName: courseName.trim(),
        sectionName: sectionName.trim(),
        schedule,
      });
      setCourseName("");
      setSectionName("");
      setSchedule({});
    }
  };

  return {
    courseName,
    setCourseName,
    sectionName,
    setSectionName,
    schedule,
    setSchedule,
    handleSubmit,
  };
}
