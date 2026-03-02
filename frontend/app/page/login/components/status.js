import { Error } from "@/app/page/login/components/ui/error";
import { Success } from "@/app/page/login/components/ui/success";
import { AnimatePresence } from "framer-motion";

export function Status({ error, success }) {
  return (
    <AnimatePresence mode="wait">
      {error && <Error error={error} />}

      {success && <Success success={success} />}
    </AnimatePresence>
  );
}
