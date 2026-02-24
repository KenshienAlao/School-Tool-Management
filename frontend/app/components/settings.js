"use client";

// ui
import { motion, AnimatePresence } from "framer-motion";
import { BackdropProfile } from "@/app/components/ui/backdrop";
import { UserIcon, XIcon } from "@/app/components/ui/icons";
// context
import { useProfileHandle } from "@/app/context/profileContext";
import { useAuth } from "@/app/context/AuthContext";
// components
import { ThemeToggle } from "@/app/components/themeToggle";

export function Settings() {
  const { isOpenProfile, setIsOpenProfile } = useProfileHandle();
  const { logout, user } = useAuth();

  return (
    <AnimatePresence>
      {isOpenProfile && (
        <>
          <BackdropProfile setIsOpenProfile={setIsOpenProfile} />

          <motion.div
            key="settings-card"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="bg-main fixed top-10 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-2xl p-6 shadow-2xl ring-3 ring-gray-100"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mb-4 text-end">
              <button
                onClick={() => setIsOpenProfile(false)}
                className="p-1 transition hover:bg-gray-100"
              >
                <XIcon size={25} />
              </button>
            </div>
            <div className="flex items-center gap-3 border-b-2 pb-4">
              <UserIcon size={100} />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">{user?.username}</h1>
                <h2 className="text-blue-400">{user?.email}</h2>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="flex items-center justify-between px-5">
                <h1 className="text-lg font-bold">Preference</h1>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-end px-5">
                <button
                  onClick={logout}
                  className="rounded-md bg-red-500 px-4 py-2 text-lg font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
