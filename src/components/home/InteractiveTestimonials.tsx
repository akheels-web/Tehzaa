"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

interface InteractiveTestimonialsProps {
  testimonials: Testimonial[];
}

/**
 * Limestone editorial pull-quotes guestbook with crisp Cormorant Garamond typography.
 */
export function InteractiveTestimonials({
  testimonials,
}: InteractiveTestimonialsProps) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index] || testimonials[0];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 lg:py-28 bg-limestone text-ink border-b border-stone-line"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-line mb-12">
          <div className="max-w-2xl space-y-2.5">
            <span className="editorial-kicker block">Love notes from families</span>
            <h2 id="testimonials-heading" className="display-section text-ink">
              What Hyderabad Families{" "}
              <span className="editorial-italic">Actually Said</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous note"
              className="w-10 h-10 rounded-[2px] border border-obsidian/30 bg-silk hover:border-obsidian hover:bg-obsidian hover:text-alabaster flex items-center justify-center text-ink transition-colors cursor-pointer"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </button>
            <span
              aria-live="polite"
              className="text-xs font-sans font-semibold text-ink-muted px-2 tabular-nums"
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next note"
              className="w-10 h-10 rounded-[2px] border border-obsidian/30 bg-silk hover:border-obsidian hover:bg-obsidian hover:text-alabaster flex items-center justify-center text-ink transition-colors cursor-pointer"
            >
              <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Mobile Compact Selector */}
        <div
          role="group"
          aria-label="Select family note"
          className="lg:hidden flex flex-wrap gap-2 mb-6"
        >
          {testimonials.map((item, idx) => {
            const isSelected = idx === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setIndex(idx)}
                className={cn(
                  "px-3.5 py-2 rounded-[2px] border text-[11px] font-sans font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer",
                  isSelected
                    ? "bg-obsidian text-alabaster border-obsidian"
                    : "bg-silk border-stone-line text-ink-muted hover:border-obsidian"
                )}
              >
                {item.communityTag || item.event}
              </button>
            );
          })}
        </div>

        {/* Interactive Guestbook Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Desktop Vertical Community Index */}
          <div
            role="group"
            aria-label="Select family note"
            className="hidden lg:block lg:col-span-4 border border-stone-line bg-silk divide-y divide-stone-line rounded-[2px]"
          >
            {testimonials.map((item, idx) => {
              const isSelected = idx === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setIndex(idx)}
                  className={cn(
                    "w-full text-left px-4 py-3.5 transition-colors duration-200 flex items-center justify-between gap-3 cursor-pointer",
                    isSelected
                      ? "bg-obsidian text-alabaster"
                      : "bg-silk text-ink hover:bg-alabaster"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-[2px] overflow-hidden border border-stone-line/50 shrink-0 bg-limestone">
                      <Image
                        src={item.celebrationImage}
                        alt={item.celebrationAlt}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "text-[11px] font-sans font-semibold uppercase tracking-[0.12em] block truncate",
                          isSelected ? "text-brass-light" : "text-brass-dark"
                        )}
                      >
                        {item.communityTag || item.event}
                      </span>
                      <span className="font-display text-lg font-medium block truncate">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-1.5 h-1.5 rotate-45 shrink-0 transition-colors",
                      isSelected ? "bg-brass-light" : "bg-stone-line"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Silk Exhibition Pull-Quote Card */}
          <div
            aria-live="polite"
            className="lg:col-span-8 bg-silk rounded-[2px] border border-stone-line p-6 sm:p-10 shadow-gallery min-h-[380px] flex flex-col justify-between"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center"
              >
                <div className="md:col-span-5">
                  <div className="gallery-frame bg-alabaster">
                    <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-limestone">
                      <Image
                        src={current.celebrationImage}
                        alt={current.celebrationAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 28vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-line pb-3">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-brass-dark">
                      {current.communityTag || current.event}
                    </span>
                    <span className="text-xs text-ink-subtle">
                      {current.location} · {current.date}
                    </span>
                  </div>

                  <p className="font-display italic text-2xl sm:text-[32px] font-normal text-ink leading-[1.2]">
                    “{current.highlight}”
                  </p>

                  <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                    {current.quote}
                  </p>

                  <footer className="pt-4 border-t border-stone-line flex items-center gap-4">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-[2px] border border-obsidian bg-alabaster flex items-center justify-center font-display text-lg font-medium text-ink shrink-0"
                    >
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-semibold text-ink block">
                        {current.name}
                      </cite>
                      <span className="text-xs text-ink-muted block">
                        {current.roleOrRelation} · {current.event}
                      </span>
                    </div>
                  </footer>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
