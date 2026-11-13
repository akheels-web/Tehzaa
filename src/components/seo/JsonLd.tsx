import React from "react";
import { SERVICES } from "@/data/services";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tehzaa.com";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Tehzaa Celebrations",
    "alternateName": "Tehzaa Celebrations Hyderabad",
    "description":
      "Bespoke wedding planning, floral mandaps, all-community Indian & Hyderabadi catering, baraat processions, corporate galas, and family celebrations across Hyderabad — crafted with Tehzeeb (elegance, cultural reverence, and warm hospitality).",
    "url": baseUrl,
    "image": [`${baseUrl}/images/hero-indian-wedding.webp`],
    "telephone": "+919876543210",
    "email": "celebrations@tehzaa.com",
    "priceRange": "₹₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Road No. 36, Jubilee Hills",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500033",
        "addressCountry": "IN",
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Financial District, Nanakramguda, Gachibowli",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500032",
        "addressCountry": "IN",
      },
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4319,
      "longitude": 78.4073,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "10:00",
        "closes": "20:30",
      },
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Jubilee Hills" },
      { "@type": "AdministrativeArea", "name": "Banjara Hills" },
      { "@type": "AdministrativeArea", "name": "HITEC City" },
      { "@type": "AdministrativeArea", "name": "Gachibowli" },
      { "@type": "AdministrativeArea", "name": "Madhapur" },
      { "@type": "AdministrativeArea", "name": "Kondapur" },
      { "@type": "AdministrativeArea", "name": "Secunderabad" },
      { "@type": "AdministrativeArea", "name": "Shamshabad" },
    ],
    "sameAs": [
      "https://instagram.com",
      "https://facebook.com",
      "https://linkedin.com",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tehzaa Celebrations Event & Culinary Services",
      "itemListElement": SERVICES.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.shortDescription,
          "url": `${baseUrl}/services/${service.slug}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
