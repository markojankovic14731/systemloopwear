"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIntersection } from "@/lib/hooks/useIntersection";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/commerce";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({
  product,
  index = 0,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useIntersection<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "-30px",
  });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-magnetic="true"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-loop-gray mb-4">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => onQuickView?.(product)}
            className="text-[10px] tracking-[0.35em] uppercase text-loop-white border border-white/30 px-6 py-3 hover:bg-white/10 transition-colors duration-500"
            data-cursor-magnetic="true"
          >
            Quick View
          </button>
        </motion.div>

        {!product.inStock && (
          <div className="absolute top-4 left-4">
            <span className="text-[9px] tracking-[0.3em] uppercase text-loop-muted bg-black/60 px-3 py-1">
              Soon
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3
          className={cn(
            "text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-500",
            isHovered ? "text-loop-white" : "text-loop-muted"
          )}
        >
          {product.title}
        </h3>
        <p className="text-[11px] tracking-wider text-loop-muted whitespace-nowrap">
          {product.currency} {product.price}
        </p>
      </div>
    </motion.div>
  );
}
