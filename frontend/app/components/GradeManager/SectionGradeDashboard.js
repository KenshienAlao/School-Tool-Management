"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  Download,
  ChevronLeft,
  AlertCircle,
  Settings2,
  X,
  Info,
} from "lucide-react";
import "./GradingTable.css";
import { useGrades } from "@/app/hooks/useGrades";
import api from "@/app/lib/api";

const DEFAULT_CATEGORY_TYPES = [
  "Performance Task",
  "Quiz",
  "Recitation",
  "Group Project",
  "Exam",
];

export function SectionGradeDashboard({ sectionId, sectionName }) {
  const {
    students: apiStudents,
    grades: apiGrades,
    loading: gradesLoading,
    addStudent,
    updateStudent,
    deleteStudent,
    submitGrade,
    updateGrade,
    deleteGrade,
  } = useGrades(sectionId);

  const [columns, setColumns] = useState([]);
  const [categoryWeights, setCategoryWeights] = useState({});
  const [manualGrades, setManualGrades] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCol, setNewCol] = useState({
    type: DEFAULT_CATEGORY_TYPES[0],
    customType: "",
    limit: 100,
    weight: "",
  });
  const [isCustomType, setIsCustomType] = useState(false);

  // Fetch grading config from section
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get(`/api/sections`);
        const section = res.data.data.sections.find(
          (s) => s.section_id === parseInt(sectionId),
        );
        if (section && section.grading_config) {
          const config =
            typeof section.grading_config === "string"
              ? JSON.parse(section.grading_config)
              : section.grading_config;
          setColumns(config.columns || []);
          setCategoryWeights(config.categoryWeights || {});
          setManualGrades(config.manualGrades || {});
        }
      } catch (err) {
        console.error("Error fetching grading config:", err);
      }
    };
    if (sectionId) fetchConfig();
  }, [sectionId]);

  // Save grading config
  const saveConfig = async (newCols, newWeights, newManual) => {
    try {
      await api.put(`/api/sections/${sectionId}`, {
        grading_config: {
          columns: newCols || columns,
          categoryWeights: newWeights || categoryWeights,
          manualGrades: newManual || manualGrades,
        },
      });
    } catch (err) {
      console.error("Error saving grading config:", err);
    }
  };

  const convertToScale = useCallback((percentage) => {
    const p = parseFloat(percentage);
    if (isNaN(p)) return "5";
    if (p >= 90) return "1";
    if (p >= 80) return "2";
    if (p >= 70) return "3";
    if (p >= 60) return "4";
    return "5";
  }, []);

  const getGradeColorClass = (scaleValue) => {
    const grade = parseInt(scaleValue);
    if (grade === 1 || grade === 2) return "grade-excellent";
    if (grade === 3) return "grade-average";
    if (grade === 4) return "grade-below-average";
    if (grade === 5) return "grade-failing";
    return "";
  };

  const computeFinalGrade = useCallback(
    (studentId) => {
      const studentGrades = apiGrades.filter((g) => g.student_id === studentId);
      if (!columns || columns.length === 0)
        return { scale: "0.00", percentage: "0.00" };

      const itemsByType = {};
      columns.forEach((col) => {
        const type = (col.type || "Default").trim();
        if (!itemsByType[type]) itemsByType[type] = [];

        const gradeObj = studentGrades.find(
          (g) => g.assessment_type === col.label,
        );
        const score = gradeObj ? parseFloat(gradeObj.grade) : NaN;
        const limit = parseFloat(col.limit) || 100;

        if (!isNaN(score)) {
          itemsByType[type].push((score / limit) * 100);
        }
      });

      let totalWeightedPercentage = 0;
      let totalWeightUsed = 0;
      let fallbackPercentage = 0;
      let fallbackCount = 0;

      Object.keys(itemsByType).forEach((type) => {
        const scores = itemsByType[type];
        if (scores.length === 0) return;

        const typeAvg = scores.reduce((a, b) => a + b, 0) / scores.length;
        const rawWeight = categoryWeights[type];
        const weight = parseFloat(rawWeight) / 100;

        if (!isNaN(weight) && weight > 0) {
          totalWeightedPercentage += typeAvg * weight;
          totalWeightUsed += weight;
        }
        fallbackPercentage += typeAvg;
        fallbackCount++;
      });

      let finalPercentageRaw = 0;
      if (totalWeightUsed > 0) {
        finalPercentageRaw = totalWeightedPercentage / totalWeightUsed;
      } else if (fallbackCount > 0) {
        finalPercentageRaw = fallbackPercentage / fallbackCount;
      } else {
        return { scale: "5.00", percentage: "0.00" };
      }

      const finalPercentage = finalPercentageRaw.toFixed(2);
      const scaleGrade = convertToScale(finalPercentage);
      return { scale: scaleGrade, percentage: finalPercentage };
    },
    [columns, categoryWeights, apiGrades, convertToScale],
  );

  const handleAddColumn = async (e) => {
    e.preventDefault();
    const type = (isCustomType ? newCol.customType : newCol.type)?.trim();
    if (!type) return;

    const existingCount = columns.filter((c) => c.type === type).length;
    const label = `${type} ${existingCount + 1}`;

    const nextCol = {
      id: `col-${Date.now()}`,
      type: type,
      label: label,
      limit: parseFloat(newCol.limit) || 100,
    };

    const newCols = [...columns, nextCol];
    const newWeights = { ...categoryWeights };
    if (newCol.weight) {
      newWeights[type] = parseFloat(newCol.weight);
    } else if (newWeights[type] === undefined) {
      newWeights[type] = 0;
    }

    setColumns(newCols);
    setCategoryWeights(newWeights);
    await saveConfig(newCols, newWeights);

    setIsModalOpen(false);
    setNewCol({
      type: DEFAULT_CATEGORY_TYPES[0],
      customType: "",
      limit: 100,
      weight: "",
    });
    setIsCustomType(false);
  };

  const handleDeleteColumn = async (colId) => {
    const col = columns.find((c) => c.id === colId);
    if (!col) return;

    if (window.confirm(`Delete "${col.label}"?`)) {
      const newCols = columns.filter((c) => c.id !== colId);
      setColumns(newCols);
      await saveConfig(newCols, categoryWeights);
      // Optional: Delete all grades associated with this label from backend
    }
  };

  const handleGradeChange = async (studentId, colLabel, value) => {
    if (value !== "" && isNaN(value)) return;
    const numericVal = parseFloat(value);

    const existingGrade = apiGrades.find(
      (g) => g.student_id === studentId && g.assessment_type === colLabel,
    );

    if (existingGrade) {
      if (value === "") {
        await deleteGrade(existingGrade.grade_id);
      } else {
        await updateGrade(existingGrade.grade_id, numericVal);
      }
    } else if (value !== "") {
      // Need course_id here, usually passed via props or fetched
      // For now assume we can get it from section
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
    const currentManual = manualGrades[studentId];
    if (currentManual) {
      if (
        window.confirm(
          `Reset manual grade (${currentManual}) to computed grade (${result.scale})?`,
        )
      ) {
        const next = { ...manualGrades };
        delete next[studentId];
        setManualGrades(next);
        await saveConfig(null, null, next);
      }
    } else {
      if (
        window.confirm(
          `Computed final grade: ${result.scale}. Do you want to override it?`,
        )
      ) {
        const newVal = window.prompt("Enter new grade (1 - 5):", result.scale);
        if (newVal !== null) {
          const numericVal = parseInt(newVal);
          if (!isNaN(numericVal) && numericVal >= 1 && numericVal <= 5) {
            const next = {
              ...manualGrades,
              [studentId]: numericVal.toString(),
            };
            setManualGrades(next);
            await saveConfig(null, null, next);
          } else {
            alert("Please enter a valid grade between 1 and 5");
          }
        }
      }
    }
  };

  const processedStudents = useMemo(() => {
    let list = [...apiStudents];
    // Alphabetical sort as required
    list.sort((a, b) => a.last_name.localeCompare(b.last_name));

    if (filterStatus !== "All") {
      list = list.filter((s) => {
        const res = computeFinalGrade(s.student_id);
        const grade = parseInt(manualGrades[s.student_id] || res.scale);
        if (filterStatus === "Passed") return grade >= 1 && grade <= 3;
        if (filterStatus === "Incomplete") return grade === 4;
        if (filterStatus === "Failed") return grade === 5;
        return true;
      });
    }
    return list;
  }, [apiStudents, filterStatus, computeFinalGrade, manualGrades]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <button
            onClick={() => {
              const name = window.prompt("Enter Student Name (Last, First):");
              if (name) {
                const [last, first] = name.split(",").map((s) => s.trim());
                addStudent({ last_name: last, first_name: first || "" });
              }
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
          >
            <Plus size={18} /> Add Student
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          >
            <Plus size={18} /> Add Column
          </button>

          <div className="ml-4 flex items-center gap-2 border-l border-gray-100 pl-4">
            <span className="text-sm font-medium text-gray-500">
              Filter Status:
            </span>
            <select
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Students</option>
              <option value="Passed">Passed (1-3)</option>
              <option value="Incomplete">Incomplete (4)</option>
              <option value="Failed">Failed (5)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grading-table-container">
        <table className="grading-table">
          <thead>
            <tr>
              <th className="fixed-col w-64">Name</th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="group relative min-w-32 text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {col.type} ({categoryWeights[col.type]}%)
                    </span>
                    <span className="text-sm font-semibold">{col.label}</span>
                    <span className="text-[10px] font-medium text-gray-500">
                      Limit: {col.limit}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteColumn(col.id)}
                    className="delete-col-btn"
                  >
                    <X size={14} />
                  </button>
                </th>
              ))}
              <th className="col-gpa w-28 text-center">Final Grade</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {processedStudents.map((student) => {
              const result = computeFinalGrade(student.student_id);
              const manualVal = manualGrades[student.student_id];
              const displayGrade = manualVal || result.scale;

              return (
                <tr key={student.student_id} className="group">
                  <td className="fixed-col">
                    <span className="px-2 font-medium">
                      {student.last_name}, {student.first_name}{" "}
                      {student.middle_name || ""}
                    </span>
                  </td>
                  {columns.map((col) => {
                    const gradeObj = apiGrades.find(
                      (g) =>
                        g.student_id === student.student_id &&
                        g.assessment_type === col.label,
                    );
                    return (
                      <td key={col.id} className="text-center">
                        <div className="grade-cell-container">
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
                            className="grade-input"
                            placeholder="-"
                          />
                          <span className="grade-slash">/</span>
                          <span className="limit-display">{col.limit}</span>
                        </div>
                      </td>
                    );
                  })}
                  <td
                    className={`col-gpa text-center text-lg ${getGradeColorClass(displayGrade)} ${manualVal ? "grade-overridden" : ""}`}
                    title={`Percentage: ${result.percentage}%`}
                    onClick={() =>
                      handleManualOverride(student.student_id, result)
                    }
                  >
                    {displayGrade}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        if (window.confirm("Delete student?"))
                          deleteStudent(student.student_id);
                      }}
                      className="delete-btn"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Add Grading Column
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddColumn}>
              <div className="form-group">
                <label className="form-label">Category Type</label>
                <select
                  className="form-input"
                  value={isCustomType ? "+" : newCol.type}
                  onChange={(e) => {
                    if (e.target.value === "+") setIsCustomType(true);
                    else {
                      setIsCustomType(false);
                      setNewCol({ ...newCol, type: e.target.value });
                    }
                  }}
                >
                  {DEFAULT_CATEGORY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value="+">Custom Category (+)</option>
                </select>
              </div>
              {isCustomType && (
                <div className="form-group">
                  <label className="form-label">Custom Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCol.customType}
                    onChange={(e) =>
                      setNewCol({ ...newCol, customType: e.target.value })
                    }
                    required
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Limit Score</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newCol.limit}
                    onChange={(e) =>
                      setNewCol({ ...newCol, limit: e.target.value })
                    }
                    required
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category Weight (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newCol.weight}
                    onChange={(e) =>
                      setNewCol({ ...newCol, weight: e.target.value })
                    }
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
              >
                Create Column
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
