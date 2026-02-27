"use client";
import { useSearchParams } from "next/navigation";
import { SectionGradeDashboard } from "@/app/dashboard/grade/components/SectionGradeDashboard";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function GradeSectionContent() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("id");
  const sectionName = searchParams.get("name") || "Unknown Section";

  return (
    <div className="custom-scrollbar h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-full">
        {/* header section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-surface-muted bg-surface-elevated mb-10 flex flex-row items-center justify-between gap-6 rounded-3xl border p-10 shadow-sm"
        >
          <div className="space-y-1">
            <h1 className="text-text-primary text-4xl font-black tracking-tight">
              Grading <span className="text-brand-primary">Dashboard</span>
            </h1>
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-4 text-sm font-black transition-all active:scale-95"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            Back to Registry
          </button>
        </motion.div>

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
