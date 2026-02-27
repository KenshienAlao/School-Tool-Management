"use client";
import React, { useState } from "react";
import { X, UserPlus, Edit2 } from "lucide-react";

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
    <div className="modal-overlay">
      <div className="modal-content max-w-xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-brand-primary/10 text-brand-primary flex h-12 w-12 items-center justify-center rounded-2xl">
              {initialData ? (
                <Edit2 size={24} strokeWidth={2.5} />
              ) : (
                <UserPlus size={24} strokeWidth={2.5} />
              )}
            </div>
            <div>
              <h2 className="text-text-primary text-2xl font-black tracking-tight">
                {title || (initialData ? "Edit Profile" : "Register Student")}
              </h2>
              <p className="text-text-secondary text-sm font-medium">
                {initialData
                  ? "Update academic and personal records"
                  : "Onboard a new student to the system"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:bg-surface-muted rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                First Name
              </label>
              <input
                type="text"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Last Name
              </label>
              <input
                type="text"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Middle Name
              </label>
              <input
                type="text"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                value={formData.middle_name}
                onChange={(e) =>
                  setFormData({ ...formData, middle_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Suffix
              </label>
              <input
                type="text"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                placeholder="e.g. Jr., III"
                value={formData.suffix}
                onChange={(e) =>
                  setFormData({ ...formData, suffix: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
              School Identification
            </label>
            <input
              type="text"
              className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
              placeholder="XX-XXXXX"
              value={formData.student_id_school}
              onChange={(e) =>
                setFormData({ ...formData, student_id_school: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Academic Program
              </label>
              <input
                type="text"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                placeholder="e.g. BSCS"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Classification Status
              </label>
              <select
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Contact Terminal
              </label>
              <input
                type="text"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                placeholder="09XXXXXXXXX"
                value={formData.contact_number}
                onChange={(e) =>
                  setFormData({ ...formData, contact_number: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-text-secondary px-1 text-[10px] font-black tracking-widest uppercase opacity-50">
                Birth Registry
              </label>
              <input
                type="date"
                className="border-surface-muted bg-surface-muted/30 text-text-primary focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
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
              className="border-surface-muted bg-surface-elevated text-text-secondary hover:bg-surface-muted flex-1 rounded-2xl border py-3 text-sm font-bold transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary flex-1 rounded-2xl py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95"
            >
              {initialData ? "Update Record" : "Register Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
