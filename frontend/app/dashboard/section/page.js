import { SectionManager } from "@/app/dashboard/section/components/SectionManager";

export default function Section() {
  return (
    <div className="h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-7xl">
        {/* header section */}
        <div className="mb-8 flex flex-row items-center justify-between gap-2 rounded-sm p-8 shadow-sm ring-2 ring-gray-100">
          <div className="size-full text-center">
            <h1 className="text-3xl font-bold tracking-tight">Section</h1>
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
