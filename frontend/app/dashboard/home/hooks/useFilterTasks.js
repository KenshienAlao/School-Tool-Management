export function useFilterTasks(tasks = []) {
  const pendingTasks = tasks
    .filter((t) => !t.is_done)
    .sort((a, b) => {
      // Sort by due date
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date) - new Date(b.due_date);
    });

  const completedTasks = tasks.filter((t) => t.is_done);
  return { pendingTasks, completedTasks };
}
