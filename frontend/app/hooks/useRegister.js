"use client";

import { useState } from "react";
import { authService } from "../lib/services/authService";
import { useRouter } from "next/navigation";

import { getValidationErrorMessage } from "../lib/validation";

export function useRegister() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async ({ username, email, password, confirmPassword }) => {
    const usernameError = getValidationErrorMessage("username", username);
    const emailError = getValidationErrorMessage("email", email);
    const passwordError = getValidationErrorMessage("password", password);

    if (usernameError || emailError || passwordError) {
      setError(usernameError || emailError || passwordError);
      return null;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return null;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authService.register({
        username,
        email,
        password,
      });
      if (response.success) {
        setSuccess(true);
        router.push("/page/login");
        return response;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError(err.displayMessage || "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
}
