"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Leaf, UtensilsCrossed, ArrowUpRight } from "lucide-react";
import type { MenuCollection } from "@/data/services";
import { cn } from "@/lib/utils";

interface CulinaryMenuExplorerProps {
  collections: MenuCollection[];
}

export function CulinaryMenuExplorer({
  collections,
}: CulinaryMenuExplorerProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"tabbed" | "all">("tabbed");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (!collections || collections.length === 0) return null;

  const activeCollection = collections[activeIndex] || collections[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % collections.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + collections.length) % collections.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = collections.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveIndex(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section className="space-y-10" aria-labelledby="culinary-collections-heading">
      {/* Editorial Section Header */}
      <div className="border-b border-gold/25 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="editorial-kicker block mb-2">
            Indian &amp; Hyderabadi Gastronomy
          </span>
          <h3
            id="culinary-collections-heading"
            className="font-serif text-3xl sm:text-4xl font-normal text-charcoal leading-tight"
          >
            Curated Culinary <span className="text-burgundy">Collections</span>
          </h3>
          <p className="mt-2 text-sm text-charcoal/75 max-w-2xl leading-relaxed">
            From copper-deg Hyderabadi Dum Biryani and ceremonial banana-leaf Telugu Vindhu Bhojanam to strictly segregated Pure Vegetarian &amp; Jain kitchens.
          </p>
        </div>

        {/* View Switcher */}
        <div
          role="group"
          aria-label="Menu view mode"
          className="inline-flex items-center rounded-xl border border-gold/25 bg-cream p-1 self-start md:self-auto"
        >
          <button
            type="button"
            aria-pressed={viewMode === "tabbed"}
            onClick={() => setViewMode("tabbed")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer",
              viewMode === "tabbed"
                ? "bg-burgundy text-cream"
                : "text-charcoal/70 hover:text-charcoal"
            )}
          >
            By Tradition
          </button>
          <button
            type="button"
            aria-pressed={viewMode === "all"}
            onClick={() => setViewMode("all")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium transition-colors tabular-nums cursor-pointer",
              viewMode === "all"
                ? "bg-burgundy text-cream"
                : "text-charcoal/70 hover:text-charcoal"
            )}
          >
            View All ({collections.length})
          </button>
        </div>
      </div>

      {/* Dual Photographic Highlight Band */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-gold/25 bg-cream">
          <Image
            src="/images/catering-hyderabadi-feast.webp"
            alt="Hyderabadi Shahi Dastarkhwan and copper deg dum cooking"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-cream">
            <span className="text-xs font-medium text-ivory-dark block">
              Deccani Copper-Deg Craft
            </span>
            <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
              Shahi Hyderabadi Dastarkhwan &amp; Charcoal Grills
            </p>
          </div>
        </div>

        <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-gold/25 bg-cream">
          <Image
            src="/images/catering-indian-thali.webp"
            alt="Traditional Telugu Vindhu Bhojanam and ceremonial Indian thali"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-cream">
            <span className="text-xs font-medium text-ivory-dark block">
              Ceremonial Banana-Leaf Service
            </span>
            <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
              Telugu Vindhu Bhojanam, Pure Veg &amp; Royal Thalis
            </p>
          </div>
        </div>
      </div>

      {viewMode === "tabbed" ? (
        <div className="rounded-2xl border border-gold/25 bg-cream overflow-hidden">
          {/* Collection Tabs */}
          <div
            role="tablist"
            aria-label="Culinary Menu Traditions"
            className="flex flex-wrap border-b border-gold/25 bg-ivory/60"
          >
            {collections.map((col, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={col.title}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={`menu-tab-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`menu-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={cn(
                    "px-5 py-4 text-left text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px flex-1 min-w-[180px] cursor-pointer",
                    isActive
                      ? "border-burgundy bg-cream text-burgundy font-semibold"
                      : "border-transparent text-charcoal/70 hover:text-charcoal hover:bg-ivory"
                  )}
                >
                  <span className="block text-xs font-mono text-gold-dark mb-1 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="line-clamp-1">{col.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Collection Detail */}
          <div
            role="tabpanel"
            id={`menu-panel-${activeIndex}`}
            aria-labelledby={`menu-tab-${activeIndex}`}
            tabIndex={0}
            className="p-6 sm:p-10 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gold/20 pb-6">
              <div>
                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                  {activeCollection.title}
                </h4>
                <p className="mt-1.5 text-sm text-taupe-dark leading-relaxed">
                  {activeCollection.subtitle}
                </p>
              </div>
              {activeCollection.dietaryNote && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-deep text-ivory text-xs font-medium shrink-0 self-start">
                  <Leaf aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-ivory-dark" />
                  {activeCollection.dietaryNote}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCollection.items.map((dish) => (
                <div
                  key={dish}
                  className="flex items-start gap-3 p-4 rounded-lg bg-ivory/70 border border-gold/20"
                >
                  <Check aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal font-medium leading-snug">
                    {dish}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-taupe-dark flex items-center gap-2">
                <UtensilsCrossed aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark shrink-0" />
                <span>
                  Customised to your family’s heirloom recipes &amp; arranged via private tasting sessions.
                </span>
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:text-gold-dark transition-colors"
              >
                <span>Request Private Menu Tasting</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {collections.map((col, idx) => (
            <div
              key={col.title}
              className="rounded-2xl border border-gold/25 bg-cream p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gold/20 pb-4">
                <div>
                  <span className="text-xs font-mono text-gold-dark block mb-1 tabular-nums">
                    Collection 0{idx + 1}
                  </span>
                  <h4 className="font-serif text-2xl font-normal text-charcoal">
                    {col.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-taupe-dark mt-1">
                    {col.subtitle}
                  </p>
                </div>
                {col.dietaryNote && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-deep text-ivory text-xs font-medium self-start">
                    <Leaf aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    {col.dietaryNote}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {col.items.map((dish) => (
                  <div
                    key={dish}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-ivory/70 border border-gold/15"
                  >
                    <Check aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal font-medium">
                      {dish}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
