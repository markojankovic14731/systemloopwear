"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress =
        (windowHeight - rect.top) / (windowHeight + rect.height);
      const y = (progress - 0.5) * speed * 200;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
}
