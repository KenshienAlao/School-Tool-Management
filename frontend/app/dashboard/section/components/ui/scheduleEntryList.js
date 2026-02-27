import { X } from "lucide-react";
import { dayOrder } from "@/app/data/dayOrder";
import { useTimeFormatting } from "@/app/hooks/useTimeFormatting";

export function ScheduleEntryList({ schedule, onRemove }) {
  const { formatTimeRange } = useTimeFormatting();

  return (
    <div className="flex flex-col gap-3">
      {dayOrder.map((d) => {
        if (!schedule[d] || schedule[d].length === 0) return null;
        return (
          <div
            key={d}
            className="border-brand-primary/20 hover:border-brand-primary flex flex-wrap items-center gap-3 border-l-3 py-1 pl-4 transition-all"
          >
            <span className="text-text-secondary w-20 text-[10px] font-black tracking-widest uppercase opacity-60">
              {d}
            </span>
            <div className="flex flex-wrap gap-2">
              {schedule[d].map((time, idx) => (
                <span
                  key={idx}
                  className="group bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-black shadow-sm transition-all"
                >
                  {formatTimeRange(time)}
                  <button
                    type="button"
                    onClick={() => onRemove(d, idx)}
                    className="text-brand-primary/50 transition-all hover:scale-110 hover:text-red-500"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
