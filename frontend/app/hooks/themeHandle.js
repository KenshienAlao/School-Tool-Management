"use client";

import { useState, useEffect } from "react";

export function useThemeHandle() {
  const [theme, setThemeState] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(value) {
    const root = document.documentElement;
    if (value === "dark") {
      root.classList.add("dark");
    } else if (value === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      prefersDark ? root.classList.add("dark") : root.classList.remove("dark");
    }
  }

  function setTheme(value) {
    localStorage.setItem("theme", value);
    setThemeState(value);
    applyTheme(value);
  }

  return { theme, setTheme };
}
