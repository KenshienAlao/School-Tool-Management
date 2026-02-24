"use client";
import { useRouter } from "next/navigation";

export function GradeRow({ section }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/dashboard/grade/section?id=${section.id}&name=${encodeURIComponent(`${section.courseName}-${section.sectionName}`)}`,
    );
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-300">
      {/* Row */}
      <div
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
        onClick={handleClick}
      >
        <span className="font-semibold">
          {section.courseName}-{section.sectionName}
        </span>
      </div>
    </div>
  );
}
