"use client";

import { cn } from "@/lib/utils";
import { TRANSITION_SLOW } from "@/lib/motion";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

const variants = {
  primary:
    "border border-white/20 bg-transparent text-loop-white hover:border-white/50 hover:bg-white/[0.04]",
  ghost: "border-none bg-transparent text-loop-muted hover:text-loop-white",
  outline:
    "border border-white/10 bg-transparent text-loop-white hover:border-white/35",
};

const sizes = {
  sm: "px-4 py-2 text-[10px] tracking-[0.3em]",
  md: "px-8 py-3 text-[11px] tracking-[0.35em]",
  lg: "px-10 py-4 text-xs tracking-[0.4em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        data-cursor-magnetic={magnetic ? "true" : undefined}
        className={cn(
          "relative inline-flex items-center justify-center uppercase font-light transition-[color,border-color,background-color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          variants[variant],
          sizes[size],
          className
        )}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.995 }}
        transition={TRANSITION_SLOW}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
