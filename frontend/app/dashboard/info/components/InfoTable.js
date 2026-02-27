"use client";

import React from "react";
import { StudentInfoRow } from "./StudentInfoRow";
import { motion, AnimatePresence } from "framer-motion";

export function InfoTable({ students, deleteStudent, updateStudent }) {
  return (
    <div className="grading-table-container">
      <div
        className="grading-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `minmax(280px, 1.5fr) 140px 140px 150px 160px 150px 120px`,
        }}
      >
        {/* Header Row */}
        <div className="grid-header-row" style={{ display: "contents" }}>
          <div className="grid-header-cell fixed-col justify-center text-center font-black">
            Student Identity
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Registry ID
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Course
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Status
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Contact
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Birthday
          </div>
          <div className="grid-header-cell"></div>
        </div>

        {/* Body Content */}
        <AnimatePresence mode="popLayout">
          {students.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-text-secondary py-32 text-center text-sm font-black tracking-widest uppercase opacity-30"
              style={{ gridColumn: "span 7" }}
            >
              No Registered Students
            </motion.div>
          ) : (
            students.map((student, index) => (
              <StudentInfoRow
                key={student.student_id}
                student={student}
                index={index}
                deleteStudent={deleteStudent}
                updateStudent={updateStudent}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
