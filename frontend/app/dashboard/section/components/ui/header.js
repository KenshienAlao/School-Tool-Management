"use client";

import { Plus } from "lucide-react";

import { motion } from "framer-motion";

export function Header({ sections, setIsAdding }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex w-full items-center justify-between px-2"
    >
      <div className="space-y-1">
        <h2 className="text-text-primary text-2xl font-black tracking-tight">
          Section Management
        </h2>
      </div>
      <button
        onClick={() => setIsAdding(true)}
        className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95"
      >
        <Plus size={18} strokeWidth={3} />
        Add New Section
      </button>
    </motion.div>
  );
}
