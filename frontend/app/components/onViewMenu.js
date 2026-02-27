// framer-motion
import { motion, AnimatePresence } from "framer-motion";
// react
import Link from "next/link";
// data
import { menu } from "@/app/data/menuLink";

export function OnViewMenu({ activeView = "home", isOpen = true }) {
  return (
    <div
      className={`flex h-full flex-col gap-2 p-4 ${!isOpen && "items-center"}`}
    >
      {menu.map((item) => {
        const isActive = activeView === item.id;
        return (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className={`group relative flex items-center transition-all duration-300 ${
              isOpen ? "gap-3 px-4 py-2.5" : "justify-center p-2.5"
            } ${
              isActive
                ? "bg-brand-primary shadow-brand-primary/20 text-white shadow-lg"
                : "text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary"
            }`}
          >
            <item.icon
              size={20}
              strokeWidth={isActive ? 2.5 : 2}
              className="shrink-0"
            />

            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0, x: -10 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden text-sm font-black tracking-tight whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </div>
  );
}

export function OnViewMenuIcon({ activeView = "home" }) {
  // Maintaining for legacy support if needed elsewhere
  return <OnViewMenu activeView={activeView} isOpen={false} />;
}
