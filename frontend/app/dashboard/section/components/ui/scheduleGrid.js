import { Schedule } from "./schedule";

export function ScheduleGrid({ schedule }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase">
          Weekly Schedule
        </span>
      </div>
      {/* schedule */}
      <Schedule schedule={schedule} />
    </div>
  );
}
