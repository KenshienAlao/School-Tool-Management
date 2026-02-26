"use client";

import { X, Plus } from "lucide-react";

export function Header({ sections, isAdding, setIsAdding, setOpenSectionId }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-black tracking-tight text-gray-800">
          Management
        </h2>
        <div className="flex h-6 items-center justify-center rounded-full bg-blue-100 px-2 text-[10px] font-black text-blue-600 ring-1 ring-blue-200">
          {sections.length} TOTAL
        </div>
      </div>
      <button
        onClick={() => {
          setIsAdding(!isAdding);
          setOpenSectionId(null);
        }}
        className={`mt-4 flex w-fit items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black shadow-lg transition-all active:scale-95 ${
          isAdding
            ? "border border-gray-200 bg-gray-100 text-gray-600 shadow-none hover:bg-gray-200"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25"
        }`}
      >
        {isAdding ? (
          <X size={18} strokeWidth={3} />
        ) : (
          <Plus size={18} strokeWidth={3} />
        )}
        {isAdding ? "CANCEL" : "ADD NEW SECTION"}
      </button>
    </div>
  );
}
