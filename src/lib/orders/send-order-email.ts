import { formatOrderEmail } from "@/lib/orders/format-order-email";
import type { OrderSubmissionPayload } from "@/lib/orders/types";

const DEFAULT_OWNER_EMAILS = [
  "marko.jankovic13731@gmail.com",
  "marko.nikolic.ruma@gmail.com",
];

function parseOwnerEmails(raw?: string): string[] {
  if (!raw?.trim()) return [];

  const emails = raw
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && email.includes("@"));

  return [...new Set(emails)];
}

function getOwnerEmails(): string[] {
  const fromList = parseOwnerEmails(process.env.ORDER_OWNER_EMAILS);
  if (fromList.length > 0) return fromList;

  const single = process.env.ORDER_OWNER_EMAIL?.trim();
  if (single && single.includes("@")) return [single];

  return DEFAULT_OWNER_EMAILS;
}

function getFromEmail(): string {
  const raw = process.env.ORDER_FROM_EMAIL?.trim().replace(/^["']|["']$/g, "");

  if (!raw || !raw.includes("@")) {
    return "LOOP Orders <onboarding@resend.dev>";
  }

  return raw;
}

function isEmailConfigured(): boolean {
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("ORDER_FROM_EMAIL:", process.env.ORDER_FROM_EMAIL);
  console.log("ORDER_OWNER_EMAILS:", process.env.ORDER_OWNER_EMAILS);

  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Sends the order notification email to the store owners.
 *
 * TODO (Resend — recommended):
 * 1. Create an account at https://resend.com
 * 2. Add to `.env.local`:
 *    RESEND_API_KEY=re_xxxxxxxxxx
 *    ORDER_FROM_EMAIL="LOOP Orders <orders@your-verified-domain.com>"
 *    ORDER_OWNER_EMAILS=marko.nikolic.ruma@gmail.com
 * 3. Verify your sending domain in Resend
 *
 * TODO (Nodemailer alternative):
 * 1. npm install nodemailer
 * 2. Add to `.env.local`:
 *    SMTP_HOST=smtp.example.com
 *    SMTP_PORT=587
 *    SMTP_USER=your-user
 *    SMTP_PASS=your-password
 *    ORDER_FROM_EMAIL=LOOP Orders <orders@your-domain.com>
 *    ORDER_OWNER_EMAILS=marko.nikolic.ruma@gmail.com
 * 3. Replace the Resend fetch block below with a nodemailer transporter sendMail call
 */
export async function sendOrderEmail(
  payload: OrderSubmissionPayload
): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error(
      "Email service is not configured. Add RESEND_API_KEY to .env.local."
    );
  }

  const { subject, text } = formatOrderEmail(payload);
  const fromEmail = getFromEmail();
  const ownerEmails = getOwnerEmails();

  if (ownerEmails.length === 0) {
    throw new Error("No order owner email recipients configured.");
  }

  await Promise.all(
    ownerEmails.map(async (recipient) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          reply_to: payload.customer.email,
          subject,
          text,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to send order email to ${recipient}: ${errorBody}`
        );
      }
    })
  );
}

export function getOrderEmailConfigStatus() {
  return {
    configured: isEmailConfigured(),
    ownerEmails: getOwnerEmails(),
  };
}
