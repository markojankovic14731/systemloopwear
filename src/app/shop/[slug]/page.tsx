import type { Metadata } from "next";
import { productService } from "@/lib/commerce";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) return { title: "Not Found — LOOP" };
  return {
    title: `${product.title} — LOOP`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="text-center max-w-lg">
        <h1 className="text-display text-4xl text-loop-white mb-4">
          {product.title}
        </h1>
        <p className="text-loop-muted text-sm mb-8">
          {product.currency} {product.price}
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-loop-muted">
          Product page — ready for expansion
        </p>
      </div>
    </main>
  );
}
