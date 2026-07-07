import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ id, className, children, fullHeight = false }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative w-full",
          fullHeight && "min-h-screen",
          className
        )}
      >
        {children}
      </section>
    );
  }
);
