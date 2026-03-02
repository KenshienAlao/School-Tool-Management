"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function useProtectedRoute() {
  const { authStatus, loading } = useAuth();
  const router = useRouter();
  const isAuthenticated = authStatus === "authenticated";

  useEffect(() => {
    if (!loading) {
      if (authStatus === "missing") {
        router.push("/page/error");
      } else if (authStatus === "expired") {
        router.push("/page/login");
      }
    }
  }, [authStatus, loading, router]);

  return { authStatus, loading, isAuthenticated };
}
