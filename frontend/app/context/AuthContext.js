"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper to decode JWT payload safely
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const isTokenExpired = (decoded) => {
    if (!decoded || !decoded.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  };

  const logout = () => {
    localStorage.removeItem("SchoolToolManagementToken");
    setUser(null);
    router.push("/page/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("SchoolToolManagementToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && !isTokenExpired(decoded)) {
        setUser(decoded);
      } else {
        // Clear token if invalid or expired
        localStorage.removeItem("SchoolToolManagementToken");
        setUser(null);
      }
    }
    setLoading(false);

    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  // global checkin
  const login = (token) => {
    const actualToken = token.token || token;
    localStorage.setItem("SchoolToolManagementToken", actualToken);
    const decoded = decodeToken(actualToken);
    setUser(decoded);
    router.push("/dashboard");
  };  

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
