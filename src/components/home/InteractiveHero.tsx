"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import {
  DeccaniArchFrame,
  HeritageGreetingBanner,
  JaaliPattern,
} from "@/components/deccani/DeccaniMotifs";
import { cn } from "@/lib/utils";

type HeroVibe =
  | "all"
  | "palaces"
  | "telugu"
  | "dawat"
  | "baraat"
  | "corporate";

interface ExhibitionPlate {
  id: string;
  vibe: Exclude<HeroVibe, "all">[];
  index: string;
  label: string;
  slangNote: string;
  image: string;
  alt: string;
  colSpanClass: string;
  aspectClass: string;
  href: string;
}

const VIBE_FILTERS: { id: HeroVibe; label: string }[] = [
  { id: "all", label: "All Vibes" },
  { id: "palaces", label: "Real Heritage Palaces" },
  { id: "telugu", label: "Telugu Pelli" },
  { id: "dawat", label: "Muslim Dawat" },
  { id: "baraat", label: "Baraat & Entries" },
  { id: "corporate", label: "Corporate" },
];

const EXHIBITION_PLATES: ExhibitionPlate[] = [
  {
    id: "chowmahalla",
    vibe: ["palaces", "dawat"],
    index: "01",
    label: "Chowmahalla Khilwat Vibes",
    slangNote: "Belgian chandeliers + fresh mogra strings — ekdum shahi!",
    image: "/images/real-chowmahalla-palace.webp",
    alt: "Original photograph of Khilwat Mubarak at Chowmahalla Palace in Hyderabad with butter-cream scalloped arches and twin rooftop cupolas",
    colSpanClass: "sm:col-span-6 lg:col-span-4",
    aspectClass: "aspect-[16/10]",
    href: "/services/floral-decor?tradition=nikkah",
  },
  {
    id: "telugu-vindhu",
    vibe: ["telugu"],
    index: "02",
    label: "Arati Aku Pelli Vindhu",
    slangNote: "Mudda Pappu + Avakaya + hot Pootharekulu on banana leaf!",
    image: "/images/hyd-telugu-vindhu-leaf.webp",
    alt: "Authentic Hyderabadi Telugu Hindu Pelli Vindhu Bhojanam laid on a fresh emerald banana leaf",
    colSpanClass: "sm:col-span-6 lg:col-span-4",
    aspectClass: "aspect-[16/10]",
    href: "/services/catering",
  },
  {
    id: "muslim-dawat",
    vibe: ["dawat"],
    index: "03",
    label: "Shaadi & Walima Dawat",
    slangNote: "Dum Biryani, Sufiyani Biryani, Pathar ka Gosht & Qubani!",
    image: "/images/hyd-muslim-dawat-spread.webp",
    alt: "Hyderabadi Muslim wedding feast featuring copper-deg Dum Biryani, Sufiyani Biryani, Lukhmi, and Qubani ka Meetha",
    colSpanClass: "sm:col-span-6 lg:col-span-4",
    aspectClass: "aspect-[16/10]",
    href: "/services/catering",
  },
  {
    id: "falaknuma-baraat",
    vibe: ["baraat", "palaces"],
    index: "04",
    label: "Full Dhamaka Baraat & Marfa",
    slangNote: "Hyderabadi Tasha-Marfa, Punjabi Dhol & Falaknuma entries!",
    image: "/images/baraat-grand-entry.webp",
    alt: "High-energy Hyderabad Baraat arrival with Tasha-Marfa drums, vintage tourer, and jubilant family procession",
    colSpanClass: "sm:col-span-6 lg:col-span-6",
    aspectClass: "aspect-[16/9]",
    href: "/services/baraat",
  },
  {
    id: "corporate-gala",
    vibe: ["corporate", "palaces"],
    index: "05",
    label: "HITEC City & Palace Galas",
    slangNote: "HICC keynotes by day, Taj Falaknuma dinners by night!",
    image: "/images/corporate-gala-hyderabad.webp",
    alt: "Contemporary Hyderabad enterprise leadership summit and heritage gala banquet setup",
    colSpanClass: "sm:col-span-12 lg:col-span-6",
    aspectClass: "aspect-[16/9]",
    href: "/services/corporate-events",
  },
];

export function InteractiveHero() {
  const [selectedVibe, setSelectedVibe] = useState<HeroVibe>("all");
  const [spotlightId, setSpotlightId] = useState<string>(
    EXHIBITION_PLATES[0].id
  );
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const archParallaxY = useTransform(scrollYProgress, [0, 1], [0, 32]);

  const spotlightPlate =
    EXHIBITION_PLATES.find((p) => p.id === spotlightId) || EXHIBITION_PLATES[0];

  return (
    <section
      ref={heroRef}
      className="relative bg-obsidian text-ink-light overflow-hidden border-b border-obsidian-line"
    >
      {/* Clean Alabaster datum shelf under the translucent fixed Header for razor-sharp nav legibility */}
      <div
        aria-hidden="true"
        className="h-[78px] sm:h-[82px] w-full bg-alabaster border-b border-stone-line"
      />

      {/* Atmospheric Deccani Jaali Depth */}
      <div aria-hidden="true" className="absolute inset-0 top-[82px] pointer-events-none">
        <JaaliPattern tone="dark" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24 space-y-12 lg:space-y-16">
        {/* Primary Editorial Asymmetric Hero Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <HeritageGreetingBanner theme="dark" />

            <p className="editorial-kicker-light pt-1">
              Aadaab &amp; Namaskaram, Hyderabad
            </p>

            <h1 className="display-hero text-ink-light">
              Shaadi ho ya Pelli —{" "}
              <span className="font-display italic font-normal text-brass-light block sm:inline">
                Ekdum Grand Banadenge.
              </span>
            </h1>

            <p className="font-sans text-[15px] sm:text-[17px] leading-[1.7] text-ink-lightMuted max-w-2xl">
              No tension, full celebration — we design sacred Telugu Pelli Pandiris, Chowmahalla-style Nikkah stages, proper Dum Biryani &amp; Vindhu feasts, Baraats, and HITEC City parties so your family actually relaxes and enjoys every moment.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/contact" className="btn-editorial-light group">
                <span>Let&apos;s Plan Your Big Day</span>
                <ArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform"
                />
              </Link>

              <Link
                href="/services/catering"
                className="btn-editorial-outline-dark"
              >
                <UtensilsCrossed
                  aria-hidden="true"
                  className="w-4 h-4 stroke-[1.5] text-brass-light"
                />
                <span>Check Out Our Food</span>
              </Link>
            </div>
          </div>

          {/* Right Portrait Monument Plate: Real Charminar */}
          <div className="lg:col-span-5">
            <motion.div
              style={{ y: archParallaxY }}
              className="max-w-md mx-auto lg:ml-auto lg:mr-0"
            >
              <DeccaniArchFrame variant="dome" theme="obsidian">
                <div className="relative aspect-[3/4] w-full bg-obsidian">
                  <Image
                    src="/images/real-charminar.webp"
                    alt="Original photograph of Charminar in Hyderabad showing all four minarets, stucco arches, and Char Kaman beyond"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 36vw"
                    className="object-cover object-top"
                  />
                </div>
              </DeccaniArchFrame>

              <div className="mt-3.5 px-1 flex items-center justify-between gap-3 text-[11px] font-sans uppercase tracking-[0.16em] text-ink-lightMuted">
                <span className="text-brass-light font-semibold">
                  Charminar • 1591 CE
                </span>
                <span className="tabular-nums">17.3616° N · Old City</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sleek Monumental Index / Vibe Selector + Exhibition Strip */}
        <div className="pt-10 border-t border-obsidian-line space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.18em]">
                <span className="text-brass-light font-semibold">
                  Pick your vibe
                </span>
                <span aria-hidden="true" className="text-obsidian-line">
                  |
                </span>
                <span className="text-ink-lightMuted">
                  Tap any plate below to spotlight
                </span>
              </div>

              <div
                role="group"
                aria-label="Highlight Hyderabadi wedding vibes"
                className="flex flex-wrap gap-2"
              >
                {VIBE_FILTERS.map((vibe) => {
                  const isActive = selectedVibe === vibe.id;
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setSelectedVibe(vibe.id);
                        if (vibe.id !== "all") {
                          const match = EXHIBITION_PLATES.find((p) =>
                            p.vibe.includes(vibe.id as Exclude<HeroVibe, "all">)
                          );
                          if (match) setSpotlightId(match.id);
                        }
                      }}
                      className={cn(
                        "px-4 py-2 rounded-[2px] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] border transition-colors cursor-pointer",
                        isActive
                          ? "bg-alabaster text-obsidian border-alabaster"
                          : "bg-obsidian-elevated text-ink-lightMuted border-obsidian-line hover:border-brass-light hover:text-ink-light"
                      )}
                    >
                      {vibe.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Spotlight Readout */}
            <div
              aria-live="polite"
              className="lg:col-span-4 border-l border-brass/50 pl-5 py-1 space-y-1"
            >
              <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-brass-light font-semibold block tabular-nums">
                Plate {spotlightPlate.index} — {spotlightPlate.label}
              </span>
              <p className="text-xs sm:text-sm text-ink-lightMuted leading-relaxed">
                {spotlightPlate.slangNote}
              </p>
            </div>
          </div>

          {/* Sharp Architectural Exhibition Plates */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 lg:gap-6">
            {EXHIBITION_PLATES.map((plate, index) => {
              const matchesVibe =
                selectedVibe === "all" ||
                plate.vibe.includes(selectedVibe as Exclude<HeroVibe, "all">);
              const isSpotlight = plate.id === spotlightId;

              return (
                <motion.div
                  key={plate.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: matchesVibe ? 1 : 0.35,
                    y: isSpotlight ? -3 : 0,
                  }}
                  whileHover={{ y: -4 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: index * 0.03,
                  }}
                  className={cn(plate.colSpanClass)}
                >
                  <div
                    className={cn(
                      "gallery-frame-dark transition-colors duration-200",
                      isSpotlight
                        ? "border-brass-light shadow-obsidian"
                        : "hover:border-brass/60"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSpotlightId(plate.id)}
                      aria-pressed={isSpotlight}
                      className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light"
                    >
                      <div
                        className={cn(
                          "relative w-full overflow-hidden bg-obsidian",
                          plate.aspectClass
                        )}
                      >
                        <Image
                          src={plate.image}
                          alt={plate.alt}
                          fill
                          priority={index < 2}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </button>

                    <div className="pt-3 pb-1 px-1 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[11px] font-sans font-semibold text-brass-light tabular-nums shrink-0">
                          {plate.index}
                        </span>
                        <span className="font-display text-lg sm:text-xl font-medium text-ink-light truncate">
                          {plate.label}
                        </span>
                      </div>

                      <Link
                        href={plate.href}
                        className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-brass-light hover:text-ink-light shrink-0 border-b border-brass/50 pb-0.5 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
