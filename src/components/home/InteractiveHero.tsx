"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

const HERO_SCENES = [
  {
    id: "courtyard",
    num: "01",
    label: "Twilight Palace Courtyard",
    location: "Banjara Hills, Hyderabad",
    image: "/images/hero-indian-wedding.webp",
    alt: "Luminous twilight Indian wedding courtyard curated by Tehzaa Celebrations in Hyderabad",
  },
  {
    id: "mandap",
    num: "02",
    label: "Kalyana Mandapam",
    location: "Jubilee Hills Estates",
    image: "/images/floral-mandap-indian.webp",
    alt: "Handcrafted teakwood Kalyana Mandapam draped in jasmine and marigolds",
  },
  {
    id: "baraat",
    num: "03",
    label: "Royal Baraat Procession",
    location: "Shamshabad Heritage Resorts",
    image: "/images/baraat-grand-entry.webp",
    alt: "Grand Indian Baraat procession with vintage car, dhol percussionists, and sparklers",
  },
  {
    id: "bridal",
    num: "04",
    label: "Phoolon Ki Chadar",
    location: "Gandipet Lakefront Lawns",
    image: "/images/bridal-entry-indian.webp",
    alt: "Indian bridal grand entry beneath a canopy of fresh jasmine and blush roses",
  },
];

export function InteractiveHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentScene = HERO_SCENES[activeIdx];

  return (
    <section className="relative min-h-[88vh] flex items-end pb-12 sm:pb-16 lg:pb-20 pt-32 overflow-hidden bg-charcoal text-ivory">
      {/* Background Scene Stage */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={currentScene.image}
              alt={currentScene.alt}
              fill
              priority={activeIdx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Architectural Atmospheric Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/35 to-transparent" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Left Typography Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-xs font-sans font-medium text-gold-light mb-4">
              Tehzaa Celebrations • Hyderabad
            </p>

            <h1 className="font-serif font-medium tracking-[-0.025em] text-4xl sm:text-6xl md:text-7xl lg:text-[72px] text-ivory leading-[1.04]">
              Where Culture Meets{" "}
              <span className="text-ivory-dark">Celebration</span>
            </h1>

            <p className="mt-6 text-sm sm:text-base lg:text-lg text-ivory/85 max-w-2xl font-normal leading-relaxed">
              An architectural wedding and event house in Hyderabad—crafting
              Telugu Kalyana Mandapams, Marwari &amp; Punjabi festivities, Deccani
              Nikkah gatherings, authentic Indian feasts, and flagship corporate galas.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-light active:scale-[0.98] text-ivory border border-gold/40 text-sm font-medium transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <span>Plan Your Event</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-charcoal/85 hover:bg-charcoal border border-ivory/35 text-ivory text-sm font-medium transition-colors duration-200"
              >
                <span>Explore Disciplines</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Scene Switcher */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
            <div className="w-full max-w-sm rounded-xl bg-charcoal/90 border border-ivory/20 p-5">
              <div className="flex items-center justify-between text-xs text-gold-light mb-3 tabular-nums">
                <span>Celebration atmosphere</span>
                <span>{currentScene.num} / 04</span>
              </div>

              <div className="space-y-1" role="group" aria-label="Featured celebration scenes">
                {HERO_SCENES.map((scene, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIdx(idx)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors duration-200 border-l-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
                        isActive
                          ? "border-gold-light bg-ivory/10 text-ivory"
                          : "border-transparent text-ivory/75 hover:text-ivory hover:bg-ivory/5"
                      }`}
                    >
                      <span className="text-xs font-medium">
                        {scene.label}
                      </span>
                      <span className="text-xs text-gold-light tabular-nums">
                        {scene.num}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-ivory/15 flex items-center justify-between text-xs text-ivory/75">
                <span aria-live="polite">{currentScene.location}</span>
                <a
                  href="#studio-narrative"
                  className="text-gold-light hover:text-ivory transition-colors"
                >
                  Our story
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

