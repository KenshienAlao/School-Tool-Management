import { X } from "lucide-react";
import { dayOrder } from "@/app/data/dayOrder";
import { useTimeFormatting } from "@/app/hooks/useTimeFormatting";

export function ScheduleEntryList({ schedule, onRemove }) {
  const { formatTimeRange } = useTimeFormatting();

  return (
    <div className="flex flex-col gap-2">
      {dayOrder.map((d) => {
        if (!schedule[d] || schedule[d].length === 0) return null;
        return (
          <div
            key={d}
            className="flex flex-wrap items-center gap-2 border-l-2 border-blue-200 py-1 pl-3 transition-colors hover:border-blue-400"
          >
            <span className="w-20 text-xs font-black tracking-tighter text-gray-400 uppercase">
              {d}
            </span>
            <div className="flex flex-wrap gap-2">
              {schedule[d].map((time, idx) => (
                <span
                  key={idx}
                  className="group flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100 transition-all hover:bg-blue-100"
                >
                  {formatTimeRange(time)}
                  <button
                    type="button"
                    onClick={() => onRemove(d, idx)}
                    className="text-blue-400 transition-colors hover:text-red-500"
                  >
                    <X size={14} />
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
