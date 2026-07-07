"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type LenisContextType = Lenis | null;

const LenisContext = createContext<LenisContextType>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const instance = new Lenis({
      duration: reducedMotion ? 0.6 : 1.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: !reducedMotion,
      touchMultiplier: 1.35,
      wheelMultiplier: reducedMotion ? 1 : 0.92,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]'
      );

      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      event.preventDefault();
      instance.scrollTo(element, {
        duration: reducedMotion ? 0.6 : 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      instance.destroy();
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
