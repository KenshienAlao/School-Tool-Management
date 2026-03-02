"use client";
import { motion } from "framer-motion";
import { useHandleLogin } from "@/app/page/login/hooks/useHandleLogin";
import { Header } from "@/app/page/login/components/header";
import { Status } from "@/app/page/login/components/status";
import { Email } from "@/app/page/login/components/email";
import { Password } from "@/app/page/login/components/password";
import { Footer } from "@/app/page/login/components/footer";
import { Submit } from "@/app/page/login/components/submit";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    error,
    success,
    loading,
  } = useHandleLogin();

  return (
    <div className="bg-surface-base bg-opacity-5 text-text-primary flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,var(--color-brand-primary)_0%,transparent_25%),radial-gradient(circle_at_bottom_left,var(--color-brand-primary)_0%,transparent_25%)] p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Logo & Header */}
        <Header />

        {/* Auth Card */}
        <div className="border-surface-muted bg-surface-elevated overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-sm">
          <div className="p-8">
            <Status error={error} success={success} />

            {/* form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <Email email={email} setEmail={setEmail} loading={loading} />

              {/* Password Field */}
              <Password
                password={password}
                setPassword={setPassword}
                loading={loading}
              />

              {/* Submit Button */}
              <Submit loading={loading} />
            </form>
          </div>

          {/* Footer Link */}
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}
