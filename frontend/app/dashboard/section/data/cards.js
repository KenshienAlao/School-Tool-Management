import { Play, FastForward, CalendarX } from "lucide-react";

export const getStatusCards = (summaryCounts) => [
  {
    id: "Ongoing",
    label: "Continuous",
    count: summaryCounts.Ongoing,
    icon: Play,
    bg: "bg-brand-primary",
  },
  {
    id: "Upcoming",
    label: "Scheduled",
    count: summaryCounts.Upcoming,
    icon: FastForward,
    bg: "bg-brand-primary",
  },
  {
    id: "No Classes",
    label: "Available",
    count: summaryCounts["No Classes"],
    icon: CalendarX,
    bg: "bg-brand-primary",
  },
];
