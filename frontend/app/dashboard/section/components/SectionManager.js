"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// hooks
import { useManageSections } from "@/app/hooks/useManageSections";
import { useSectionManagerLogic } from "../hooks/useSectionManagerLogic";
// components
import { Header } from "./ui/header";
import { StatusSchedule } from "./statusSchedule";
import { SectionModal } from "./SectionModal";
import { SectionLoading } from "./ui/sectionLoading";
import { SectionEmptyState } from "./ui/sectionEmptyState";
import { CourseGroup } from "./ui/courseGroup";

export function SectionManager() {
  const {
    sections,
    loading,
    addSection,
    updateSection,
    deleteSection,
    groupedSections,
  } = useManageSections();

  const {
    isAdding,
    setIsAdding,
    scheduleFilter,
    setScheduleFilter,
    summaryCounts,
    filteredGroupedSections,
    handleAddSubmit,
  } = useSectionManagerLogic(sections, groupedSections, addSection);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-3 flex flex-col gap-8"
    >
      {/* Overview Cards */}
      <StatusSchedule
        scheduleFilter={scheduleFilter}
        setScheduleFilter={setScheduleFilter}
        summaryCounts={summaryCounts}
      />

      <div className="bg-surface-elevated border-surface-muted flex flex-col rounded-3xl border p-8 shadow-sm">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Header sections={sections} setIsAdding={setIsAdding} />
        </div>

        {/* Sections Listing */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SectionLoading />
              </motion.div>
            ) : Object.keys(filteredGroupedSections).length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <SectionEmptyState
                  scheduleFilter={scheduleFilter}
                  onClearFilters={() => setScheduleFilter("All")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-10"
              >
                {Object.keys(filteredGroupedSections).map((courseName) => (
                  <CourseGroup
                    key={courseName}
                    courseName={courseName}
                    sections={filteredGroupedSections[courseName]}
                    updateSection={updateSection}
                    deleteSection={deleteSection}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Section Modal */}
      <AnimatePresence>
        {isAdding && (
          <SectionModal
            onClose={() => setIsAdding(false)}
            onSubmit={handleAddSubmit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
