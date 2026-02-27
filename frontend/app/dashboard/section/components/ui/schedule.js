import { useTimeFormatting } from "@/app/hooks/useTimeFormatting";
import { dayOrder } from "@/app/data/dayOrder";

export function Schedule({ schedule }) {
  const { formatTimeRange } = useTimeFormatting();
  return (
    <div className="flex flex-col gap-3">
      {dayOrder.map((day) => {
        const hasClasses = schedule?.[day]?.length > 0;
        return (
          <div
            key={day}
            className={`flex items-center gap-6 rounded-2xl px-5 py-4 transition-all duration-300 ${
              hasClasses
                ? "bg-brand-primary/5 ring-brand-primary/20 shadow-sm ring-1"
                : "bg-surface-muted/20 opacity-40 ring-0 ring-transparent"
            }`}
          >
            {/* Day Name */}
            <span
              className={`w-24 shrink-0 text-[10px] font-black tracking-widest uppercase transition-colors ${
                hasClasses ? "text-brand-primary" : "text-text-secondary"
              }`}
            >
              {day}
            </span>

            {/* Time Slots */}
            <div className="flex flex-wrap gap-2">
              {hasClasses ? (
                schedule[day].map((time, idx) => (
                  <span
                    key={idx}
                    className="bg-surface-elevated text-brand-primary ring-brand-primary/10 rounded-xl px-4 py-1.5 text-xs font-black tracking-tight shadow-sm ring-1 transition-all hover:scale-105"
                  >
                    {formatTimeRange(time)}
                  </span>
                ))
              ) : (
                <span className="text-text-secondary text-[10px] font-black tracking-widest uppercase opacity-30">
                  No classes
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
