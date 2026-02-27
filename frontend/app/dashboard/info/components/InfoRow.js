"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users2, ChevronRight } from "lucide-react";

export function InfoRow({ section }) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/dashboard/info/section?id=${section.id}`);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      onClick={handleNavigate}
      className="bg-surface-elevated border-surface-muted/50 hover:border-brand-primary/30 group flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:shadow-md"
    >
      <div className="flex flex-1 items-center gap-5 overflow-hidden">
        <div className="bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:shadow-brand-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all group-hover:text-white group-hover:shadow-lg">
          <Users2 size={22} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col truncate py-1">
          <p className="text-text-primary truncate text-base font-black tracking-tight uppercase">
            {section.sectionName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
