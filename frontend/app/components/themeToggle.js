"use client";

import { useThemeContext } from "@/app/context/themeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-md border-2 px-2 py-1"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
