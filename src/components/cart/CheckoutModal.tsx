"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/providers/CartProvider";
import type { CheckoutFormData } from "@/lib/cart-utils";

const INITIAL_FORM: CheckoutFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  street: "",
  postalCode: "",
  notes: "",
};

const inputClassName =
  "w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-loop-white outline-none transition-colors duration-700 placeholder:text-loop-muted focus:border-white/30";

export function CheckoutModal() {
  const {
    checkoutItems,
    isCheckoutOpen,
    closeCheckout,
    placeOrder,
    orderPlaced,
    isSubmittingOrder,
    orderError,
    checkoutSubtotalLabel,
  } = useCart();

  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);

  useEffect(() => {
    if (!isCheckoutOpen) return;

    setForm(INITIAL_FORM);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !orderPlaced) closeCheckout();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCheckoutOpen, closeCheckout, orderPlaced]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await placeOrder(form);
  };

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="fixed inset-0 z-[125] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={closeCheckout}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-white/10 bg-black"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
              <p
                id="checkout-title"
                className="text-[10px] uppercase tracking-[0.35em] text-loop-white"
              >
                Checkout
              </p>
              <button
                type="button"
                onClick={closeCheckout}
                className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-loop-muted transition-colors duration-700 hover:text-loop-white"
                data-cursor-magnetic="true"
              >
                Close
              </button>
            </div>

            {orderPlaced ? (
              <div className="px-6 py-16 text-center md:px-8">
                <p className="text-display text-[clamp(1.5rem,3vw,2.25rem)] text-loop-white">
                  Order received.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-loop-muted">
                  We will contact you shortly to confirm delivery.
                </p>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-10 border border-white/15 px-8 py-3 text-[10px] uppercase tracking-[0.35em] text-loop-white transition-all duration-700 hover:border-white/35"
                  data-cursor-magnetic="true"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-8 md:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      First name
                    </label>
                    <input
                      required
                      value={form.firstName}
                      onChange={(event) => updateField("firstName", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      Last name
                    </label>
                    <input
                      required
                      value={form.lastName}
                      onChange={(event) => updateField("lastName", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      Phone number
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      City
                    </label>
                    <input
                      required
                      value={form.city}
                      onChange={(event) => updateField("city", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      Postal code
                    </label>
                    <input
                      required
                      value={form.postalCode}
                      onChange={(event) => updateField("postalCode", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      Street and number
                    </label>
                    <input
                      required
                      value={form.street}
                      onChange={(event) => updateField("street", event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-loop-muted">
                      Notes / delivery instructions
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      className={`${inputClassName} resize-none`}
                    />
                  </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-loop-white">
                    Payment method
                  </p>
                  <p className="mt-3 text-sm text-loop-white">Cash on delivery only.</p>
                  <p className="mt-3 text-sm leading-relaxed text-loop-muted">
                    Card payment is currently not available. Payment is made in cash when
                    the order is delivered.
                  </p>
                </div>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-loop-muted">
                    Order summary
                  </p>
                  <ul className="space-y-4">
                    {checkoutItems.map((item) => (
                      <li
                        key={item.lineId}
                        className="flex items-start justify-between gap-4 border-b border-white/10 pb-4"
                      >
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-loop-white">
                            {item.name}
                          </p>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-loop-muted">
                            Size {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-[11px] tracking-wider text-loop-white">
                          {(item.priceAmount * item.quantity).toLocaleString("en-US")} RSN
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-loop-muted">
                      Total
                    </span>
                    <span className="text-sm tracking-wider text-loop-white">
                      {checkoutSubtotalLabel}
                    </span>
                  </div>
                </div>

                {orderError && (
                  <p className="mt-8 border border-white/10 px-4 py-3 text-sm leading-relaxed text-loop-white">
                    {orderError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={checkoutItems.length === 0 || isSubmittingOrder}
                  className="mt-10 w-full bg-white px-6 py-3.5 text-[10px] uppercase tracking-[0.35em] text-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                  data-cursor-magnetic="true"
                >
                  {isSubmittingOrder ? "Placing order..." : "Place Order"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
