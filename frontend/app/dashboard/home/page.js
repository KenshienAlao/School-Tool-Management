"use client";

// context
import { useAuth } from "@/app/context/AuthContext";

// components
import Clock from "@/app/components/Clock";
import { TaskManager } from "@/app/components/TaskManager/TaskManager";

export default function Home() {
  const { user } = useAuth();

  // Get time of day for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-dvh p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-row items-center justify-between gap-2 rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {greeting}, {user?.username}
            </h1>
            <p className="mt-1 text-sm">Here is what's your plan today?</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Clock />
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TaskManager />
        </div>
      </div>
    </div>
  );
}
