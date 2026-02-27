"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { TaskFormInput } from "./ui/TaskFormInput";

import { motion } from "framer-motion";

export function TaskModal({ onClose, onSubmit, initialData }) {
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [dueDate, setDueDate] = useState(
    initialData?.due_date
      ? new Date(initialData.due_date).toISOString().split("T")[0]
      : "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="modal-content max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isEditing && (
              <div className="bg-brand-primary/10 text-brand-primary flex h-12 w-12 items-center justify-center rounded-2xl">
                <Plus size={24} strokeWidth={2.5} />
              </div>
            )}
            <div>
              <h2 className="text-text-primary text-2xl font-black tracking-tight">
                {isEditing ? "Description" : "New Task"}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:bg-surface-muted rounded-full p-2 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <TaskFormInput
            label="Task Title"
            id="modal-task-title"
            placeholder="e.g. Complete Project Proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <TaskFormInput
            label="Objective Description"
            id="modal-task-desc"
            type="textarea"
            rows={4}
            placeholder="Brief details about this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TaskFormInput
            label="Deadline Registry"
            id="modal-task-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="border-surface-muted bg-surface-elevated text-text-secondary hover:bg-surface-muted flex-1 rounded-2xl border py-4 text-sm font-black transition-all active:scale-95"
            >
              Cancel Entry
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary disabled:bg-brand-primary/30 flex-1 rounded-2xl py-4 text-sm font-black text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isEditing ? "Confirm Changes" : "Save Priority"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
