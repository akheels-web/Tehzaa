"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ArrowUpRight, Compass, Camera } from "lucide-react";
import { HYDERABAD_MONUMENTS } from "@/data/monuments";
import { JaaliPattern } from "@/components/deccani/DeccaniMotifs";
import { cn } from "@/lib/utils";

/**
 * Dramatic Deep Obsidian exhibition featuring all 6 real Hyderabad architectural landmarks
 * from HYDERABAD_MONUMENTS (Charminar, Chowmahalla, Taj Falaknuma, Golconda Fort, Taramati, Qutb Shahi Tombs).
 */
export function HyderabadPrecinctAtlas() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current =
    HYDERABAD_MONUMENTS[selectedIdx] || HYDERABAD_MONUMENTS[0];

  return (
    <section
      aria-labelledby="monuments-heading"
      className="relative py-20 lg:py-28 bg-obsidian text-ink-light border-b border-obsidian-line overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <JaaliPattern tone="dark" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-obsidian-line">
          <div className="space-y-2.5 max-w-2xl">
            <span className="editorial-kicker-light block">
              Masth venues &amp; living heritage around Hyderabad
            </span>
            <h2 id="monuments-heading" className="display-section text-ink-light">
              Iconic Palaces &amp; Favorite{" "}
              <span className="font-display italic font-normal text-brass-light">
                City Landmarks
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-lightMuted">
            <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-light shrink-0" />
            <span>Our Studio: Road No. 36, Jubilee Hills</span>
          </div>
        </div>

        {/* Obsidian Architectural Monument Exhibition Grid */}
        <div className="rounded-[2px] border border-obsidian-line bg-obsidian-elevated overflow-hidden shadow-obsidian">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Monument Selector */}
            <div
              role="group"
              aria-label="Select a Hyderabad monument or heritage venue"
              className="lg:col-span-5 divide-y divide-obsidian-line border-b lg:border-b-0 lg:border-r border-obsidian-line"
            >
              {HYDERABAD_MONUMENTS.map((monument, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={monument.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedIdx(idx)}
                    className={cn(
                      "w-full text-left px-6 py-4 transition-colors duration-200 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brass-light",
                      isSelected
                        ? "bg-obsidian-muted border-l-2 border-l-brass-light text-ink-light"
                        : "hover:bg-obsidian-muted/50 text-ink-lightMuted hover:text-ink-light"
                    )}
                  >
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] tabular-nums",
                          isSelected ? "text-brass-light" : "text-ink-lightMuted"
                        )}
                      >
                        0{idx + 1} · {monument.builtEra}
                      </span>
                      <span className="font-display text-2xl font-medium text-ink-light block mt-0.5 truncate">
                        {monument.name}
                      </span>
                      <span className="text-xs text-ink-lightMuted block mt-0.5 truncate">
                        {monument.precinct}
                      </span>
                    </div>
                    <Compass
                      aria-hidden="true"
                      className={cn(
                        "w-4 h-4 stroke-[1.5] shrink-0",
                        isSelected ? "text-brass-light" : "text-ink-lightMuted/60"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Monument Architectural Dossier */}
            <div aria-live="polite" className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  {/* Gallery Frame (Preserves full vertical silhouette of Charminar & wide symmetry of palaces) */}
                  <div className="gallery-frame-dark bg-obsidian">
                    <div className="relative h-[260px] sm:h-[340px] w-full overflow-hidden bg-obsidian">
                      <Image
                        src={current.image}
                        alt={current.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className={cn(
                          current.id === "charminar"
                            ? "object-contain"
                            : "object-cover"
                        )}
                      />
                    </div>
                    <div className="pt-2.5 px-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-lightMuted">
                      <span className="inline-flex items-center gap-1.5 text-brass-light font-semibold uppercase tracking-[0.14em]">
                        <MapPin aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
                        {current.precinct}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Camera aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
                        {current.creditLicense}
                      </span>
                    </div>
                  </div>

                  {/* Monument Editorial Note */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-3xl text-ink-light">
                        {current.name}
                      </h3>
                      <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-brass-light tabular-nums">
                        {current.builtEra}
                      </span>
                    </div>
                    <p className="text-sm text-ink-lightMuted leading-relaxed">
                      {current.editorialCopy}
                    </p>
                  </div>

                  {/* Hairline Architectural & Celebration Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-obsidian-line">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-light block">
                        Architectural History
                      </span>
                      <p className="text-xs sm:text-sm text-ink-lightMuted leading-relaxed">
                        {current.architecturalHighlight}
                      </p>
                    </div>
                    <div className="space-y-1.5 sm:border-l sm:border-obsidian-line sm:pl-6">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-light block">
                        Wedding &amp; Event Role
                      </span>
                      <p className="text-xs sm:text-sm text-ink-lightMuted leading-relaxed">
                        {current.celebrationRole}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/contact?brief=${encodeURIComponent(
                        `Planning an event inspired by or near ${current.name} (${current.precinct}).`
                      )}`}
                      className="btn-editorial-outline-dark"
                    >
                      <span>Ask us about celebrations around {current.name}</span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
