"use client";
import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";
import { Sidebar } from "@/app/components/Sidebar";
import { LogoutHandle } from "@/app/hooks/logoutHandle";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { loading: authLoading } = useProtectedRoute();
  const handleLogout = LogoutHandle();
  const pathname = usePathname();
  const activeView = pathname.split("/").pop() || "info";

  if (authLoading) return null;

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar activeView={activeView} handleLogout={handleLogout} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
