import type { Product, ProductCategory } from "@/types/commerce";

export const PLACEHOLDER_IMAGES = {
  campaign: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=80&auto=format",
  lookbook1: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80&auto=format",
  lookbook2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80&auto=format",
  lookbook3: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80&auto=format",
  lookbook4: "https://images.unsplash.com/photo-1483985988354-763728e1935b?w=1200&q=80&auto=format",
  product1: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format",
  product2: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format",
  product3: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80&auto=format",
  product4: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format",
  collection1: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=80&auto=format",
  collection2: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80&auto=format",
  collection3: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80&auto=format",
} as const;

export type FirstDropProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage?: string;
  buttonLabel: string;
  description: string;
  oldPrice?: string;
  badge?: string;
};

export const FIRST_DROP_PRODUCTS: FirstDropProduct[] = [
  {
    id: "different-faces-tee",
    title: "Different Faces Tee",
    price: "2690 RSD",
    image: "/products/different faces front.png",
    hoverImage: "/products/different faces back.png",
    buttonLabel: "View →",
    description:
      "Heavyweight cotton tee from the first drop. Cut for a relaxed editorial fit.",
  },
  {
    id: "invisible-walls-tee",
    title: "Invisible Walls Tee",
    price: "2690 RSD",
    image: "/products/invisible-walls-front.png",
    hoverImage: "/products/invisible-walls-back.png",
    buttonLabel: "View →",
    description:
      "Minimal front graphic on premium black cotton. A quiet statement piece.",
  },
  {
    id: "first-drop-bundle",
    title: "FIRST DROP BUNDLE",
    price: "4890 RSD",
    oldPrice: "5380 RSD",
    badge: "SAVE 490 RSD",
    image: "/products/combination.png",
    buttonLabel: "View Bundle →",
    description:
      "Both first-drop tees in one bundle. Limited release packaging included.",
  },
];

export const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "void-jacket",
    title: "VOID JACKET",
    price: 420,
    currency: "GBP",
    image: PLACEHOLDER_IMAGES.product1,
    category: "outerwear",
    inStock: false,
  },
  {
    id: "2",
    slug: "chrome-hoodie",
    title: "CHROME HOODIE",
    price: 280,
    currency: "GBP",
    image: PLACEHOLDER_IMAGES.product2,
    category: "tops",
    inStock: false,
  },
  {
    id: "3",
    slug: "loop-tee",
    title: "LOOP TEE",
    price: 120,
    currency: "GBP",
    image: PLACEHOLDER_IMAGES.product3,
    category: "tops",
    inStock: false,
  },
  {
    id: "4",
    slug: "archive-pant",
    title: "ARCHIVE PANT",
    price: 340,
    currency: "GBP",
    image: PLACEHOLDER_IMAGES.product4,
    category: "bottoms",
    inStock: false,
  },
];

export const PLACEHOLDER_CATEGORIES: ProductCategory[] = [
  { id: "1", slug: "outerwear", name: "Outerwear" },
  { id: "2", slug: "tops", name: "Tops" },
  { id: "3", slug: "bottoms", name: "Bottoms" },
  { id: "4", slug: "accessories", name: "Accessories" },
];

export const PHILOSOPHY_LINES = [
  "We don't chase trends.",
  "We build silence.",
  "Every piece returns.",
  "Nothing is accidental.",
  "Quality over noise.",
] as const;

export const LOOKBOOK_IMAGES = [
  { id: "1", src: PLACEHOLDER_IMAGES.lookbook1, alt: "Lookbook 01", span: "col-span-2 row-span-2" },
  { id: "2", src: PLACEHOLDER_IMAGES.lookbook2, alt: "Lookbook 02", span: "col-span-1 row-span-1" },
  { id: "3", src: PLACEHOLDER_IMAGES.lookbook3, alt: "Lookbook 03", span: "col-span-1 row-span-2" },
  { id: "4", src: PLACEHOLDER_IMAGES.lookbook4, alt: "Lookbook 04", span: "col-span-2 row-span-1" },
  { id: "5", src: PLACEHOLDER_IMAGES.lookbook1, alt: "Lookbook 05", span: "col-span-1 row-span-1" },
  { id: "6", src: PLACEHOLDER_IMAGES.lookbook2, alt: "Lookbook 06", span: "col-span-1 row-span-1" },
] as const;
