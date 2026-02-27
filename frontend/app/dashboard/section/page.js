import { SectionManager } from "@/app/dashboard/section/components/SectionManager";

export default function Section() {
  return (
    <div className="h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-7xl">
        {/* header section */}
        <div className="border-surface-muted bg-surface-elevated mb-10 flex flex-row items-center justify-between gap-6 rounded-3xl border p-10 text-center shadow-sm">
          <div className="size-full">
            <h1 className="text-text-primary text-4xl font-black tracking-tight">
              Section Management
            </h1>
          </div>
        </div>
        {/* dashboard widgets */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SectionManager />
        </div>
      </div>
    </div>
  );
}
