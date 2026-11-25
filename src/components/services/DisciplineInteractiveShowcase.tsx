"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHOWCASE_BY_SERVICE } from "@/data/showcase";


export function DisciplineInteractiveShowcase({
  serviceId,
}: {
  serviceId: "baraat" | "corporate-events" | "family-celebrations";
}) {
  const bundle = SHOWCASE_BY_SERVICE[serviceId];
  const [activeIdx, setActiveIdx] = useState(0);

  if (!bundle) return null;
  const current = bundle.items[activeIdx] || bundle.items[0];

  return (
    <section className="space-y-8" aria-labelledby="discipline-studio-heading">
      <div className="border-b border-brass/30 pb-5 space-y-2">
        <span className="editorial-kicker block">{bundle.scriptTag}</span>
        <h2
          id="discipline-studio-heading"
          className="display-section text-ink"
        >
          {bundle.heading}
          <span className="editorial-italic">{bundle.highlight}</span>
        </h2>
      </div>

      {/* Sharp Architectural Selector Tabs */}
      <div
        role="group"
        aria-label="Explore options"
        className="flex flex-wrap gap-2.5"
      >
        {bundle.items.map((item, idx) => {
          const isSelected = idx === activeIdx;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "px-4 py-2.5 rounded-[2px] text-xs font-semibold tracking-[0.06em] border transition-colors cursor-pointer",
                isSelected
                  ? "bg-ruby text-marble border-ruby"
                  : "bg-marble text-ink-muted border-brass/40 hover:border-ruby hover:text-ruby"
              )}
            >
              {item.tab}
            </button>
          );
        })}
      </div>

      {/* Active Blueprint Exhibition Frame */}
      <div
        aria-live="polite"
        className="border-[5px] border-white bg-white shadow-ruby outline outline-1 outline-offset-4 outline-brass/40 p-6 sm:p-8 lg:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-5">
              <div className="gallery-frame">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-marble-warm">
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="editorial-kicker block mb-1.5">
                  {current.subtitle}
                </span>
                <h3 className="display-card sm:text-3xl text-ink">
                  {current.tab}
                </h3>
              </div>

              <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                {current.description}
              </p>

              <ul className="space-y-2.5 pt-3 border-t border-brass/30 tabular-nums">
                {current.cues.map((cue) => (
                  <li
                    key={cue}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-ink"
                  >
                    <Check
                      aria-hidden="true"
                      className="w-4 h-4 stroke-[1.5] text-brass shrink-0 mt-0.5"
                    />
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href={`/contact?eventType=${encodeURIComponent(
                    current.contactEventType
                  )}&brief=${encodeURIComponent(
                    `Interested in ${current.tab} (${current.subtitle}).`
                  )}`}
                  className="btn-editorial-dark"
                >
                  <span>Book This Vibe</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
