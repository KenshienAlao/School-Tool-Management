"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

// hooks
import { useTasks } from "@/app/hooks/useTasks";
import { useFilterTasks } from "../hooks/useFilterTasks";

// components
import { TaskRow } from "./TaskRow";
import { TaskPreview } from "./TaskPreview";
import { TaskModal } from "./TaskModal";

export function TaskManager() {
  const { tasks, loading, addTask, updateTask, toggleTaskDone, deleteTask } =
    useTasks();
  const { pendingTasks, completedTasks } = useFilterTasks(tasks);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 lg:col-span-3"
    >
      <div className="border-surface-muted bg-surface-elevated flex flex-col rounded-3xl border p-8 shadow-sm">
        {/* Header */}
        <TaskPreview
          isAdding={isModalOpen}
          setIsAdding={handleOpenAddModal}
          tasks={tasks}
        />

        {/* Task List */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="border-brand-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
                <p className="text-text-secondary mt-4 text-sm font-bold opacity-70">
                  Updating tasks...
                </p>
              </motion.div>
            ) : tasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="bg-brand-primary/10 text-brand-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl opacity-50">
                  <CheckCircle size={32} />
                </div>
                <p className="text-text-secondary text-sm font-bold opacity-50">
                  All cleared! You have no pending tasks.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                {/* pending tasks */}
                <AnimatePresence initial={false}>
                  {pendingTasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onToggle={() => toggleTaskDone(task.id, task.is_done)}
                      onEdit={() => handleOpenEditModal(task)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}
                </AnimatePresence>

                {/* completed tasks */}
                {completedTasks.length > 0 && (
                  <>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 mb-4 flex items-center gap-4 px-2"
                    >
                      <h3 className="text-text-secondary text-[10px] font-black tracking-widest whitespace-nowrap uppercase opacity-50">
                        Completed Archive
                      </h3>
                      <div className="bg-surface-muted h-px flex-1 opacity-50"></div>
                    </motion.div>
                    <AnimatePresence initial={false}>
                      {completedTasks.map((task) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          onToggle={() => toggleTaskDone(task.id, task.is_done)}
                          onEdit={() => handleOpenEditModal(task)}
                          onDelete={() => deleteTask(task.id)}
                        />
                      ))}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
            initialData={editingTask}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
