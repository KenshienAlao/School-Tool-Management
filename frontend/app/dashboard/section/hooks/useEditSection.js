"use client";

import { useState } from "react";

export function useEditSection(section, onUpdate) {
  const [isEditing, setIsEditing] = useState(false);

  const [editSchedule, setEditSchedule] = useState(section.schedule || {});
  const [editSectionName, setEditSectionName] = useState(section.sectionName);

  const handleSave = (data) => {
    const name = data?.sectionName ?? editSectionName;
    const sched = data?.schedule ?? editSchedule;
    if (name.trim()) {
      onUpdate({ sectionName: name.trim(), schedule: sched });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditSectionName(section.sectionName);
    setEditSchedule(section.schedule || {});
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    editSchedule,
    setEditSchedule,
    editSectionName,
    setEditSectionName,
    handleSave,
    handleCancel,
  };
}
