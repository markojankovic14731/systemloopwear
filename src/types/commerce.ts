export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  inStock: boolean;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
