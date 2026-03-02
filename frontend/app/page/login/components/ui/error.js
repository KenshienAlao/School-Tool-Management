import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
export function Error({ error }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500"
    >
      <AlertCircle className="h-5 w-5 shrink-0" />
      <p className="font-medium">{error}</p>
    </motion.div>
  );
}
