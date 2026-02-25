"use client";

import { useState } from "react";

export function useEditSection(section, onUpdate) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [editSchedule, setEditSchedule] = useState(section.schedule || {});
  const [editSectionName, setEditSectionName] = useState(section.sectionName);

  const handleSave = () => {
    if (editSectionName.trim()) {
      onUpdate({
        sectionName: editSectionName.trim(),
        schedule: editSchedule,
      });
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
    isOpen,
    setIsOpen,
    editSchedule,
    setEditSchedule,
    editSectionName,
    setEditSectionName,
    handleSave,
    handleCancel,
  };
}
