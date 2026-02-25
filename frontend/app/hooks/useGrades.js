"use client";
import { useState, useCallback, useEffect } from "react";
import api from "@/app/lib/api";

export function useGrades(sectionId) {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!sectionId) return;
    setLoading(true);
    try {
      const [studentsRes, gradesRes] = await Promise.all([
        api.get(`/api/sections/${sectionId}/students`),
        api.get(`/api/grades/section/${sectionId}`),
      ]);
      setStudents(studentsRes.data.data.students || []);
      setGrades(gradesRes.data.data.grades || []);
    } catch (err) {
      console.error("Error fetching grades data:", err);
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addStudent = async (studentData) => {
    try {
      const res = await api.post("/api/students", {
        ...studentData,
        section_id: parseInt(sectionId),
      });
      if (res.data.success) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.error("Error adding student:", err);
    }
    return false;
  };

  const updateStudent = async (id, studentData) => {
    try {
      const res = await api.put(`/api/students/${id}`, studentData);
      if (res.data.success) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.error("Error updating student:", err);
    }
    return false;
  };

  const deleteStudent = async (id) => {
    try {
      const res = await api.delete(`/api/students/${id}`);
      if (res.data.success) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
    return false;
  };

  const submitGrade = async (gradeData) => {
    try {
      const res = await api.post("/api/grades", {
        ...gradeData,
        section_id: parseInt(sectionId),
      });
      if (res.data.success) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.error("Error submitting grade:", err);
    }
    return false;
  };

  const updateGrade = async (gradeId, gradeValue) => {
    try {
      const res = await api.put(`/api/grades/${gradeId}`, {
        grade: gradeValue,
      });
      if (res.data.success) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.error("Error updating grade:", err);
    }
    return false;
  };

  const deleteGrade = async (gradeId) => {
    try {
      const res = await api.delete(`/api/grades/${gradeId}`);
      if (res.data.success) {
        fetchData();
        return true;
      }
    } catch (err) {
      console.error("Error deleting grade:", err);
    }
    return false;
  };

  return {
    students,
    grades,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    submitGrade,
    updateGrade,
    deleteGrade,
    refresh: fetchData,
  };
}
