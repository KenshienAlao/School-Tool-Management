"use client";
import { useCallback } from "react";
import api from "@/app/lib/api";
import { useSections } from "@/app/hooks/useSections";
import { useCourses } from "@/app/hooks/useCourses";

export function useManageSections(options = { autoFetch: true }) {
  const {
    sections,
    loading: sectionsLoading,
    fetchSections,
    addSection: baseAddSection,
    updateSection,
    deleteSection,
    groupedSections,
  } = useSections(options);

  const {
    courses,
    loading: coursesLoading,
    fetchCourses,
    addCourse,
  } = useCourses(options);

  const loading = sectionsLoading || coursesLoading;

  // add section with course resolution
  const handleAddSection = useCallback(
    async (sectionData) => {
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
            const newCourse = await addCourse(sectionData.courseName);
            const freshCourses = await api.get("/api/courses");
            const newlyCreated = freshCourses.data.data.courses.find(
              (c) => c.course_name === sectionData.courseName,
            );
            courseId = newlyCreated?.course_id;
          }
        }

        return await baseAddSection({
          ...sectionData,
          course_id: courseId,
        });
      } catch (error) {
        console.error("Failed to add section:", error);
      }
      return false;
    },
    [courses, addCourse, baseAddSection],
  );

  return {
    sections,
    courses,
    loading,
    addSection: handleAddSection,
    addCourse,
    updateSection,
    deleteSection,
    groupedSections,
    refresh: useCallback(() => {
      fetchSections();
      fetchCourses();
    }, [fetchSections, fetchCourses]),
  };
}
