"use client";
import React from "react";
import { Search, Plus } from "lucide-react";

export function InfoHeader({ filterText, setFilterText, onAddStudent }) {
  return (
    <div className="flex flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onAddStudent}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
        >
          <Plus size={18} /> Add Student
        </button>

        <div className="ml-4 flex items-center gap-2 border-l border-gray-100 pl-4">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search students..."
              className="rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
