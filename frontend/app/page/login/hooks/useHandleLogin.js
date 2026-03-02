"use client";
import { useState } from "react";
import { useLogin } from "@/app/hooks/useLogin";

export function useHandleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, success, loading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    error,
    success,
    loading,
  };
}
