"use client";

import React from "react";
import { X, Plus, Target, Percent } from "lucide-react";
import { motion } from "framer-motion";

export function AddColumnModal({
  newCol,
  setNewCol,
  isCustomType,
  setIsCustomType,
  categoryTypes,
  onClose,
  onSubmit,
  categoryWeights,
}) {
  React.useEffect(() => {
    if (newCol.weight === "" || newCol.weight === 0) {
      const initialType = isCustomType ? newCol.customType : newCol.type;
      const weight = categoryWeights[initialType];
      if (weight !== undefined) {
        setNewCol((prev) => ({ ...prev, weight }));
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="modal-content max-w-xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Feature Bar */}
        <div className="bg-brand-primary h-1.5 w-full"></div>

        <div className="p-8">
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 text-brand-primary flex h-10 w-10 items-center justify-center rounded-xl">
                  <Plus size={20} strokeWidth={3} />
                </div>
                <h2 className="text-text-primary text-2xl font-black tracking-tight">
                  Add Work
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:bg-surface-muted rounded-full p-2 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Work Type
              </label>
              <div className="relative">
                <select
                  className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full appearance-none rounded-2xl border px-5 py-4 text-sm font-black transition-all outline-none focus:ring-4"
                  value={isCustomType ? "+" : newCol.type}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "+") {
                      setIsCustomType(true);
                      setNewCol({ ...newCol, weight: "" });
                    } else {
                      setIsCustomType(false);
                      const existingWeight = categoryWeights[val] || "";
                      setNewCol({
                        ...newCol,
                        type: val,
                        weight: existingWeight,
                      });
                    }
                  }}
                >
                  {categoryTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value="+">Custom Work (+)</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 opacity-30">
                  <Target size={18} />
                </div>
              </div>
            </div>

            {isCustomType && (
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                  Custom Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Recitation"
                  className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-4 text-sm font-black transition-all outline-none focus:ring-4"
                  value={newCol.customType}
                  onChange={(e) =>
                    setNewCol({ ...newCol, customType: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                  Total Score
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="100"
                    className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-4 text-sm font-black transition-all outline-none focus:ring-4"
                    value={newCol.limit}
                    onChange={(e) =>
                      setNewCol({ ...newCol, limit: e.target.value })
                    }
                    required
                    min="1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                  Percentage (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="20"
                    className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-4 text-sm font-black transition-all outline-none focus:ring-4"
                    value={newCol.weight}
                    onChange={(e) =>
                      setNewCol({ ...newCol, weight: e.target.value })
                    }
                    min="0"
                    max="100"
                  />
                  <div className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 opacity-30">
                    <Percent size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button" 
                onClick={onClose}
                className="border-surface-muted bg-surface-elevated text-text-secondary hover:bg-surface-muted flex-1 rounded-2xl border py-4 text-sm font-black transition-all active:scale-95"
              >
                Discard
              </button>
              <button
                type="submit"
                className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary flex-1 rounded-2xl py-4 text-sm font-black text-white shadow-lg transition-all active:scale-95"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
