"use client";

import React from "react";
import { Search, UserPlus } from "lucide-react";

export function InfoHeader({ filterText, setFilterText, onAddStudent }) {
  return (
    <div className="border-surface-muted bg-surface-elevated flex flex-row items-center justify-between rounded-3xl border p-5 shadow-sm">
      <div className="flex w-full items-center justify-between gap-6">
        <button
          onClick={onAddStudent}
          className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95"
        >
          <UserPlus size={18} strokeWidth={3} />
          <span className="hidden sm:inline">Add Student</span>
        </button>

        <div className="relative max-w-md flex-1">
          <Search
            className="text-text-secondary absolute top-1/2 left-4 -translate-y-1/2 opacity-30"
            size={18}
            strokeWidth={3}
          />
          <input
            type="text"
            placeholder="Search Registry..."
            className="border-surface-muted bg-surface-muted/20 text-text-primary placeholder:text-text-secondary focus:border-brand-primary w-full rounded-2xl border py-3 pr-4 pl-12 text-sm font-black tracking-tight transition-all outline-none placeholder:opacity-40"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
