export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export const EASE_PREMIUM_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const REVEAL_DISTANCE = 24;

export const REVEAL_DURATION = 0.65;

export const TRANSITION_PREMIUM = {
  duration: REVEAL_DURATION,
  ease: EASE_PREMIUM,
} as const;

export const TRANSITION_SLOW = {
  duration: 0.85,
  ease: EASE_PREMIUM,
} as const;

export const SPRING_HEAVY = {
  stiffness: 58,
  damping: 22,
  mass: 1.15,
} as const;
