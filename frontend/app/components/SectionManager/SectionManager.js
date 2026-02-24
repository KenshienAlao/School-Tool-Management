"use client";

// react
import { useState, useMemo } from "react";
// hooks
import { useManageSections } from "@/app/hooks/useManageSections";
// components
import { Header } from "@/app/components/SectionManager/ui/header";
import { SectionRow } from "@/app/components/SectionManager/SectionRow";
import { StatusSchedule } from "@/app/components/SectionManager/components/statusSchedule";
// icons
import { Clock, X, Play, FastForward, CalendarX } from "lucide-react";
// data
import { dayOrder } from "@/app/data/dayOrder";

export function SectionManager() {
  const {
    sections,
    loading,
    addSection,
    updateSection,
    deleteSection,
    groupedSections,
  } = useManageSections();

  const [isAdding, setIsAdding] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [schedule, setSchedule] = useState({});
  const [selectDay, setSelectDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [scheduleFilter, setScheduleFilter] = useState("All"); // "All", "No Classes", "Upcoming", "Ongoing"

  const handleAddTime = () => {
    if (startTime && endTime) {
      setSchedule((prev) => ({
        ...prev,
        [selectDay]: [...(prev[selectDay] || []), `${startTime}-${endTime}`],
      }));
      setStartTime("");
      setEndTime("");
    }
  };

  const handleRemoveTime = (day, idx) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx),
    }));
  };

  const getScheduleStatus = (sectionSchedule) => {
    const now = new Date();
    const currentDay = dayOrder[now.getDay() === 0 ? 6 : now.getDay() - 1]; // Monday is 1, Sunday is 0 -> index matching dayOrder
    const currentTimeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const hasAnyClasses = Object.values(sectionSchedule).some(
      (times) => times && times.length > 0,
    );
    if (!hasAnyClasses) return "No Classes";

    // check for ongoing or upcoming today
    const todayClasses = sectionSchedule[currentDay] || [];
    let hasUpcomingToday = false;
    for (const range of todayClasses) {
      const [start, end] = range.split("-");
      if (currentTimeStr >= start && currentTimeStr <= end) return "Ongoing";
      if (start > currentTimeStr) hasUpcomingToday = true;
    }

    if (hasUpcomingToday) return "Upcoming";

    // check for upcoming in future days of the same week
    const currentDayIdx = dayOrder.indexOf(currentDay);
    for (let i = currentDayIdx + 1; i < dayOrder.length; i++) {
      const nextDay = dayOrder[i];
      if (sectionSchedule[nextDay] && sectionSchedule[nextDay].length > 0)
        return "Upcoming";
    }

    return "No Classes"; // or technically "Completed" for the week, but filtering as No Classes for simplicity if no upcoming
  };

  const filteredGroupedSections = useMemo(() => {
    if (scheduleFilter === "All") return groupedSections;

    const filtered = {};
    Object.keys(groupedSections).forEach((course) => {
      const matches = groupedSections[course].filter((section) => {
        const status = getScheduleStatus(section.schedule);
        return status === scheduleFilter;
      });
      if (matches.length > 0) {
        filtered[course] = matches;
      }
    });
    return filtered;
  }, [groupedSections, scheduleFilter, getScheduleStatus]);

  // Calculate Summary Counts
  const summaryCounts = useMemo(() => {
    const counts = { Ongoing: 0, Upcoming: 0, "No Classes": 0 };
    sections.forEach((section) => {
      const status = getScheduleStatus(section.schedule);
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    return counts;
  }, [sections, getScheduleStatus]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (courseName.trim() && sectionName.trim()) {
      addSection({
        courseName: courseName.trim(),
        sectionName: sectionName.trim(),
        schedule,
      });
      setIsAdding(false);
      setCourseName("");
      setSectionName("");
      setSchedule({});
    }
  };

  return (
    <div className="col-span-3">
      <div className="flex flex-col rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
        {/* Header */}
        <Header
          sections={sections}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />

        <StatusSchedule
          scheduleFilter={scheduleFilter}
          setScheduleFilter={setScheduleFilter}
          summaryCounts={summaryCounts}
        />

        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              Filter Schedule:
            </span>
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
              value={scheduleFilter}
              onChange={(e) => setScheduleFilter(e.target.value)}
            >
              <option value="All">All Schedules</option>
              <option value="Ongoing">Ongoing Classes</option>
              <option value="Upcoming">Upcoming Classes</option>
              <option value="No Classes">No Scheduled Classes</option>
            </select>
          </div>
          <div className="text-sm text-gray-400">
            Current Time:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Add Section Form */}
        {isAdding && (
          <form
            onSubmit={handleAddSubmit}
            className="mb-6 flex flex-col gap-4 rounded-xl border p-4 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Course Name (e.g. BSIT)"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                autoFocus
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Section Name (e.g. 1A)"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            {/* Schedule Input */}
            <div className="flex flex-col gap-2 rounded-md border p-3">
              <span className="text-sm font-semibold">Schedule Entries</span>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectDay}
                  onChange={(e) => setSelectDay(e.target.value)}
                  className="rounded-md border border-gray-300 p-2 text-sm"
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
                    className="rounded-md border border-gray-300 p-1.5 pl-8 text-sm"
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
                    className="rounded-md border border-gray-300 p-1.5 pl-8 text-sm"
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
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Add Time
                </button>
              </div>

              <div className="mt-2 flex flex-col gap-1 text-sm">
                {Object.keys(schedule).map((d) => {
                  if (!schedule[d] || schedule[d].length === 0) return null;
                  return (
                    <div key={d} className="flex flex-wrap items-center gap-2">
                      <span className="w-24 font-medium">{d}:</span>
                      {schedule[d].map((time, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-blue-800"
                        >
                          {time}
                          <button
                            type="button"
                            onClick={() => handleRemoveTime(d, idx)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <X size={18} />
                          </button>
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!courseName.trim() || !sectionName.trim()}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Section
              </button>
            </div>
          </form>
        )}

        {/* Section List */}
        {loading ? (
          <div className="py-8 text-center text-sm">Loading...</div>
        ) : sections.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 py-8 text-center">
            <h3 className="text-lg font-medium">
              You don't have any sections yet.
            </h3>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {Object.keys(filteredGroupedSections).map((courseName) => (
              <div key={courseName} className="flex flex-col gap-2">
                <h3 className="border-b pb-2 text-lg font-bold">
                  {courseName}
                </h3>
                <div className="flex flex-col gap-3">
                  {filteredGroupedSections[courseName].map((section) => (
                    <SectionRow
                      key={section.id}
                      section={section}
                      onUpdate={(updatedData) =>
                        updateSection(section.id, updatedData)
                      }
                      onDelete={() => deleteSection(section.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
