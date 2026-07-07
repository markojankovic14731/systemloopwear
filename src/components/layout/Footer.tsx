"use client";

import { LoopLogo } from "@/components/cursor/LoopLogo";
import { NavUnderlineLink } from "@/components/layout/NavUnderlineLink";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/system.loop" },
  { label: "TikTok", href: "https://tiktok.com/@system.loop" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative px-6 md:px-12 py-16 md:py-24 border-t border-white/5"
    >
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <div className="group flex items-center gap-4">
          <div
            aria-hidden="true"
            className="shrink-0 transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.28)]"
          >
            <LoopLogo size={18} />
          </div>
          <span className="text-[11px] tracking-[0.5em] uppercase font-light transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
            LOOP
          </span>
        </div>

        <div className="flex items-center gap-8 md:gap-12">
          {socialLinks.map((link) => (
            <NavUnderlineLink
              key={link.label}
              href={link.href}
              external
              className="text-loop-muted/80 hover:text-loop-white"
            >
              {link.label}
            </NavUnderlineLink>
          ))}
        </div>

        <p className="text-[9px] tracking-[0.2em] uppercase text-loop-muted/50">
          &copy; {new Date().getFullYear()} LOOP
        </p>
      </div>
    </footer>
  );
}
