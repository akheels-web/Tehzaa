"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const HYDERABAD_LOVES = [
  {
    id: "chowmahalla-arches",
    num: "01",
    tab: "Chowmahalla Arches",
    subtitle: "Pale Butter-Cream Stucco & Belgian Chandeliers",
    story:
      "Standing inside Khilwat Mubarak at Chowmahalla Palace teaches you restraint — when architecture looks that royal, you frame it gently with white mogra strands and crystal candlelight rather than burying it under loud props.",
    details: ["Pale Cream Stucco Hues", "Belgian Crystal Warmth", "Zero-Bolt Heritage Rigs"],
    image: "/images/real-chowmahalla-palace.webp",
    alt: "Original photograph of Chowmahalla Palace Khilwat Mubarak scalloped arches, twin cupolas, and symmetrical lawn",
  },
  {
    id: "falaknuma-marble",
    num: "02",
    tab: "Falaknuma Marble Grace",
    subtitle: "White Palladian Steps Overlooking The City",
    story:
      "Nothing compares to Taj Falaknuma's white Italian marble verandahs at sunset. Soft ivory roses, glass candle hurricanes, and unhurried string music match that hilltop poise naturally.",
    details: ["Ivory Rose Pathways", "Glass Candle Lanterns", "Carriage Welcome Cues"],
    image: "/images/real-falaknuma-palace.webp",
    alt: "Original photograph of Taj Falaknuma Palace white Palladian colonnade and twin ceremonial staircase",
  },
  {
    id: "telugu-pelli-warmth",
    num: "03",
    tab: "Telugu Pelli Warmth",
    subtitle: "5 AM Jasmine, Mango Thoranalu & Arati Aku",
    story:
      "We wake up at 4 AM with the flower markets for a reason: real banana trunks, fresh malli strings, Mudda Pappu with Avakaya & melting cow ghee on green leaves, and elders smiling through Talambralu.",
    details: ["Dawn Market Cold-Chain", "Banana Trunks & Malli", "Sit-Down Arati Aku"],
    image: "/images/hyd-telugu-vindhu-leaf.webp",
    alt: "Traditional Telugu Hindu Pelli Vindhu Bhojanam laid on an emerald banana leaf",
  },
  {
    id: "old-city-dawat",
    num: "04",
    tab: "Old City Dawat Soul",
    subtitle: "Coal-Dum Biryani, Pathar, Qubani & Midnight Chai",
    story:
      "Hyderabadi weddings run on real Bawarchikhana honesty: Mutton Dum & creamy Sufiyani Biryani, Saudi Champagne at the gate, granite-seared Pathar ka Gosht, triple desserts, and Irani Chai until everyone heads home happy.",
    details: ["Atta-Sealed Copper Handi", "Lukhmi & Mutton Marag", "Irani & Sulaimani Chai"],
    image: "/images/hyd-muslim-dawat-spread.webp",
    alt: "Authentic Hyderabadi Muslim Shaadi Dawat featuring Dum Biryani, Sufiyani, Pathar, and Qubani ka Meetha",
  },
];

export function DeccaniCraftInteractive() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = HYDERABAD_LOVES[activeIdx] || HYDERABAD_LOVES[0];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-marble-warm text-ink border-y border-brass/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="editorial-kicker block">
            What inspires us every day
          </span>
          <h2 className="display-section text-ink">
            Four Things We{" "}
            <span className="editorial-italic">
              Love About Hyderabad
            </span>
          </h2>
        </div>

        {/* Architectural Selector Tabs */}
        <div
          role="group"
          aria-label="Four Things We Love About Hyderabad"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
        >
          {HYDERABAD_LOVES.map((item, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "text-left p-5 border transition-colors duration-200 cursor-pointer",
                  isSelected
                    ? "bg-white text-ink border-ruby shadow-ruby"
                    : "bg-marble text-ink-muted border-brass/40 hover:border-ruby hover:text-ink"
                )}
              >
                <span
                  className={cn(
                    "block text-[11px] font-semibold uppercase tracking-[0.18em] tabular-nums mb-1.5",
                    isSelected ? "text-ruby" : "text-brass-dark"
                  )}
                >
                  {item.num}
                </span>
                <span className="font-display text-xl sm:text-2xl font-medium block leading-snug">
                  {item.tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* Exhibition Stage */}
        <div
          aria-live="polite"
          className="border-[6px] border-white bg-white p-6 sm:p-10 lg:p-12 shadow-ruby outline outline-1 outline-offset-4 outline-brass/40"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-5">
                <div className="gallery-frame">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-marble-warm">
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <span className="editorial-kicker block">
                  {current.subtitle}
                </span>
                <h3 className="display-section text-ink">
                  {current.tab}
                </h3>
                <p className="text-[15px] sm:text-[17px] text-ink-muted leading-[1.7]">
                  {current.story}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {current.details.map((mat) => (
                    <span
                      key={mat}
                      className="px-3.5 py-1.5 bg-marble border border-brass/40 text-xs font-medium text-ink"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
