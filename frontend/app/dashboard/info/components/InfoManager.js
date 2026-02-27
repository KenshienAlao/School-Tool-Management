"use client";
import { useManageSections } from "@/app/hooks/useManageSections";
import { InfoRow } from "./InfoRow";

export function InfoManager() {
  const { loading, sections, groupedSections } = useManageSections();

  return (
    <div className="col-span-3">
      <div className="bg-surface-elevated border-surface-muted flex flex-col rounded-3xl border p-8 shadow-sm">
        {loading ? (
          <div className="py-20 text-center">
            <div className="border-brand-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-text-secondary mt-4 text-sm font-bold">
              Syncing student records...
            </p>
          </div>
        ) : sections.length === 0 ? (
          <div className="border-surface-muted hover:border-brand-primary/30 rounded-2xl border-2 border-dashed p-12 text-center transition-colors">
            <h3 className="text-text-primary text-xl font-black">
              No sections established yet.
            </h3>
            <p className="text-text-secondary mt-2 text-sm font-medium">
              Initialize your academic structure to begin managing students.
            </p>
            <a
              href="/dashboard/section"
              className="bg-brand-primary shadow-brand-primary/20 hover:bg-brand-secondary mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg transition-all active:scale-95"
            >
              Configure Sections
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {Object.keys(groupedSections).map((courseName) => (
              <div key={courseName} className="flex flex-col gap-6">
                <div className="flex items-center gap-4 px-2">
                  <div className="bg-brand-primary h-2 w-2 rounded-full" />
                  <h3 className="text-text-primary text-sm font-black tracking-widest uppercase">
                    {courseName}
                  </h3>
                  <div className="bg-surface-muted h-px flex-1"></div>
                  <span className="bg-brand-primary/10 text-brand-primary rounded-full px-3 py-1 text-[10px] font-black tracking-tight uppercase">
                    {groupedSections[courseName].length} Academic Units
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedSections[courseName].map((section) => (
                    <InfoRow key={section.id} section={section} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
