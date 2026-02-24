import { useState, useEffect, useCallback } from "react";
import api from "@/app/lib/api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/tasks");
      setTasks(res.data.data?.tasks || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // add tasks
  const addTask = async (title, description = "", dueDate = "") => {
    try {
      const res = await api.post("/api/tasks", {
        title,
        description,
        due_date: dueDate,
      });
      await fetchTasks();
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add task");
    }
  };

  // update task
  const updateTask = async (id, updates) => {
    try {
      const res = await api.put(`/api/tasks/${id}`, updates);

      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );

      return res.data;
    } catch (err) {
      fetchTasks();
      throw new Error(err.response?.data?.message || "Failed to update task");
    }
  };

  // toggle task done
  const toggleTaskDone = async (id, currentStatus) => {
    return updateTask(id, { is_done: !currentStatus });
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/api/tasks/${id}`);

      // delete task
      setTasks((prev) => prev.filter((t) => t.id !== id));

      return res.data;
    } catch (err) {
      fetchTasks();
      throw new Error(err.response?.data?.message || "Failed to delete task");
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    toggleTaskDone,
    deleteTask,
    refreshTasks: fetchTasks,
  };
}
