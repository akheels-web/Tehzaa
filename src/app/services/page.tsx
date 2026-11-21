import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, MapPin, PhoneCall } from "lucide-react";
import { SERVICES } from "@/data/services";
import { ServicesTraditionIndex } from "@/components/services/ServicesTraditionIndex";
import {
  HeritageGreetingBanner,
  TehzeebDivider,
} from "@/components/deccani/DeccaniMotifs";

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

export default function ServicesPage() {
  const pillars = [
    {
      num: "01",
      title: "Pelli, Shaadi & Every Faith",
      desc: "Telugu Kalyana Mandapams, Muslim Nikkah & Sanchaq, Marwari Phere, Anand Karaj canopies, and cathedral flowers — handled respectfully.",
    },
    {
      num: "02",
      title: "Zero Copy-Paste Backdrops",
      desc: "Fresh flowers and structures sketched around your real venue lighting and layout.",
    },
    {
      num: "03",
      title: "Bilkul Alag Kitchens",
      desc: "Coal-dum Biryani and Telugu Arati Aku Vindhu cooked separately from our isolated Pure Veg & Jain hall.",
    },
    {
      num: "04",
      title: "Zero Headache For Parents",
      desc: "Honest transparent budgets and dedicated floor captains so Amma, Nanna & elders relax completely.",
    },
  ];

  const venues = [
    "Chowmahalla Palace",
    "Taj Falaknuma Palace",
    "Taramati Baradari",
    "Taj Krishna Banjara Hills",
    "ITC Kohenur Gachibowli",
    "HICC Novotel HITEC City",
    "JRC Convention & Gandipet Villas",
  ];

  return (
    <div className="bg-alabaster text-ink">
      {/* Band 1: Alabaster Page Header */}
      <section className="pt-28 lg:pt-32 pb-16 border-b border-stone-line bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-5">
              <HeritageGreetingBanner theme="light" />

              <p className="editorial-italic text-2xl sm:text-3xl pt-1">
                Shaadi ho ya Pelli
              </p>

              <h1 className="display-hero text-ink">
                Everything We Do For{" "}
                <span className="editorial-italic">Your Big Day</span>
              </h1>

              <p className="editorial-body max-w-2xl">
                From dawn Telugu Pelli Pandiris and Chowmahalla-style Nikkah
                stages to real Dum Biryani, banana-leaf Vindhu Bhojanam, and
                stress-free corporate summits.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-end gap-3">
              <Link href="/contact" className="btn-editorial-dark">
                <span>Let&apos;s Chat Over Chai</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hello%20Tehzaa%20Celebrations,%20would%20love%20to%20discuss%20our%20event%20in%20Hyderabad!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-outline"
              >
                <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass" />
                <span>Ping on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Limestone Tradition Lens & Alternating Spreads */}
      <section className="bg-limestone/60 border-b border-stone-line py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesTraditionIndex services={SERVICES} />
        </div>
      </section>

      {/* Band 3: Deep Obsidian Numbered Promises */}
      <section className="bg-obsidian text-ink-light py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TehzeebDivider theme="dark" className="mb-14" />

          <div className="max-w-2xl mb-12 space-y-2.5">
            <span className="editorial-kicker-light block">
              Zero drama, proper finish
            </span>
            <h2 className="display-section text-ink-light">
              Four Things We Never{" "}
              <span className="font-display italic font-normal text-brass-light tracking-[-0.01em]">
                Compromise On
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[2px] overflow-hidden border border-obsidian-line bg-obsidian-elevated">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="p-7 sm:p-8 border-b lg:border-b-0 sm:border-r border-obsidian-line last:border-r-0 space-y-4"
              >
                <span className="font-display text-3xl font-medium text-brass-light tabular-nums block">
                  {pillar.num}
                </span>
                <h3 className="display-card text-ink-light">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-ink-lightMuted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4: Alabaster Hyderabad Venues & Consultation Spread */}
      <section className="bg-alabaster py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[2px] overflow-hidden border border-stone-line bg-silk shadow-gallery">
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-line">
              <span className="editorial-kicker block">
                Every palace, convention &amp; farmhouse
              </span>
              <h2 className="display-section text-ink">
                We Know Every{" "}
                <span className="editorial-italic">Hyderabad Venue</span>
              </h2>
              <p className="editorial-body max-w-xl">
                From Chowmahalla arches and Falaknuma marble steps to Taramati
                Baradari sunsets, JRC lawns, and Moinabad farmhouses — our
                load-in trucks know every gate!
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {venues.map((venue) => (
                  <span
                    key={venue}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-alabaster border border-stone-line text-xs font-medium text-ink"
                  >
                    <MapPin
                      aria-hidden="true"
                      className="w-3.5 h-3.5 stroke-[1.5] text-brass"
                    />
                    {venue}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 bg-limestone/65 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="editorial-kicker block">Chai pe milenge</span>
                <h3 className="display-card sm:text-3xl text-ink leading-tight">
                  Come Taste Our Menus &amp; Check Swatches
                </h3>
                <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                  Drop by Road No. 36 in Jubilee Hills — we&apos;ll sit over
                  Irani Chai, sketch your stage, and lock a clean custom quote.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
                <Link href="/contact" className="btn-editorial-dark">
                  <span>Plan Your Event</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </Link>
                <Link href="/gallery" className="btn-editorial-outline">
                  <span>See Our Photo Scrapbook</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
