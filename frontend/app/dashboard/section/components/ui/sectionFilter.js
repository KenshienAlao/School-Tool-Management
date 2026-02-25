export function SectionFilter({ scheduleFilter, setScheduleFilter }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">
        Filter
      </span>
      <select
        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        value={scheduleFilter}
        onChange={(e) => setScheduleFilter(e.target.value)}
      >
        <option value="All">All Schedules</option>
        <option value="Ongoing">Ongoing Classes</option>
        <option value="Upcoming">Upcoming Classes</option>
        <option value="No Classes">No Scheduled Classes</option>
      </select>
    </div>
  );
}
