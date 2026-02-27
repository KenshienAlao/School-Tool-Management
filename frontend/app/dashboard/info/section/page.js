"use client";
import { useSearchParams } from "next/navigation";
import { SectionInfoDashboard } from "@/app/dashboard/info/components/SectionInfoDashboard";
import { Suspense } from "react";

function InfoSectionContent() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("id");
  const sectionName = searchParams.get("name") || "Unknown Section";

  return (
    <div className="h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-full">
        {/* header section */}
        <div className="border-surface-muted bg-surface-elevated mb-10 flex flex-row items-center justify-between gap-6 rounded-3xl border p-8 shadow-sm">
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.history.back()}
              className="border-surface-muted bg-surface-elevated text-text-secondary hover:bg-brand-primary hover:border-brand-primary flex h-12 w-12 items-center justify-center rounded-2xl border transition-all hover:text-white active:scale-95"
              title="Back to Database"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div>
              <h1 className="text-text-primary text-3xl font-black tracking-tight">
                Section Registry
              </h1>
              <p className="text-brand-primary text-sm font-black tracking-widest uppercase opacity-80">
                {sectionName}
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="bg-brand-primary/10 text-brand-primary rounded-2xl px-6 py-3 text-xs font-black tracking-widest uppercase">
              Authenticated Access
            </span>
          </div>
        </div>

        {/* Info Table Container */}
        <SectionInfoDashboard sectionId={sectionId} sectionName={sectionName} />
      </div>
    </div>
  );
}

export default function InfoSection() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading section...</div>}
    >
      <InfoSectionContent />
    </Suspense>
  );
}
