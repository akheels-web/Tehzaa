"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { cn } from "@/lib/utils";

interface InteractiveDisciplinesProps {
  services: ServiceCategory[];
}

/**
 * Warm Alabaster asymmetric editorial index (01-05) with sticky Silk gallery plate.
 */
export function InteractiveDisciplines({ services }: InteractiveDisciplinesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] || services[0];

  return (
    <section className="py-20 lg:py-28 bg-alabaster text-ink border-b border-stone-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-line mb-12">
          <div className="max-w-2xl space-y-2.5">
            <span className="editorial-kicker block">Sab kuch under one roof</span>
            <h2 className="display-section text-ink">
              Five Things We Do{" "}
              <span className="editorial-italic">Really Well</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-ink hover:text-brass-dark transition-colors shrink-0"
          >
            <span>See all services</span>
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Architectural Hairline Index */}
          <div className="lg:col-span-6 divide-y divide-stone-line border-t border-b border-stone-line">
            {services.map((service, idx) => {
              const isActive = idx === activeIndex;
              const panelId = `discipline-detail-${service.id}`;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "py-5 transition-[background-color,padding] duration-200 group",
                    isActive
                      ? "pl-4 border-l-2 border-l-brass-dark bg-limestone/45"
                      : "pl-0 hover:pl-2"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      className="flex-1 text-left cursor-pointer rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-[2px] overflow-hidden border border-stone-line bg-limestone shrink-0">
                          <Image
                            src={service.heroImage}
                            alt={service.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.14em] text-brass-dark font-semibold tabular-nums">
                            <span>0{idx + 1}</span>
                            {service.startingPrice && (
                              <>
                                <span className="text-stone-line" aria-hidden="true">
                                  /
                                </span>
                                <span>Starts {service.startingPrice}</span>
                              </>
                            )}
                          </div>

                          <h3
                            className={cn(
                              "font-display text-2xl sm:text-[26px] font-medium transition-colors leading-snug",
                              isActive
                                ? "text-ink"
                                : "text-ink-muted group-hover:text-ink"
                            )}
                          >
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </button>

                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`Open ${service.title}`}
                      className={cn(
                        "w-10 h-10 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors duration-200",
                        isActive
                          ? "bg-obsidian border-obsidian text-alabaster"
                          : "border-stone-line bg-silk text-ink-muted group-hover:border-obsidian group-hover:text-ink"
                      )}
                    >
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    </Link>
                  </div>

                  {/* Active Summary */}
                  {isActive && (
                    <motion.div
                      id={panelId}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-xs sm:text-sm text-ink-muted mt-3 leading-relaxed pr-4">
                        {service.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.idealFor.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-[2px] text-[11px] bg-silk border border-stone-line text-ink-muted font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mobile inline preview plate */}
                      <div className="mt-5 lg:hidden gallery-frame">
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-limestone">
                          <Image
                            src={service.heroImage}
                            alt={service.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="mt-4 lg:hidden">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-ink border-b border-obsidian pb-0.5"
                        >
                          <span>Check out {service.title}</span>
                          <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Sticky Silk Gallery Plate (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28" aria-live="polite">
            <div className="gallery-frame p-3 shadow-gallery space-y-4">
              <div className="relative aspect-[4/3.5] w-full overflow-hidden bg-limestone">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.heroImage}
                      alt={activeService.title}
                      fill
                      sizes="48vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="px-2 pb-2 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-brass-dark block tabular-nums">
                    0{activeIndex + 1} / {activeService.subtitle}
                  </span>
                  <h4 className="font-display text-3xl text-ink mt-1 truncate">
                    {activeService.title}
                  </h4>
                </div>
                <Link
                  href={`/services/${activeService.slug}`}
                  className="btn-editorial-dark shrink-0"
                >
                  <span>Explore</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
