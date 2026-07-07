"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/effects/TextReveal";
import { useIntersection } from "@/lib/hooks/useIntersection";
import { LOOKBOOK_IMAGES } from "@/data/placeholders";
import { cn } from "@/lib/utils";

function LookbookItem({
  src,
  alt,
  span,
  index,
}: {
  src: string;
  alt: string;
  span: string;
  index: number;
}) {
  const { ref, isVisible } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden group", span)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 1.2,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative w-full h-full min-h-[200px] md:min-h-[300px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
      </div>
    </motion.div>
  );
}

export function Lookbook() {
  return (
    <Section id="lookbook" className="py-24 md:py-40">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12 md:mb-20">
        <TextReveal
          as="h2"
          className="text-display text-[clamp(2rem,5vw,5rem)] text-loop-white"
        >
          LOOKBOOK
        </TextReveal>
      </div>

      <div className="px-2 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[280px] max-w-[1800px] mx-auto">
          {LOOKBOOK_IMAGES.map((image, index) => (
            <LookbookItem
              key={image.id}
              src={image.src}
              alt={image.alt}
              span={image.span}
              index={index}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
