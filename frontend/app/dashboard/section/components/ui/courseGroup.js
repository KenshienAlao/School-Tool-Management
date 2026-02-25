import { SectionRow } from "../SectionRow";

export function CourseGroup({
  courseName,
  sections,
  updateSection,
  deleteSection,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-sm font-black tracking-[0.2em] text-gray-400 uppercase">
          {courseName}
        </h3>
        <div className="h-px flex-1 bg-gray-100"></div>
        <span className="text-xs font-bold text-gray-300">
          {sections.length} sections
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <SectionRow
            key={section.id}
            section={section}
            onUpdate={(updatedData) => updateSection(section.id, updatedData)}
            onDelete={() => deleteSection(section.id)}
          />
        ))}
      </div>
    </div>
  );
}
