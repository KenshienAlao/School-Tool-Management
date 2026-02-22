// lib
import { format } from "date-fns";

// ui
import { TrashIcon, CheckCircle } from "@/app/components/ui/icons";

export function TaskRow({ task, onToggle, onDelete }) {
  // Format dates cleanly
  const formattedDue = task.due_date
    ? format(new Date(task.due_date), "MMM d")
    : null;
  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date() && !task.is_done;

  return (
    <div
      className={`group flex items-center justify-between rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-neutral-800/50 ${task.is_done ? "opacity-60 grayscale" : ""}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={onToggle}
          className={`shrink-0 transition-colors ${task.is_done ? "text-green-500" : "text-gray-300 hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-500"}`}
        >
          <CheckCircle checked={task.is_done} />
        </button>
        <div className="flex flex-col truncate">
          <span
            className={`truncate text-sm font-medium ${task.is_done ? "text-gray-500 line-through" : "text-gray-800 dark:text-gray-200"}`}
          >
            {task.title}
          </span>
          {task.description && (
            <span className="mt-0.5 mb-1 truncate text-xs text-gray-500 dark:text-gray-400">
              {task.description}
            </span>
          )}
          <div className="flex items-center gap-2 text-xs">
            {formattedDue && (
              <span
                className={`font-medium ${isOverdue ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}
              >
                Due {formattedDue}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="shrink-0 rounded-md p-2 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        title="Delete task"
      >
        <TrashIcon />
      </button>
    </div>
  );
}
