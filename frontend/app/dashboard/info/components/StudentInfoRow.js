"use client";
import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { AddStudentModal } from "./AddStudentModal";

export function StudentInfoRow({ student, deleteStudent, updateStudent }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdate = async (formData) => {
    const success = await updateStudent(student.student_id, formData);
    if (success) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="group" style={{ display: "contents" }}>
      {/* Name Column (Sticky) */}
      <div className="grid-cell fixed-col">
        <span className="text-text-primary px-2 font-black">
          {student.last_name}, {student.first_name}
          {student.middle_name ? ` ${student.middle_name}` : ""}
          {student.suffix ? ` ${student.suffix}` : ""}
        </span>
      </div>

      {/* ID Column */}
      <div className="grid-cell text-center">
        <span className="bg-brand-primary/10 text-brand-primary rounded-xl px-3 py-1 font-mono text-xs font-black">
          {student.student_id_school || "N/A"}
        </span>
      </div>

      {/* Course Column */}
      <div className="grid-cell text-center">
        <span className="text-text-secondary text-xs font-black tracking-widest uppercase opacity-60">
          {student.course || "N/A"}
        </span>
      </div>

      {/* Status Column */}
      <div className="grid-cell text-center">
        <span
          className={`rounded-xl px-3 py-1 text-[10px] font-black tracking-tight uppercase ${
            student.status?.toLowerCase() === "regular"
              ? "bg-brand-primary/10 text-brand-primary"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {student.status || "Regular"}
        </span>
      </div>

      {/* Contact Column */}
      <div className="grid-cell text-center">
        <span className="text-text-secondary text-xs font-bold">
          {student.contact_number || "-"}
        </span>
      </div>

      {/* Birthday Column */}
      <div className="grid-cell text-center">
        <span className="text-text-secondary text-xs font-bold italic opacity-50">
          {student.birthday || "-"}
        </span>
      </div>

      {/* Actions Column */}
      <div className="grid-cell gap-3 text-center">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-brand-primary hover:bg-brand-primary/10 rounded-xl p-2 opacity-0 transition-all group-hover:opacity-100"
          title="Edit Student"
        >
          <Edit2 size={18} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => {
            if (
              window.confirm(
                `Permanently delete records for ${student.first_name} ${student.last_name}?`,
              )
            )
              deleteStudent(student.student_id);
          }}
          className="rounded-xl p-2 text-red-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/10"
          title="Delete Student"
        >
          <Trash2 size={18} strokeWidth={2.5} />
        </button>
      </div>

      {isEditModalOpen && (
        <AddStudentModal
          initialData={student}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdate}
          title="Edit Student Information"
        />
      )}
    </div>
  );
}
