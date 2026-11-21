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

const FILTER_TABS = [
  "All",
  "Weddings",
  "Floral",
  "Catering",
  "Corporate",
  "Family",
] as const;

/**
 * Warm Alabaster staggered gallery showcase with category deep-linking to /gallery.
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
    <section className="py-20 lg:py-28 bg-alabaster text-ink border-b border-stone-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Sharp Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-line mb-12">
          <div className="max-w-2xl space-y-2.5">
            <span className="editorial-kicker block">Real venues, real moments</span>
            <h2 className="display-section text-ink">
              Photo Scrapbook Around{" "}
              <span className="editorial-italic">Hyderabad</span>
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
                    "px-4 py-2 rounded-[2px] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] border transition-colors duration-200 cursor-pointer",
                    isSelected
                      ? "bg-obsidian text-alabaster border-obsidian"
                      : "bg-silk text-ink-muted border-stone-line hover:border-obsidian hover:text-ink"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Staggered Editorial Magazine Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
          {visibleItems.map((item, idx) => (
            <div
              key={item.id}
              className={cn(idx % 3 === 1 ? "lg:mt-8" : "")}
            >
              <Link
                href={galleryHref}
                className="group block rounded-[2px] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="gallery-frame group-hover:border-obsidian/40 transition-colors shadow-gallery">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-limestone">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-obsidian/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-obsidian text-alabaster text-[11px] font-sans font-semibold uppercase tracking-[0.14em]">
                        <span>See story</span>
                        <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5] text-brass-light" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-1.5 px-0.5">
                  <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.14em] text-brass-dark font-semibold">
                    <span>{item.tradition}</span>
                    <span className="text-ink-subtle font-medium">
                      {item.location.replace(", Hyderabad", "")}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-ink group-hover:text-brass-dark transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-stone-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p aria-live="polite" className="text-xs text-ink-muted tabular-nums">
            Showing {visibleItems.length}{" "}
            {activeFilter === "All"
              ? "stories"
              : `${activeFilter.toLowerCase()} stories`}{" "}
            across Hyderabad venues.
          </p>
          <Link
            href={galleryHref}
            className="group inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-ink hover:text-brass-dark transition-colors shrink-0"
          >
            <span>Open full photo gallery</span>
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
