import type { CheckoutFormData } from "@/lib/cart-utils";

export interface OrderLineItem {
  name: string;
  size: string;
  quantity: number;
  lineTotal: number;
}

export interface OrderSubmissionPayload {
  customer: CheckoutFormData;
  items: OrderLineItem[];
  total: number;
  paymentMethod: "Cash on delivery";
}
