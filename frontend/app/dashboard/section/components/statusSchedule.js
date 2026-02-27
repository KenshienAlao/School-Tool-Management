"use client";

import { getStatusCards } from "../data/cards";
import { StatusCard } from "./ui/statusCard";
import { motion } from "framer-motion";

export function StatusSchedule({
  scheduleFilter,
  setScheduleFilter,
  summaryCounts,
}) {
  const cards = getStatusCards(summaryCounts);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-3"
    >
      {cards.map((card) => (
        <StatusCard
          key={card.id}
          card={card}
          isActive={scheduleFilter === card.id}
          onClick={() =>
            setScheduleFilter(scheduleFilter === card.id ? "All" : card.id)
          }
        />
      ))}
    </motion.div>
  );
}
