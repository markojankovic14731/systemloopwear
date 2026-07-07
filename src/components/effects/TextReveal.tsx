"use client";

import { useIntersection } from "@/lib/hooks/useIntersection";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import {
  EASE_PREMIUM,
  REVEAL_DISTANCE,
  REVEAL_DURATION,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "p",
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const { ref, isVisible } = useIntersection<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <div ref={ref}>
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 0 }
            : { y: REVEAL_DISTANCE, opacity: 0 }
        }
        animate={
          isVisible
            ? { y: 0, opacity: 1 }
            : reducedMotion
              ? { opacity: 0 }
              : { y: REVEAL_DISTANCE, opacity: 0 }
        }
        transition={{
          duration: reducedMotion ? 0.2 : REVEAL_DURATION,
          delay: reducedMotion ? 0 : delay,
          ease: EASE_PREMIUM,
        }}
      >
        <Tag className={cn(className)}>{children}</Tag>
      </motion.div>
    </div>
  );
}
