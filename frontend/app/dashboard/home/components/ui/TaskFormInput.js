export function TaskFormInput({ label, id, type = "text", ...props }) {
  const InputComponent = type === "textarea" ? "textarea" : "input";
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label
        htmlFor={id}
        className="text-text-secondary text-[10px] font-black tracking-widest uppercase opacity-50"
      >
        {label}
      </label>
      <InputComponent
        id={id}
        type={type === "textarea" ? undefined : type}
        className="border-surface-muted bg-surface-elevated text-text-primary focus:ring-brand-primary/10 focus:border-brand-primary min-h-[50px] w-full resize-none rounded-2xl border px-4 py-3 text-sm font-bold shadow-sm transition-all outline-none focus:ring-4"
        {...props}
      />
    </div>
  );
}
