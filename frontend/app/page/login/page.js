"use client";
import { useState } from "react";
import Link from "next/link";

import { useLogin } from "@/app/hooks/useLogin";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, success } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h1>

        {error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded border border-green-400 bg-green-100 p-3 text-sm text-green-700">
            Login successful! You can now login.
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-black transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="transition-active w-full transform rounded-lg bg-blue-600 py-3 font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/page/register"
              className="font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
