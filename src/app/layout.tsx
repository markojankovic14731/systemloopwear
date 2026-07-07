import type { Metadata } from "next";
import { ClientProviders } from "@/providers/ClientProviders";
import { AnimatedCursor } from "@/components/cursor/AnimatedCursor";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOOP — Enter the Loop",
  description:
    "Premium streetwear. Not for everyone. Quality over noise.",
  openGraph: {
    title: "LOOP",
    description: "Enter the Loop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <AnimatedCursor />
          <NoiseOverlay />
          <Navbar />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
