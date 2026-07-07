"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useLenis } from "@/providers/LenisProvider";

const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const LOGO_SPIN_DURATION = 1.75;
const LOGO_SPIN_TIMES = [0, 0.22, 0.52, 0.84, 1] as const;
const TEXT_DELAY = LOGO_SPIN_DURATION + 0.2;
const SUBTITLE_DELAY = TEXT_DELAY + 0.55;
const BUTTON_DELAY = SUBTITLE_DELAY + 0.4;
const SCROLL_HINT_DELAY = BUTTON_DELAY + 0.5;
const COLLECTION_SCROLL_OFFSET = 180;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const lenis = useLenis();

  const handleEnter = () => {
    const collection = document.getElementById("collection");
    if (collection) {
      lenis?.scrollTo(collection, {
        duration: 2,
        offset: COLLECTION_SCROLL_OFFSET,
      });
    }
  };

  return (
    <Section ref={sectionRef} fullHeight className="flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ backgroundColor: "#000000" }} />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ opacity, y, scale }}
      >
        <div className="relative inline-block">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[98%] max-w-none -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-full w-full"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                className="h-full w-full"
                initial={{ opacity: 0, rotateY: 0, filter: "blur(0px)" }}
                animate={{
                  opacity: [0, 0.25, 0.25, 0.25, 0.25],
                  rotateY: [0, 720, 1440, 2520, 2520],
                  filter: [
                    "blur(0px)",
                    "blur(6px)",
                    "blur(10px)",
                    "blur(10px)",
                    "blur(0px)",
                  ],
                }}
                transition={{
                  duration: LOGO_SPIN_DURATION,
                  times: [...LOGO_SPIN_TIMES],
                  ease: [
                    EASE_PREMIUM,
                    "linear",
                    "linear",
                    "linear",
                    EASE_PREMIUM,
                  ],
                  opacity: {
                    duration: LOGO_SPIN_DURATION,
                    times: [...LOGO_SPIN_TIMES],
                    ease: EASE_PREMIUM,
                  },
                }}
                style={{
                  transformOrigin: "50% 50%",
                  transformStyle: "preserve-3d",
                  willChange: "transform, filter, opacity",
                }}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt=""
                  className="w-full max-w-none grayscale contrast-[1.15] brightness-[0.72]"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>
          <motion.h1
            className="relative z-[1] text-display text-[clamp(3rem,12vw,14rem)] text-loop-white mb-6 md:mb-10"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: TEXT_DELAY,
              ease: EASE_PREMIUM,
            }}
          >
            ENTER
            <br />
            <span className="chrome-text">THE LOOP</span>
          </motion.h1>
        </div>

        <motion.p
          className="text-editorial text-loop-muted text-sm md:text-base tracking-widest uppercase mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: SUBTITLE_DELAY, ease: EASE_PREMIUM }}
        >
          There is no beginning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: BUTTON_DELAY, ease: EASE_PREMIUM }}
        >
          <Button onClick={handleEnter} size="lg">
            Enter
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: SCROLL_HINT_DELAY, duration: 1 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-loop-muted">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </Section>
  );
}
