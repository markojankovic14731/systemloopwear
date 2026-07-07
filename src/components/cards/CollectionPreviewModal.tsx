"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FirstDropProduct } from "@/data/placeholders";
import { useCart } from "@/providers/CartProvider";

interface CollectionPreviewModalProps {
  product: FirstDropProduct | null;
  onClose: () => void;
}

const SIZES = ["S", "M", "L", "XL"] as const;

const MODAL_DETAILS = ["• 100% Cotton", "• Printed in Serbia"];

export function CollectionPreviewModal({
  product,
  onClose,
}: CollectionPreviewModalProps) {
  const [selectedSize, setSelectedSize] = useState<(typeof SIZES)[number]>("M");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const { addItem, buyNow } = useCart();

  const hasGallery = Boolean(product?.hoverImage);
  const galleryImages = hasGallery
    ? [product!.image, product!.hoverImage!]
    : product
      ? [product.image]
      : [];

  useEffect(() => {
    if (!product) return;

    setSelectedSize("M");
    setQuantity(1);
    setImageIndex(0);
    setSlideDirection(1);

    if (product.hoverImage) {
      const preload = new window.Image();
      preload.src = product.hoverImage;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!product.hoverImage) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setSlideDirection(1);
        setImageIndex((current) => Math.min(1, current + 1));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSlideDirection(-1);
        setImageIndex((current) => Math.max(0, current - 1));
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  const showPreviousImage = () => {
    setSlideDirection(-1);
    setImageIndex((current) => Math.max(0, current - 1));
  };

  const showNextImage = () => {
    setSlideDirection(1);
    setImageIndex((current) => Math.min(galleryImages.length - 1, current + 1));
  };

  const displayedGalleryImage = hasGallery ? galleryImages[imageIndex] : null;
  const isFrontLabelActive = displayedGalleryImage === product?.image;
  const isBackLabelActive = displayedGalleryImage === product?.hoverImage;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    buyNow(product, selectedSize, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="collection-preview-title"
        >
          <motion.div
            className="relative flex max-h-[82vh] w-[84vw] max-w-[980px] flex-col overflow-hidden border border-white/10 bg-black md:grid md:grid-cols-[1.06fr_0.94fr]"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 28 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-loop-muted transition-colors duration-700 hover:border-white/25 hover:text-loop-white"
              data-cursor-magnetic="true"
            >
              Close
            </button>

            <div className="relative aspect-[4/5] max-h-[32vh] shrink-0 overflow-hidden bg-[#0a0a0a] md:aspect-auto md:h-full md:max-h-none md:min-h-0">
              {hasGallery ? (
                <>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={galleryImages[imageIndex]}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: slideDirection * 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: slideDirection * -16 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={galleryImages[imageIndex]}
                        alt={
                          imageIndex === 0
                            ? `${product.title} front`
                            : `${product.title} back`
                        }
                        fill
                        unoptimized
                        className="object-contain"
                        sizes="(max-width: 768px) 84vw, 44vw"
                        priority={imageIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={showPreviousImage}
                    disabled={imageIndex === 0}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-sm text-white/50 transition-all duration-300 hover:border-white/30 hover:bg-black/35 hover:text-white/90 disabled:pointer-events-none disabled:opacity-25"
                    data-cursor-magnetic="true"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    disabled={imageIndex === galleryImages.length - 1}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-sm text-white/50 transition-all duration-300 hover:border-white/30 hover:bg-black/35 hover:text-white/90 disabled:pointer-events-none disabled:opacity-25"
                    data-cursor-magnetic="true"
                  >
                    →
                  </button>

                  <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.32em]">
                    <span
                      className={cn(
                        "transition-opacity duration-300",
                        isFrontLabelActive
                          ? "text-loop-white opacity-100"
                          : "text-loop-white opacity-35"
                      )}
                    >
                      Front
                    </span>
                    <span className="text-loop-white opacity-25">/</span>
                    <span
                      className={cn(
                        "transition-opacity duration-300",
                        isBackLabelActive
                          ? "text-loop-white opacity-100"
                          : "text-loop-white opacity-35"
                      )}
                    >
                      Back
                    </span>
                  </div>
                </>
              ) : (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 84vw, 44vw"
                  priority
                />
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-white/10 px-7 py-7 md:border-l md:border-t-0 md:px-9 md:py-8">
              <p
                id="collection-preview-title"
                className="pr-16 text-display text-[clamp(1.35rem,2.4vw,2.15rem)] leading-[0.95] text-loop-white"
              >
                {product.title}
              </p>

              <p className="mt-2.5 text-[9px] uppercase tracking-[0.38em] text-loop-muted">
                First Drop / Limited Run
              </p>

              <div className="mt-5">
                {product.oldPrice ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm tracking-wider text-loop-muted line-through">
                      {product.oldPrice}
                    </span>
                    <span className="text-sm tracking-wider text-loop-white">
                      {product.price}
                    </span>
                    {product.badge && (
                      <span className="border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.28em] text-loop-muted">
                        {product.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-sm tracking-wider text-loop-white">{product.price}</p>
                )}
              </div>

              <p className="mt-6 max-w-md text-sm leading-[1.7] text-loop-muted">
                {product.description}
              </p>

              <div className="mt-7">
                <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-loop-muted">
                  Size
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {SIZES.map((size) => {
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center border text-[10px] uppercase tracking-[0.2em] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isSelected
                            ? "border-white bg-white text-black"
                            : "border-white/15 bg-transparent text-loop-muted hover:border-white/35 hover:text-loop-white"
                        )}
                        data-cursor-magnetic="true"
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-loop-muted">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    disabled={quantity <= 1}
                    className="flex h-9 w-9 items-center justify-center text-loop-muted transition-colors duration-700 hover:text-loop-white disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Decrease quantity"
                    data-cursor-magnetic="true"
                  >
                    −
                  </button>
                  <span className="flex h-9 min-w-9 items-center justify-center border-x border-white/10 px-3 text-[11px] tracking-[0.2em] text-loop-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="flex h-9 w-9 items-center justify-center text-loop-muted transition-colors duration-700 hover:text-loop-white"
                    aria-label="Increase quantity"
                    data-cursor-magnetic="true"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-white px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/90"
                  data-cursor-magnetic="true"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 border border-white/15 bg-transparent px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-loop-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/35 hover:bg-white/[0.03]"
                  data-cursor-magnetic="true"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-0 border-t border-white/10 pt-4 pb-4">
                <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-loop-muted">
                  Details
                </p>
                <ul className="space-y-1.5">
                  {MODAL_DETAILS.map((detail) => (
                    <li
                      key={detail}
                      className="text-[11px] leading-relaxed tracking-[0.06em] text-loop-muted"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
