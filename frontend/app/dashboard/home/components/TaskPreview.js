// hooks
import { useFilterTasks } from "../hooks/useFilterTasks";

// ui
import { PlusIcon } from "@/app/components/ui/icons";

export function TaskPreview({ isAdding, setIsAdding, tasks = [] }) {
  const { pendingTasks, completedTasks } = useFilterTasks(tasks);

  return (
    <div className="mb-10 flex items-center justify-between px-2">
      <div>
        <h2 className="text-text-primary text-2xl font-black tracking-tight">
          Task Overview
        </h2>
      </div>
      <button
        onClick={() => setIsAdding(true)}
        className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95"
      >
        <PlusIcon size={18} strokeWidth={3} />
        Add New Task
      </button>
    </div>
  );
}
