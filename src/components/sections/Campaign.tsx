"use client";

import { Section } from "@/components/ui/Section";
import { ImageReveal } from "@/components/effects/ImageReveal";
import { TextReveal } from "@/components/effects/TextReveal";
import { PLACEHOLDER_IMAGES } from "@/data/placeholders";

export function Campaign() {
  return (
    <Section id="campaign" className="py-24 md:py-40">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-20">
          <TextReveal
            as="h2"
            className="text-display text-[clamp(2rem,6vw,6rem)] text-loop-white"
          >
            NOT FOR
            <br />
            EVERYONE
          </TextReveal>
        </div>

        <ImageReveal
          src={PLACEHOLDER_IMAGES.campaign}
          alt="LOOP Campaign"
          aspectRatio="21/9"
          className="w-full"
          priority
        />

        <div className="mt-12 md:mt-20 flex justify-end">
          <TextReveal
            className="text-editorial text-loop-muted text-xs md:text-sm max-w-md text-right tracking-widest uppercase"
            delay={0.2}
          >
            The first drop doesn&apos;t announce itself.
            <br />
            You either feel it — or you don&apos;t.
          </TextReveal>
        </div>
      </div>
    </Section>
  );
}
