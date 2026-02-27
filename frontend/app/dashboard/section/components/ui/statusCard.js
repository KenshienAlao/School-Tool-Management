import { motion } from "framer-motion";

export function StatusCard({ card, isActive, onClick }) {
  const Icon = card.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex w-full flex-col items-start gap-5 rounded-3xl p-6 transition-all duration-300 select-none ${
        isActive
          ? "bg-surface-elevated shadow-brand-primary/10 ring-brand-primary shadow-xl ring-2"
          : "bg-surface-elevated ring-surface-muted hover:ring-brand-primary/50 shadow-sm ring-1 hover:shadow-md"
      }`}
    >
      <div className="flex w-full items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
            isActive
              ? `${card.bg} text-white shadow-lg`
              : "bg-surface-muted text-text-secondary group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
          }`}
        >
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black transition-all ${
            isActive
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-surface-muted text-text-secondary"
          }`}
        >
          {card.count}
        </div>
      </div>

      <div className="flex flex-col items-start text-left">
        <h3
          className={`mt-1 text-lg font-black transition-colors ${isActive ? "text-text-primary" : "text-text-secondary"}`}
        >
          {card.id}
        </h3>
      </div>
    </motion.button>
  );
}
