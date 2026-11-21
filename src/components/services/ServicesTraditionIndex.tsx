"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
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

export function ServicesTraditionIndex({ services }: { services: ServiceCategory[] }) {
  const [activeLens, setActiveLens] = useState<TraditionLensId>("all");
  const currentLens = LENSES.find((l) => l.id === activeLens) || LENSES[0];
  const visibleServices = services.filter((s) =>
    serviceMatchesLens(s.id, activeLens)
  );

  return (
    <div className="space-y-12">
      {/* Architectural Tradition Filter Bar */}
      <div className="rounded-[2px] border border-stone-line bg-silk p-6 sm:p-8 space-y-4 shadow-gallery">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="editorial-kicker">Pick your celebration type</span>
          <span
            aria-live="polite"
            className="text-xs sm:text-sm text-ink-muted font-medium"
          >
            {currentLens.note}
          </span>
        </div>

        <div
          role="group"
          aria-label="Filter celebration services by community tradition"
          className="flex flex-wrap gap-2.5"
        >
          {LENSES.map((lens) => {
            const isSelected = lens.id === activeLens;
            return (
              <button
                key={lens.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveLens(lens.id)}
                className={cn(
                  "px-4 py-2.5 rounded-[2px] text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer",
                  isSelected
                    ? "bg-obsidian text-alabaster border-obsidian"
                    : "bg-alabaster text-ink-muted border-stone-line hover:border-obsidian hover:text-ink"
                )}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sharp Architectural Editorial Service Spreads */}
      <div className="space-y-12">
        {visibleServices.map((service, idx) => {
          const isReversed = idx % 2 === 1;
          const indexLabel = `0${idx + 1}`;

          return (
            <article
              key={service.id}
              id={service.slug}
              className="rounded-[2px] border border-stone-line bg-silk p-6 sm:p-10 lg:p-12 shadow-gallery"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Photography Column */}
                <div
                  className={`lg:col-span-5 space-y-3 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="gallery-frame bg-alabaster">
                    <div className="relative aspect-[4/3] overflow-hidden bg-limestone">
                      <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Secondary Preview Plates */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {service.galleryImages.slice(0, 3).map((thumb, tIdx) => (
                      <div
                        key={`${service.id}-thumb-${tIdx}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-stone-line bg-limestone"
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
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-line pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl sm:text-3xl font-medium text-brass-dark tabular-nums">
                        {indexLabel}
                      </span>
                      <span className="h-4 w-px bg-stone-line" />
                      <span className="text-xs text-ink-subtle font-medium">
                        {service.subtitle}
                      </span>
                    </div>

                    {service.startingPrice && (
                      <span className="text-xs font-semibold text-ink bg-alabaster px-3 py-1 rounded-[2px] border border-stone-line tabular-nums">
                        From {service.startingPrice}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="display-card sm:text-4xl text-ink leading-tight">
                      {service.title}
                    </h2>
                    <p className="mt-3 editorial-body">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Clean Hairline Offerings Index */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-dark block">
                      What&apos;s included
                    </span>
                    <div className="divide-y divide-stone-line border-t border-b border-stone-line">
                      {service.offerings.map((offering) => (
                        <div
                          key={offering.title}
                          className="py-3.5 flex items-start gap-3"
                        >
                          <Check
                            aria-hidden="true"
                            className="w-4 h-4 stroke-[1.5] text-brass shrink-0 mt-1"
                          />
                          <div>
                            <h3 className="font-display text-xl font-medium text-ink leading-snug">
                              {offering.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
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
                        className="text-xs px-3 py-1 rounded-[2px] bg-alabaster border border-stone-line text-ink-muted"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-editorial-dark group"
                    >
                      <span>
                        {service.menuCollections
                          ? "Open Interactive Menu Builder"
                          : service.id === "floral-decorations"
                            ? "Open Wedding Decor Studio"
                            : "Open Interactive Blueprint"}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200"
                      />
                    </Link>

                    <Link href="/contact" className="btn-editorial-outline">
                      <span>Ask for a Quote</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
