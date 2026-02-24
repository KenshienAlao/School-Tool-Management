"use client";
import { useState, useEffect } from "react";
import api from "@/app/lib/api";

export function useManageSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  // time for assigning
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // open the info of the section
  const [isOpen, setIsOpen] = useState(false);
  // edit
  const [isEditing, setIsEditing] = useState(false);

  // fetch data
  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/sections");
      if (data.success) {
        setSections(data.data?.sections || []);
      }
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // add section
  const addSection = async (newSection) => {
    try {
      const { data } = await api.post("/api/sections", newSection);
      if (data.success) {
        // Re-fetch to get the assigned DB ID
        fetchSections();
      }
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  };

  // update section
  const updateSection = async (id, updatedFields) => {
    try {
      const { data } = await api.put(`/api/sections/${id}`, updatedFields);
      if (data.success) {
        fetchSections();
      }
    } catch (error) {
      console.error("Failed to update section:", error);
    }
  };

  // delete section
  const deleteSection = async (id) => {
    try {
      // update
      setSections((prev) => prev.filter((sec) => sec.id !== id));
      await api.delete(`/api/sections/${id}`);
    } catch (error) {
      console.error("Failed to delete section:", error);
      fetchSections(); // Revert on failure
    }
  };

  // total section
  const groupedSections = sections.reduce((acc, current) => {
    if (!acc[current.courseName]) {
      acc[current.courseName] = [];
    }
    acc[current.courseName].push(current);
    return acc;
  }, {});

  const handleAddTime = () => {
    if (startTime && endTime) {
      setEditSchedule((prev) => ({
        ...prev,
        [selectDay]: [...(prev[selectDay] || []), `${startTime}-${endTime}`],
      }));
      setStartTime("");
      setEndTime("");
    }
  };

  return {
    sections,
    loading,
    addSection,
    updateSection,
    deleteSection,
    groupedSections,
    handleAddTime,
    // time assign
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    // edit
    isEditing,
    setIsEditing,
    // open the info of the schedule
    isOpen,
    setIsOpen,
  };
}
