"use client";

import { getStatusCards } from "../data/cards";
import { StatusCard } from "./ui/statusCard";

export function StatusSchedule({
  scheduleFilter,
  setScheduleFilter,
  summaryCounts,
}) {
  const cards = getStatusCards(summaryCounts);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
    </div>
  );
}
