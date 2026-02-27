import { Clock } from "lucide-react";

export function TimeInput({ value, onChange, label = "" }) {
  return (
    <div className="group relative w-full">
      <input
        type="time"
        value={value}
        onClick={(e) => e.target.showPicker?.()}
        onChange={(e) => onChange(e.target.value)}
        className="border-surface-muted bg-surface-elevated text-text-primary focus:ring-brand-primary/10 focus:border-brand-primary h-[50px] w-full rounded-2xl border px-4 pr-10 text-sm font-bold shadow-sm transition-all outline-none focus:ring-4"
      />
      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transition-all group-hover:scale-110">
        <Clock
          className="text-text-secondary group-hover:text-brand-primary opacity-40 group-hover:opacity-100"
          size={18}
          strokeWidth={2.5}
        />
      </div>
      {label && (
        <span className="text-text-secondary absolute -top-5 left-1 text-[10px] font-black tracking-widest uppercase opacity-50">
          {label}
        </span>
      )}
    </div>
  );
}
