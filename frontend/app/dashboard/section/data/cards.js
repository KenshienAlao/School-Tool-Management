import { Play, FastForward, CalendarX } from "lucide-react";

export const getStatusCards = (summaryCounts) => [
  {
    id: "Ongoing",
    label: "Ongoing",
    count: summaryCounts.Ongoing,
    icon: Play,
    color: "emerald",
    bg: "bg-emerald-500",
    text: "text-emerald-600",
    activeBg: "bg-emerald-50",
  },
  {
    id: "Upcoming",
    label: "Upcoming",
    count: summaryCounts.Upcoming,
    icon: FastForward,
    color: "blue",
    bg: "bg-blue-500",
    text: "text-blue-600",
    activeBg: "bg-blue-50",
  },
  {
    id: "No Classes",
    label: "Idle",
    count: summaryCounts["No Classes"],
    icon: CalendarX,
    color: "slate",
    bg: "bg-slate-500",
    text: "text-slate-600",
    activeBg: "bg-slate-50",
  },
];
