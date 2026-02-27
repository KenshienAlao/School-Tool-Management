"use client";
import { useState } from "react";
import api from "@/app/lib/api";

const DEFAULT_CATEGORY_TYPES = [
  "Performance Task",
  "Quiz",
  "Recitation",
  "Group Project",
  "Exam",
];

export function useSectionGradeHandlers({
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
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomType, setIsCustomType] = useState(false);
  const [newCol, setNewCol] = useState({
    type: DEFAULT_CATEGORY_TYPES[0],
    customType: "",
    limit: 100,
    weight: "",
  });

  const handleAddColumn = async (e) => {
    e.preventDefault();
    const type = (isCustomType ? newCol.customType : newCol.type)?.trim();
    if (!type) return;

    const typeCols = columns.filter((c) => c.type === type);
    const maxNum = typeCols.reduce((max, col) => {
      const match = col.label.match(/\d+/);
      const num = match ? parseInt(match[0]) : 0;
      return num > max ? num : max;
    }, 0);
    const label = `${type} ${maxNum + 1}`;
    const nextCol = {
      id: `col-${Date.now()}`,
      type,
      label,
      limit: parseFloat(newCol.limit) || 100,
    };

    // Sort columns: by type (priority in list) then by label
    const newCols = [...columns, nextCol].sort((a, b) => {
      const typeA = DEFAULT_CATEGORY_TYPES.indexOf(a.type);
      const typeB = DEFAULT_CATEGORY_TYPES.indexOf(b.type);

      // If types are different, sort by priority in DEFAULT_CATEGORY_TYPES
      if (typeA !== typeB) {
        // Custom types go to the end if not in default list
        if (typeA === -1) return 1;
        if (typeB === -1) return -1;
        return typeA - typeB;
      }

      // If same type, sort by label numerically
      return a.label.localeCompare(b.label, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    const newWeights = {
      ...categoryWeights,
      [type]:
        newCol.weight !== ""
          ? parseFloat(newCol.weight)
          : (categoryWeights[type] ?? 0),
    };

    setColumns(newCols);
    setCategoryWeights(newWeights);
    await saveConfig(newCols, newWeights);

    // Automatically assign default grade of 0 for all students
    if (apiStudents.length > 0) {
      // Get course_id from sections list
      const sectionsRes = await api.get("/api/sections");
      const sectionObj = sectionsRes.data.data.sections.find(
        (s) => s.section_id === parseInt(sectionId),
      );

      if (sectionObj) {
        const gradesToSubmit = apiStudents.map((student) => ({
          student_id: student.student_id,
          course_id: sectionObj.course_id,
          assessment_type: label,
          grade: 0,
        }));
        await bulkSubmitGrades(gradesToSubmit);
      }
    }

    setIsModalOpen(false);
    setNewCol({
      type: DEFAULT_CATEGORY_TYPES[0],
      customType: "",
      limit: 100,
      weight: "",
    });
    setIsCustomType(false);
  };

  const handleGradeChange = async (studentId, colLabel, value) => {
    if (value !== "" && isNaN(value)) return;
    const numericVal = parseFloat(value);

    const existing = apiGrades.find(
      (g) => g.student_id === studentId && g.assessment_type === colLabel,
    );

    if (existing) {
      if (value === "") {
        await deleteGrade(existing.grade_id);
      } else {
        await updateGrade(existing.grade_id, numericVal);
      }
    } else if (value !== "") {
      const res = await api.get("/api/sections");
      const section = res.data.data.sections.find(
        (s) => s.section_id === parseInt(sectionId),
      );
      await submitGrade({
        student_id: studentId,
        course_id: section.course_id,
        assessment_type: colLabel,
        grade: numericVal,
      });
    }
  };

  const handleManualOverride = async (studentId, result) => {
    const current = manualGrades[studentId];

    if (current) {
      if (
        window.confirm(
          `Reset manual grade (${current}) to computed (${result.scale})?`,
        )
      ) {
        const next = { ...manualGrades };
        delete next[studentId];
        setManualGrades(next);
        await saveConfig(null, null, next);
      }
    } else if (window.confirm(`Computed: ${result.scale}. Override?`)) {
      const val = window.prompt("New grade (1-5):", result.scale);
      if (val && !isNaN(val) && val >= 1 && val <= 5) {
        const next = { ...manualGrades, [studentId]: val };
        setManualGrades(next);
        await saveConfig(null, null, next);
      }
    }
  };

  const handleDeleteColumn = async (id) => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      const next = columns.filter((c) => c.id !== id);
      setColumns(next);
      await saveConfig(next);
    }
  };

  return {
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
    categoryTypes: DEFAULT_CATEGORY_TYPES,
    categoryWeights,
  };
}
