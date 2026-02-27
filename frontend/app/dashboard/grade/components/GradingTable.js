"use client";

import React from "react";
import { X, User, ChevronDown } from "lucide-react";
import { StudentRow } from "./StudentRow";
import { motion, AnimatePresence } from "framer-motion";

export function GradingTable({
  students,
  columns,
  apiGrades,
  manualGrades,
  computeFinalGrade,
  getGradeColorClass,
  handleGradeChange,
  handleManualOverride,
  handleDeleteColumn,
}) {
  return (
    <div className="border-surface-muted bg-surface-elevated overflow-hidden rounded-3xl border shadow-sm">
      <div className="grading-table-container custom-scrollbar">
        <div
          className="grading-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              columns.length > 0
                ? `minmax(280px, 1.8fr) repeat(${columns.length}, minmax(130px, 1fr)) 140px`
                : `minmax(280px, 1.8fr) 140px`,
          }}
        >
          {/* Header Row */}
          <>
            <div className="grid-header-cell fixed-col z-50 justify-center!">
              <div className="flex items-center justify-center gap-3">
                <span className="text-text-primary text-xs font-black tracking-widest uppercase">
                  Student Identity
                </span>
              </div>
            </div>

            {columns.map((col) => (
              <div
                key={col.id}
                className="grid-header-cell group border-surface-muted/50 relative border-l"
              >
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="text-text-primary w-full truncate px-4 text-[13px] font-black tracking-tight"
                    title={`${col.type} - ${col.label} (Limit: ${col.limit})`}
                  >
                    {col.label}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteColumn(col.id)}
                  className="bg-surface-elevated absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-red-500 opacity-0 shadow-lg transition-all group-hover:top-2 group-hover:right-2 group-hover:opacity-100 hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-red-500/20"
                >
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            ))}

            <div className="grid-header-cell border-surface-muted/50 bg-surface-muted/20 border-l text-center">
              <p className="text-text-primary block text-sm font-black uppercase">
                Grade
              </p>
            </div>
          </>

          {/* Body Content */}
          <AnimatePresence mode="popLayout">
            {students.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid-cell py-24 text-center"
                style={{ gridColumn: `span ${columns.length + 2}` }}
              >
                <div className="flex flex-col items-center gap-3">
                  <p className="bg-surface-muted h-12 w-12 rounded-2xl opacity-20"></p>
                  <span className="text-text-secondary text-sm font-black tracking-widest uppercase opacity-40">
                    No Students
                  </span>
                </div>
              </motion.div>
            ) : (
              students.map((student, idx) => (
                <StudentRow
                  key={student.student_id}
                  student={student}
                  columns={columns}
                  apiGrades={apiGrades}
                  manualGrades={manualGrades}
                  computeFinalGrade={computeFinalGrade}
                  getGradeColorClass={getGradeColorClass}
                  handleGradeChange={handleGradeChange}
                  handleManualOverride={handleManualOverride}
                  index={idx}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
