import { NextResponse } from "next/server";
import type { CheckoutFormData } from "@/lib/cart-utils";
import { getOrderEmailConfigStatus, sendOrderEmail } from "@/lib/orders/send-order-email";
import type { OrderLineItem, OrderSubmissionPayload } from "@/lib/orders/types";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateCustomer(customer: Partial<CheckoutFormData>): customer is CheckoutFormData {
  return (
    isNonEmptyString(customer.firstName) &&
    isNonEmptyString(customer.lastName) &&
    isNonEmptyString(customer.phone) &&
    isNonEmptyString(customer.email) &&
    isNonEmptyString(customer.city) &&
    isNonEmptyString(customer.street) &&
    isNonEmptyString(customer.postalCode) &&
    typeof customer.notes === "string"
  );
}

function validateItems(items: unknown): items is OrderLineItem[] {
  if (!Array.isArray(items) || items.length === 0) return false;

  return items.every(
    (item) =>
      item &&
      typeof item === "object" &&
      isNonEmptyString((item as OrderLineItem).name) &&
      isNonEmptyString((item as OrderLineItem).size) &&
      typeof (item as OrderLineItem).quantity === "number" &&
      (item as OrderLineItem).quantity > 0 &&
      typeof (item as OrderLineItem).lineTotal === "number" &&
      (item as OrderLineItem).lineTotal >= 0
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<OrderSubmissionPayload>;
    const { customer, items, total } = body;

    if (!validateCustomer(customer)) {
      return NextResponse.json(
        { error: "Invalid or incomplete customer details." },
        { status: 400 }
      );
    }

    if (!validateItems(items)) {
      return NextResponse.json(
        { error: "Order must include at least one valid item." },
        { status: 400 }
      );
    }

    if (typeof total !== "number" || total <= 0) {
      return NextResponse.json({ error: "Invalid order total." }, { status: 400 });
    }

    const payload: OrderSubmissionPayload = {
      customer,
      items,
      total,
      paymentMethod: "Cash on delivery",
    };

    const emailConfig = getOrderEmailConfigStatus();

    if (!emailConfig.configured) {
      // TODO: Configure Resend/Nodemailer credentials before accepting live orders.
      // See src/lib/orders/send-order-email.ts for setup instructions.
      return NextResponse.json(
        {
          error:
            "Order email is not configured yet. Set RESEND_API_KEY in .env.local.",
          ownerEmails: emailConfig.ownerEmails,
        },
        { status: 503 }
      );
    }

    await sendOrderEmail(payload);

    return NextResponse.json({ success: true, message: "Order received" });
  } catch (error) {
    console.error("[api/orders] Failed to submit order:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit order. Please try again.",
      },
      { status: 500 }
    );
  }
}
