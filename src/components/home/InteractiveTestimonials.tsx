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
 * Interactive editorial client reflection deck with community chips and animated transitions.
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
      className="py-24 lg:py-32 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gold/25 mb-12">
          <div className="max-w-2xl">
            <p className="editorial-kicker mb-3">Client reflections</p>
            <h2
              id="testimonials-heading"
              className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.08]"
            >
              Voices Across{" "}
              <span className="text-burgundy">Hyderabad</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous reflection"
              className="w-10 h-10 rounded-full border border-gold/35 hover:border-burgundy hover:bg-burgundy hover:text-ivory flex items-center justify-center text-charcoal transition-colors cursor-pointer"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </button>
            <span
              aria-live="polite"
              className="text-xs font-medium text-taupe-dark px-2 tabular-nums"
            >
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reflection"
              className="w-10 h-10 rounded-full border border-gold/35 hover:border-burgundy hover:bg-burgundy hover:text-ivory flex items-center justify-center text-charcoal transition-colors cursor-pointer"
            >
              <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Mobile Compact Community Selector (keeps quote immediately visible on small screens) */}
        <div
          role="group"
          aria-label="Select family reflection"
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
                  "px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer",
                  isSelected
                    ? "bg-burgundy text-ivory border-burgundy"
                    : "bg-cream border-gold/25 text-charcoal/80 hover:border-gold/50"
                )}
              >
                {item.communityTag || item.event}
              </button>
            );
          })}
        </div>

        {/* Interactive Quote Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Desktop Vertical Community Selector */}
          <div
            role="group"
            aria-label="Select family reflection"
            className="hidden lg:block lg:col-span-4 space-y-2"
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
                    "w-full text-left px-4 py-3 rounded-xl border transition-colors duration-200 flex items-center justify-between gap-3 cursor-pointer",
                    isSelected
                      ? "bg-cream border-burgundy/40 text-charcoal"
                      : "bg-transparent border-gold/20 text-charcoal/70 hover:border-gold/45 hover:text-charcoal"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-gold/25 shrink-0 bg-ivory">
                      <Image
                        src={item.celebrationImage}
                        alt={item.celebrationAlt}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-gold-dark block truncate">
                        {item.communityTag || item.event}
                      </span>
                      <span className="font-serif text-base font-medium block mt-0.5 truncate">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-2 h-2 rotate-45 shrink-0 transition-colors",
                      isSelected ? "bg-burgundy" : "bg-gold/30"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Animated Quote Feature */}
          <div
            aria-live="polite"
            className="lg:col-span-8 bg-cream rounded-2xl border border-gold/25 p-6 sm:p-10 min-h-[360px] flex flex-col justify-between"
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
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-gold/25 bg-ivory">
                    <Image
                      src={current.celebrationImage}
                      alt={current.celebrationAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 28vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="md:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 pb-3">
                    <span className="text-xs text-gold-dark font-medium">
                      {current.communityTag || current.event}
                    </span>
                    <span className="text-xs text-taupe-dark">
                      {current.location} • {current.date}
                    </span>
                  </div>

                  <p className="font-serif text-2xl sm:text-3xl text-burgundy leading-snug">
                    “{current.highlight}”
                  </p>

                  <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">
                    {current.quote}
                  </p>

                  <footer className="pt-5 border-t border-gold/20 flex items-center gap-4">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full border border-gold/40 bg-ivory flex items-center justify-center font-serif text-base font-medium text-burgundy shrink-0"
                    >
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic text-sm font-semibold text-charcoal block">
                        {current.name}
                      </cite>
                      <span className="text-xs text-taupe-dark block">
                        {current.roleOrRelation} • {current.event}
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

