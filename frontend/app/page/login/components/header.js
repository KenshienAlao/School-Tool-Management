import { motion } from "framer-motion";
import Image from "next/image";

export function Header() {
  return (
    <div className="space-y-4 text-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-surface-elevated border-surface-muted mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border shadow-xl"
      >
        <Image
          src="/The_Colegio_de_Montalban_Seal.png"
          alt="Logo"
          width={56}
          height={56}
          className="drop-shadow-md"
        />
      </motion.div>
      <div className="space-y-1">
        <h1 className="text-text-primary text-3xl font-black tracking-tighter">
          Welcome Back
        </h1>
        <p className="text-text-secondary text-sm font-medium">
          Enter your credentials to access{" "}
          <span className="text-brand-primary font-bold">School-Tool</span>
        </p>
      </div>
    </div>
  );
}
