"use client";

import { motion } from "framer-motion";
import { useManageSections } from "@/app/hooks/useManageSections";
import { GradeRow } from "@/app/dashboard/grade/components/GradeRow";
import { GraduationCap, ArrowRight } from "lucide-react";

export function GradeManager() {
  const { loading, sections, groupedSections } = useManageSections();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-3 flex flex-col gap-8"
    >
      <div className="bg-surface-elevated border-surface-muted flex flex-col rounded-3xl border p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="space-y-1">
            <h2 className="text-text-primary text-2xl font-black tracking-tight">
              Grade Management
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex h-[400px] flex-col items-center justify-center gap-4">
              <div className="border-brand-primary h-10 w-10 animate-spin rounded-full border-b-2"></div>
              <span className="text-text-secondary text-sm font-black tracking-widest uppercase opacity-40">
                Loading...
              </span>
            </div>
          ) : sections.length === 0 ? (
            <div className="border-surface-muted bg-surface-muted/5 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center">
              <div className="bg-brand-primary/5 text-brand-primary mb-6 flex h-20 w-20 items-center justify-center rounded-2xl opacity-40">
                <GraduationCap size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-text-primary text-2xl font-black tracking-tight">
                No Sections Found
              </h3>
              <p className="text-text-secondary mt-2 max-w-xs text-sm font-medium opacity-60">
                You haven't initialized any course units. Head over to Section
                Management to begin.
              </p>
              <a
                href="/dashboard/section"
                className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary mt-8 flex items-center gap-2 rounded-2xl px-8 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95"
              >
                Go to Sections <ArrowRight size={18} strokeWidth={3} />
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {Object.keys(groupedSections).map((courseName) => (
                <div key={courseName} className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 px-2">
                    <h3 className="text-text-secondary text-xs font-black tracking-[0.2em] uppercase opacity-50">
                      {courseName}
                    </h3>
                    <div className="bg-surface-muted h-px flex-1 opacity-50"></div>
                    <span className="text-brand-primary text-[10px] font-black tracking-widest uppercase">
                      {groupedSections[courseName].length} categories
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {groupedSections[courseName].map((section) => (
                      <GradeRow key={section.id} section={section} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
