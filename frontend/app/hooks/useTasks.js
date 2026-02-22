import { useState, useEffect, useCallback } from "react";
import api from "@/app/lib/api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title, description = "", dueDate = "") => {
    try {
      const res = await api.post("/api/tasks", {
        title,
        description,
        due_date: dueDate,
      });
      await fetchTasks(); // Refresh list to get new ID and created_at
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add task");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await api.put(`/api/tasks/${id}`, updates);

      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );

      return res.data;
    } catch (err) {
      // Re-fetch on error to sync with backend
      fetchTasks();
      throw new Error(err.response?.data?.message || "Failed to update task");
    }
  };

  const toggleTaskDone = async (id, currentStatus) => {
    return updateTask(id, { is_done: !currentStatus });
  };

  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/api/tasks/${id}`);

      // Optimistic delete
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
