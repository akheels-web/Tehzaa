"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, X, ArrowUpRight, ChevronDown } from "lucide-react";
import type { MenuCollection } from "@/data/services";
import { cn } from "@/lib/utils";

interface CulinaryMenuExplorerProps {
  collections: MenuCollection[];
  embedded?: boolean;
}

export function CulinaryMenuExplorer({
  collections,
  embedded = false,
}: CulinaryMenuExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([
    "Kachche Gosht ki Mutton Dum Biryani",
    "Mudda Pappu, Avakaya & Melting Desi Ghee",
  ]);
  const [showFullItems, setShowFullItems] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeCollection = collections[activeIndex] ?? collections[0];

  if (!activeCollection) return null;

  const toggleDish = (dishName: string) => {
    setSelectedDishes((prev) =>
      prev.includes(dishName)
        ? prev.filter((item) => item !== dishName)
        : [...prev, dishName]
    );
  };

  const handleSelectCollection = (idx: number) => {
    setActiveIndex(idx);
    setShowFullItems(false);
  };

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") {
      nextIdx = (idx + 1) % collections.length;
    } else if (e.key === "ArrowLeft") {
      nextIdx = (idx - 1 + collections.length) % collections.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = collections.length - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      handleSelectCollection(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  const getTabLabel = (title: string) => {
    if (title.includes("Muslim Shaadi")) return "Muslim Dawat";
    if (title.includes("Telugu Hindu")) return "Telugu Pelli Vindhu";
    if (title.includes("Telangana Non-Veg")) return "Telangana & North Indian";
    if (title.includes("Pure Veg & Jain")) return "Pure Veg & Jain";
    if (title.includes("Irani Chai")) return "Irani Chai & Paan";
    return title;
  };

  const tastingHref =
    selectedDishes.length > 0
      ? `/contact?eventType=Catering&brief=${encodeURIComponent(
          `Menu tasting shortlist: ${selectedDishes.join(", ")}`
        )}`
      : "/contact?eventType=Catering";

  const innerContent = (
    <div className={embedded ? "" : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"}>
      {/* Clean Atelier Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl space-y-2.5">
          <span className="editorial-kicker block">Curated Wedding Menus</span>
          <h2 id="menu-explorer-title" className="display-section text-ink">
            Choose Your Kitchen{" "}
            <span className="editorial-italic">Tradition</span>
          </h2>
          <p className="editorial-body">
            Browse our signature menu formats across Hyderabad. Tap{" "}
            <span className="font-semibold text-ink">+ Add</span> next to any dish
            to build your tasting shortlist.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-ink-subtle tabular-nums border-l border-stone-line pl-4 self-start lg:self-end">
          <span className="font-display text-2xl font-medium text-brass-dark">
            0{activeIndex + 1}
          </span>
          <span>/ 0{collections.length} Culinary Editions</span>
        </div>
      </div>

      {/* Sharp Underlined Cuisine Tabs */}
      <div
        role="tablist"
        aria-label="Hyderabadi wedding menu traditions"
        className="flex flex-wrap gap-x-7 gap-y-2 border-b border-stone-line mb-10 lg:mb-12"
      >
        {collections.map((collection, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={collection.title}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`menu-panel-${idx}`}
              id={`menu-tab-${idx}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelectCollection(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={cn(
                "pb-3.5 text-xs sm:text-[13px] font-sans uppercase tracking-[0.12em] border-b-2 transition-colors duration-200 -mb-px whitespace-nowrap cursor-pointer",
                isActive
                  ? "border-obsidian text-ink font-semibold"
                  : "border-transparent text-ink-subtle hover:text-ink font-medium"
              )}
            >
              {getTabLabel(collection.title)}
            </button>
          );
        })}
      </div>

      {/* Active Cuisine View: 2-Column Editorial Tasting Split */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCollection.title}
          id={`menu-panel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={`menu-tab-${activeIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Left Sticky Column: Sharp Gallery Plate + Compact Tasting Shortlist */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <div className="gallery-frame bg-alabaster">
                <div className="relative aspect-[4/3] overflow-hidden bg-limestone">
                  <Image
                    src={
                      activeCollection.image ??
                      "/images/hyd-muslim-dawat-spread.webp"
                    }
                    alt={activeCollection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {(activeCollection.dietaryNote || activeCollection.aromaNote) && (
                <div className="space-y-1.5 pt-1 border-t border-stone-line">
                  {activeCollection.dietaryNote && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-dark">
                      {activeCollection.dietaryNote}
                    </p>
                  )}
                  {activeCollection.aromaNote && (
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Signature profile: {activeCollection.aromaNote}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Crisp Architectural Tasting Shortlist Panel */}
            <div className="p-6 sm:p-7 rounded-[2px] bg-alabaster border border-stone-line space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-stone-line pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-dark block">
                    Your Tasting Shortlist
                  </span>
                  <span className="font-display text-2xl font-medium text-ink tabular-nums mt-0.5 block">
                    {selectedDishes.length}{" "}
                    {selectedDishes.length === 1 ? "Dish" : "Dishes"} Selected
                  </span>
                </div>

                {selectedDishes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedDishes([])}
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-subtle hover:text-ink underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {selectedDishes.length === 0 ? (
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Tap <strong className="font-semibold text-ink">+ Add</strong>{" "}
                  beside any dish to save it for your studio food tasting.
                </p>
              ) : (
                <ul className="max-h-44 overflow-y-auto pr-1 divide-y divide-stone-line">
                  {selectedDishes.map((dish) => (
                    <li
                      key={dish}
                      className="py-2 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs sm:text-sm text-ink"
                    >
                      <span className="truncate font-medium">{dish}</span>
                      <button
                        type="button"
                        onClick={() => toggleDish(dish)}
                        aria-label={`Remove ${dish} from shortlist`}
                        className="p-1 text-ink-subtle hover:text-ink shrink-0 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <Link href={tastingHref} className="btn-editorial-dark w-full">
                <span>Send Shortlist For Tasting</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>

          {/* Right Open Column: Michelin Fine-Dining Hairline Course List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 pb-2">
              <h3 className="display-card sm:text-3xl text-ink">
                {activeCollection.title}
              </h3>
              <p className="editorial-body">{activeCollection.subtitle}</p>
            </div>

            {activeCollection.dishes && activeCollection.dishes.length > 0 && (
              <div className="divide-y divide-stone-line border-t border-b border-stone-line">
                {activeCollection.dishes.map((dish) => {
                  const isAdded = selectedDishes.includes(dish.name);
                  return (
                    <div
                      key={dish.name}
                      className="py-5 sm:py-6 flex items-start justify-between gap-4 sm:gap-6"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-dark">
                          <span>{dish.course}</span>
                          {dish.vessel && (
                            <>
                              <span aria-hidden="true" className="text-stone-line">
                                •
                              </span>
                              <span className="text-ink-subtle font-medium normal-case tracking-normal text-xs">
                                {dish.vessel}
                              </span>
                            </>
                          )}
                          {dish.veg && (
                            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px] tracking-normal normal-case">
                              <span
                                aria-hidden="true"
                                className="w-2.5 h-2.5 border border-emerald-700 inline-flex items-center justify-center rounded-[1px]"
                              >
                                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                              </span>
                              Pure Veg
                            </span>
                          )}
                        </div>

                        <h4 className="font-display text-xl sm:text-2xl font-medium text-ink leading-snug">
                          {dish.name}
                        </h4>

                        <p className="text-sm text-ink-muted leading-relaxed">
                          {dish.note}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleDish(dish.name)}
                        aria-pressed={isAdded}
                        className={cn(
                          "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors mt-1 cursor-pointer",
                          isAdded
                            ? "bg-obsidian text-alabaster border border-obsidian"
                            : "bg-silk border border-stone-line text-ink hover:border-obsidian"
                        )}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Expandable Full Dish Index */}
            <div className="pt-2">
              <button
                type="button"
                aria-expanded={showFullItems}
                onClick={() => setShowFullItems((v) => !v)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:text-brass-dark transition-colors tabular-nums cursor-pointer"
              >
                <span>
                  {showFullItems
                    ? "Hide Full Dish List"
                    : `See Full Dish List (${activeCollection.items.length} items)`}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    showFullItems ? "rotate-180" : ""
                  )}
                />
              </button>

              {showFullItems && (
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0 p-6 rounded-[2px] bg-alabaster border border-stone-line text-sm text-ink">
                  {activeCollection.items.map((item) => {
                    const isAdded = selectedDishes.includes(item);
                    return (
                      <li
                        key={item}
                        className="flex items-center justify-between gap-3 py-2.5 border-b border-stone-line/80 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => toggleDish(item)}
                          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brass-dark hover:text-ink shrink-0 cursor-pointer"
                        >
                          {isAdded ? "Added" : "+ Add"}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (embedded) {
    return (
      <section
        id="culinary-collections-heading"
        aria-labelledby="menu-explorer-title"
        className="py-6"
      >
        {innerContent}
      </section>
    );
  }

  return (
    <section
      id="culinary-collections-heading"
      aria-labelledby="menu-explorer-title"
      className="bg-silk border-b border-stone-line py-16 lg:py-24"
    >
      {innerContent}
    </section>
  );
}
