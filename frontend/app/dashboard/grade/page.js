import { GradeManager } from "@/app/dashboard/grade/components/GradeManager";

export default function Grade() {
  return (
    <div className="h-dvh overflow-y-auto p-4">
      <div className="mx-auto max-w-7xl">
        {/* header section */}
        <div className="border-surface-muted bg-surface-elevated mb-10 flex flex-row items-center justify-center gap-6 rounded-3xl border p-10 text-center shadow-sm">
          <div className="size-full">
            <h1 className="text-text-primary text-4xl font-black tracking-tight">
              Assessment & Grading
            </h1>
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
