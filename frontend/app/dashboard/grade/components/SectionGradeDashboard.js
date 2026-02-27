"use client";
import React, { useState, useMemo } from "react";
import "./GradingTable.css";
import { useGrades } from "@/app/hooks/useGrades";
import { useGradingConfig } from "../hooks/useGradingConfig";
import { useGradingLogic } from "../hooks/useGradingLogic";
import { useSectionGradeHandlers } from "../hooks/useSectionGradeHandlers";
import { GradingHeader } from "./GradingHeader";
import { GradingTable } from "./GradingTable";
import { AddColumnModal } from "./AddColumnModal";

export function SectionGradeDashboard({ sectionId, sectionName }) {
  const [filterStatus, setFilterStatus] = useState("All");

  // State & Data Hooks
  const {
    students: apiStudents,
    grades: apiGrades,
    submitGrade,
    bulkSubmitGrades,
    updateGrade,
    deleteGrade,
  } = useGrades(sectionId);
  const {
    columns,
    setColumns,
    categoryWeights,
    setCategoryWeights,
    manualGrades,
    setManualGrades,
    saveConfig,
  } = useGradingConfig(sectionId);
  const { computeFinalGrade, getGradeColorClass } = useGradingLogic(
    columns,
    categoryWeights,
  );

  // Handler Hook
  const {
    isModalOpen,
    setIsModalOpen,
    isCustomType,
    setIsCustomType,
    newCol,
    setNewCol,
    handleAddColumn,
    handleGradeChange,
    handleManualOverride,
    handleDeleteColumn,
    categoryTypes,
    categoryWeights: weightsForModal,
  } = useSectionGradeHandlers({
    sectionId,
    columns,
    setColumns,
    categoryWeights,
    setCategoryWeights,
    manualGrades,
    setManualGrades,
    apiGrades,
    apiStudents,
    saveConfig,
    submitGrade,
    bulkSubmitGrades,
    updateGrade,
    deleteGrade,
  });

  // Filter Logic
  const processedStudents = useMemo(() => {
    const list = [...apiStudents].sort((a, b) =>
      a.last_name.localeCompare(b.last_name),
    );
    if (filterStatus === "All") return list;

    return list.filter((student) => {
      const computed = computeFinalGrade(student.student_id, apiGrades).scale;
      const grade = parseInt(manualGrades[student.student_id] || computed);

      if (filterStatus === "Passed") return grade >= 1 && grade <= 3;
      if (filterStatus === "Incomplete") return grade === 4;
      if (filterStatus === "Failed") return grade === 5;
      return true;
    });
  }, [apiStudents, filterStatus, computeFinalGrade, apiGrades, manualGrades]);

  return (
    <div className="flex flex-col gap-6">
      <GradingHeader
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onAddColumn={() => setIsModalOpen(true)}
        categoryWeights={categoryWeights}
        columns={columns}
      />

      <GradingTable
        students={processedStudents}
        columns={columns}
        apiGrades={apiGrades}
        categoryWeights={categoryWeights}
        manualGrades={manualGrades}
        computeFinalGrade={computeFinalGrade}
        getGradeColorClass={getGradeColorClass}
        handleGradeChange={handleGradeChange}
        handleManualOverride={handleManualOverride}
        handleDeleteColumn={handleDeleteColumn}
      />

      {isModalOpen && (
        <AddColumnModal
          newCol={newCol}
          setNewCol={setNewCol}
          isCustomType={isCustomType}
          setIsCustomType={setIsCustomType}
          categoryTypes={categoryTypes}
          categoryWeights={weightsForModal}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddColumn}
        />
      )}
    </div>
  );
}
