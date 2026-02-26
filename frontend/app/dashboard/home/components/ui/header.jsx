"use client";

// context
import { useAuth } from "@/app/context/AuthContext";
// hooks
import { useGreetings } from "../../hooks/useGreetings";
import { useTimeFormatting } from "@/app/hooks/useTimeFormatting";
// ui
import { Clock } from "lucide-react";

export function Header() {
  const { currentTime } = useTimeFormatting();
  const { user } = useAuth();
  const greeting = useGreetings();

  return (
    <div className="mb-8 flex flex-row items-center justify-between gap-2 rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {user?.username}
        </h1>
        <p className="mt-1 text-sm">Here is what's your plan today?</p>
      </div>
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Clock className="size-5" />
        <span>{currentTime}</span>
      </div>
    </div>
  );
}
