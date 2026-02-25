export function Delete({ onDelete }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this section?")) {
          onDelete();
        }
      }}
      className="rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
    >
      Delete
    </button>
  );
}
