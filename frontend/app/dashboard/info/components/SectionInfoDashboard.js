"use client";
import React, { useState, useMemo } from "react";
import "../../grade/components/GradingTable.css"; // Reuse the same CSS for the grid
import { useGrades } from "@/app/hooks/useGrades";
import { InfoHeader } from "./InfoHeader";
import { InfoTable } from "./InfoTable";
import { AddStudentModal } from "./AddStudentModal";

export function SectionInfoDashboard({ sectionId, sectionName }) {
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reuse useGrades hook to get students
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

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading students...</div>
      ) : (
        <InfoTable
          students={processedStudents}
          deleteStudent={deleteStudent}
          updateStudent={updateStudent}
        />
      )}

      {isModalOpen && (
        <AddStudentModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}
    </div>
  );
}
