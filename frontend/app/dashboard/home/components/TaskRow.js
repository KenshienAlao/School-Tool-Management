// lib
import { format } from "date-fns";

// ui
import { TrashIcon, CheckCircle } from "@/app/components/ui/icons";
import { Edit2Icon } from "lucide-react";

import { motion } from "framer-motion";

export function TaskRow({ task, onToggle, onEdit, onDelete }) {
  // Format dates
  const formattedDue = task.due_date
    ? format(new Date(task.due_date), "MMM d")
    : null;
  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date() && !task.is_done;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onEdit}
      className={`group hover:border-surface-muted hover:bg-surface-elevated flex cursor-pointer items-center justify-between rounded-2xl border border-transparent p-4 transition-all duration-300 select-none hover:shadow-sm ${task.is_done ? "bg-surface-muted/20 opacity-40" : "bg-surface-muted/40"}`}
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`shrink-0 transition-all ${task.is_done ? "text-brand-primary" : "text-text-secondary hover:text-brand-primary"}`}
        >
          <CheckCircle checked={task.is_done} size={24} strokeWidth={3} />
        </button>
        <div className="flex flex-col truncate py-1">
          <span
            className={`truncate text-base leading-tight font-black tracking-tight ${task.is_done ? "text-text-secondary line-through" : "text-text-primary"}`}
          >
            {task.title}
          </span>
          <div className="mt-2 flex items-center gap-2">
            {formattedDue && (
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-black tracking-widest uppercase ${isOverdue ? "bg-red-500/10 text-red-500" : "bg-brand-primary/10 text-brand-primary"}`}
              >
                {isOverdue ? "Overdue" : "Due"} {formattedDue}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-text-secondary shrink-0 rounded-xl p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500"
          title="Remove Task"
        >
          <TrashIcon size={18} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
