"use client";

// react
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// lib
import api from "@/app/lib/api";

const AuthContext = createContext(null);
const TOKEN_KEY = "SchoolToolManagementToken";

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
};

// pag check kung expired na yung token
const isTokenExpired = (decoded) => {
  if (!decoded || !decoded.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // logout
  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      console.warn("localStorage is not accessible", err);
    }
    setUser(null);
    router.push("/page/login");
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const decoded = decodeToken(token);
        if (decoded && !isTokenExpired(decoded)) {
          setUser(decoded);
        } else {
          // Token is invalid or expired
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
        }
      }
    } catch (err) {
      console.warn("Failed to read token from localStorage", err);
    } finally {
      setLoading(false);
    }

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

  /**
   * pag update para localstorage at user
   * @param {object|string} tokenPayload - The token na naglalaman ng user data.
   */
  const login = (tokenPayload) => {
    const actualToken =
      typeof tokenPayload === "string" ? tokenPayload : tokenPayload.token;

    if (!actualToken) {
      console.error("Login failed: no token provided");
      return;
    }

    try {
      localStorage.setItem(TOKEN_KEY, actualToken);
    } catch (err) {
      console.warn("Failed to write to localStorage", err);
    }

    const decoded = decodeToken(actualToken) || {};

    // pag update ng user pwede rin ma call out for information or sum shit
    setUser({
      ...decoded,
      id: decoded.id || tokenPayload.id,
      username: decoded.username || tokenPayload.username,
      email: decoded.email || tokenPayload.email,
    });

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
