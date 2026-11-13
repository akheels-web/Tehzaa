import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Celebrations Gallery | Tehzaa Celebrations Hyderabad",
  description:
    "Explore Tehzaa Celebrations' portfolio of Telugu, North Indian, Hyderabadi & contemporary weddings, floral mandaps, royal baraats, bespoke catering, and corporate galas across Hyderabad.",
  openGraph: {
    title: "Portfolio & Celebrations Gallery | Tehzaa Celebrations",
    description:
      "A visual chronicle of timeless celebration artistry, floral mandaps, and bespoke gatherings in Hyderabad.",
    url: "https://tehzaa.com/gallery",
    images: [
      {
        url: "/images/hero-indian-wedding.webp",
        width: 1200,
        height: 630,
        alt: "Tehzaa Celebrations Portfolio",
      },
    ],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
