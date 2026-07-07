import type { FirstDropProduct } from "@/data/placeholders";

export interface LoopCartItem {
  lineId: string;
  productId: string;
  name: string;
  price: string;
  priceAmount: number;
  size: string;
  quantity: number;
  image: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  postalCode: string;
  notes: string;
}

export function parsePrice(price: string): number {
  const match = price.match(/[\d.,]+/);
  if (!match) return 0;
  return Number(match[0].replace(/,/g, ""));
}

export function formatRsd(amount: number): string {
  return `${amount.toLocaleString("en-US")} RSD`;
}

export function getLineId(productId: string, size: string): string {
  return `${productId}-${size}`;
}

export function createCartItem(
  product: FirstDropProduct,
  size: string,
  quantity: number
): LoopCartItem {
  return {
    lineId: getLineId(product.id, size),
    productId: product.id,
    name: product.title,
    price: product.price,
    priceAmount: parsePrice(product.price),
    size,
    quantity,
    image: product.image,
  };
}

export function getCartSubtotal(items: LoopCartItem[]): number {
  return items.reduce((total, item) => total + item.priceAmount * item.quantity, 0);
}

export function getCartItemCount(items: LoopCartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
