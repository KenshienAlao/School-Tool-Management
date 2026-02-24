"use client";

// react
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  return (
    <ProfileContext.Provider value={{ isOpenProfile, setIsOpenProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileHandle() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileHandle must be used within a ProfileProvider");
  }
  return context;
}
