"use client";

import { X } from "lucide-react";
import { Schedule } from "./ui/schedule";
import { motion } from "framer-motion";

export function ScheduleModal({ section, onClose }) {
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
        className="modal-content max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-text-primary text-2xl font-black tracking-tight">
              Schedule
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:bg-surface-muted rounded-full p-2 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Schedule Grid */}
        <div className="border-surface-muted bg-surface-muted/10 rounded-2xl border p-4">
          <Schedule schedule={section.schedule} />
        </div>
      </motion.div>
    </motion.div>
  );
}
