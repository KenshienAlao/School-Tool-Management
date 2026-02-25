export function FormInput({ label, id, ...props }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className="rounded-lg border border-gray-300 px-4 py-2.5 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        {...props}
      />
    </div>
  );
}
