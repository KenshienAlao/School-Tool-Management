import { useState } from "react";

export function useSidebarHandle() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
