"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavUnderlineLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

export function NavUnderlineLink({
  href,
  className,
  children,
  external = false,
}: NavUnderlineLinkProps) {
  const classes = cn(
    "group relative text-[10px] tracking-[0.3em] uppercase text-loop-muted transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-loop-white",
    className
  );

  const underline = (
    <span
      aria-hidden="true"
      className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-loop-white/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
    />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-cursor-magnetic="true"
      >
        {children}
        {underline}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-cursor-magnetic="true">
      {children}
      {underline}
    </Link>
  );
}
