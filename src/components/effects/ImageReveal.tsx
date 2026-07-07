"use client";

import { useIntersection } from "@/lib/hooks/useIntersection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className,
  aspectRatio = "16/9",
  priority = false,
}: ImageRevealProps) {
  const { ref, isVisible } = useIntersection<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      <motion.div
        className="absolute inset-0 bg-loop-black z-10 origin-left"
        initial={{ scaleX: 1 }}
        animate={isVisible ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={isVisible ? { scale: 1 } : { scale: 1.15 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
