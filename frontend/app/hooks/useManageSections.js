"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/app/lib/api";

export function useManageSections(options = { autoFetch: true }) {
  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(options.autoFetch);

  // fetch sections
  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/sections");
      if (data.success) {
        const mapped = (data.data?.sections || []).map((s) => {
          const config = s.grading_config || {};
          return {
            ...s,
            id: s.section_id,
            courseName: s.course_name,
            sectionName: s.section_name,
            schedule: config.schedule || {},
          };
        });
        setSections(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch courses
  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await api.get("/api/courses");
      if (data.success) {
        setCourses(data.data?.courses || []);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }, []);

  useEffect(() => {
    if (options.autoFetch) {
      fetchSections();
      fetchCourses();
    }
  }, [options.autoFetch, fetchSections, fetchCourses]);

  // add course
  const addCourse = async (courseName) => {
    try {
      const { data } = await api.post("/api/courses", {
        course_name: courseName,
      });
      if (data.success) {
        fetchCourses();
        return data;
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    }
    return null;
  };

  // add section
  const addSection = async (sectionData) => {
    try {
      let courseId = sectionData.course_id;

      // If courseName is provided, find or create course
      if (!courseId && sectionData.courseName) {
        const existing = courses.find(
          (c) => c.course_name === sectionData.courseName,
        );
        if (existing) {
          courseId = existing.course_id;
        } else {
          const res = await api.post("/api/courses", {
            course_name: sectionData.courseName,
          });
          // Note: we need the ID of the new course.
          // Simplest is to refetch courses and find it.
          const freshCourses = await api.get("/api/courses");
          const newlyCreated = freshCourses.data.data.courses.find(
            (c) => c.course_name === sectionData.courseName,
          );
          courseId = newlyCreated?.course_id;
        }
      }

      const { data } = await api.post("/api/sections", {
        section_name: sectionData.sectionName,
        course_id: courseId,
        grading_config: {
          ...(sectionData.grading_config || {
            columns: [],
            categoryWeights: {},
          }),
          schedule: sectionData.schedule || {},
        },
      });

      if (data.success) {
        fetchSections();
        return true;
      }
    } catch (error) {
      console.error("Failed to add section:", error);
    }
    return false;
  };

  // update section
  const updateSection = async (id, updatedFields) => {
    try {
      const payload = {};
      if (updatedFields.sectionName)
        payload.section_name = updatedFields.sectionName;
      if (updatedFields.course_id) payload.course_id = updatedFields.course_id;
      if (updatedFields.grading_config || updatedFields.schedule) {
        // We need to preserve existing grading_config if possible
        // but for now let's just use what's provided or an empty object
        const existing = sections.find((s) => s.id === id);
        payload.grading_config = {
          ...(existing?.grading_config || {}),
          ...(updatedFields.grading_config || {}),
          schedule: updatedFields.schedule || existing?.schedule || {},
        };
      }

      const { data } = await api.put(`/api/sections/${id}`, payload);
      if (data.success) {
        fetchSections();
        return true;
      }
    } catch (error) {
      console.error("Failed to update section:", error);
    }
    return false;
  };

  // delete section
  const deleteSection = async (id) => {
    try {
      await api.delete(`/api/sections/${id}`);
      setSections((prev) => prev.filter((sec) => sec.id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete section:", error);
      fetchSections();
    }
    return false;
  };

  // total section
  const groupedSections = sections.reduce((acc, current) => {
    const cName = current.courseName || "Unknown Course";
    if (!acc[cName]) {
      acc[cName] = [];
    }
    acc[cName].push(current);
    return acc;
  }, {});

  return {
    sections,
    courses,
    loading,
    addSection,
    addCourse,
    updateSection,
    deleteSection,
    groupedSections,
    refresh: () => {
      fetchSections();
      fetchCourses();
    },
  };
}
