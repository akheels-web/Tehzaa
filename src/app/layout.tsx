import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tehzaa.com"),
  title:
    "Tehzaa Celebrations | Luxury Wedding Planners & Event House in Hyderabad",
  description:
    "Tehzaa Celebrations is Hyderabad’s editorial event house inspired by Tehzeeb—grace, culture, and hospitality. Curating Telugu Kalyana Mandapams, North Indian & Marwari ceremonies, Nikkah & Walima gatherings, authentic Indian & Hyderabadi catering, and corporate galas.",
  keywords: [
    "Hyderabad Wedding Planners",
    "Luxury Event Management Hyderabad",
    "Tehzaa Celebrations",
    "Telugu Wedding Planners Hyderabad",
    "Kalyana Mandapam Decor Hyderabad",
    "Hyderabadi & South Indian Catering",
    "Pure Vegetarian & Jain Wedding Catering Hyderabad",
    "Baraat & Bridal Entry Planners",
    "Corporate Events HITEC City",
    "Jubilee Hills Event Atelier",
  ],
  authors: [{ name: "Tehzaa Celebrations" }],
  openGraph: {
    title: "Tehzaa Celebrations | Luxury Weddings & Event House Hyderabad",
    description:
      "Honoring every Indian tradition with refined floral architecture, heirloom gastronomy, and heartfelt hospitality in Hyderabad.",
    url: "https://tehzaa.com",
    siteName: "Tehzaa Celebrations",
    images: [
      {
        url: "/images/hero-indian-wedding.webp",
        width: 1200,
        height: 630,
        alt: "Tehzaa Celebrations Hyderabad — Luxury Indian Weddings & Events",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans antialiased selection:bg-gold selection:text-ivory">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-burgundy focus:text-ivory focus:text-xs focus:font-medium focus:shadow-luxury"
        >
          Skip to main content
        </a>
        <JsonLd />
        <MotionProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
