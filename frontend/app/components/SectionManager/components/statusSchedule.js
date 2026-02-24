import { Play, FastForward, CalendarX } from "lucide-react";

export function StatusSchedule({
  scheduleFilter,
  setScheduleFilter,
  summaryCounts,
}) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <button
        onClick={() =>
          setScheduleFilter(scheduleFilter === "Ongoing" ? "All" : "Ongoing")
        }
        className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all hover:shadow-md ${
          scheduleFilter === "Ongoing"
            ? "border-green-500 bg-green-50"
            : "border-gray-100 bg-white"
        }`}
      >
        <div
          className={`mb-2 rounded-full p-2 ${scheduleFilter === "Ongoing" ? "bg-green-500 text-white" : "bg-green-100 text-green-600"}`}
        >
          <Play size={20} fill="currentColor" />
        </div>
        <span className="text-sm font-medium text-gray-500">
          Ongoing Classes
        </span>
        <span className="text-2xl font-bold text-green-700">
          {summaryCounts.Ongoing}
        </span>
      </button>

      <button
        onClick={() =>
          setScheduleFilter(scheduleFilter === "Upcoming" ? "All" : "Upcoming")
        }
        className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all hover:shadow-md ${
          scheduleFilter === "Upcoming"
            ? "border-blue-500 bg-blue-50"
            : "border-gray-100 bg-white"
        }`}
      >
        <div
          className={`mb-2 rounded-full p-2 ${scheduleFilter === "Upcoming" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"}`}
        >
          <FastForward size={20} fill="currentColor" />
        </div>
        <span className="text-sm font-medium text-gray-500">
          Upcoming Classes
        </span>
        <span className="text-2xl font-bold text-blue-700">
          {summaryCounts.Upcoming}
        </span>
      </button>

      <button
        onClick={() =>
          setScheduleFilter(
            scheduleFilter === "No Classes" ? "All" : "No Classes",
          )
        }
        className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all hover:shadow-md ${
          scheduleFilter === "No Classes"
            ? "border-gray-500 bg-gray-50"
            : "border-gray-100 bg-white"
        }`}
      >
        <div
          className={`mb-2 rounded-full p-2 ${scheduleFilter === "No Classes" ? "bg-gray-500 text-white" : "bg-gray-100 text-gray-600"}`}
        >
          <CalendarX size={20} />
        </div>
        <span className="text-sm font-medium text-gray-500">
          No Scheduled Classes
        </span>
        <span className="text-2xl font-bold text-gray-700">
          {summaryCounts["No Classes"]}
        </span>
      </button>
    </div>
  );
}
