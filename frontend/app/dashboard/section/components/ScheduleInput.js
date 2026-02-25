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
    <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-gray-50/30 p-5 shadow-inner">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-black tracking-widest text-gray-400 uppercase">
          Add Schedule Entry
        </label>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Day
            </span>
            <DaySelector value={selectDay} onChange={setSelectDay} />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Start
              </span>
              <TimeInput value={startTime} onChange={setStartTime} />
            </div>

            <span className="mt-7 text-[10px] font-black text-gray-300 uppercase">
              to
            </span>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                End
              </span>
              <TimeInput value={endTime} onChange={setEndTime} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddTime}
            disabled={!startTime || !endTime}
            className="flex h-[38px] items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 disabled:bg-blue-200 disabled:shadow-none"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-gray-100"></div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-black tracking-widest text-gray-400 uppercase">
          Current Schedule
        </label>
        <ScheduleEntryList schedule={schedule} onRemove={handleRemoveTime} />
      </div>
    </div>
  );
}
