"use client";
import { useCallback } from "react";

export function useGradingLogic(columns, categoryWeights) {
  const convertToScale = useCallback((percentage) => {
    const p = parseFloat(percentage);
    if (isNaN(p)) return "5.00";
    if (p >= 97) return "1.00";
    if (p >= 94) return "1.25";
    if (p >= 91) return "1.50";
    if (p >= 88) return "1.75";
    if (p >= 85) return "2.00";
    if (p >= 82) return "2.25";
    if (p >= 79) return "2.50";
    if (p >= 76) return "2.75";
    if (p >= 75) return "3.00";
    if (p >= 70) return "4.00";
    return "5.00";
  }, []);

  const getGradeColorClass = (scaleValue) => {
    const grade = parseFloat(scaleValue);
    if (grade === 0) return "";
    if (grade <= 2.0) return "grade-excellent";
    if (grade <= 3.0) return "grade-average";
    if (grade <= 4.0) return "grade-below-average";
    return "grade-failing";
  };

  const computeFinalGrade = useCallback(
    (studentId, apiGrades) => {
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
    [columns, categoryWeights, convertToScale],
  );

  return { convertToScale, getGradeColorClass, computeFinalGrade };
}
