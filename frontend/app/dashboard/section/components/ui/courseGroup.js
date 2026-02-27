import { SectionRow } from "../SectionRow";
import { AnimatePresence } from "framer-motion";

export function CourseGroup({
  courseName,
  sections,
  updateSection,
  deleteSection,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 px-2">
        <h3 className="text-text-secondary text-xs font-black tracking-[0.2em] uppercase opacity-50">
          {courseName}
        </h3>
        <div className="bg-surface-muted h-px flex-1 opacity-50"></div>
        <span className="text-brand-primary text-[10px] font-black tracking-widest uppercase">
          {sections.length} active units
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {sections.map((section) => (
            <SectionRow
              key={section.id}
              section={section}
              onUpdate={(updatedData) => updateSection(section.id, updatedData)}
              onDelete={() => deleteSection(section.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
