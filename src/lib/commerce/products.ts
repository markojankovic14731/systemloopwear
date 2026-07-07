import type { ProductService, CategoryService } from "./types";
import { PLACEHOLDER_PRODUCTS, PLACEHOLDER_CATEGORIES } from "@/data/placeholders";

export const productService: ProductService = {
  async getAll() {
    return PLACEHOLDER_PRODUCTS;
  },

  async getBySlug(slug: string) {
    return PLACEHOLDER_PRODUCTS.find((p) => p.slug === slug) ?? null;
  },

  async getByCategory(categorySlug: string) {
    return PLACEHOLDER_PRODUCTS.filter((p) => p.category === categorySlug);
  },
};

export const categoryService: CategoryService = {
  async getAll() {
    return PLACEHOLDER_CATEGORIES;
  },

  async getBySlug(slug: string) {
    return PLACEHOLDER_CATEGORIES.find((c) => c.slug === slug) ?? null;
  },
};
