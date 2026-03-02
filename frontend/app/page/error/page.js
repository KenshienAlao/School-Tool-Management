"use client";
import { useRouter } from "next/navigation";
import { ShieldAlert, LogIn, Home } from "lucide-react";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="via-background to-background flex min-h-screen items-center justify-center bg-[#0a0a0a] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 p-4 font-sans text-white">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-white/5 p-8 text-center backdrop-blur-xl transition-all hover:border-white/10">
        {/* Icon Header */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.3)]"></div>
          <ShieldAlert
            className="relative h-12 w-12 text-red-500"
            strokeWidth={1.5}
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white/90">
            Access Denied
          </h1>
          <p className="text-white/50">
            It seems you don't have a valid token to access this page. Please
            log in to continue.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={() => router.push("/page/login")}
            className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95"
          >
            <LogIn className="h-4 w-4" />
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}
