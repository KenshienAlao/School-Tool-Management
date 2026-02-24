import { GradeManager } from "@/app/components/GradeManager/GradeManger";

export default function Grade() {
  return (
    <div className="h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-7xl">
        {/* header section */}
        <div className="mb-8 flex flex-row items-center justify-between gap-2 rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
          <div className="size-full text-center">
            <h1 className="text-3xl font-bold tracking-tight">Grade</h1>
          </div>
        </div>
        {/* dashboard widgets */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <GradeManager />
        </div>
      </div>
    </div>
  );
}
