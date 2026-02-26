export function StatusCard({ card, isActive, onClick }) {
  const Icon = card.icon;

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-4 rounded-sm p-6 shadow-sm ring-2 ring-gray-100 transition-all duration-300 hover:-translate-y-1 ${
        isActive ? `${card.activeBg} shadow-lg` : "bg-white"
      }`}
    >
      <div className="flex w-full items-start justify-between">
        {/* icon and the count */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
            isActive ? `${card.bg} text-white` : `bg-gray-50 ${card.text}`
          } ring-1 ${card.ring}`}
        >
          <Icon size={24} fill={isActive ? "currentColor" : "none"} />
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ring-1 transition-all ${
            isActive
              ? `${card.bg} text-white ring-white/50`
              : "bg-gray-50 text-gray-400 ring-gray-100"
          }`}
        >
          {card.count}
        </div>
      </div>

      {/* label and the id */}
      <div className="flex flex-col items-start text-left">
        <span
          className={`text-xs font-black tracking-[0.2em] uppercase ${
            isActive ? card.text : "text-gray-400"
          }`}
        >
          {card.label}
        </span>
      </div>
    </button>
  );
}
