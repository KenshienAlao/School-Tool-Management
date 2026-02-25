export function SectionEmptyState({ scheduleFilter, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-100 p-12 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-300">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800">No sections found</h3>
      <p className="mt-2 max-w-xs text-gray-500">
        {scheduleFilter === "All"
          ? "You haven't added any sections yet. Start by creating your first course section."
          : `There are currently no sessions matching "${scheduleFilter}". try selecting a different filter.`}
      </p>
      {scheduleFilter !== "All" && (
        <button
          onClick={onClearFilters}
          className="mt-6 text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
