"use client";

import { useSearchParams } from "next/navigation";
import { SectionInfoDashboard } from "@/app/dashboard/info/components/SectionInfoDashboard";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function InfoSectionContent() {
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("id");
  // If name is missing (because we simplified the URL), we can use a generic title or fetch it later
  // For now, let's stick to the search params but handle missing name gracefully
  const sectionName = searchParams.get("name") || "Instructional Unit";

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
              Student <span className="text-brand-primary">Registry</span>
            </h1>
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary flex cursor-pointer items-center gap-2 rounded-2xl px-6 py-4 text-sm font-black transition-all active:scale-95"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            Back to Database
          </button>
        </motion.div>

        {/* Info Table Container */}
        <SectionInfoDashboard sectionId={sectionId} sectionName={sectionName} />
      </div>
    </div>
  );
}

export default function InfoSection() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="border-brand-primary h-10 w-10 animate-spin rounded-full border-b-2"></div>
        </div>
      }
    >
      <InfoSectionContent />
    </Suspense>
  );
}
