"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("SchoolToolManagementToken");
    if (!token) {  
      router.push("/page/login");
    } else {
      router.push("/page/dashboard");
    }
  }, []);

  return null;
}
