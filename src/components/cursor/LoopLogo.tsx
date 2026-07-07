import { cn } from "@/lib/utils";

export const LOOP_LOGO_SRC = "/logo.svg";

export const LOOP_LOGO_FILTER =
  "brightness(0) invert(1) drop-shadow(0 0 1px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,0.2))";

interface LoopLogoProps {
  className?: string;
  size?: number;
}

export function LoopLogo({ className, size = 36 }: LoopLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOOP_LOGO_SRC}
      alt=""
      draggable={false}
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("block select-none", className)}
      style={{
        width: size,
        height: size,
        filter: LOOP_LOGO_FILTER,
      }}
    />
  );
}
