import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, MapPin, PhoneCall } from "lucide-react";
import { SERVICES } from "@/data/services";
import { whatsappHref } from "@/lib/contact";
import { creditForImage } from "@/lib/landing/credits";
import { ServicesExplorer } from "@/components/inner/ServicesExplorer";
import { PageHero } from "@/components/landing/primitives/PageHero";
import { ArchMedallionList } from "@/components/landing/primitives/ArchMedallionList";
import { SceneHeading } from "@/components/landing/primitives/SceneHeading";
import { DepthJaali } from "@/components/landing/primitives/DepthJaali";
import { DawatnamaCTA } from "@/components/landing/DawatnamaCTA";

export const metadata: Metadata = {
  title: "Services & Celebrations | Tehzaa Celebrations Hyderabad",
  description:
    "Explore wedding decor, proper Hyderabadi & Telugu Pelli catering, Baraat & Marfa entries, corporate galas, and ghar ke functions across Hyderabad.",
  openGraph: {
    title: "Services & Celebrations | Tehzaa Celebrations Hyderabad",
    description:
      "Telugu Pelli Pandiris & Chowmahalla Nikkah stages, Dum Biryani & Arati Aku Vindhu, Baraats, and HITEC City summits.",
    images: [
      {
        url: "/images/real-chowmahalla-palace.webp",
        width: 1200,
        height: 630,
        alt: "Tehzaa Celebrations Wedding & Event Services Hyderabad",
      },
    ],
  },
};

const PILLARS = [
  {
    title: "Pelli, Shaadi & Every Faith",
    body: "Telugu Kalyana Mandapams, Muslim Nikkah & Sanchaq, Marwari Phere, Anand Karaj canopies, and cathedral flowers — handled respectfully.",
  },
  {
    title: "Zero Copy-Paste Backdrops",
    body: "Fresh flowers and structures sketched around your real venue lighting and layout.",
  },
  {
    title: "Bilkul Alag Kitchens",
    body: "Coal-dum Biryani and Telugu Arati Aku Vindhu cooked separately from our isolated Pure Veg & Jain hall.",
  },
  {
    title: "Zero Headache For Parents",
    body: "Honest transparent budgets and dedicated floor captains so Amma, Nanna & elders relax completely.",
  },
];

const VENUES = [
  "Chowmahalla Palace",
  "Taj Falaknuma Palace",
  "Taramati Baradari",
  "Taj Krishna Banjara Hills",
  "ITC Kohenur Gachibowli",
  "HICC Novotel HITEC City",
  "JRC Convention & Gandipet Villas",
];

export default function ServicesPage() {
  return (
    <div className="bg-marble text-ink">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        kicker="Shaadi ho ya Pelli"
        title="Everything we do"
        italicTail="for your big day."
        intro="From dawn Telugu Pelli Pandiris and Chowmahalla-style Nikkah stages to real Dum Biryani, banana-leaf Vindhu Bhojanam, and stress-free corporate summits."
        image={{ src: SERVICES[0].heroImage, alt: SERVICES[0].title, credit: creditForImage(SERVICES[0].heroImage) }}
        floating={[
          { src: SERVICES[1].heroImage, alt: "" },
          { src: SERVICES[2].heroImage, alt: "" },
        ]}
        actions={
          <>
            <Link href="/contact" className="btn-editorial-dark">
              <span>Let&apos;s Chat Over Chai</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
            </Link>
            <a
              href={whatsappHref("Hello Tehzaa Celebrations, would love to discuss our event in Hyderabad!")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-outline"
            >
              <PhoneCall aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              <span>Ping on WhatsApp</span>
            </a>
          </>
        }
      />

      {/* Tradition filter, Darbar doors, and the five service spreads */}
      <section className="relative overflow-hidden bg-marble py-20 lg:py-24">
        <DepthJaali />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SceneHeading
            kicker="Paanch Darbar"
            title="Five doors,"
            italicTail="open one."
            intro="Hover or tap a door to step inside. Every service, with what's included and where to begin, follows below."
            className="mb-12"
          />
          <ServicesExplorer services={SERVICES} />
        </div>
      </section>

      {/* Promises */}
      <section className="relative overflow-hidden bg-marble-warm py-20 lg:py-24">
        <DepthJaali />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SceneHeading kicker="Zero drama, proper finish" title="Four things we never" italicTail="compromise on." className="mb-12" />
          <ArchMedallionList items={PILLARS} columns={4} />
        </div>
      </section>

      {/* Venues */}
      <section className="bg-marble py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 border-[6px] border-white bg-white shadow-ruby outline outline-1 outline-offset-4 outline-brass/40 lg:grid-cols-12">
            <div className="space-y-6 p-8 sm:p-12 lg:col-span-7">
              <SceneHeading
                kicker="Every palace, convention & farmhouse"
                title="We know every"
                italicTail="Hyderabad venue."
                intro="From Chowmahalla arches and Falaknuma marble steps to Taramati Baradari sunsets, JRC lawns, and Moinabad farmhouses — our load-in trucks know every gate!"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                {VENUES.map((venue) => (
                  <span key={venue} className="inline-flex items-center gap-2 border border-brass/40 bg-marble px-4 py-2 font-sans text-xs font-medium text-ink">
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5] text-ruby" />
                    {venue}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-6 bg-marble-warm p-8 sm:p-12 lg:col-span-5">
              <div className="space-y-3">
                <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brass-dark">Chai pe milenge</span>
                <h3 className="font-display text-3xl font-medium leading-tight text-ink">Come taste our menus &amp; check swatches</h3>
                <p className="font-sans text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                  Drop by Road No. 36 in Jubilee Hills — we&apos;ll sit over Irani Chai, sketch your stage, and lock a clean custom quote.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row lg:flex-col">
                <Link href="/contact" className="btn-editorial-dark">
                  <span>Plan Your Event</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                </Link>
                <Link href="/gallery" className="btn-editorial-outline">
                  <span>See Our Photo Scrapbook</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DawatnamaCTA />
    </div>
  );
}
