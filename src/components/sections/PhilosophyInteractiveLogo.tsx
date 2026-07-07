"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SPRING_HEAVY } from "@/lib/motion";

const LOGO_MASK = {
  WebkitMaskImage: "url(/logo.svg)",
  maskImage: "url(/logo.svg)",
  WebkitMaskSize: "contain",
  maskSize: "contain" as const,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat" as const,
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

const EXTRUSION_LAYERS = 12;
const EXTRUSION_DEPTH = 22;
const MAX_ROTATE_X = 28;
const MAX_ROTATE_Y = 42;

interface PhilosophyInteractiveLogoProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function PhilosophyInteractiveLogo({
  sectionRef,
}: PhilosophyInteractiveLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isSectionActiveRef = useRef(false);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const isSectionActive = useInView(sectionRef, {
    amount: 0.12,
    margin: "-5% 0px",
  });

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const targetRotateX = useMotionValue(0);
  const targetRotateY = useMotionValue(0);

  const rotateX = useSpring(targetRotateX, SPRING_HEAVY);
  const rotateY = useSpring(targetRotateY, SPRING_HEAVY);

  const logoTransform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const highlightX = useTransform(pointerX, [0, 1], [28, 72]);
  const highlightY = useTransform(pointerY, [0, 1], [22, 78]);
  const highlightBackground = useTransform(
    [highlightX, highlightY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 24%, transparent 58%)`
  );

  const resetRotation = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    targetRotateX.set(0);
    targetRotateY.set(0);
  };

  const updateRotationFromViewport = (clientX: number, clientY: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const normalizedX = (clientX - centerX) / centerX;
    const normalizedY = (clientY - centerY) / centerY;
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    pointerX.set(0.5 + clampedX * 0.5);
    pointerY.set(0.5 + clampedY * 0.5);
    targetRotateY.set(clampedX * MAX_ROTATE_Y);
    targetRotateX.set(-clampedY * MAX_ROTATE_X);
  };

  useEffect(() => {
    isSectionActiveRef.current = isSectionActive;
    if (!isSectionActive) {
      resetRotation();
    }
  }, [isSectionActive]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isSectionActiveRef.current) return;
      updateRotationFromViewport(event.clientX, event.clientY);
    };

    const handleWindowLeave = () => {
      resetRotation();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleWindowLeave
      );
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative z-20 mx-auto mt-[calc(4rem+135px)] flex h-[280px] w-full max-w-[520px] translate-y-[100px] cursor-default items-center justify-center md:mt-[calc(6rem+135px)] md:h-[360px] md:max-w-[640px]"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div
        className="relative h-[min(42vw,220px)] w-[min(42vw,220px)] md:h-[min(28vw,280px)] md:w-[min(28vw,280px)]"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <motion.div
          ref={logoRef}
          className="relative h-full w-full"
          style={{
            transform: logoTransform,
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
        >
          {Array.from({ length: EXTRUSION_LAYERS }, (_, index) => {
            const depth =
              -EXTRUSION_DEPTH / 2 +
              (index / (EXTRUSION_LAYERS - 1)) * EXTRUSION_DEPTH;
            const shade = 12 + index * 5;

            return (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  ...LOGO_MASK,
                  transform: `translateZ(${depth}px)`,
                  background: `linear-gradient(145deg, rgb(${shade}, ${shade}, ${shade}) 0%, rgb(${shade + 28}, ${shade + 28}, ${shade + 30}) 48%, rgb(${Math.max(8, shade - 6)}, ${Math.max(8, shade - 6)}, ${Math.max(8, shade - 4)}) 100%)`,
                  opacity:
                    index === EXTRUSION_LAYERS - 1 ? 1 : 0.55 + index * 0.03,
                }}
              />
            );
          })}

          <div
            className="absolute inset-0"
            style={{
              ...LOGO_MASK,
              transform: `translateZ(${EXTRUSION_DEPTH / 2 + 1}px)`,
              background:
                "linear-gradient(145deg, #ececec 0%, #9a9a9a 34%, #2f2f2f 72%, #121212 100%)",
            }}
          />

          <motion.div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              ...LOGO_MASK,
              transform: `translateZ(${EXTRUSION_DEPTH / 2 + 2}px)`,
              background: highlightBackground,
            }}
          />

          <div
            className="absolute inset-0 opacity-35 mix-blend-overlay"
            style={{
              ...LOGO_MASK,
              transform: `translateZ(${EXTRUSION_DEPTH / 2 + 3}px)`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 42%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 h-10 w-[min(36vw,180px)] -translate-x-1/2 rounded-full bg-white/[0.04] blur-2xl md:bottom-10 md:h-12 md:w-[min(24vw,240px)]"
        aria-hidden="true"
      />
    </motion.div>
  );
}
