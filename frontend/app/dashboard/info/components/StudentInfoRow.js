"use client";

import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { AddStudentModal } from "./AddStudentModal";
import { motion } from "framer-motion";

export function StudentInfoRow({
  student,
  index,
  deleteStudent,
  updateStudent,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdate = async (formData) => {
    const success = await updateStudent(student.student_id, formData);
    if (success) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group"
      style={{ display: "contents" }}
    >
      {/* Name Column (Sticky) */}
      <div className="grid-cell fixed-col border-surface-muted/50 bg-surface-elevated group-hover:bg-brand-primary/5 border-b transition-colors">
        <div className="flex flex-col truncate px-2">
          <span className="text-text-primary truncate text-[13px] font-black tracking-tight uppercase">
            {student.last_name}, {student.first_name} {student.middle_name}
          </span>
        </div>
      </div>

      {/* ID Column */}
      <div className="grid-cell border-surface-muted/50 group-hover:bg-brand-primary/5 border-b text-center transition-colors">
        <span className="border-brand-primary/20 text-brand-primary bg-brand-primary/5 rounded-xl border px-3 py-1 font-mono text-[10px] font-black tracking-widest">
          {student.student_id_school || "N/A"}
        </span>
      </div>

      {/* Course Column */}
      <div className="grid-cell border-surface-muted/50 group-hover:bg-brand-primary/5 border-b text-center transition-colors">
        <span className="text-text-secondary text-[11px] font-black tracking-widest uppercase opacity-60">
          {student.course || "N/A"}
        </span>
      </div>

      {/* Status Column */}
      <div className="grid-cell border-surface-muted/50 group-hover:bg-brand-primary/5 border-b text-center transition-colors">
        <span
          className={`rounded-xl px-4 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-sm ${
            student.status?.toLowerCase() === "regular"
              ? "bg-brand-primary/10 text-brand-primary"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {student.status || "Regular"}
        </span>
      </div>

      {/* Contact Column */}
      <div className="grid-cell border-surface-muted/50 group-hover:bg-brand-primary/5 border-b text-center transition-colors">
        <span className="text-text-secondary text-[11px] font-black tracking-tighter opacity-80">
          {student.contact_number || "-"}
        </span>
      </div>

      {/* Birthday Column */}
      <div className="grid-cell border-surface-muted/50 group-hover:bg-brand-primary/5 border-b text-center transition-colors">
        <span className="text-text-secondary text-[11px] font-bold italic opacity-40">
          {student.birthday || "-"}
        </span>
      </div>

      {/* Actions Column */}
      <div className="grid-cell border-surface-muted/50 group-hover:bg-brand-primary/5 gap-2 border-b text-center transition-colors">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-brand-primary hover:bg-brand-primary flex h-8 w-8 items-center justify-center rounded-xl opacity-0 transition-all group-hover:opacity-100 hover:text-white"
          title="Edit Record"
        >
          <Edit2 size={16} strokeWidth={3} />
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
          className="flex h-8 w-8 items-center justify-center rounded-xl text-red-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500 hover:text-white"
          title="Purge Record"
        >
          <Trash2 size={16} strokeWidth={3} />
        </button>
      </div>

      {isEditModalOpen && (
        <AddStudentModal
          initialData={student}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdate}
          title="Refine Student Profile"
        />
      )}
    </motion.div>
  );
}
