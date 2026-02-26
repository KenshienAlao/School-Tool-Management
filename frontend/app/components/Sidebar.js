"use client";

// context
import { useAuth } from "@/app/context/AuthContext";

// hooks
import { useSidebarHandle } from "@/app/hooks/sidebarHandle";
import { useProfileHandle } from "@/app/context/profileContext";

// ui
import { AnimatePresence } from "framer-motion";
import { MenuIcon, UserIcon, XIcon } from "@/app/components/ui/icons";

// components
import { OnViewMenu, OnViewMenuIcon } from "@/app/components/onViewMenu";

export function Sidebar({ activeView }) {
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
              <XIcon size={35} />
            </button>
          </div>
          <div className="flex-1">
            <OnViewMenu activeView={activeView} />
          </div>
          <div className="flex items-center gap-3 border-t-2 px-3 py-4">
            <button onClick={() => setIsOpenProfile(true)} className="p-2">
              <UserIcon size={35} />
            </button>
            <h1 className="text-lg font-bold">{user?.username}</h1>
          </div>
        </aside>
      ) : (
        <aside className="flex min-h-screen w-25 flex-col shadow-sm ring-3 ring-gray-100">
          <div className="flex items-center justify-center px-3 py-5">
            <button onClick={() => setIsOpen(true)}>
              <MenuIcon size={35} />
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
