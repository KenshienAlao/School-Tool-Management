"use client";

// ui
import { AnimatePresence } from "framer-motion";
import { OnViewMenu, OnViewMenuIcon } from "@/app/components/ui/onViewMenu";
import { Menu, User, X } from "@/app/components/ui/icons";

// hooks
import { useSidebarHandle } from "@/app/hooks/sidebarHandle";
import { useProfileHandle } from "@/app/context/profileContext";

export function Sidebar({ activeView, handleLogout }) {
  const { isOpen, setIsOpen } = useSidebarHandle();
  const { setIsOpenProfile } = useProfileHandle();

  return (
    <AnimatePresence>
      {isOpen ? (
        <aside className="flex min-h-screen w-64 flex-col border-r-2 bg-gray-50">
          <div className="flex items-center justify-between border-b-2 px-3 py-5">
            <h2 className="text-lg font-bold">School Tool</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={35} />
            </button>
          </div>
          <div className="flex-1">
            <OnViewMenu activeView={activeView} />
          </div>
          <div className="flex items-center gap-3 border-t-2 px-3 py-4">
            <button onClick={() => setIsOpenProfile(true)} className="p-2">
              <User size={35} />
            </button>
            <h1 className="text-lg font-bold">Profile</h1>
          </div>
        </aside>
      ) : (
        <aside className="flex min-h-screen w-25 flex-col border-r-2 bg-gray-50">
          <div className="flex items-center justify-center border-b-2 px-3 py-5">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={35} />
            </button>
          </div>

          <div className="flex-1 text-black">
            <OnViewMenuIcon activeView={activeView} />
          </div>
        </aside>
      )}
    </AnimatePresence>
  );
}
