import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DirectDeal — India's First 48-Hour Creator-Brand Deal Marketplace",
  description:
    "India's first marketplace where micro & nano creators close brand deals in 48 hours. Free for creators forever. Brands pay only on deal close.",
  keywords: ["influencer marketing", "creator marketplace", "brand deals", "India creators", "D2C brands"],
  openGraph: {
    title: "DirectDeal — Close Brand Deals in 48 Hours",
    description:
      "India's first 48-hour creator-brand deal marketplace. Connect, negotiate, and close — fast.",
    type: "website",
    locale: "en_IN",
    siteName: "DirectDeal",
  },
  twitter: {
    card: "summary_large_image",
    title: "DirectDeal — Close Brand Deals in 48 Hours",
    description: "Free for creators. Brands pay only when deals close.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
