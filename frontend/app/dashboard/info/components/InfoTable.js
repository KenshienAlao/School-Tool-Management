"use client";
import React from "react";
import { StudentInfoRow } from "./StudentInfoRow";

export function InfoTable({ students, deleteStudent, updateStudent }) {
  return (
    <div className="grading-table-container">
      <div
        className="grading-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `minmax(250px, 1.5fr) 140px 150px 160px 160px 150px 120px`,
        }}
      >
        {/* Header Row */}
        <div className="grid-header-row" style={{ display: "contents" }}>
          <div className="grid-header-cell fixed-col">Full Name</div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Student ID
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Course
          </div>
          <div className="grid-header-cell text-text-secondary text-center text-[10px] font-black tracking-widest uppercase opacity-60">
            Classification
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
        {students.length === 0 ? (
          <div
            className="text-text-secondary py-20 text-center text-sm font-bold opacity-50"
            style={{ gridColumn: "span 7" }}
          >
            No student records found.
          </div>
        ) : (
          students.map((student) => (
            <StudentInfoRow
              key={student.student_id}
              student={student}
              deleteStudent={deleteStudent}
              updateStudent={updateStudent}
            />
          ))
        )}
      </div>
    </div>
  );
}
