"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/page/error");
      } else {
        router.push("/dashboard/home");
      }
    }
  }, [isAuthenticated, loading, router]);

  return null;
}
