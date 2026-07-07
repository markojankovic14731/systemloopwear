"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useIntersection } from "@/lib/hooks/useIntersection";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_PREMIUM, REVEAL_DISTANCE, REVEAL_DURATION } from "@/lib/motion";
import { motion } from "framer-motion";
import type { FirstDropProduct } from "@/data/placeholders";

interface CollectionCardProps {
  product: FirstDropProduct;
  index?: number;
  onPreview: (product: FirstDropProduct) => void;
}

const CARD_IMAGE_FRAME_HEIGHT =
  "relative h-[520px] min-h-[520px] max-h-[520px] w-full shrink-0 flex-none overflow-hidden";
const CARD_IMAGE_CLASS = "object-cover";
const IMAGE_HOVER_TRANSITION =
  "transition-[transform,box-shadow] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

const DIFFERENT_FACES_CARD_IMAGE_SCALE = "origin-center scale-[1.12]";

function getCardImageClass(productId: string) {
  if (productId === "different-faces-tee") {
    return "object-contain object-center";
  }

  return CARD_IMAGE_CLASS;
}

export function CollectionCard({
  product,
  index = 0,
  onPreview,
}: CollectionCardProps) {
  const [isActive, setIsActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const { ref, isVisible } = useIntersection<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-40px",
  });

  useEffect(() => {
    if (!product.hoverImage) return;

    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    preload(product.image);
    preload(product.hoverImage);
  }, [product.image, product.hoverImage]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "u" || event.key === "U") {
        event.preventDefault();
        onPreview(product);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, onPreview, product]);

  const openPreview = () => onPreview(product);
  const cardImageClass = getCardImageClass(product.id);
  const isDifferentFacesTee = product.id === "different-faces-tee";
  const imageFrameClassName = `${CARD_IMAGE_FRAME_HEIGHT} ${IMAGE_HOVER_TRANSITION} group-hover:-translate-y-[6px] group-hover:shadow-[0_28px_56px_-28px_rgba(255,255,255,0.1)] ${
    isDifferentFacesTee ? "bg-white" : "bg-[#0a0a0a]"
  }`;

  return (
    <motion.article
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Preview ${product.title}`}
      className="group flex h-full w-full min-h-0 flex-col border border-white/10 bg-black"
      initial={
        reducedMotion ? { opacity: 0 } : { opacity: 0, y: REVEAL_DISTANCE }
      }
      animate={
        isVisible
          ? { opacity: 1, y: 0 }
          : reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: REVEAL_DISTANCE }
      }
      transition={{
        duration: reducedMotion ? 0.2 : REVEAL_DURATION,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: EASE_PREMIUM,
      }}
      onClick={openPreview}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPreview();
        }
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      data-cursor-magnetic="true"
    >
      <div className={imageFrameClassName}>
        <motion.div
          className={`absolute inset-0 ${IMAGE_HOVER_TRANSITION} group-hover:scale-[1.015]`}
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
          }
          transition={{
            duration: reducedMotion ? 0.2 : REVEAL_DURATION,
            delay: reducedMotion ? 0 : index * 0.1 + 0.12,
            ease: EASE_PREMIUM,
          }}
        >
          <div
            className={
              isDifferentFacesTee
                ? `absolute inset-0 ${DIFFERENT_FACES_CARD_IMAGE_SCALE}`
                : "absolute inset-0"
            }
          >
            {product.hoverImage ? (
              <>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  unoptimized
                  className={`${cardImageClass} transition-opacity duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <Image
                  src={product.hoverImage}
                  alt=""
                  aria-hidden="true"
                  fill
                  unoptimized
                  className={`${cardImageClass} opacity-0 transition-opacity duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </>
            ) : (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className={CARD_IMAGE_CLASS}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-black/0 pb-10 transition-colors duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-black/10">
          <span className="translate-y-2 border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.35em] text-loop-white opacity-0 transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            {product.buttonLabel}
          </span>
        </div>
      </div>

      <div className="flex min-h-[148px] flex-1 flex-col gap-4 border-t border-white/10 px-5 py-6 md:min-h-[156px] md:px-6 md:py-7">
        <h3 className="min-h-[2.75rem] text-[11px] font-light uppercase tracking-[0.22em] text-loop-muted transition-colors duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-loop-white">
          {product.title}
        </h3>

        <div className="mt-auto flex flex-col gap-3">
          {product.oldPrice ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] tracking-wider text-loop-muted line-through">
                  {product.oldPrice}
                </span>
                <span className="text-[11px] tracking-wider text-loop-white">
                  {product.price}
                </span>
              </div>
              {product.badge && (
                <span className="inline-flex w-fit border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.28em] text-loop-muted">
                  {product.badge}
                </span>
              )}
            </div>
          ) : (
            <p className="text-[11px] tracking-wider text-loop-white">{product.price}</p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
