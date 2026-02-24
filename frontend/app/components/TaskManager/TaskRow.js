// lib
import { format } from "date-fns";

// ui
import { TrashIcon, CheckCircle } from "@/app/components/ui/icons";

export function TaskRow({ task, onToggle, onDelete }) {
  // Format dates
  const formattedDue = task.due_date
    ? format(new Date(task.due_date), "MMM d")
    : null;
  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date() && !task.is_done;

  return (
    <div
      className={`group flex items-center justify-between rounded-xl p-3 transition ${task.is_done ? "opacity-60 grayscale" : ""}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={onToggle}
          className={`shrink-0 transition-colors ${task.is_done ? "text-green-500" : " hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-500"}`}
        >
          <CheckCircle checked={task.is_done} />
        </button>
        <div className="flex flex-col truncate">
          <span
            className={`truncate text-sm font-medium ${task.is_done ? " line-through" : " dark:text-gray-200"}`}
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
        className="shrink-0 rounded-md p-2 transition hover:text-red-500"
        title="Delete task"
      >
        <TrashIcon />
      </button>
    </div>
  );
}
