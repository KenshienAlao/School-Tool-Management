"use client";
import { useManageSections } from "@/app/hooks/useManageSections";
import { GradeRow } from "@/app/components/GradeManager/GradeRow";

export function GradeManager() {
  const { loading, sections, groupedSections } = useManageSections();

  return (
    <div className="col-span-3">
      <div className="flex flex-col rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
        {loading ? (
          <div className="py-8 text-center text-sm">Loading...</div>
        ) : sections.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 py-8 text-center">
            <h3 className="text-lg font-medium">
              You don't have any sections yet.{" "}
              <a
                href="/dashboard/section"
                className="cursor-pointer text-blue-400 underline"
              >
                Add one.
              </a>
            </h3>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {Object.keys(groupedSections).map((courseName) => (
              <div key={courseName} className="flex flex-col gap-2">
                {/* header title of the course */}
                <h3 className="border-b pb-2 text-lg font-bold">
                  {courseName}
                </h3>
                {/* sections under the course */}
                <div className="flex flex-col gap-3">
                  {groupedSections[courseName].map((section) => (
                    <GradeRow key={section.id} section={section} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
