export function FormInput({ label, id, className = "", ...props }) {
  return (
    <div className={`flex flex-1 flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className="text-text-secondary pl-1 text-[10px] font-black tracking-widest uppercase opacity-50"
      >
        {label}
      </label>
      <input
        id={id}
        className="border-surface-muted bg-surface-elevated text-text-primary placeholder:text-text-secondary/30 focus:ring-brand-primary/10 focus:border-brand-primary w-full rounded-2xl border px-5 py-3.5 text-sm font-black shadow-sm transition-all outline-none focus:ring-4"
        {...props}
      />
    </div>
  );
}
