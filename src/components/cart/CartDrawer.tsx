"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/providers/CartProvider";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateItemQuantity,
    subtotalLabel,
    openCheckout,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[115]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[120] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-black"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.35em] text-loop-white">
                Cart
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-loop-muted transition-colors duration-700 hover:text-loop-white"
                data-cursor-magnetic="true"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm text-loop-muted">Your cart is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={item.lineId}
                      className="grid grid-cols-[88px_1fr] gap-4 border-b border-white/10 pb-6"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="88px"
                        />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-loop-white">
                          {item.name}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-loop-muted">
                          Size {item.size}
                        </p>
                        <p className="mt-3 text-[11px] tracking-wider text-loop-white">
                          {item.price}
                        </p>

                        <div className="mt-4 inline-flex w-fit items-center border border-white/10">
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(item.lineId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center text-loop-muted transition-colors duration-700 hover:text-loop-white disabled:opacity-30"
                            aria-label="Decrease quantity"
                            data-cursor-magnetic="true"
                          >
                            −
                          </button>
                          <span className="flex h-8 min-w-8 items-center justify-center border-x border-white/10 px-2 text-[10px] tracking-[0.2em] text-loop-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateItemQuantity(item.lineId, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center text-loop-muted transition-colors duration-700 hover:text-loop-white"
                            aria-label="Increase quantity"
                            data-cursor-magnetic="true"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.lineId)}
                          className="mt-4 w-fit text-[10px] uppercase tracking-[0.28em] text-loop-muted transition-colors duration-700 hover:text-loop-white"
                          data-cursor-magnetic="true"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 px-6 py-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.32em] text-loop-muted">
                  Subtotal
                </span>
                <span className="text-sm tracking-wider text-loop-white">
                  {subtotalLabel}
                </span>
              </div>

              <button
                type="button"
                onClick={openCheckout}
                disabled={items.length === 0}
                className="w-full bg-white px-6 py-3.5 text-[10px] uppercase tracking-[0.35em] text-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                data-cursor-magnetic="true"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
