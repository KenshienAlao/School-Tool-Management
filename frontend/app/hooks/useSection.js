import { useState, useEffect } from "react";
import api from "@/app/lib/api";

/**
 * Fetches the logged-in student's assigned section from the backend.
 *
 * Returns:
 *   section  – { section_id, section_name } | null
 *   loading  – boolean
 *   error    – string | null
 */
export function useSection() {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSection() {
      try {
        const res = await api.get("/api/students/me/section");
        if (!cancelled) {
          setSection(res.data.data); // { section_id, section_name }
        }
      } catch (err) {
        if (!cancelled) {
          // 404 just means no section assigned yet — not a hard error
          if (err.response?.status === 404) {
            setSection(null);
          } else {
            setError(err.response?.data?.message ?? "Failed to fetch section");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSection();
    return () => {
      cancelled = true;
    };
  }, []);

  return { section, loading, error };
}

/**
 * Fetches all sections (admin/teacher view).
 *
 * Returns:
 *   sections – Array<{ id, name, created_at }>
 *   loading  – boolean
 *   error    – string | null
 */
export function useSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSections() {
      try {
        const res = await api.get("/api/sections");
        if (!cancelled) setSections(res.data.data?.sections ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message ?? "Failed to fetch sections");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSections();
    return () => {
      cancelled = true;
    };
  }, []);

  return { sections, loading, error };
}

/**
 * Fetches all students in a given section.
 *
 * @param {number|string} sectionId
 * Returns:
 *   students – Array<{ id, username, email }>
 *   section  – string (section name)
 *   loading  – boolean
 *   error    – string | null
 */
export function useSectionStudents(sectionId) {
  const [students, setStudents] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sectionId) return;
    let cancelled = false;

    async function fetchStudents() {
      try {
        const res = await api.get(`/api/sections/${sectionId}/students`);
        if (!cancelled) {
          setStudents(res.data.data?.students ?? []);
          setSectionName(res.data.data?.section ?? "");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message ?? "Failed to fetch students");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStudents();
    return () => {
      cancelled = true;
    };
  }, [sectionId]);

  return { students, sectionName, loading, error };
}
