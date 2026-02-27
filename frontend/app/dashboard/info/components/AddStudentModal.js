"use client";

import React, { useState } from "react";
import { X, UserPlus, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AddStudentModal({ onClose, onSubmit, initialData, title }) {
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    middle_name: initialData?.middle_name || "",
    suffix: initialData?.suffix || "",
    course: initialData?.course || "",
    status: initialData?.status || "Regular",
    contact_number: initialData?.contact_number || "",
    birthday: initialData?.birthday || "",
    student_id_school: initialData?.student_id_school || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name) {
      alert("First name and Last name are required.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="modal-content relative max-w-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="bg-brand-primary/10 text-brand-primary flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner">
                {initialData ? (
                  <Edit2 size={28} strokeWidth={2.5} />
                ) : (
                  <UserPlus size={28} strokeWidth={2.5} />
                )}
              </div>
              <div>
                <h2 className="text-text-primary text-3xl font-black tracking-tight">
                  {title ||
                    (initialData ? "Student Profile" : "Register Student")}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:bg-surface-muted flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="clarenze kenshien"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="alao"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Middle Name
                </label>
                <input
                  type="text"
                  placeholder="andres"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  value={formData.middle_name}
                  onChange={(e) =>
                    setFormData({ ...formData, middle_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Suffix
                </label>
                <input
                  type="text"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  placeholder="Jr., III"
                  value={formData.suffix}
                  onChange={(e) =>
                    setFormData({ ...formData, suffix: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Student ID
                </label>
                <input
                  type="text"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  placeholder="XX-XXXXX"
                  value={formData.student_id_school}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student_id_school: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Program
                </label>
                <input
                  type="text"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  placeholder="BSIT"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Status
                </label>
                <select
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none focus:ring-4"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none placeholder:opacity-40 focus:ring-4"
                  placeholder="09XXXXXXXXX"
                  value={formData.contact_number}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_number: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary px-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="border-surface-muted bg-surface-muted/20 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-5 py-3.5 text-sm font-black transition-all outline-none focus:ring-4"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-4 flex gap-4">
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
                {initialData ? "Refine Record" : "Confirm Registration"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
