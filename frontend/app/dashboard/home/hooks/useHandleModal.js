"use client";

import { useTasks } from "@/app/hooks/useTasks";
import { useState } from "react";

/**
 * @param isModalOpen - checking if the modal is open
 * @param setIsModalOpen - boolean
 * @param editingTask - checking if the tasks is being editied
 * @param setEditingTask - boolean
 * @param handleOpenAddModal - modal for adding the task
 * @param handleOpenEditModal - modal for editing the tsak
 * @param handleModalSubmit - modal for submitting
 */

export function useHandleModal() {
  const { addTask, updateTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
      } else {
        await addTask(data.title, data.description, data.due_date);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Task operation failed:", err);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    handleOpenAddModal,
    handleOpenEditModal,
    handleModalSubmit,
  };
}
