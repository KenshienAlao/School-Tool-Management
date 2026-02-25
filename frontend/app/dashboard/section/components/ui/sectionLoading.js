export function SectionLoading() {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-blue-600"></div>
      <p className="text-sm font-medium text-gray-400">
        Fetching your sections...
      </p>
    </div>
  );
}
