export function SectionLoading() {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 py-8">
      <div className="border-brand-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
      <p className="text-text-secondary text-sm font-black tracking-widest uppercase opacity-50">
        Initializing Class Registry...
      </p>
    </div>
  );
}
