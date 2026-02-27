import { useThemeContext } from "@/app/context/themeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="bg-surface-elevated border-surface-muted flex items-center gap-1 rounded-2xl border p-1 shadow-inner">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all ${
          theme === "light"
            ? "bg-brand-primary shadow-brand-primary/20 text-white shadow-lg"
            : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
        }`}
      >
        <Sun size={14} strokeWidth={2.5} />
        <span>Light</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all ${
          theme === "dark"
            ? "bg-brand-primary shadow-brand-primary/20 text-white shadow-lg"
            : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
        }`}
      >
        <Moon size={14} strokeWidth={2.5} />
        <span>Dark</span>
      </button>
    </div>
  );
}
