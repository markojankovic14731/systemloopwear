"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/providers/CartProvider";

export function CartToast() {
  const { toastMessage, dismissToast } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          className="fixed bottom-8 left-1/2 z-[130] -translate-x-1/2 border border-white/10 bg-black px-6 py-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismissToast}
          role="status"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-loop-white">
            {toastMessage}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
