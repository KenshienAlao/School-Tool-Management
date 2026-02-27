import { useState, useEffect } from "react";

export function useSidebarHandle() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar_open");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("sidebar_open", JSON.stringify(isOpen));
  }, [isOpen]);

  return { isOpen, setIsOpen };
}
