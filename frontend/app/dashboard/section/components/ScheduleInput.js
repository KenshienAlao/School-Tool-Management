"use client";

import { Plus } from "lucide-react";
import { useScheduleControls } from "../hooks/useScheduleControls";
// ui
import { TimeInput } from "./ui/timeInput";
import { DaySelector } from "./ui/daySelector";
import { ScheduleEntryList } from "./ui/scheduleEntryList";

export function ScheduleInput({ schedule, setSchedule }) {
  const {
    selectDay,
    setSelectDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleAddTime,
    handleRemoveTime,
  } = useScheduleControls(setSchedule);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-6">
        {/* Entry Panel */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-text-secondary pl-1 text-[10px] font-black tracking-widest uppercase opacity-50">
              Day
            </span>
            <DaySelector value={selectDay} onChange={setSelectDay} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-text-secondary pl-1 text-[10px] font-black tracking-widest uppercase opacity-50">
              Session Range
            </span>
            <div className="flex items-center gap-3">
              <TimeInput value={startTime} onChange={setStartTime} />
              <TimeInput value={endTime} onChange={setEndTime} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddTime}
          disabled={!startTime || !endTime}
          className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary disabled:bg-brand-primary/20 flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Add</span>
        </button>
      </div>

      {/* Active Slots */}
      <div className="flex flex-col gap-4">
        <ScheduleEntryList schedule={schedule} onRemove={handleRemoveTime} />
      </div>
    </div>
  );
}
