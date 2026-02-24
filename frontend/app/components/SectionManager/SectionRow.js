"use client";

// react
import { useState } from "react";
// icons
import { Clock } from "lucide-react";
// data
import { dayOrder } from "@/app/data/dayOrder";
import { useManageSections } from "@/app/hooks/useManageSections";

const formatTime12hr = (time24) => {
  const [hour, min] = time24.split(":");
  let h = parseInt(hour, 10);
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return min === "00" ? `${h}${ampm}` : `${h}:${min}${ampm}`;
};

const formatTimeRange = (rangeText) => {
  const [start, end] = rangeText.split("-");
  return `${formatTime12hr(start)}–${formatTime12hr(end)}`;
};

export function SectionRow({ section, onUpdate, onDelete }) {
  const {
    handleAddTime,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    isEditing,
    setIsEditing,
    isOpen,
    setIsOpen,
  } = useManageSections();

  // edit (section/schedule)
  const [editSchedule, setEditSchedule] = useState(section.schedule);
  const [editSectionName, setEditSectionName] = useState(section.sectionName);

  const [selectDay, setSelectDay] = useState("Monday");

  const handleSave = () => {
    if (editSectionName.trim()) {
      onUpdate({
        sectionName: editSectionName.trim(),
        schedule: editSchedule,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditSectionName(section.sectionName);
    setEditSchedule(section.schedule);
    setIsEditing(false);
  };

  const handleRemoveTime = (day, idx) => {
    setEditSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-white transition-all">
      {/* Row */}
      <div
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
        onClick={() => !isEditing && setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-800">
          {section.courseName}-{section.sectionName}
        </span>

        <div className="flex gap-2">
          {!isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
                setIsOpen(true);
              }}
              className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-neutral-700"
            >
              Edit
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-neutral-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="border-t border-gray-100 p-4">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Section Name</label>
                <input
                  type="text"
                  value={editSectionName}
                  onChange={(e) => setEditSectionName(e.target.value)}
                  className="rounded border border-gray-300 p-2 text-sm"
                />
              </div>

              {/* Edit Schedule */}
              <div className="flex flex-col gap-2 rounded border border-gray-300 bg-white p-3">
                <span className="text-sm font-medium">
                  Edit Schedule Entries
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectDay}
                    onChange={(e) => setSelectDay(e.target.value)}
                    className="rounded-md border border-gray-300 p-1 text-sm"
                  >
                    {dayOrder.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <div className="relative w-fit">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="rounded-md border border-gray-300 p-1 pl-8 text-sm"
                    />
                    <Clock
                      className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
                      size={18}
                    />
                  </div>
                  <span className="text-sm">to</span>
                  <div className="relative w-fit">
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="rounded-md border border-gray-300 p-1 pl-8 text-sm"
                    />
                    <Clock
                      className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
                      size={18}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTime}
                    disabled={!startTime || !endTime}
                    className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 flex flex-col gap-1 text-sm">
                  {dayOrder.map((day) => {
                    if (!editSchedule[day] || editSchedule[day].length === 0)
                      return null;
                    return (
                      <div key={day} className="flex items-center gap-2">
                        <span className="w-24 font-medium">{day}:</span>
                        {editSchedule[day].map((time, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-1 rounded bg-gray-100 px-2 pl-2 text-gray-700"
                          >
                            {formatTimeRange(time)}
                            <button
                              onClick={() => handleRemoveTime(day, idx)}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            // details section
            <div className="flex flex-col gap-2">
              <span className="mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Schedule Details
              </span>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {dayOrder.map((day) => (
                  <div
                    key={day}
                    className="flex flex-col rounded border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <span className="mb-2 border-b pb-1 font-semibold text-gray-800">
                      {day}
                    </span>
                    {section.schedule[day] &&
                    section.schedule[day].length > 0 ? (
                      <div className="flex flex-col gap-1 text-sm">
                        {section.schedule[day].map((time, idx) => (
                          <span
                            key={idx}
                            className="py -1 rounded bg-gray-50 px-2 text-xs"
                          >
                            {formatTimeRange(time)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        No classes
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
