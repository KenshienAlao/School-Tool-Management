"use client";

import { useState } from "react";

export function useAddTask(addTask) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await addTask(newTaskTitle, newTaskDescription, newTaskDue);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDue("");
      setIsAdding(false);
    } catch (err) {
      alert("Failed to add task: " + err.message);
    }
  };

  return {
    isAdding,
    setIsAdding,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    newTaskDue,
    setNewTaskDue,
    handleAddSubmit,
  };
}
