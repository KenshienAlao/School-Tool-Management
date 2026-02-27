export function Section({ section }) {
  return (
    <div className="flex flex-col">
      <span className="text-lg font-bold uppercase">{section.sectionName}</span>
    </div>
  );
}
