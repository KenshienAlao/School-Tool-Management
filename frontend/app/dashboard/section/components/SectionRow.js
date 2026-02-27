"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// components
import { SectionModal } from "./SectionModal";
import { ScheduleModal } from "./ScheduleModal";
// hooks
import { useEditSection } from "../hooks/useEditSection";
// ui
import { Edit } from "./ui/editButton";
import { Delete } from "./ui/deleteButton";

export function SectionRow({ section, onUpdate, onDelete }) {
  const [showSchedule, setShowSchedule] = useState(false);

  const {
    isEditing,
    setIsEditing,
    editSchedule,
    setEditSchedule,
    editSectionName,
    setEditSectionName,
    handleSave,
    handleCancel,
  } = useEditSection(section, onUpdate);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="group bg-surface-elevated hover:border-brand-primary/30 border-surface-muted/50 flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:shadow-md"
      >
        <div
          className="flex flex-1 cursor-pointer items-center gap-5 overflow-hidden"
          onClick={() => setShowSchedule(true)}
        >
          <div className="bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:shadow-brand-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all group-hover:text-white group-hover:shadow-lg">
            <CalendarDays size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col truncate py-1">
            <p className="text-text-primary truncate text-base font-black tracking-tight uppercase">
              {section.sectionName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            title="View Weekly Schedule"
            onClick={() => setShowSchedule(true)}
            className="text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary rounded-xl p-2.5 transition-all active:scale-90"
          >
            <CalendarDays size={20} strokeWidth={2.5} />
          </button>
          <div className="bg-surface-muted mx-1 h-6 w-px opacity-50" />
          <div className="flex items-center">
            <Edit setIsEditing={setIsEditing} setIsOpen={() => {}} />
            <Delete onDelete={onDelete} />
          </div>
        </div>
      </motion.div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showSchedule && (
          <ScheduleModal
            section={section}
            onClose={() => setShowSchedule(false)}
          />
        )}
      </AnimatePresence>

      {/* Edit Section Modal */}
      <AnimatePresence>
        {isEditing && (
          <SectionModal
            initialData={{
              courseName: section.courseName,
              sectionName: editSectionName,
              schedule: editSchedule,
            }}
            onClose={handleCancel}
            onSubmit={(data) => {
              setEditSectionName(data.sectionName);
              setEditSchedule(data.schedule);
              handleSave(data);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
