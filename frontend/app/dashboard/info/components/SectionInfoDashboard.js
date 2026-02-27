"use client";

import React, { useState, useMemo } from "react";
import "../../grade/components/GradingTable.css";
import { useGrades } from "@/app/hooks/useGrades";
import { InfoHeader } from "./InfoHeader";
import { InfoTable } from "./InfoTable";
import { AddStudentModal } from "./AddStudentModal";
import { AnimatePresence } from "framer-motion";

export function SectionInfoDashboard({ sectionId, sectionName }) {
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    students: apiStudents,
    loading,
    addStudent,
    deleteStudent,
    updateStudent,
  } = useGrades(sectionId);

  const handleAddStudent = async (studentData) => {
    const result = await addStudent(studentData);
    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.message || "Failed to add student");
    }
  };

  const processedStudents = useMemo(() => {
    const list = [...apiStudents].sort((a, b) =>
      a.last_name.localeCompare(b.last_name),
    );

    if (!filterText) return list;

    const lowerFilter = filterText.toLowerCase();
    return list.filter(
      (student) =>
        `${student.first_name} ${student.last_name}`
          .toLowerCase()
          .includes(lowerFilter) ||
        student.student_id.toString().includes(lowerFilter) ||
        student.student_id_school?.toLowerCase().includes(lowerFilter),
    );
  }, [apiStudents, filterText]);

  return (
    <div className="flex flex-col gap-6">
      <InfoHeader
        filterText={filterText}
        setFilterText={setFilterText}
        onAddStudent={() => setIsModalOpen(true)}
      />

      <div className="min-h-[500px]">
        {loading ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-4">
            <div className="border-brand-primary h-10 w-10 animate-spin rounded-full border-b-2"></div>
            <span className="text-text-secondary text-sm font-black tracking-widest uppercase opacity-40">
              Fetching Identity Records...
            </span>
          </div>
        ) : (
          <InfoTable
            students={processedStudents}
            deleteStudent={deleteStudent}
            updateStudent={updateStudent}
          />
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <AddStudentModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddStudent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
