import { motion } from "framer-motion";
import { Grid } from "lucide-react";

export function SectionEmptyState({ scheduleFilter, onClearFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border-surface-muted bg-surface-muted/5 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center"
    >
      <div className="bg-brand-primary/5 text-brand-primary mb-6 flex h-20 w-20 items-center justify-center rounded-2xl opacity-40">
        <Grid size={100} strokeWidth={2.5} />
      </div>
      <h3 className="text-text-primary text-2xl font-black tracking-tight">
        No Sections Found
      </h3>
      <p className="text-text-secondary mt-2 max-w-xs text-sm font-medium opacity-60">
        {scheduleFilter === "All"
          ? "The database is currently empty. Initialize your first section."
          : `No sections are "${scheduleFilter}".`}
      </p>
      {scheduleFilter !== "All" && (
        <button
          onClick={onClearFilters}
          className="text-brand-primary hover:text-brand-secondary mt-8 text-xs font-black tracking-widest uppercase transition-colors"
        >
          Reset Filters
        </button>
      )}
    </motion.div>
  );
}
