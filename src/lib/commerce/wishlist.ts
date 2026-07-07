import type { WishlistItem, WishlistService } from "./types";

const WISHLIST_KEY = "loop_wishlist";

function getStoredWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(WISHLIST_KEY);
  if (!stored) return [];
  return JSON.parse(stored) as WishlistItem[];
}

function saveWishlist(items: WishlistItem[]): WishlistItem[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }
  return items;
}

export const wishlistService: WishlistService = {
  async getAll() {
    return getStoredWishlist();
  },

  async add(productId) {
    const items = getStoredWishlist();
    if (!items.find((i) => i.productId === productId)) {
      items.push({ productId, addedAt: new Date().toISOString() });
    }
    return saveWishlist(items);
  },

  async remove(productId) {
    return saveWishlist(
      getStoredWishlist().filter((i) => i.productId !== productId)
    );
  },
};
