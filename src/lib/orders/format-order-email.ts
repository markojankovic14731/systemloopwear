import { formatRsd } from "@/lib/cart-utils";
import type { OrderSubmissionPayload } from "@/lib/orders/types";

export function formatOrderEmail(payload: OrderSubmissionPayload): {
  subject: string;
  text: string;
} {
  const { customer, items, total, paymentMethod } = payload;

  const productLines = items
    .map(
      (item) =>
        `- Product: ${item.name}\n  Size: ${item.size}\n  Quantity: ${item.quantity}\n  Line total: ${formatRsd(item.lineTotal)}`
    )
    .join("\n\n");

  const text = [
    "New LOOP order received",
    "",
    "Products",
    productLines,
    "",
    `Total price: ${formatRsd(total)}`,
    `Payment method: ${paymentMethod}`,
    "",
    "Customer details",
    `First name: ${customer.firstName}`,
    `Last name: ${customer.lastName}`,
    `Phone number: ${customer.phone}`,
    `Email: ${customer.email}`,
    `City: ${customer.city}`,
    `Street and number: ${customer.street}`,
    `Postal code: ${customer.postalCode}`,
    `Notes: ${customer.notes.trim() || "—"}`,
  ].join("\n");

  return {
    subject: `New LOOP order — ${customer.firstName} ${customer.lastName}`,
    text,
  };
}
