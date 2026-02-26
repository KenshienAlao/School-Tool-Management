// hooks
import { useFilterTasks } from "../hooks/useFilterTasks";

// ui
import { XIcon, PlusIcon } from "@/app/components/ui/icons";

export function TaskPreview({ isAdding, setIsAdding, tasks = [] }) {
  const { pendingTasks, completedTasks } = useFilterTasks(tasks);

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">My Tasks</h2>
        <p className="text-sm text-gray-500">
          {pendingTasks.length} pending, {completedTasks.length} completed
        </p>
      </div>
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
      >
        {isAdding ? <XIcon size={18} /> : <PlusIcon size={18} />}
        {isAdding ? "Cancel" : "Add Task"}
      </button>
    </div>
  );
}
