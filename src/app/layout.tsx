import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tehzaa.com"),
  title: "Tehzaa Celebrations | Hyderabad Wedding Planners & Catering Studio",
  description:
    "Aadaab & Namaskaram, Hyderabad! Shaadi ho ya Pelli — Ekdum Grand Banadenge. Telugu Pelli Pandiri mandapams, Hyderabadi Nikkah & Sanchaq decor, Dum Biryani & Sufiyani feasts, banana-leaf Vindhu Bhojanam, Baraat, and HITEC City corporate events.",
  keywords: [
    "Hyderabad Wedding Planners",
    "Telugu Wedding Planners Hyderabad",
    "Hyderabadi Muslim Nikkah Walima Decor",
    "Pelli Vindhu Bhojanam Catering Hyderabad",
    "Hyderabadi Mutton Dum Biryani Wedding Catering",
    "Chowmahalla Falaknuma Taramati Baradari Weddings",
    "Pure Vegetarian Jain Wedding Catering Hyderabad",
    "Baraat & Marfa Planners Hyderabad",
    "Corporate Events HITEC City",
  ],
  authors: [{ name: "Tehzaa Celebrations" }],
  openGraph: {
    title: "Tehzaa Celebrations | Shaadi ho ya Pelli, Hyderabad",
    description:
      "Bespoke Hyderabadi weddings, Telugu Pelli Mandapams, Nikkah & Walima styling, real Dum Biryani & Vindhu catering, and zero-tension celebration planning.",
    url: "https://tehzaa.com",
    siteName: "Tehzaa Celebrations",
    images: [
      {
        url: "/images/real-chowmahalla-palace.webp",
        width: 1200,
        height: 630,
        alt: "Tehzaa Celebrations Hyderabad — Weddings at Chowmahalla Palace & Historic Venues",
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
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-alabaster text-ink font-sans antialiased selection:bg-obsidian selection:text-alabaster">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:rounded-[2px] focus:bg-obsidian focus:text-alabaster focus:border focus:border-brass-light focus:text-xs focus:font-semibold focus:tracking-[0.12em] focus:uppercase focus:shadow-obsidian"
        >
          Skip to main content
        </a>
        <JsonLd />
        <MotionProvider>
          <SmoothScroll>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 bg-alabaster focus:outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
