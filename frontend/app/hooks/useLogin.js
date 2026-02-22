"use client";

import { useState } from "react";
import { authService } from "../lib/services/authService";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const { login: updateAuthState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        setSuccess(response.message);
        updateAuthState(response.data);
        return response;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError(err.displayMessage || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
}
