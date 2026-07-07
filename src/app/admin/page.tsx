import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — LOOP",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-display text-3xl text-loop-white mb-4">
          ADMIN
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-loop-muted">
          Dashboard architecture ready for implementation
        </p>
      </div>
    </main>
  );
}
