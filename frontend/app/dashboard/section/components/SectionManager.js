"use client";

// hooks
import { useManageSections } from "@/app/hooks/useManageSections";
import { useSectionManagerLogic } from "../hooks/useSectionManagerLogic";
// components
import { Header } from "./ui/header";
import { StatusSchedule } from "./statusSchedule";
import { AddSectionForm } from "./AddSectionForm";
import { SectionFilter } from "./ui/sectionFilter";
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
    <div className="col-span-3 flex flex-col gap-8">
      {/* Overview Cards */}
      <StatusSchedule
        scheduleFilter={scheduleFilter}
        setScheduleFilter={setScheduleFilter}
        summaryCounts={summaryCounts}
      />

      <div className="flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Header
            sections={sections}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
          />

          <SectionFilter
            scheduleFilter={scheduleFilter}
            setScheduleFilter={setScheduleFilter}
          />
        </div>

        {/* Add Section Form Area */}
        {isAdding && (
          <AddSectionForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAdding(false)}
          />
        )}

        {/* Sections Listing */}
        {loading ? (
          <SectionLoading />
        ) : Object.keys(filteredGroupedSections).length === 0 ? (
          <SectionEmptyState
            scheduleFilter={scheduleFilter}
            onClearFilters={() => setScheduleFilter("All")}
          />
        ) : (
          <div className="flex flex-col gap-10">
            {Object.keys(filteredGroupedSections).map((courseName) => (
              <CourseGroup
                key={courseName}
                courseName={courseName}
                sections={filteredGroupedSections[courseName]}
                updateSection={updateSection}
                deleteSection={deleteSection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
