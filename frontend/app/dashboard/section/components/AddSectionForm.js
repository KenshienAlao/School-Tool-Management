"use client";

import { ScheduleInput } from "./ScheduleInput";
import { useAddSectionForm } from "../hooks/useAddSectionForm";
import { SaveCancelButtons } from "./ui/saveCancelButtons";
import { FormInput } from "./ui/formInput";

export function AddSectionForm({ onSubmit, onCancel }) {
  const {
    courseName,
    setCourseName,
    sectionName,
    setSectionName,
    schedule,
    setSchedule,
    handleSubmit,
  } = useAddSectionForm(onSubmit);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-gray-100"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <FormInput
          label="Course Name"
          id="course-name"
          placeholder="e.g. BSIT"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <FormInput
          label="Section Name"
          id="section-name"
          placeholder="e.g. 1A"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          required
        />
      </div>

      <ScheduleInput schedule={schedule} setSchedule={setSchedule} />

      <SaveCancelButtons
        onSave={handleSubmit}
        onCancel={onCancel}
        saveLabel="Save Section"
        isDisabled={!courseName.trim() || !sectionName.trim()}
      />
    </form>
  );
}
