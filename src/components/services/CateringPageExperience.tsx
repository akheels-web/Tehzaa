import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, PhoneCall } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { CulinaryMenuExplorer } from "@/components/services/CulinaryMenuExplorer";
import { JaaliPattern } from "@/components/deccani/DeccaniMotifs";

interface CateringPageExperienceProps {
  service: ServiceCategory;
  faqs: { question: string; answer: string }[];
  otherServices: ServiceCategory[];
}

const KITCHEN_STANDARDS = [
  {
    number: "01",
    title: "Locked Pure Veg & Jain Wing",
    description:
      "Untouched cookware, separate prep chefs, and an isolated cooking zone for Telugu Pelli, Marwari, and Sattvic Jain feasts — zero non-veg cross-contact.",
  },
  {
    number: "02",
    title: "Wood-Charcoal & Granite Hearth",
    description:
      "Atta-sealed copper degs steamed slow over tamarind-wood coals alongside heated black Deccani stone for smoky Pathar ka Gosht.",
  },
  {
    number: "03",
    title: "Calm Hospitality Across Scale",
    description:
      "Paced banana-leaf sit-downs for 150 elders or 2,500-guest palace dastarkhwans from Jubilee Hills and Old City to Gachibowli.",
  },
];

export function CateringPageExperience({
  service,
  faqs,
  otherServices,
}: CateringPageExperienceProps) {
  return (
    <div className="bg-alabaster text-ink">
      {/* Band 1: Spacious Alabaster Fine-Dining Atelier Hero */}
      <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 border-b border-stone-line bg-alabaster">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 text-xs font-medium text-ink-subtle mb-8"
          >
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="w-3 h-3 text-brass" />
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <ChevronRight aria-hidden="true" className="w-3 h-3 text-brass" />
            <span className="text-ink font-semibold" aria-current="page">
              {service.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="editorial-italic text-2xl sm:text-3xl">
                Dil se Dawat
              </p>

              <h1 className="display-hero text-ink">
                Hyderabadi Shaadi &amp; Pelli{" "}
                <span className="editorial-italic">Catering</span>
              </h1>

              <p className="editorial-body max-w-xl">
                {service.shortDescription}
              </p>

              <div className="border-t border-b border-stone-line py-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-ink tabular-nums">
                <span>
                  {service.startingPrice
                    ? `Packages from ${service.startingPrice}`
                    : "Tailored Wedding Menus"}
                </span>
                <span className="text-brass" aria-hidden="true">
                  •
                </span>
                <span>100% Pure Veg Kitchens Available</span>
                <span className="text-brass" aria-hidden="true">
                  •
                </span>
                <span>Live Degs &amp; Counters</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a href="#culinary-collections-heading" className="btn-editorial-dark">
                  <span>Explore Menus</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </a>

                <Link
                  href="/contact?eventType=Catering"
                  className="btn-editorial-outline"
                >
                  <span>Book a Studio Tasting</span>
                </Link>
              </div>
            </div>

            {/* Right Pair: Both Muslim & Hindu Feasts in Sharp Gallery Plates */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-start">
              <div className="space-y-2.5">
                <div className="gallery-frame">
                  <div className="relative aspect-[3/4] overflow-hidden bg-limestone">
                    <Image
                      src="/images/hyd-muslim-dawat-spread.webp"
                      alt="Authentic Hyderabadi Muslim Shaadi Dastarkhwan feast"
                      fill
                      priority
                      sizes="(max-width: 1024px) 45vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs font-medium text-ink-muted flex items-center gap-2">
                  <span className="text-brass-dark font-semibold tabular-nums">
                    01
                  </span>
                  <span>Nizami Shaadi Dastarkhwan</span>
                </p>
              </div>

              <div className="space-y-2.5 pt-6 sm:pt-8">
                <div className="gallery-frame">
                  <div className="relative aspect-[3/4] overflow-hidden bg-limestone">
                    <Image
                      src="/images/hyd-telugu-vindhu-leaf.webp"
                      alt="Traditional Telugu Hindu Pelli Vindhu Bhojanam served on fresh banana leaf"
                      fill
                      priority
                      sizes="(max-width: 1024px) 45vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs font-medium text-ink-muted flex items-center gap-2">
                  <span className="text-brass-dark font-semibold tabular-nums">
                    02
                  </span>
                  <span>Telugu Pelli Arati Aku Vindhu</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Silk White Michelin-Style Restaurant Menu Explorer */}
      {service.menuCollections && service.menuCollections.length > 0 && (
        <CulinaryMenuExplorer collections={service.menuCollections} />
      )}

      {/* Band 3: Deep Obsidian Culinary Craft Chapter */}
      <section className="relative overflow-hidden bg-obsidian text-ink-light py-20 lg:py-24">
        <JaaliPattern tone="dark" className="absolute inset-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2.5">
            <span className="editorial-kicker-light block">
              Inside Our Kitchens
            </span>
            <h2 className="display-section text-ink-light">
              Separate Kitchens. Real Fire.{" "}
              <span className="font-display italic font-normal text-brass-light tracking-[-0.01em]">
                Honest Taste.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {KITCHEN_STANDARDS.map((item) => (
              <div
                key={item.number}
                className="border-t border-obsidian-line pt-6 space-y-3"
              >
                <span className="font-display text-2xl sm:text-3xl font-medium text-brass-light tabular-nums block">
                  {item.number}
                </span>
                <h3 className="display-card text-ink-light">{item.title}</h3>
                <p className="text-sm sm:text-[15px] text-ink-lightMuted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pt-2">
            <figure className="space-y-3">
              <div className="gallery-frame-dark">
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-muted">
                  <Image
                    src="/images/hyderabadi-dum-biryani-deg.webp"
                    alt="Coal-fired copper biryani handis sealed for slow dum service"
                    fill
                    sizes="(max-width: 640px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="text-xs sm:text-sm text-ink-lightMuted">
                Atta-sealed copper degs slow-steamed on live wood coals before dinner.
              </figcaption>
            </figure>

            <figure className="space-y-3">
              <div className="gallery-frame-dark">
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-muted">
                  <Image
                    src="/images/irani-chai-mithai-parlor.webp"
                    alt="Brass samovar serving steaming Irani Chai with Osmania biscuits"
                    fill
                    sizes="(max-width: 640px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="text-xs sm:text-sm text-ink-lightMuted">
                Brass samovar Irani Chai, crisp Osmania biscuits &amp; late-night Meetha Paan.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Band 4: Limestone Hairline FAQs */}
      {faqs.length > 0 && (
        <section
          id="service-faqs"
          className="bg-limestone border-b border-stone-line py-16 lg:py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="editorial-kicker block">Straight Answers</span>
              <h2 className="display-section text-ink">
                Catering Questions Families{" "}
                <span className="editorial-italic">Ask</span>
              </h2>
            </div>

            <div className="divide-y divide-stone-line border-t border-b border-stone-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5 sm:py-6">
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 font-display text-xl sm:text-2xl font-medium text-ink">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="text-brass-dark group-open:rotate-45 transition-transform duration-200 font-sans text-xl leading-none shrink-0"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-[15px] text-ink-muted leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Band 5: Alabaster Jubilee Hills Studio Tasting Invitation + Other Disciplines */}
      <section className="bg-alabaster py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-[2px] bg-silk border border-stone-line p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 shadow-gallery">
            <div className="max-w-xl space-y-3">
              <span className="editorial-kicker block">
                Jubilee Hills Kitchen Studio
              </span>
              <h2 className="display-section text-ink">
                Taste the Biryani &amp; Mirchi ka Salan{" "}
                <span className="editorial-italic">Before You Book</span>
              </h2>
              <p className="editorial-body">
                Share your guest count and dates — we&apos;ll arrange a calm
                tasting session with our head khansama and pure-veg maharaj, plus
                clear per-plate pricing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Link
                href="/contact?eventType=Catering"
                className="btn-editorial-dark"
              >
                <span>Schedule a Food Tasting</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>

              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  "Aadaab / Namaskaram Tehzaa! We would like to discuss wedding catering and book a menu tasting."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-outline"
              >
                <PhoneCall aria-hidden="true" className="w-4 h-4 text-brass stroke-[1.5]" />
                <span>WhatsApp Kitchen</span>
              </a>
            </div>
          </div>

          {/* Architectural Other Disciplines Strip */}
          <div className="pt-6 border-t border-stone-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="editorial-kicker">Explore Other Disciplines</span>
            <div className="flex flex-wrap gap-2.5">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="px-4 py-2 rounded-[2px] border border-stone-line bg-silk hover:border-obsidian text-xs font-semibold tracking-[0.06em] text-ink transition-colors"
                >
                  {other.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
