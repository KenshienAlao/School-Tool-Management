"use client";

// react
import { useState } from "react";
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
  const [autoLogout, setAutoLogout] = useState(true);

  return (
    <AnimatePresence>
      {isOpenProfile && (
        <>
          <BackdropProfile setIsOpenProfile={setIsOpenProfile} />

          <motion.div
            key="settings-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-surface-elevated/80 border-surface-muted fixed top-20 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 rounded-3xl border p-8 shadow-2xl backdrop-blur-xl"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-text-primary text-2xl font-black tracking-tight">
                Settings
              </h2>
              <button
                onClick={() => setIsOpenProfile(false)}
                className="text-text-secondary hover:bg-surface-muted rounded-full p-2 transition-colors"
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Profile Section */}
              <div className="bg-surface-muted/50 flex items-center gap-6 rounded-2xl p-4">
                <div className="bg-brand-primary/10 text-brand-primary shrink-0 rounded-2xl p-4">
                  <UserIcon size={64} />
                </div>
                <div className="flex min-w-0 flex-col">
                  <h1 className="text-text-primary truncate text-xl font-black">
                    {user?.username}
                  </h1>
                  <h2 className="text-text-secondary truncate text-sm font-medium">
                    {user?.email}
                  </h2>
                  <div className="mt-2 flex">
                    <span className="bg-brand-primary/20 text-brand-primary ring-brand-primary/20 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ring-1 ring-inset">
                      Standard Account
                    </span>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-text-secondary px-2 text-[10px] font-black tracking-widest uppercase opacity-50">
                    General Preferences
                  </h3>
                  <div className="border-surface-muted bg-surface-muted/10 divide-surface-muted divide-y overflow-hidden rounded-2xl border">
                    <div className="flex items-center justify-between p-4 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-text-primary text-sm font-black">
                          Display Theme
                        </span>
                        <span className="text-text-secondary text-xs font-medium opacity-70">
                          Customize your visual environment
                        </span>
                      </div>
                      <ThemeToggle />
                    </div>
                    <div className="flex cursor-not-allowed items-center justify-between p-4 opacity-50 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-text-primary text-sm font-black">
                          Interface Language
                        </span>
                        <span className="text-text-secondary text-xs font-medium opacity-70">
                          English (United States)
                        </span>
                      </div>
                      <span className="text-text-secondary mr-2 text-[10px] font-black uppercase">
                        Default
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-text-secondary px-2 text-[10px] font-black tracking-widest uppercase opacity-50">
                    Security & Session
                  </h3>
                  <div className="border-surface-muted bg-surface-muted/10 divide-surface-muted divide-y overflow-hidden rounded-2xl border">
                    <div
                      onClick={() => setAutoLogout(!autoLogout)}
                      className="group/toggle hover:bg-surface-muted/50 flex cursor-pointer items-center justify-between p-4 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-text-primary text-sm font-black">
                          Automatic Logout
                        </span>
                        <span className="text-text-secondary text-xs font-medium opacity-70">
                          Terminate session after 1 hour of inactivity
                        </span>
                      </div>
                      <div
                        className={`relative h-6 w-10 shrink-0 rounded-full p-1 transition-colors duration-300 ${autoLogout ? "bg-brand-primary" : "bg-surface-muted"}`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: autoLogout ? 16 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="h-4 w-4 rounded-full bg-white shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-surface-muted border-t pt-4">
                <button
                  onClick={logout}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white active:scale-[0.98]"
                >
                  Logout from session
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
