"use client";

import dynamic from "next/dynamic";
import { LenisProvider } from "@/providers/LenisProvider";
import { GsapProvider } from "@/providers/GsapProvider";
import { CartProvider } from "@/providers/CartProvider";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);

const CheckoutModal = dynamic(
  () => import("@/components/cart/CheckoutModal").then((mod) => mod.CheckoutModal),
  { ssr: false }
);

const CartToast = dynamic(
  () => import("@/components/cart/CartToast").then((mod) => mod.CartToast),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <GsapProvider>
        <CartProvider>
          {children}
          <CartDrawer />
          <CheckoutModal />
          <CartToast />
        </CartProvider>
      </GsapProvider>
    </LenisProvider>
  );
}
