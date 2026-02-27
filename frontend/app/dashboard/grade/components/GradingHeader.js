"use client";

import React from "react";
import { Plus } from "lucide-react";

export function GradingHeader({
  filterStatus,
  setFilterStatus,
  onAddColumn,
  categoryWeights,
  columns,
}) {
  const activeCategories = Array.from(new Set(columns.map((c) => c.type)));

  return (
    <div className="border-surface-muted bg-surface-elevated flex flex-col gap-6 rounded-3xl border p-6 shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onAddColumn}
            className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> Add Work
          </button>

          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <select
                className="h-8 cursor-pointer text-sm font-black outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Passed">Passed</option>
                <option value="Incomplete">Incomplete</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {activeCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 select-none">
          {activeCategories.map((cat) => (
            <div
              key={cat}
              className="bg-surface-elevated border-surface-muted flex items-center gap-3 rounded-sm border px-3 py-1.5 shadow-sm"
            >
              <span className="text-[10px] font-black tracking-widest uppercase opacity-60">
                {cat}
              </span>
              <span className="text-brand-primary text-xs font-black">
                {categoryWeights[cat]}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
