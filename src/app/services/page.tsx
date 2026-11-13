import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services & Celebrations | Tehzaa Celebrations Hyderabad",
  description:
    "Explore Tehzaa's five celebration disciplines in Hyderabad: Floral & Event Decorations, Catering & Gastronomy, Baraat & Grand Entries, Corporate Events, and Social & Family Celebrations.",
  openGraph: {
    title: "Services & Celebrations | Tehzaa Celebrations Hyderabad",
    description:
      "Bespoke floral mandaps, Telugu Vindhu Bhojanam & Hyderabadi Dastarkhwan catering, heritage baraats, HITEC City corporate galas, and family milestones.",
    images: [
      {
        url: "/images/floral-mandap-indian.webp",
        width: 1200,
        height: 630,
        alt: "Tehzaa Celebrations Floral & Event Services",
      },
    ],
  },
};

export default function ServicesPage() {
  const pillars = [
    {
      num: "01",
      title: "Inclusive Cultural Reverence",
      desc: "Rooted in Hyderabadi Tehzeeb while honoring Telugu Kalyana Mandapam traditions, North Indian Jaimala & Baraat rituals, Nikkah & Walima elegance, Christian receptions, and Anand Karaj ceremonies.",
    },
    {
      num: "02",
      title: "Original Botanical & Spatial Craft",
      desc: "Every mandap, Pelli Pandiri, floral chadar, and candlelit tablescape is sketched and engineered for your venue’s architecture—never repeated from commercial templates.",
    },
    {
      num: "03",
      title: "Dedicated Culinary Brigades",
      desc: "Master Hyderabadi khansamas, Telugu Vindhu Bhojanam cooks, and North Indian halwais operating with strictly segregated Pure Vegetarian and Sattvic Jain kitchens.",
    },
    {
      num: "04",
      title: "Calm, Disciplined Execution",
      desc: "Transparent itemized proposals, verified venue compliance, and attentive on-site directors so host families remain present in every blessing and toast.",
    },
  ];

  const traditions = [
    "Telugu & South Indian Weddings",
    "Hyderabadi & Deccani Nikkah / Walima",
    "North Indian, Marwari & Punjabi Ceremonies",
    "Christian & Sikh Anand Karaj Celebrations",
    "HITEC City & Financial District Conferences",
    "Seemantham, Namakaranam & Farmhouses",
  ];

  const venues = [
    "Taj Falaknuma Palace",
    "Taj Krishna Banjara Hills",
    "ITC Kohenur Gachibowli",
    "Park Hyatt Hyderabad",
    "HICC Novotel HITEC City",
    "JRC Convention & Secunderabad Club",
    "Gandipet & Moinabad Farmhouses",
  ];

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      {/* Editorial Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-gold/25">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-3">
              <span className="editorial-kicker">
                Five Disciplines of Celebration
              </span>
              <span className="h-px w-12 bg-gold/40" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-charcoal tracking-tight leading-[1.08]">
              Crafted in <span className="text-burgundy">Tehzeeb</span>,
              <br />
              Tailored for Every Tradition
            </h1>

            <p className="text-base sm:text-lg text-charcoal/80 max-w-2xl leading-relaxed font-sans">
              From sacred Telugu Pelli Pandiris and sunlit Haldi courtyards to wood-fired Hyderabadi Dastarkhwans and precision HITEC City summits, our studio orchestrates every detail under one discerning roof.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-end gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-dark active:scale-[0.98] text-cream text-xs font-medium transition-[background-color,transform] duration-200"
            >
              <span>Schedule a Consultation</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Tehzaa%20Celebrations,%20I%20would%20like%20to%20discuss%20your%20event%20services%20in%20Hyderabad."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gold/40 text-charcoal hover:bg-cream text-xs font-medium transition-colors"
            >
              <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Inclusive Traditions Ribbon */}
        <div className="mt-12 pt-6 border-t border-gold/20 flex flex-wrap gap-2">
          {traditions.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-md bg-cream border border-gold/25 text-xs text-charcoal/85 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Five Services Alternating Editorial Spreads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {SERVICES.map((service, idx) => {
          const isReversed = idx % 2 === 1;
          const indexLabel = `0${idx + 1}`;

          return (
            <article
              key={service.id}
              id={service.slug}
              className="rounded-2xl border border-gold/25 bg-cream p-6 sm:p-10 lg:p-12 transition-colors hover:border-gold/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Photography Column */}
                <div
                  className={`lg:col-span-5 space-y-3 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/25 bg-ivory">
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Secondary Preview Thumbnails */}
                  <div className="grid grid-cols-3 gap-3">
                    {service.galleryImages.slice(0, 3).map((thumb, tIdx) => (
                      <div
                        key={`${service.id}-thumb-${tIdx}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gold/20 bg-ivory"
                      >
                        <Image
                          src={thumb}
                          alt={`${service.title} detail ${tIdx + 1}`}
                          fill
                          sizes="(max-width: 1024px) 33vw, 14vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Content Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-2xl text-gold-dark tabular-nums">
                        {indexLabel}
                      </span>
                      <span className="h-4 w-px bg-gold/30" />
                      <span className="text-xs text-gold-dark font-medium">
                        {service.subtitle}
                      </span>
                    </div>

                    {service.startingPrice && (
                      <span className="text-xs font-medium text-burgundy bg-ivory px-3 py-1 rounded-md border border-gold/25 tabular-nums">
                        Commissions from {service.startingPrice}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal leading-tight">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Offerings Checklist */}
                  <div className="space-y-3">
                    <span className="text-xs font-medium text-taupe-dark block">
                      Signature scope &amp; deliverables
                    </span>
                    <div className="grid grid-cols-1 gap-3">
                      {service.offerings.map((offering) => (
                        <div
                          key={offering.title}
                          className="p-4 rounded-xl bg-ivory/80 border border-gold/20 flex items-start gap-3"
                        >
                          <Check aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-serif text-lg font-medium text-charcoal leading-snug">
                              {offering.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-charcoal/75 mt-1 leading-relaxed">
                              {offering.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal Occasions */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.idealFor.map((occasion) => (
                      <span
                        key={occasion}
                        className="text-xs px-3 py-1 rounded-md bg-ivory border border-gold/25 text-charcoal/85"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-dark active:scale-[0.98] text-cream text-xs font-medium transition-[background-color,transform] duration-200 group"
                    >
                      <span>
                        {service.menuCollections
                          ? "Explore Discipline & Culinary Menus"
                          : "Explore Full Discipline & FAQs"}
                      </span>
                      <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gold/35 text-charcoal hover:bg-ivory text-xs font-medium transition-colors"
                    >
                      <span>Request Proposal</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Architectural Numbered Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gold/25">
        <div className="max-w-2xl mb-12">
          <span className="editorial-kicker block mb-2">
            The Tehzaa standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal leading-tight">
            Four Pillars of <span className="text-burgundy">Gracious</span> Execution
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-gold/25 bg-cream">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-7 border-b lg:border-b-0 sm:border-r border-gold/25 last:border-r-0 space-y-4"
            >
              <span className="font-serif text-3xl text-gold-dark tabular-nums block">
                {pillar.num}
              </span>
              <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hyderabad Venues & Consultation Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-gold/25 bg-cream">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-gold/25">
            <span className="editorial-kicker block">
              Hyderabad heritage &amp; modern venues
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal leading-tight">
              Coordinated Logistics Across{" "}
              <span className="text-burgundy">Iconic</span> Settings
            </h2>
            <p className="text-sm text-charcoal/75 leading-relaxed max-w-xl">
              From heritage palace lawns and private Banjara Hills residences to large-scale HITEC City convention floors and Moinabad farmhouses, our production teams coordinate load-in schedules, acoustic limits, and culinary kitchens with practiced care.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {venues.map((venue) => (
                <span
                  key={venue}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-ivory border border-gold/25 text-xs font-medium text-charcoal/85"
                >
                  <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                  {venue}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 bg-emerald-deep text-ivory flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs text-gold-light block">
                Jubilee Hills &amp; Financial District
              </span>
              <h3 className="font-serif text-3xl font-normal text-cream leading-tight">
                Begin Planning Your Celebration
              </h3>
              <p className="text-sm text-ivory/80 leading-relaxed">
                Meet our design directors and culinary leads for floral material boards, layout walkthroughs, and private menu tastings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-ivory hover:bg-cream text-charcoal text-xs font-medium transition-colors"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-ivory/30 text-ivory hover:bg-ivory/10 text-xs font-medium transition-colors"
              >
                <span>View Portfolio Showcase</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
