"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/effects/TextReveal";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { CollectionPreviewModal } from "@/components/cards/CollectionPreviewModal";
import { FIRST_DROP_PRODUCTS } from "@/data/placeholders";
import type { FirstDropProduct } from "@/data/placeholders";

export function Collection() {
  const [previewProduct, setPreviewProduct] = useState<FirstDropProduct | null>(
    null
  );

  return (
    <Section id="collection" className="bg-black py-28 md:py-40">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12">
        <div className="mb-20 md:mb-28">
          <TextReveal
            as="h2"
            className="text-display text-[clamp(2rem,5vw,5rem)] text-loop-white"
          >
            COLLECTION
          </TextReveal>

          <div className="mt-8 flex flex-col gap-3 md:mt-10">
            <TextReveal
              className="text-[11px] uppercase tracking-[0.35em] text-loop-white"
              delay={0.15}
            >
              FIRST DROP
            </TextReveal>
            <TextReveal
              className="text-[10px] uppercase tracking-[0.28em] text-loop-muted"
              delay={0.25}
            >
              Three ways to enter.
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
          {FIRST_DROP_PRODUCTS.map((product, index) => (
            <div key={product.id} className="h-full min-h-0">
              <CollectionCard
                product={product}
                index={index}
                onPreview={setPreviewProduct}
              />
            </div>
          ))}
        </div>
      </div>

      <CollectionPreviewModal
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
    </Section>
  );
}
