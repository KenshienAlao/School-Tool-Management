"use client";

// icons
import { ChevronDownIcon } from "@/app/components/ui/icons";
// components
import { ScheduleInput } from "./ScheduleInput";
// hooks
import { useEditSection } from "../hooks/useEditSection";
// ui
import { Section } from "./ui/section";
import { Edit } from "./ui/editButton";
import { Delete } from "./ui/deleteButton";
import { ScheduleGrid } from "./ui/scheduleGrid";
import { SaveCancelButtons } from "./ui/saveCancelButtons";
import { FormInput } from "./ui/formInput";

export function SectionRow({ section, onUpdate, onDelete }) {
  const {
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
  } = useEditSection(section, onUpdate);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Summary Row */}
      <div
        className="flex cursor-pointer items-center justify-between p-5 transition-colors hover:bg-gray-50/50"
        onClick={() => !isEditing && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <Section section={section} />
        </div>

        <div className="flex items-center gap-3">
          {!isEditing && (
            <Edit setIsEditing={setIsEditing} setIsOpen={setIsOpen} />
          )}
          <Delete onDelete={onDelete} />
          <div
            className={`ml-2 transform text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDownIcon size={20} />
          </div>
        </div>
      </div>

      {/* Details/Edit Content */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white p-6">
          {isEditing ? (
            <div className="flex flex-col gap-6">
              <FormInput
                label="Section Name"
                id="edit-section-name"
                value={editSectionName}
                onChange={(e) => setEditSectionName(e.target.value)}
              />

              <ScheduleInput
                schedule={editSchedule}
                setSchedule={setEditSchedule}
              />

              <SaveCancelButtons onSave={handleSave} onCancel={handleCancel} />
            </div>
          ) : (
            <ScheduleGrid schedule={section.schedule} />
          )}
        </div>
      )}
    </div>
  );
}
