"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MAP_VENUES } from "@/lib/landing/venues";
import { DepthJaali } from "./primitives/DepthJaali";
import { ParallaxLayer } from "./primitives/ParallaxLayer";
import { SceneHeading } from "./primitives/SceneHeading";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

const GOLD = "#B08A4A";
const draw = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
};

/** Gold-line schematic of the city: Musi river, Old City, Golconda's walls, routes west. */
function CityLines() {
  return (
    <svg viewBox="0 0 1000 700" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* routes */}
      <motion.path
        {...draw}
        transition={{ duration: 2.2, ease: HOUSE_EASE }}
        d="M133 44 C180 160 260 260 300 372 L340 424 C470 470 620 520 807 538 M340 424 C260 450 180 470 133 481 M807 538 C800 590 790 620 780 652"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeDasharray="2 6"
      />
      {/* Musi river */}
      <motion.path
        {...draw}
        transition={{ duration: 2.6, ease: HOUSE_EASE }}
        d="M0 512 C140 502 240 470 360 478 C480 486 560 440 680 454 C780 466 860 492 1000 472"
        fill="none"
        stroke="rgba(120,150,170,0.55)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <text x="560" y="438" fill="#5A7A8C" fontSize="20" fontStyle="italic" fontFamily="var(--font-display)">
        Musi
      </text>
      {/* Old City boundary */}
      <motion.ellipse
        {...draw}
        transition={{ duration: 1.8, ease: HOUSE_EASE, delay: 0.4 }}
        cx="805"
        cy="575"
        rx="120"
        ry="104"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeDasharray="5 7"
      />
      <text x="900" y="664" fill="#7A5929" fontSize="15" letterSpacing="3" fontFamily="var(--font-sans)">
        OLD CITY
      </text>
      {/* Golconda walls */}
      <motion.path
        {...draw}
        transition={{ duration: 1.6, ease: HOUSE_EASE, delay: 0.6 }}
        d="M310 410 L322 388 L350 384 L372 398 L376 426 L362 450 L334 456 L312 440 Z"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.4"
      />
      <text x="180" y="78" fill="#7A5929" fontSize="15" letterSpacing="3" fontFamily="var(--font-sans)">
        HITEC CITY
      </text>
      {/* compass */}
      <g transform="translate(930 70)" stroke={GOLD} fill="none" strokeWidth="1.2">
        <circle r="22" />
        <path d="M0 -30 L6 0 L0 30 L-6 0 Z" fill="rgba(176,138,74,0.25)" />
        <text y="-38" textAnchor="middle" fill="#7A5929" stroke="none" fontSize="14" fontFamily="var(--font-sans)">
          N
        </text>
      </g>
    </svg>
  );
}

/** Scene 05. Hyderabad's palaces and halls as glowing lamps on a gold-line map. */
export function VenueMap() {
  const [activeId, setActiveId] = useState("chowmahalla-palace");
  const active = MAP_VENUES.find((v) => v.id === activeId) ?? MAP_VENUES[0];

  return (
    <section className="relative overflow-hidden bg-marble py-24 lg:py-32">
      <DepthJaali />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SceneHeading
          kicker="Shehar ki raunaq"
          title="Hyderabad's palaces,"
          italicTail="our address book."
          intro="From Qutb Shahi tombs at sunset to Falaknuma's marble staircase and HITEC City halls. Tap a lamp to see the venue."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Map */}
          <div className="relative aspect-[10/7] w-full border border-brass/40 bg-white/40 lg:col-span-8">
            <CityLines />
            <ul aria-label="Venues on the map">
              {MAP_VENUES.map((v) => {
                const isActive = v.id === activeId;
                return (
                  <li
                    key={v.id}
                    className="absolute"
                    style={{
                      left: `${v.x / 10}%`,
                      top: `${v.y / 7}%`,
                      transform: `translate(${v.id === "chowmahalla-palace" ? "-130%" : "-50%"}, -50%)`,
                    }}
                  >
                    <button
                      type="button"
                      aria-label={v.name}
                      aria-pressed={isActive}
                      onMouseEnter={() => setActiveId(v.id)}
                      onFocus={() => setActiveId(v.id)}
                      onClick={() => setActiveId(v.id)}
                      className="group relative flex h-9 w-9 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "pin-pulse block rounded-full border-2 border-marble transition-all duration-300",
                          isActive ? "h-4 w-4 bg-ruby" : "h-3 w-3 bg-brass group-hover:bg-ruby"
                        )}
                      />
                      <span
                        className={cn(
                          "pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 whitespace-nowrap bg-marble/95 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-ink sm:block",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        {v.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Venue card */}
          <ParallaxLayer speed={0.2} className="lg:col-span-4">
          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: HOUSE_EASE }}
                className="border-[6px] border-white bg-white shadow-ruby outline outline-1 outline-offset-4 outline-brass/40"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={active.image} alt={active.alt} fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brass-dark">{active.era}</span>
                  <h3 className="mt-1 font-display text-3xl font-medium text-ink">{active.name}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{active.line}</p>
                  {active.credit && (
                    <p className="mt-3 font-sans text-[10px] text-ink-muted">Photo: {active.credit}</p>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
