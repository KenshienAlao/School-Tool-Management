import { dayOrder } from "@/app/data/dayOrder";
import { useTimeFormatting } from "@/app/hooks/useTimeFormatting";

export function ScheduleGrid({ schedule }) {
  const { formatTimeRange } = useTimeFormatting();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          Weekly Schedule
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {dayOrder.map((day) => (
          <div
            key={day}
            className={`flex flex-col rounded-xl border p-3 ${
              schedule?.[day]?.length
                ? "border-blue-100 bg-blue-50/30"
                : "border-gray-100 bg-gray-50/30"
            }`}
          >
            <span className="mb-2 text-xs font-bold text-gray-500">{day}</span>
            {schedule?.[day] && schedule[day].length > 0 ? (
              <div className="flex flex-col gap-1.5">
                {schedule[day].map((time, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100"
                  >
                    {formatTimeRange(time)}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[11px] text-gray-300 italic">
                No classes
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
