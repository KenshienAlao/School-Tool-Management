import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export function Submit({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-brand-primary shadow-brand-primary/20 hover:shadow-brand-primary/40 relative flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
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
          Sign In
          <LogIn className="h-4 w-4" />
        </>
      )}
    </button>
  );
}
