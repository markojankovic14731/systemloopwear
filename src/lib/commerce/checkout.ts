import type { CheckoutService } from "./types";

export const checkoutService: CheckoutService = {
  async createSession() {
    throw new Error("Checkout not yet implemented");
  },
};
