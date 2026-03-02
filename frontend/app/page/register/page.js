"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useRegister } from "@/app/hooks/useRegister";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading, error, success } = useRegister();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ username, email, password, confirmPassword });
  };

  return (
    <div className="bg-surface-base bg-opacity-5 text-text-primary flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_bottom_right,var(--color-brand-primary)_0%,transparent_25%),radial-gradient(circle_at_top_left,var(--color-brand-primary)_0%,transparent_25%)] p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        {/* Header */}
        <div className="space-y-4 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-surface-elevated border-surface-muted mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-xl"
          >
            <Image
              src="/The_Colegio_de_Montalban_Seal.png"
              alt="Logo"
              width={40}
              height={40}
              className="drop-shadow-sm"
            />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-text-primary text-2xl font-black tracking-tighter">
              Create Account
            </h1>
            <p className="text-text-secondary text-sm font-medium">
              Join the{" "}
              <span className="text-brand-primary font-bold">School-Tool</span>{" "}
              community
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="border-surface-muted bg-surface-elevated overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-sm">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500"
                >
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="font-medium">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-brand-primary/20 bg-brand-primary/10 text-brand-primary mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p className="font-medium">
                    Registration successful! Redirecting...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-1.5">
                <label
                  className="text-text-secondary px-1 text-[10px] font-bold tracking-wider uppercase"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="group relative">
                  <div className="text-text-secondary group-focus-within:text-brand-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-surface-muted bg-surface-base focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border py-2.5 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-4"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  className="text-text-secondary px-1 text-[10px] font-bold tracking-wider uppercase"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="group relative">
                  <div className="text-text-secondary group-focus-within:text-brand-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-surface-muted bg-surface-base focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border py-2.5 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-4"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>

              {/* Password Fields Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    className="text-text-secondary px-1 text-[10px] font-bold tracking-wider uppercase"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="group relative">
                    <div className="text-text-secondary group-focus-within:text-brand-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-surface-muted bg-surface-base focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border py-2.5 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-4"
                      required
                      disabled={loading || success}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-text-secondary px-1 text-[10px] font-bold tracking-wider uppercase"
                    htmlFor="confirmPassword"
                  >
                    Confirm
                  </label>
                  <div className="group relative">
                    <div className="text-text-secondary group-focus-within:text-brand-primary absolute inset-y-0 left-0 flex items-center pl-4 transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-surface-muted bg-surface-base focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-2xl border py-2.5 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-4"
                      required
                      disabled={loading || success}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="bg-brand-primary shadow-brand-primary/20 hover:shadow-brand-primary/40 relative mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                  />
                ) : (
                  <>
                    Complete Registration
                    <UserPlus className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="border-surface-muted bg-surface-muted/30 border-t p-6 text-center">
            <p className="text-text-secondary text-sm font-medium">
              Already have an account?{" "}
              <Link
                href="/page/login"
                className="group text-brand-primary hover:text-brand-secondary inline-flex items-center gap-1 font-bold transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>

        {/* System Info */}
        <p className="text-text-secondary/30 text-center text-[10px] font-bold tracking-[0.3em] uppercase">
          Secure Enrollment System &bull; CDMC v1.0
        </p>
      </motion.div>
    </div>
  );
}
