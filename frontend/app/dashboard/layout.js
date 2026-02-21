"use client";
import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";
import { Sidebar } from "@/app/components/Sidebar";
import { Settings } from "@/app/components/ui/settings";
import { ProfileProvider } from "@/app/context/profileContext";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { loading: authLoading } = useProtectedRoute();
  const pathname = usePathname();
  const activeView = pathname.split("/").pop() || "home";

  if (authLoading) return null;

  return (
    <ProfileProvider>
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} handleLogout={null} />
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Settings />
    </ProfileProvider>
  );
}
