export function StatusCard({ card, isActive, onClick }) {
  const Icon = card.icon;

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-4 rounded-4xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isActive
          ? `${card.activeBorder} ${card.activeBg} shadow-lg ring-4 ring-${card.color}-500/10`
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="flex w-full items-start justify-between">
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
      <div className="flex flex-col items-start text-left">
        <span
          className={`text-xs font-black tracking-[0.2em] uppercase ${
            isActive ? card.text : "text-gray-400"
          }`}
        >
          {card.label}
        </span>
        <span className="text-xl font-black text-gray-800">
          {card.id === "No Classes" ? "Idle" : card.id}
        </span>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div
          className={`absolute right-4 bottom-4 h-2 w-2 rounded-full ${card.bg} animate-pulse`}
        ></div>
      )}
    </button>
  );
}
