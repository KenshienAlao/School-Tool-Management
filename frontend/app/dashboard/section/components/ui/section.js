export function Section({ section }) {
  return (
    <div className="flex flex-col">
      <span className="text-lg font-bold text-gray-800 uppercase">
        {section.sectionName}
      </span>
    </div>
  );
}
