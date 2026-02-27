import { dayOrder } from "@/app/data/dayOrder";

export function DaySelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-surface-muted bg-surface-elevated text-text-primary focus:ring-brand-primary/10 focus:border-brand-primary h-[50px] w-full cursor-pointer rounded-2xl border px-4 text-sm font-bold shadow-sm transition-all outline-none focus:ring-4"
    >
      {dayOrder.map((d) => (
        <option key={d} value={d}>
          {d}
        </option>
      ))}
    </select>
  );
}
