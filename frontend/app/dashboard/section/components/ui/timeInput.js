import { Clock } from "lucide-react";

export function TimeInput({ value, onChange, label = "" }) {
  return (
    <div className="relative">
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-32 rounded-lg border border-gray-300 p-2 pl-8 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
      />
      <Clock
        className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-400"
        size={14}
      />
      {label && (
        <span className="absolute -top-5 left-0 text-[10px] font-bold text-gray-400 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
