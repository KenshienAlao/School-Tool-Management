export function Edit({ setIsEditing, setIsOpen }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
        setIsOpen(true);
      }}
      className="rounded-lg px-3 py-1.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
    >
      Edit
    </button>
  );
}
