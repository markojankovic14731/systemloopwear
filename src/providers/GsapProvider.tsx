"use client";

import { useGsapLenis } from "@/lib/hooks/useGsapLenis";

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useGsapLenis();
  return <>{children}</>;
}
