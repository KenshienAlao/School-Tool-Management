import { useState } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { ScheduleInput } from "./ScheduleInput";
import { FormInput } from "./ui/formInput";

export function SectionModal({ onClose, onSubmit, initialData }) {
  const isEditing = !!initialData;

  const [courseName, setCourseName] = useState(initialData?.courseName || "");
  const [sectionName, setSectionName] = useState(
    initialData?.sectionName || "",
  );
  const [schedule, setSchedule] = useState(initialData?.schedule || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim() || !sectionName.trim()) return;
    onSubmit({
      courseName: courseName.trim(),
      sectionName: sectionName.trim(),
      schedule,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="modal-content max-w-xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 text-brand-primary flex h-10 w-10 items-center justify-center rounded-xl">
                  {isEditing ? (
                    <Edit2 size={20} strokeWidth={2.5} />
                  ) : (
                    <Plus size={20} strokeWidth={3} />
                  )}
                </div>
                <h2 className="text-text-primary text-2xl font-black tracking-tight">
                  {isEditing ? "Edit Section" : "Add Section"}
                </h2>
              </div>
              {isEditing && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-text-secondary text-[10px] font-black tracking-widest uppercase opacity-40">
                    Academic Unit:
                  </span>
                  <span className="bg-brand-primary/10 text-brand-primary rounded-md px-2 py-0.5 text-[10px] font-black tracking-widest uppercase">
                    {courseName}
                  </span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-text-secondary hover:bg-surface-muted rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {!isEditing && (
                <FormInput
                  label="Course"
                  id="modal-course-name"
                  placeholder="e.g. BSIT"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              )}
              <FormInput
                label="Section"
                id="modal-section-name"
                placeholder="e.g. 1-C"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                required
              />
            </div>

            <div className="border-surface-muted bg-surface-muted/10 overflow-hidden rounded-3xl border">
              <div className="bg-surface-muted/20 border-surface-muted border-b px-6 py-3">
                <span className="text-text-secondary text-[10px] font-black tracking-widest uppercase opacity-50">
                  Schedule
                </span>
              </div>
              <ScheduleInput schedule={schedule} setSchedule={setSchedule} />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="border-surface-muted bg-surface-elevated text-text-secondary hover:bg-surface-muted flex-1 rounded-2xl border py-4 text-sm font-black transition-all active:scale-95"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                disabled={
                  !sectionName.trim() || (!isEditing && !courseName.trim())
                }
                className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary disabled:bg-brand-primary/30 flex-1 rounded-2xl py-4 text-sm font-black text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isEditing ? "Update Section" : "Save Section"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
