"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { PHILOSOPHY_LINES } from "@/data/placeholders";
import { PhilosophyInteractiveLogo } from "@/components/sections/PhilosophyInteractiveLogo";
import { EASE_PREMIUM } from "@/lib/motion";

function PhilosophyLine({
  line,
  index,
}: {
  line: string;
  index: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasRevealed = useInView(ref, {
    once: true,
    margin: "-8% 0px -8% 0px",
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: "-44% 0px -44% 0px", threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const isBright = isActive || isHovered;

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={
        hasRevealed
          ? {
              opacity: 1,
              y: 0,
              color: isBright ? "#f5f5f5" : "#666666",
            }
          : { opacity: 0, y: 56, color: "#666666" }
      }
      transition={{
        opacity: { duration: 1.2, delay: index * 0.14, ease: EASE_PREMIUM },
        y: { duration: 1.2, delay: index * 0.14, ease: EASE_PREMIUM },
        color: { duration: 0.85, ease: EASE_PREMIUM },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-editorial text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.75] tracking-[0.03em]"
    >
      {line}
    </motion.p>
  );
}

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const headlineInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const closingInView = useInView(closingRef, { once: true, margin: "-10% 0px" });

  return (
    <Section
      ref={sectionRef}
      id="philosophy"
      className="relative overflow-hidden bg-loop-black py-40 md:py-72 lg:py-80"
    >
      {/* Subtle oversized LOOP mark */}
      <div
        className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 -translate-y-[460px] top-[38%] md:top-[34%] lg:top-[32%]"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt=""
          className="w-[min(92vw,72rem)] max-w-none select-none opacity-[0.04] grayscale"
          draggable={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-0 md:gap-y-0">
          {/* Left — headline */}
          <div className="md:col-span-4 md:col-start-1 lg:col-span-4 lg:col-start-2">
            <motion.p
              className="mb-10 text-[10px] uppercase tracking-[0.45em] text-loop-muted md:mb-14"
              initial={{ opacity: 0, y: 24 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1, ease: EASE_PREMIUM }}
            >
              Philosophy
            </motion.p>

            <motion.h2
              className="text-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.88] text-loop-white"
              initial={{ opacity: 0, y: 40 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE_PREMIUM }}
            >
              QUALITY
              <br />
              OVER
              <br />
              <span className="text-loop-muted">NOISE</span>
            </motion.h2>
          </div>

          {/* Right — philosophy statements */}
          <div className="flex flex-col gap-14 md:col-span-5 md:col-start-7 md:gap-20 md:pt-32 lg:col-span-5 lg:col-start-8 lg:gap-24 lg:pt-40">
            {PHILOSOPHY_LINES.map((line, index) => (
              <PhilosophyLine key={line} line={line} index={index} />
            ))}
          </div>
        </div>

        {/* Editorial closing */}
        <motion.div
          ref={closingRef}
          className="mt-36 border-t border-white/[0.06] pt-20 md:mt-52 md:pt-28 lg:mt-64 lg:pt-32"
          initial={{ opacity: 0, y: 48 }}
          animate={closingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 1.6, ease: EASE_PREMIUM }}
        >
          <p className="text-display text-[clamp(1.75rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-loop-white/25 md:text-center">
            EVERY DETAIL EARNS ITS PLACE.
          </p>
          <PhilosophyInteractiveLogo sectionRef={sectionRef} />
        </motion.div>
      </div>
    </Section>
  );
}
