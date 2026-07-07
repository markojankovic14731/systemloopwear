"use client";

import { useEffect, useRef } from "react";

interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.35, radius = 80 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, radius]);

  return ref;
}
