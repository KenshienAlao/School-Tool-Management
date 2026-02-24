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

const PROTECTED_ROWS_COUNT = 5;

const DEFAULT_CATEGORY_TYPES = [
  "Performance Task",
  "Quiz",
  "Recitation",
  "Group Project",
  "Exam",
];

export function SectionGradeDashboard({ sectionId, sectionName }) {
  // Column State: [{ id, type, label, limit }]
  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(`grading_columns_${sectionId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Category Weights State: { type: weightPercentage }
  const [categoryWeights, setCategoryWeights] = useState(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(`grading_weights_${sectionId}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Manual Overrides State: { studentId: overriddenGrade }
  const [manualGrades, setManualGrades] = useState(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(`grading_manual_${sectionId}`);
    return saved ? JSON.parse(saved) : {};
  });

  // Students (rows)
  const [students, setStudents] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(`grading_students_${sectionId}`);
    if (saved) return JSON.parse(saved);

    return Array.from({ length: PROTECTED_ROWS_COUNT }).map((_, i) => ({
      id: `student-${Date.now()}-${i}`,
      name: "",
      grades: {},
      protected: true,
    }));
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCol, setNewCol] = useState({
    type: DEFAULT_CATEGORY_TYPES[0],
    customType: "",
    limit: 100,
    weight: "",
  });
  const [isCustomType, setIsCustomType] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All"); // "All", "Passed", "Incomplete", "Failed"

  // Persistence
  useEffect(() => {
    localStorage.setItem(
      `grading_columns_${sectionId}`,
      JSON.stringify(columns),
    );
    localStorage.setItem(
      `grading_weights_${sectionId}`,
      JSON.stringify(categoryWeights),
    );
    localStorage.setItem(
      `grading_students_${sectionId}`,
      JSON.stringify(students),
    );
    localStorage.setItem(
      `grading_manual_${sectionId}`,
      JSON.stringify(manualGrades),
    );
  }, [columns, categoryWeights, students, manualGrades, sectionId]);

  // Conversion Function: Percentage (0-100) to 1-5 Scale (Inverse Mapping)
  const convertToScale = useCallback((percentage) => {
    const p = parseFloat(percentage);
    if (isNaN(p)) return "5";

    if (p >= 90) return "1";
    if (p >= 80) return "2";
    if (p >= 70) return "3";
    if (p >= 60) return "4";
    return "5";
  }, []);

  // Helper for performance colors
  const getGradeColorClass = (scaleValue) => {
    const grade = parseInt(scaleValue);
    if (grade === 1 || grade === 2) return "grade-excellent";
    if (grade === 3) return "grade-average";
    if (grade === 4) return "grade-below-average";
    if (grade === 5) return "grade-failing";
    return "";
  };

  // GPA Computation: Percentage-First
  const computeFinalGrade = useCallback(
    (studentGrades = {}) => {
      if (!columns || columns.length === 0)
        return { scale: "0.00", percentage: "0.00" };

      // Group items by normalized type
      const itemsByType = {};
      columns.forEach((col) => {
        const type = (col.type || "Default").trim();
        if (!itemsByType[type]) itemsByType[type] = [];

        const score = parseFloat(studentGrades?.[col.id]);
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

      // If weights are defined, use them. Otherwise, use unweighted average of categories.
      let finalPercentageRaw = 0;
      if (totalWeightUsed > 0) {
        finalPercentageRaw = totalWeightedPercentage / totalWeightUsed;
      } else if (fallbackCount > 0) {
        finalPercentageRaw = fallbackPercentage / fallbackCount;
      } else {
        return { scale: "1.00", percentage: "0.00" };
      }

      const finalPercentage = finalPercentageRaw.toFixed(2);
      const scaleGrade = convertToScale(finalPercentage);

      return { scale: scaleGrade, percentage: finalPercentage };
    },
    [columns, categoryWeights, convertToScale],
  );

  // Auto-naming logic
  const getNextLabel = (type) => {
    const existingCount = columns.filter((c) => c.type === type).length;
    return `${type} ${existingCount + 1}`;
  };

  // Handlers
  const addColumn = (e) => {
    e.preventDefault();
    const type = (isCustomType ? newCol.customType : newCol.type)?.trim();
    if (!type) return;

    const colId = `col-${Date.now()}`;
    const nextCol = {
      id: colId,
      type: type,
      label: getNextLabel(type),
      limit: parseFloat(newCol.limit) || 100,
    };

    // Update weight if provided or if it's new
    if (newCol.weight && !isNaN(parseFloat(newCol.weight))) {
      setCategoryWeights((prev) => ({
        ...prev,
        [type]: parseFloat(newCol.weight),
      }));
    } else if (categoryWeights[type] === undefined) {
      setCategoryWeights((prev) => ({ ...prev, [type]: 0 }));
    }

    setColumns((prev) => [...prev, nextCol]);
    setIsModalOpen(false);
    setNewCol({
      type: DEFAULT_CATEGORY_TYPES[0],
      customType: "",
      limit: 100,
      weight: "",
    });
    setIsCustomType(false);
  };

  const deleteColumn = (colId) => {
    const col = columns.find((c) => c.id === colId);
    if (!col) return;

    if (
      window.confirm(
        `Are you sure you want to delete "${col.label}"? This action cannot be undone.`,
      )
    ) {
      setColumns((prev) => prev.filter((c) => c.id !== colId));

      // Remove grades for this column
      setStudents((prev) =>
        prev.map((s) => {
          const newGrades = { ...s.grades };
          delete newGrades[colId];
          return { ...s, grades: newGrades };
        }),
      );
    }
  };

  const handleGradeChange = (studentId, colId, value) => {
    if (value !== "" && isNaN(value)) return;
    const numericVal = parseFloat(value);
    if (!isNaN(numericVal) && numericVal < 0) return;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return { ...s, grades: { ...s.grades, [colId]: value } };
        }
        return s;
      }),
    );
  };

  const handleManualOverride = (studentId, result) => {
    const currentManual = manualGrades[studentId];
    if (currentManual) {
      if (
        window.confirm(
          `Reset manual grade (${currentManual}) to computed grade (${result.scale})?`,
        )
      ) {
        setManualGrades((prev) => {
          const next = { ...prev };
          delete next[studentId];
          return next;
        });
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
            setManualGrades((prev) => ({
              ...prev,
              [studentId]: numericVal.toString(),
            }));
          } else {
            alert("Please enter a valid grade between 1 and 5");
          }
        }
      }
    }
  };

  // Filtered and Sorted Students
  const processedStudents = useMemo(() => {
    let filtered = [...students];

    // Status Filter
    if (filterStatus !== "All") {
      filtered = filtered.filter((student) => {
        const result = computeFinalGrade(student.grades);
        const grade = parseInt(manualGrades[student.id] || result.scale);

        if (filterStatus === "Passed") return grade >= 1 && grade <= 3;
        if (filterStatus === "Incomplete") return grade === 4;
        if (filterStatus === "Failed") return grade === 5;
        return true;
      });
    }

    // Sort by name (Last name extraction attempt: Split by comma and take first part)
    filtered.sort((a, b) => {
      const nameA = (a.name || "ZZZ").toLowerCase();
      const nameB = (b.name || "ZZZ").toLowerCase();
      return nameA.localeCompare(nameB);
    });

    return filtered;
  }, [students, filterStatus, computeFinalGrade, manualGrades]);

  return (
    <div className="flex flex-col gap-6">
      {/* Action Bar */}
      <div className="flex flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <button
            onClick={() =>
              setStudents((prev) => [
                ...prev,
                {
                  id: `student-${Date.now()}`,
                  name: "",
                  grades: {},
                  protected: false,
                },
              ])
            }
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
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
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

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1 font-medium">
            Section Performance:
            <span
              className={`text-blue-600 ${getGradeColorClass(
                (() => {
                  const results = students
                    .map((s) => {
                      const res = computeFinalGrade(s.grades);
                      const manual = manualGrades[s.id];
                      return parseFloat(manual || res.scale);
                    })
                    .filter((v) => v > 0);

                  return results.length > 0
                    ? (
                        results.reduce((a, b) => a + b, 0) / results.length
                      ).toFixed(1) // Just for class check
                    : "0";
                })(),
              )}`}
            >
              {(() => {
                const results = students
                  .map((s) => {
                    const res = computeFinalGrade(s.grades);
                    const manual = manualGrades[s.id];
                    return parseFloat(manual || res.scale);
                  })
                  .filter((v) => v > 0);

                return results.length > 0
                  ? (
                      results.reduce((a, b) => a + b, 0) / results.length
                    ).toFixed(2)
                  : "0.00";
              })()}
            </span>
          </span>
        </div>
      </div>

      {/* Table Section */}
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
                      {col.type}
                      <span className="weight-indicator">
                        {" "}
                        ({categoryWeights[col.type]}%)
                      </span>
                    </span>
                    <span className="text-sm font-semibold">{col.label}</span>
                    <span className="text-[10px] font-medium text-gray-500">
                      Limit: {col.limit}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteColumn(col.id)}
                    className="delete-col-btn"
                    title="Delete Column"
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
              const result = computeFinalGrade(student.grades);
              const manualVal = manualGrades[student.id];
              const displayGrade = manualVal || result.scale;

              return (
                <tr key={student.id} className="group">
                  <td
                    className={`fixed-col ${student.protected ? "bg-gray-50/50" : ""}`}
                  >
                    <input
                      type="text"
                      placeholder="Last, First, MI"
                      value={student.name}
                      onChange={(e) =>
                        setStudents((prev) =>
                          prev.map((s) =>
                            s.id === student.id
                              ? { ...s, name: e.target.value }
                              : s,
                          ),
                        )
                      }
                      className="name-input"
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.id} className="text-center">
                      <div className="grade-cell-container">
                        <input
                          type="number"
                          value={student.grades[col.id] || ""}
                          onChange={(e) =>
                            handleGradeChange(
                              student.id,
                              col.id,
                              e.target.value,
                            )
                          }
                          onFocus={(e) => e.target.select()}
                          className="grade-input"
                          placeholder="-"
                        />
                        <span className="grade-slash">/</span>
                        <span className="limit-display">{col.limit}</span>
                      </div>
                    </td>
                  ))}
                  <td
                    className={`col-gpa text-center text-lg ${getGradeColorClass(displayGrade)} ${manualVal ? "grade-overridden" : ""}`}
                    title={`Percentage: ${result.percentage}%`}
                    onClick={() => handleManualOverride(student.id, result)}
                  >
                    {displayGrade}
                  </td>
                  <td className="text-center">
                    {!student.protected ? (
                      <button
                        onClick={() => {
                          if (window.confirm("Remove student?")) {
                            setStudents((prev) =>
                              prev.filter((s) => s.id !== student.id),
                            );
                            setManualGrades((prev) => {
                              const n = { ...prev };
                              delete n[student.id];
                              return n;
                            });
                          }
                        }}
                        className="delete-btn"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <div className="mx-auto h-6 w-6 opacity-20">
                        <AlertCircle size={16} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Column Modal */}
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

            <form onSubmit={addColumn}>
              <div className="form-group">
                <label className="form-label">Category Type</label>
                <div className="flex gap-2">
                  <select
                    className="form-input flex-1"
                    value={isCustomType ? "+" : newCol.type}
                    onChange={(e) => {
                      if (e.target.value === "+") {
                        setIsCustomType(true);
                      } else {
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
              </div>

              {isCustomType && (
                <div className="form-group">
                  <label className="form-label">Custom Label</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter type name (e.g. Lab)"
                    value={newCol.customType}
                    onChange={(e) =>
                      setNewCol({ ...newCol, customType: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Auto Display Name</label>
                <input
                  type="text"
                  className="form-input cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500"
                  value={getNextLabel(
                    isCustomType ? newCol.customType : newCol.type,
                  )}
                  readOnly
                />
              </div>

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
                    placeholder={
                      categoryWeights[
                        isCustomType ? newCol.customType : newCol.type
                      ] || "e.g. 50"
                    }
                    value={newCol.weight}
                    onChange={(e) =>
                      setNewCol({ ...newCol, weight: e.target.value })
                    }
                    min="0"
                    max="100"
                  />
                  <p className="mt-1 text-[10px] text-gray-400">
                    Current:{" "}
                    {categoryWeights[
                      isCustomType ? newCol.customType : newCol.type
                    ] || 0}
                    %
                  </p>
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
