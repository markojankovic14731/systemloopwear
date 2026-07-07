import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Collection } from "@/components/sections/Collection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Collection />
      <Philosophy />
      <Footer />
    </main>
  );
}
