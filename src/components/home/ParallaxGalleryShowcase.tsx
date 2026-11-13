"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface ParallaxGalleryShowcaseProps {
  items: GalleryItem[];
}

const FILTER_TABS = ["All", "Weddings", "Floral", "Catering", "Corporate", "Family"] as const;

/**
 * Editorial portfolio grid with discipline quick-filtering.
 */
export function ParallaxGalleryShowcase({ items }: ParallaxGalleryShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const visibleItems = useMemo(() => {
    const filtered =
      activeFilter === "All"
        ? items
        : items.filter((item) => item.category === activeFilter);
    return filtered.slice(0, 6);
  }, [items, activeFilter]);

  const galleryHref =
    activeFilter === "All"
      ? "/gallery"
      : `/gallery?category=${encodeURIComponent(activeFilter)}`;

  return (
    <section className="py-24 lg:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Interactive Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-gold/25 mb-12">
          <div className="max-w-2xl">
            <p className="editorial-kicker mb-3">Selected commissions &amp; showcases</p>
            <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.08]">
              Celebrations Across{" "}
              <span className="text-burgundy">Hyderabad</span>
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter featured showcases by discipline"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-medium border transition-colors duration-200 cursor-pointer",
                    isSelected
                      ? "bg-burgundy text-ivory border-burgundy"
                      : "bg-cream text-charcoal/80 border-gold/25 hover:border-burgundy/50 hover:text-burgundy"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
          {visibleItems.map((item) => (
            <div key={item.id}>
              <Link href={galleryHref} className="group block rounded-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gold/25 bg-cream">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {/* Hover / Touch View Story Badge */}
                  <div className="absolute inset-0 bg-charcoal/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity duration-200 flex items-end justify-end p-4">
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ivory/95 text-charcoal text-xs font-medium shadow-sm">
                      <span>View story</span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    </span>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gold-dark font-medium">
                    <span>{item.category}</span>
                    <span className="text-taupe-dark">{item.location.replace(", Hyderabad", "")}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal group-hover:text-burgundy transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p aria-live="polite" className="text-xs text-taupe-dark tabular-nums">
            Showing {visibleItems.length} curated {activeFilter === "All" ? "showcases" : `${activeFilter.toLowerCase()} showcases`} across Hyderabad&apos;s premier venues.
          </p>
          <Link
            href={galleryHref}
            className="group inline-flex items-center gap-2 text-xs font-medium text-burgundy hover:text-gold-dark transition-colors shrink-0"
          >
            <span>Explore full gallery</span>
            <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}

