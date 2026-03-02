import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Success({ success }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="border-brand-primary/20 bg-brand-primary/10 text-brand-primary mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm"
    >
      <CheckCircle2 className="h-5 w-5 shrink-0" />
      <p className="font-medium">{success}</p>
    </motion.div>
  );
}
