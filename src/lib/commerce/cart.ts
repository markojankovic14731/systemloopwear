import type { Cart, CartService } from "./types";

const CART_KEY = "loop_cart";

function getStoredCart(): Cart {
  if (typeof window === "undefined") {
    return { items: [], updatedAt: new Date().toISOString() };
  }
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return { items: [], updatedAt: new Date().toISOString() };
  return JSON.parse(stored) as Cart;
}

function saveCart(cart: Cart): Cart {
  const updated = { ...cart, updatedAt: new Date().toISOString() };
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  }
  return updated;
}

export const cartService: CartService = {
  async getCart() {
    return getStoredCart();
  },

  async addItem(productId, quantity, size) {
    const cart = getStoredCart();
    const existing = cart.items.find(
      (i) => i.productId === productId && i.size === size
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }
    return saveCart(cart);
  },

  async removeItem(productId) {
    const cart = getStoredCart();
    cart.items = cart.items.filter((i) => i.productId !== productId);
    return saveCart(cart);
  },

  async updateQuantity(productId, quantity) {
    const cart = getStoredCart();
    const item = cart.items.find((i) => i.productId === productId);
    if (item) item.quantity = quantity;
    return saveCart(cart);
  },

  async clear() {
    return saveCart({ items: [], updatedAt: new Date().toISOString() });
  },
};
