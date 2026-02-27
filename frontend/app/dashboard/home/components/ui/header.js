"use client";

// context
import { useAuth } from "@/app/context/AuthContext";
// hooks
import { useGreetings } from "../../hooks/useGreetings";
import { useTimeFormatting } from "@/app/hooks/useTimeFormatting";
// ui
import { Clock } from "lucide-react";

import { motion } from "framer-motion";

export function Header() {
  const { currentTime } = useTimeFormatting();
  const { user } = useAuth();
  const greeting = useGreetings();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-surface-muted bg-surface-elevated mb-10 flex flex-row items-center justify-between gap-6 rounded-3xl border p-10 shadow-sm"
    >
      <div className="space-y-1">
        <h1 className="text-text-primary text-4xl font-black tracking-tight">
          {greeting},{" "}
          <span className="text-brand-primary">{user?.username}</span>
        </h1>
      </div>
      <div className="bg-brand-primary/10 hover:bg-brand-primary/15 flex items-center gap-3 rounded-2xl px-6 py-4 transition-all">
        <Clock className="text-brand-primary size-6" strokeWidth={2.5} />
        <span className="text-brand-primary text-xl font-black tracking-tight">
          {currentTime}
        </span>
      </div>
    </motion.div>
  );
}
