"use client";

// components
import Clock from "@/app/components/Clock";
import { TaskManager } from "@/app/dashboard/home/components/TaskManager";
import { Header } from "./components/ui/header";

export default function Home() {
  return (
    <div className="min-h-dvh p-4">
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <Header />
        {/* dashboard widgets */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <TaskManager />
        </div>
      </div>
    </div>
  );
}
