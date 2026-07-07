"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_PREMIUM_CSS } from "@/lib/motion";
import { LOOP_LOGO_SRC, LoopLogo } from "./LoopLogo";

const CURSOR_SIZE = 36;
const CURSOR_LERP = 0.16;
const SCALE_LERP = 0.14;
const INTERACTIVE_SCALE = 1.12;
const CARD_SCALE = 1.14;
const CLICK_SCALE = 0.92;
const SMOOTH_TRANSITION = `transform 420ms ${EASE_PREMIUM_CSS}, opacity 420ms ${EASE_PREMIUM_CSS}`;

export function AnimatedCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: -100, y: -100 });
  const rendered = useRef({ x: -100, y: -100 });
  const targetScale = useRef(1);
  const currentScale = useRef(1);
  const targetOpacity = useRef(1);
  const currentOpacity = useRef(1);
  const isClicking = useRef(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (window.matchMedia("(max-width: 768px)").matches) return;

    const logo = new window.Image();
    logo.src = LOOP_LOGO_SRC;

    logo.onload = () => {
      document.documentElement.classList.add("custom-cursor-active");
      setEnabled(true);
    };

    logo.onerror = () => {
      document.documentElement.classList.remove("custom-cursor-active");
      setEnabled(false);
    };

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mounted]);

  useEffect(() => {
    if (!enabled) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const applyInteractionTarget = () => {
      const { x, y } = position.current;
      const element = document.elementFromPoint(x, y);
      const productCard = element?.closest("article[data-cursor-magnetic]");
      const interactive = element?.closest("a, button, [data-cursor-magnetic='true']");

      if (isClicking.current) {
        targetScale.current = CLICK_SCALE;
        targetOpacity.current = 0.9;
        return;
      }

      if (productCard) {
        targetScale.current = CARD_SCALE;
        targetOpacity.current = 1;
        return;
      }

      if (interactive) {
        targetScale.current = INTERACTIVE_SCALE;
        targetOpacity.current = 0.94;
        return;
      }

      targetScale.current = 1;
      targetOpacity.current = 1;
    };

    const renderFrame = () => {
      const followStrength = reducedMotion ? 1 : CURSOR_LERP;
      const scaleStrength = reducedMotion ? 1 : SCALE_LERP;

      rendered.current.x +=
        (position.current.x - rendered.current.x) * followStrength;
      rendered.current.y +=
        (position.current.y - rendered.current.y) * followStrength;
      currentScale.current +=
        (targetScale.current - currentScale.current) * scaleStrength;
      currentOpacity.current +=
        (targetOpacity.current - currentOpacity.current) * scaleStrength;

      outer.style.transform = `translate3d(${rendered.current.x}px, ${rendered.current.y}px, 0) translate(-50%, -50%)`;
      inner.style.transform = `scale3d(${currentScale.current}, ${currentScale.current}, 1)`;
      inner.style.opacity = String(currentOpacity.current);

      rafRef.current = requestAnimationFrame(renderFrame);
    };

    const moveCursor = (x: number, y: number) => {
      position.current = { x, y };
      outer.style.opacity = "1";
      applyInteractionTarget();
    };

    const handleMouseMove = (event: MouseEvent) => {
      moveCursor(event.clientX, event.clientY);
    };

    const handleMouseLeave = () => {
      outer.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      outer.style.opacity = "1";
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      inner.style.transition = `transform 180ms ${EASE_PREMIUM_CSS}, opacity 180ms ${EASE_PREMIUM_CSS}`;
      applyInteractionTarget();

      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => {
        isClicking.current = false;
        inner.style.transition = SMOOTH_TRANSITION;
        applyInteractionTarget();
      }, 120);
    };

    inner.style.transition = SMOOTH_TRANSITION;
    rafRef.current = requestAnimationFrame(renderFrame);

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, reducedMotion]);

  if (!mounted || !enabled) return null;

  return createPortal(
    <div
      ref={outerRef}
      className="pointer-events-none fixed left-0 top-0 max-md:hidden"
      style={{
        zIndex: 999999,
        opacity: 0,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          transform: "scale3d(1, 1, 1)",
          opacity: 1,
          willChange: "transform, opacity",
        }}
      >
        <LoopLogo size={CURSOR_SIZE} className="h-full w-full" />
      </div>
    </div>,
    document.body
  );
}
