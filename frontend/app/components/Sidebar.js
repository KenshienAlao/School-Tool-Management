"use client";

// context
import { useAuth } from "@/app/context/AuthContext";

// hooks
import { useSidebarHandle } from "@/app/hooks/sidebarHandle";
import { useProfileHandle } from "@/app/context/profileContext";

// ui
import { motion } from "framer-motion";
import { MenuIcon, UserIcon, XIcon } from "@/app/components/ui/icons";

// components
import { OnViewMenu, OnViewMenuIcon } from "@/app/components/onViewMenu";

export function Sidebar({ activeView }) {
  const { isOpen, setIsOpen } = useSidebarHandle();
  const { setIsOpenProfile } = useProfileHandle();
  const { user } = useAuth();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="border-surface-muted bg-surface-elevated flex min-h-screen flex-col overflow-hidden border-r shadow-sm"
    >
      <div className="flex h-20 items-center px-4 py-6">
        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
            className={`flex items-center gap-2 ${!isOpen && "pointer-events-none"}`}
          >
            <div className="bg-brand-primary shadow-brand-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-lg">
              <span className="text-xl font-black text-white italic select-none">
                S
              </span>
            </div>
            <h2 className="text-text-primary text-xl font-black tracking-tighter whitespace-nowrap">
              SchoolTool
            </h2>
          </motion.div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-secondary hover:bg-surface-muted hover:text-brand-primary shrink-0 rounded-xl p-2 transition-all"
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <OnViewMenu activeView={activeView} isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="border-surface-muted mt-auto overflow-hidden border-t p-4">
          <div
            className={`flex items-center gap-3 rounded-2xl p-2 transition-all ${!isOpen && "justify-center"}`}
          >
            <button
              onClick={() => setIsOpenProfile(true)}
              className="border-surface-muted bg-surface-base text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary shrink-0 rounded-xl border-2 p-1 shadow-sm transition-all"
            >
              <UserIcon size={32} />
            </button>

            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
              className={`flex flex-col items-start overflow-hidden ${!isOpen ? "w-0" : "flex-1"}`}
            >
              <span className="text-text-primary text-sm font-black whitespace-nowrap uppercase">
                {user?.username || "Guest"}
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
