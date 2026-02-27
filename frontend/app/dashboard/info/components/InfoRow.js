"use client";
import { useRouter } from "next/navigation";
// section ui components
import { Section } from "../../section/components/ui/section";
import { Plus } from "lucide-react";

export function InfoRow({ section }) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(
      `/dashboard/info/section?id=${section.id}&name=${encodeURIComponent(`${section.courseName}-${section.sectionName}`)}`,
    );
  };

  return (
    <div
      className="group border-surface-muted bg-surface-elevated hover:border-brand-primary/30 hover:bg-brand-primary/2 flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-md"
      onClick={handleNavigate}
    >
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Section section={section} />
        </div>
        <div className="bg-surface-muted/50 text-text-secondary group-hover:bg-brand-primary flex h-8 w-8 items-center justify-center rounded-full transition-all group-hover:text-white">
          <Plus size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
