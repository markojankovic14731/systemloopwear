import type { Product, ProductCategory, Cart, WishlistItem } from "@/types/commerce";

export type { Product, ProductCategory, Cart, WishlistItem };

export interface ProductService {
  getAll(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getByCategory(categorySlug: string): Promise<Product[]>;
}

export interface CategoryService {
  getAll(): Promise<ProductCategory[]>;
  getBySlug(slug: string): Promise<ProductCategory | null>;
}

export interface CartService {
  getCart(): Promise<Cart>;
  addItem(productId: string, quantity: number, size?: string): Promise<Cart>;
  removeItem(productId: string): Promise<Cart>;
  updateQuantity(productId: string, quantity: number): Promise<Cart>;
  clear(): Promise<Cart>;
}

export interface WishlistService {
  getAll(): Promise<WishlistItem[]>;
  add(productId: string): Promise<WishlistItem[]>;
  remove(productId: string): Promise<WishlistItem[]>;
}

export interface AuthService {
  signIn(email: string, password: string): Promise<{ user: { id: string; email: string } }>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<{ id: string; email: string } | null>;
}

export interface CheckoutService {
  createSession(cart: Cart): Promise<{ sessionId: string; url: string }>;
}
