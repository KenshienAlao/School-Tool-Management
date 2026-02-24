"use client";
import { useSearchParams } from "next/navigation";
import { SectionGradeDashboard } from "@/app/components/GradeManager/SectionGradeDashboard";
import { Suspense } from "react";

function GradeSectionContent() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("id");
  const sectionName = searchParams.get("name") || "Unknown Section";

  return (
    <div className="h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-full">
        {/* header section */}
        <div className="mb-6 flex flex-row items-center justify-between gap-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Grading Dashboard
            </h1>
            <p className="text-sm text-gray-500">{sectionName}</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
          >
            Back to Sections
          </button>
        </div>

        {/* Grading Table Container */}
        <SectionGradeDashboard
          sectionId={sectionId}
          sectionName={sectionName}
        />
      </div>
    </div>
  );
}

export default function GradeSection() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading section...</div>}
    >
      <GradeSectionContent />
    </Suspense>
  );
}
