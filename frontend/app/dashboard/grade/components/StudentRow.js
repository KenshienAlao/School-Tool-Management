"use client";

import React from "react";
import { motion } from "framer-motion";

export function StudentRow({
  student,
  columns,
  apiGrades,
  manualGrades,
  computeFinalGrade,
  getGradeColorClass,
  handleGradeChange,
  handleManualOverride,
  index,
}) {
  const result = computeFinalGrade(student.student_id, apiGrades);
  const manualVal = manualGrades[student.student_id];
  const displayGrade = manualVal || result.scale;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
      style={{ display: "contents" }}
    >
      <div className="grid-cell fixed-col border-surface-muted/50 border-b">
        <div className="mx-auto flex flex-col truncate px-2">
          <span className="text-text-primary truncate text-[13px] font-black tracking-tight uppercase">
            {student.last_name}, {student.first_name} {student.middle_name}
          </span>
        </div>
      </div>

      {columns.map((col) => {
        const gradeObj = apiGrades.find(
          (g) =>
            g.student_id === student.student_id &&
            g.assessment_type === col.label,
        );
        return (
          <div
            key={col.id}
            className="grid-cell border-surface-muted/50 border-b border-l text-center"
          >
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5">
              <input
                type="number"
                value={gradeObj ? gradeObj.grade : ""}
                onChange={(e) =>
                  handleGradeChange(
                    student.student_id,
                    col.label,
                    e.target.value,
                  )
                }
                className="text-text-primary w-10 bg-transparent text-center text-sm font-black outline-none placeholder:opacity-20"
                placeholder="-"
              />
              <span className="text-text-secondary text-xs font-bold opacity-40">
                /
              </span>
              <span className="text-text-secondary w-8 text-center text-xs font-black opacity-60">
                {col.limit}
              </span>
            </div>
          </div>
        );
      })}

      <div
        className={`grid-cell col-gpa text-center text-xl ${getGradeColorClass(displayGrade)} ${manualVal ? "grade-overridden" : ""}`}
        title={`Percentage: ${result.percentage}%`}
        onClick={() => handleManualOverride(student.student_id, result)}
      >
        <span className="cursor-pointer px-4 py-1">{displayGrade}</span>
      </div>
    </motion.div>
  );
}
