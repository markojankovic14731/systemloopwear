"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers/LenisProvider";

export function useGsapLenis() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);
}
