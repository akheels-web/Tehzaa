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
 * Sticky split-stage discipline explorer: hovering or clicking any discipline
 * on the left smoothly animates the sticky architectural showcase on the right.
 */
export function InteractiveDisciplines({ services }: InteractiveDisciplinesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] || services[0];

  return (
    <section className="py-24 lg:py-32 bg-cream border-y border-gold/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gold/25 mb-12">
          <div className="max-w-2xl">
            <p className="editorial-kicker mb-3">Signature disciplines</p>
            <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.08]">
              Five Pillars of{" "}
              <span className="text-burgundy">Celebration</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-xs font-medium text-burgundy hover:text-gold-dark transition-colors shrink-0"
          >
            <span>Explore all services</span>
            <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Interactive List */}
          <div className="lg:col-span-6 divide-y divide-gold/25 border-b border-gold/25">
            {services.map((service, idx) => {
              const isActive = idx === activeIndex;
              const panelId = `discipline-detail-${service.id}`;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "py-6 transition-[background-color,border-color,padding] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group",
                    isActive ? "pl-4 border-l-2 border-l-burgundy bg-ivory/60" : "pl-0 hover:pl-2"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      className="flex-1 text-left cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border border-gold/25 bg-cream shrink-0">
                          <Image
                            src={service.heroImage}
                            alt={service.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-3 text-xs text-gold-dark font-medium tabular-nums">
                            <span>0{idx + 1}</span>
                            {service.startingPrice && (
                              <>
                                <span className="text-gold/50" aria-hidden="true">•</span>
                                <span>From {service.startingPrice}</span>
                              </>
                            )}
                          </div>

                          <h3
                            className={cn(
                              "font-serif text-xl sm:text-2xl font-medium transition-colors",
                              isActive ? "text-burgundy" : "text-charcoal group-hover:text-burgundy"
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
                        "w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200",
                        isActive
                          ? "bg-burgundy border-burgundy text-ivory"
                          : "border-gold/30 text-charcoal/65 group-hover:border-burgundy group-hover:text-burgundy"
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
                      <p className="text-xs sm:text-sm text-charcoal/75 mt-3 leading-relaxed pr-4">
                        {service.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.idealFor.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-md text-xs bg-ivory border border-gold/25 text-taupe-dark font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Mobile-only inline preview image */}
                      <div className="mt-5 lg:hidden relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gold/25">
                        <Image
                          src={service.heroImage}
                          alt={service.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-4 lg:hidden">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-medium text-burgundy"
                        >
                          <span>View {service.title}</span>
                          <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Sticky Visual Stage (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28" aria-live="polite">
            <div className="relative bg-ivory rounded-2xl border border-gold/30 p-2 shadow-luxury">
              <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-lg bg-charcoal">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Stage Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory z-10">
                  <span className="text-xs text-gold-light block mb-1 tabular-nums">
                    0{activeIndex + 1} / {activeService.subtitle}
                  </span>
                  <h4 className="font-serif text-3xl font-medium text-ivory">
                    {activeService.title}
                  </h4>
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-ivory/20">
                    <span className="text-xs text-ivory/80 tabular-nums">
                      {activeService.startingPrice
                        ? `Commencing from ${activeService.startingPrice}`
                        : "Tailored proposals"}
                    </span>
                    <Link
                      href={`/services/${activeService.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ivory text-charcoal hover:bg-ivory-dark text-xs font-medium transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

