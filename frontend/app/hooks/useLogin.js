"use client";

import { useState } from "react";
import { authService } from "../lib/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

import { getValidationErrorMessage } from "../lib/validation";

export function useLogin() {
  const router = useRouter();
  const { login: updateAuthState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = async ({ email, password }) => {
    const emailError = getValidationErrorMessage("email", email);
    const passwordError = getValidationErrorMessage("password", password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return null;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        setSuccess(true);
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
