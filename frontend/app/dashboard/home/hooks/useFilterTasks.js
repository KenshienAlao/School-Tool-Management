export function useFilterTasks(tasks = []) {
  const pendingTasks = tasks.filter((t) => !t.is_done);
  const completedTasks = tasks.filter((t) => t.is_done);
  return { pendingTasks, completedTasks };
}
