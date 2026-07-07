"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LoopLogo } from "@/components/cursor/LoopLogo";
import { NavUnderlineLink } from "@/components/layout/NavUnderlineLink";
import { useCart } from "@/providers/CartProvider";
import Link from "next/link";

function NavTextButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative text-[10px] tracking-[0.3em] uppercase text-loop-muted transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-loop-white"
      data-cursor-magnetic="true"
      suppressHydrationWarning
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-loop-white/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
      />
    </button>
  );
}

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const y = useTransform(scrollY, [0, 200], [-20, 0]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
      style={{ opacity, y }}
    >
      <nav className="flex items-center justify-between max-w-[1800px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          data-cursor-magnetic="true"
        >
          <LoopLogo size={38} />
          <span className="text-[11px] tracking-[0.5em] uppercase font-light text-loop-white opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
            LOOP
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <NavUnderlineLink href="#collection">Collection</NavUnderlineLink>
          <NavUnderlineLink href="#contact">Contact</NavUnderlineLink>
          <NavTextButton onClick={openCart}>CART ({itemCount})</NavTextButton>
        </div>
      </nav>
    </motion.header>
  );
}
