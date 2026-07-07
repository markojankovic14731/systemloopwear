import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — LOOP",
  description: "Coming soon.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-display text-[clamp(2rem,6vw,6rem)] text-loop-white mb-6">
          NOT YET
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-loop-muted">
          The shop opens when it&apos;s ready.
        </p>
      </div>
    </main>
  );
}
