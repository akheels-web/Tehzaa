"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { cn } from "@/lib/utils";

type TraditionLensId = "all" | "hindu" | "muslim" | "sikh-christian" | "corporate";

const LENSES: { id: TraditionLensId; label: string; note: string }[] = [
  {
    id: "all",
    label: "All Celebrations",
    note: "Full wedding decor, Hyderabadi & Telugu kitchens, Baraat bands & stress-free management.",
  },
  {
    id: "hindu",
    label: "Hindu Pelli & Rituals",
    note: "Telugu Pelli Pandiris, Marwari Haldi courts, Baraat bands & strictly separate Veg/Jain Vindhu.",
  },
  {
    id: "muslim",
    label: "Muslim Shaadi & Walima",
    note: "Chowmahalla Nikkah arches, Sanchaq thaals, Manjha, Marfa & proper coal-dum Shaadi Dawat.",
  },
  {
    id: "sikh-christian",
    label: "Sikh & Christian",
    note: "Calm white ivory Anand Karaj Palki canopies, botanical cathedral aisles & fusion menus.",
  },
  {
    id: "corporate",
    label: "Corporate & Ghar Functions",
    note: "HITEC City summits, Falaknuma dinners, Seemantham, Sanchaq, Aqiqah & Gandipet villas.",
  },
];

function serviceMatchesLens(serviceId: string, lens: TraditionLensId): boolean {
  if (lens === "all") return true;
  if (lens === "corporate") {
    return (
      serviceId === "corporate-events" ||
      serviceId === "family-celebrations" ||
      serviceId === "catering-services"
    );
  }
  return serviceId !== "corporate-events";
}

/**
 * Tradition filter + the five long service sections (the page's comparison content).
 * `renderIndex` draws a visual index (the Darbar doors) between the filter and the
 * sections; it receives the same dimming rule. Filtering dims non-matching services
 * rather than removing them, so the comparison stays intact.
 */
export function ServicesTraditionIndex({
  services,
  renderIndex,
}: {
  services: ServiceCategory[];
  renderIndex?: (isDimmed: (s: ServiceCategory) => boolean) => React.ReactNode;
}) {
  const [activeLens, setActiveLens] = useState<TraditionLensId>("all");
  const currentLens = LENSES.find((l) => l.id === activeLens) || LENSES[0];
  const isDimmed = (s: ServiceCategory) => !serviceMatchesLens(s.id, activeLens);

  return (
    <div className="space-y-14">
      {/* Tradition filter */}
      <div className="space-y-4 border-y border-brass/30 py-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brass-dark">
            Pick your celebration type
          </span>
          <span aria-live="polite" className="font-sans text-xs font-medium text-ink-muted sm:text-sm">
            {currentLens.note}
          </span>
        </div>

        <div role="group" aria-label="Filter celebration services by community tradition" className="flex flex-wrap gap-2.5">
          {LENSES.map((lens) => {
            const isSelected = lens.id === activeLens;
            return (
              <button
                key={lens.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveLens(lens.id)}
                className={cn(
                  "cursor-pointer border px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.1em] transition-colors",
                  isSelected
                    ? "border-ruby bg-ruby text-marble"
                    : "border-brass/40 bg-marble text-ink-muted hover:border-ruby hover:text-ruby"
                )}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      {renderIndex?.(isDimmed)}

      {/* Service spreads */}
      <div className="space-y-20">
        {services.map((service, idx) => {
          const isReversed = idx % 2 === 1;
          const dimmed = isDimmed(service);

          return (
            <motion.article
              key={service.id}
              id={service.slug}
              animate={{ opacity: dimmed ? 0.35 : 1 }}
              transition={{ duration: 0.4 }}
              className="scroll-mt-28"
            >
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={cn("space-y-4 lg:col-span-5", isReversed ? "lg:order-2" : "lg:order-1")}>
                  <ArchFrame
                    src={service.heroImage}
                    alt={service.title}
                    sizes="(max-width: 1024px) 90vw, 36vw"
                    className="mx-auto aspect-[4/4.6] w-full max-w-[440px]"
                  />
                  <div className="mx-auto grid max-w-[440px] grid-cols-3 gap-2.5">
                    {service.galleryImages.slice(0, 3).map((thumb, tIdx) => (
                      <div key={`${service.id}-thumb-${tIdx}`} className="border-[4px] border-white shadow-[0_8px_18px_-10px_rgba(92,31,36,0.4)]">
                        <div className="relative aspect-[4/3]">
                          <Image src={thumb} alt={`${service.title} detail ${tIdx + 1}`} fill sizes="(max-width: 1024px) 30vw, 12vw" className="object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cn("space-y-6 lg:col-span-7", isReversed ? "lg:order-1" : "lg:order-2")}>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brass/30 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl italic tabular-nums text-ruby">0{idx + 1}</span>
                      <span className="h-4 w-px bg-brass/40" />
                      <span className="font-sans text-xs font-medium text-ink-muted">{service.subtitle}</span>
                    </div>
                    {service.startingPrice && (
                      <span className="border border-brass/40 bg-marble px-3 py-1 font-sans text-xs font-bold tabular-nums text-ink">
                        From {service.startingPrice}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-display text-[clamp(2rem,3.4vw,2.8rem)] font-medium leading-tight text-ink">{service.title}</h2>
                    <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-muted sm:text-[17px]">{service.shortDescription}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-brass-dark">
                      What&apos;s included
                    </span>
                    <div className="divide-y divide-brass/25 border-y border-brass/25">
                      {service.offerings.map((offering) => (
                        <div key={offering.title} className="flex items-start gap-3 py-3.5">
                          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                          <div>
                            <h3 className="font-display text-xl font-medium leading-snug text-ink">{offering.title}</h3>
                            <p className="mt-1 font-sans text-xs leading-relaxed text-ink-muted sm:text-sm">{offering.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.idealFor.map((occasion) => (
                      <span key={occasion} className="border border-brass/30 bg-marble px-3 py-1 font-sans text-xs text-ink-muted">
                        {occasion}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <Link href={`/services/${service.slug}`} className="btn-editorial-dark group">
                      <span>
                        {service.menuCollections
                          ? "Open Interactive Menu Builder"
                          : service.id === "floral-decorations"
                            ? "Open Wedding Decor Studio"
                            : "Open Interactive Blueprint"}
                      </span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 stroke-[1.5] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link href="/contact" className="btn-editorial-outline">
                      <span>Ask for a Quote</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
