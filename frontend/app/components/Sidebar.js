"use client";

// context
import { useAuth } from "@/app/context/AuthContext";

// ui
import { AnimatePresence } from "framer-motion";
import { OnViewMenu, OnViewMenuIcon } from "@/app/components/onViewMenu";
import { Menu, User, X } from "@/app/components/ui/icons";

// hooks
import { useSidebarHandle } from "@/app/hooks/sidebarHandle";
import { useProfileHandle } from "@/app/context/profileContext";

export function Sidebar({ activeView, handleLogout }) {
  const { isOpen, setIsOpen } = useSidebarHandle();
  const { setIsOpenProfile } = useProfileHandle();
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen ? (
        <aside className="flex min-h-screen w-64 flex-col shadow-sm ring-3 ring-gray-100">
          <div className="flex items-center justify-between px-3 py-5">
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
            <h1 className="text-lg font-bold">{user?.username}</h1>
          </div>
        </aside>
      ) : (
        <aside className="flex min-h-screen w-25 flex-col shadow-sm ring-3 ring-gray-100">
          <div className="flex items-center justify-center px-3 py-5">
            <button onClick={() => setIsOpen(true)}>
              <Menu size={35} />
            </button>
          </div>

          <div className="flex-1">
            <OnViewMenuIcon activeView={activeView} />
          </div>
        </aside>
      )}
    </AnimatePresence>
  );
}
