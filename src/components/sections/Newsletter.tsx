"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/effects/TextReveal";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <Section className="py-32 md:py-48 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="max-w-xl">
          <TextReveal
            as="h2"
            className="text-display text-[clamp(2rem,5vw,4rem)] text-loop-white mb-6"
          >
            STAY
            <br />
            INSIDE.
          </TextReveal>

          <TextReveal
            className="text-editorial text-loop-muted text-sm tracking-wide mb-10"
            delay={0.2}
          >
            No spam. No noise. Only when it matters.
          </TextReveal>

          {submitted ? (
            <motion.p
              className="text-[11px] tracking-[0.3em] uppercase text-loop-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              You&apos;re inside.
            </motion.p>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-1 bg-transparent border-b border-white/20 py-3 text-sm text-loop-white placeholder:text-loop-muted/50 focus:outline-none focus:border-white/50 transition-colors duration-500 tracking-wider"
              />
              <Button type="submit" variant="outline" size="md">
                Stay Inside
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </Section>
  );
}
