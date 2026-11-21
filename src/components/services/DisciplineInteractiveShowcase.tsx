"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  id: string;
  tab: string;
  subtitle: string;
  description: string;
  cues: string[];
  image: string;
  alt: string;
  contactEventType: string;
}

const DATA_BY_SERVICE: Record<
  "baraat" | "corporate-events" | "family-celebrations",
  {
    scriptTag: string;
    heading: string;
    highlight: string;
    items: ShowcaseItem[];
  }
> = {
  baraat: {
    scriptTag: "Full dhamaka entries!",
    heading: "Every Community’s ",
    highlight: "Signature Grand Entry",
    items: [
      {
        id: "marfa-walima",
        tab: "Hyderabadi Marfa & Walima",
        subtitle: "Old City Tasha-Marfa, Mashals & Istiqbal",
        description:
          "Commanding Hyderabadi Tasha-Marfa beats framed with antique brass mashals, floral rose-water sprays, and dramatic Walima courtyard walk-ins.",
        cues: [
          "01 · Gate Marfa troupe welcome with brass mashal bearers",
          "02 · Rose-water & attar Istiqbal for elders & family guests",
          "03 · Couple Walima grand walk under Chowmahalla chandeliers",
          "04 · Seamless transition straight to Sufi Qawwali or dinner",
        ],
        image: "/images/real-chowmahalla-palace.webp",
        alt: "Original photograph of Chowmahalla Palace Khilwat Mubarak courtyard in Hyderabad",
        contactEventType: "Baraat",
      },
      {
        id: "royal-baraat",
        tab: "Punjabi & Marwari Baraat",
        subtitle: "Dhol, Brass Band & Antique Bagghi",
        description:
          "Big-energy street-to-stage Baraats with vintage convertibles, Victorian Bagghi carriages, energetic Punjabi dhol teams, and coordinated gate Milni.",
        cues: [
          "01 · Dressed Safa-tying bar & chilled Thandai toast at start",
          "02 · Street & hotel-driveway captains keeping traffic clean",
          "03 · Prepared silver Milni thalis with warm gate Aarti",
          "04 · Timed smokeless cold sparklers at Jaimala reveal",
        ],
        image: "/images/baraat-grand-entry.webp",
        alt: "Vintage convertible Baraat procession with dhol drummers and festive lighting",
        contactEventType: "Baraat",
      },
      {
        id: "telugu-pallaki",
        tab: "Telugu Pallaki & Nadaswaram",
        subtitle: "Dawn Muhurtham Processions",
        description:
          "Classical South Indian Nadaswaram-Thavil welcoming both families cleanly, alongside ornate fresh-flower Pallaki bridal carries.",
        cues: [
          "01 · Temple Nadaswaram recital greeting visiting maternal relatives",
          "02 · Lightweight jasmine & rose Pallaki carried gently by brothers",
          "03 · Synchronized Pelli Pandiri screen (Tera) opening at Muhurtham",
          "04 · Smooth transition to Talambralu petal showers",
        ],
        image: "/images/floral-mandap-indian.webp",
        alt: "Telugu Kalyana Mandapam dressed in jasmine for morning Pallaki bridal welcome",
        contactEventType: "Telugu & South Indian Weddings",
      },
      {
        id: "bridal-chadar",
        tab: "Phoolon Ki Chadar Walk",
        subtitle: "Fresh Jasmine Canopies & Strings",
        description:
          "Hand-woven mogra and garden rose canopies carried serenely to live shehnai, violin, or acoustic piano.",
        cues: [
          "01 · Chill-misted malli canopy weight-balanced for cousins & brothers",
          "02 · Live instrumental transition quieting the ballroom naturally",
          "03 · Low floor mist down the petal-lined aisle",
          "04 · Uncluttered sightlines for photographers & elders",
        ],
        image: "/images/bridal-entry-indian.webp",
        alt: "Bridal entry beneath a fresh jasmine and pink rose Phoolon ki Chadar",
        contactEventType: "Baraat",
      },
    ],
  },
  "corporate-events": {
    scriptTag: "Zero boring hotel conferences",
    heading: "Sharp AV Production + ",
    highlight: "Hyderabadi Hospitality",
    items: [
      {
        id: "hicc-summit",
        tab: "HICC & HITEC Tech Summits",
        subtitle: "LED Keynotes, Sound & Smooth Delegate Check-In",
        description:
          "Bright wide-format stage walls, crystal-clear speaker mics, quick QR badge counters, and Irani Chai & Filter Kaapi networking lounges.",
        cues: [
          "Wide-format P2.5 LED keynote screens & backup switching",
          "Fast QR delegate check-in counters + greenrooms",
          "Clean daytime breakout-to-evening dinner transformation",
          "Zero audio feedback guaranteed for town halls",
        ],
        image: "/images/corporate-gala-hyderabad.webp",
        alt: "HITEC City corporate summit stage and gala seating",
        contactEventType: "Corporate Summit & Gala",
      },
      {
        id: "palace-board-gala",
        tab: "Falaknuma & Chowmahalla Galas",
        subtitle: "Make Visiting Global CXOs Fall in Love with Hyd",
        description:
          "Swap forgettable buffet dinners for candlelit palace evenings, slow-cooked Mutton Dum Biryani, Bidriware gift boxes, and Sufi acoustic music.",
        cues: [
          "Seated multi-course Deccani + Continental chef menus",
          "Calm classical Santoor or Sufi Qawwali background mood",
          "Custom Bidriware & Pochampally silk executive keepsakes",
          "Full VIP hotel transfer & diplomatic seating protocol",
        ],
        image: "/images/real-falaknuma-palace.webp",
        alt: "Original photograph of Taj Falaknuma Palace white Palladian facade and double marble staircase",
        contactEventType: "Corporate Summit & Gala",
      },
      {
        id: "brand-launch",
        tab: "Product & Brand Launches",
        subtitle: "Gachibowli & Financial District Reveals",
        description:
          "Crisp white editorial staging paired with live mocktail bars, hot tawa starters, and smooth multi-camera livestreaming.",
        cues: [
          "Architectural custom reveal sets & theatrical lighting",
          "Hybrid multi-cam broadcast & press photography risers",
          "Interactive chaat & artisan coffee bars for networking",
          "Fast overnight teardown keeping hotel rules happy",
        ],
        image: "/images/hyd-muslim-dawat-spread.webp",
        alt: "Hyderabadi royal culinary spread for corporate executive hospitality",
        contactEventType: "Corporate Summit & Gala",
      },
    ],
  },
  "family-celebrations": {
    scriptTag: "Ghar ke functions made easy",
    heading: "Warm Milestones Across ",
    highlight: "Every Home",
    items: [
      {
        id: "hindu-home",
        tab: "Seemantham & Namakaranam",
        subtitle: "Home Blessings & Living Room Courtyards",
        description:
          "Turn homes and society clubhouses warm and festive with fresh mango thoranalu, jasmine cradles, and comforting banana-leaf vegetarian meals.",
        cues: [
          "Fresh jasmine cradle swings (Palna) & wooden peatalu",
          "Homestyle Arati Aku food served cleanly to family & priests",
          "Brass/silver return tamboolam curation",
          "Zero-trace clean-up before we head out",
        ],
        image: "/images/family-celebration-indian.webp",
        alt: "Intimate family milestone courtyard styled with brass lamps and flowers",
        contactEventType: "Seemantham / Baby Shower",
      },
      {
        id: "muslim-family",
        tab: "Sanchaq, Manjha & Aqiqah",
        subtitle: "Dholki Nights, Thaal Wrapping & Home Dawats",
        description:
          "Yellow gota-patti corners, beautifully wrapped Khada Dupatta & Sanchaq thaals, floor bolstering, chilled Badam Milk, and small-batch copper-deg Biryani.",
        cues: [
          "Bespoke Sanchaq & Khada Dupatta thaal presentation trays",
          "Festive Manjha canopy with floral bangles & attar bar",
          "Small-batch Mutton Dum Biryani, Lukhmi & Double ka Meetha",
          "Neat Nazrana mithai & dry-fruit hampers for guests",
        ],
        image: "/images/irani-chai-mithai-parlor.webp",
        alt: "Irani Chai porcelain cups, Osmania biscuits, and Indian sweets for home hospitality",
        contactEventType: "Aqiqah / Bismillah / Family Milestone",
      },
      {
        id: "villa-jubilee",
        tab: "50th Anniversaries & Farmhouses",
        subtitle: "Gandipet, Moinabad & Sunset Gatherings",
        description:
          "Breezy lawn setups under banyan trees or at Taramati Baradari with family photo walls, acoustic music, and warm Irani Chai carts.",
        cues: [
          "Printed photo-memory timelines for parents' anniversaries",
          "Sunset fairy lights & comfortable seating for elders",
          "Kid-friendly menus paired with chai & chaat counters",
          "Complete generator, audio & cleaning crew included",
        ],
        image: "/images/real-taramati-baradari.webp",
        alt: "Original photograph of Taramati Baradari twelve-arched pavilion in Hyderabad",
        contactEventType: "Birthday",
      },
    ],
  },
};

export function DisciplineInteractiveShowcase({
  serviceId,
}: {
  serviceId: "baraat" | "corporate-events" | "family-celebrations";
}) {
  const bundle = DATA_BY_SERVICE[serviceId];
  const [activeIdx, setActiveIdx] = useState(0);

  if (!bundle) return null;
  const current = bundle.items[activeIdx] || bundle.items[0];

  return (
    <section className="space-y-8" aria-labelledby="discipline-studio-heading">
      <div className="border-b border-stone-line pb-5 space-y-2">
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
                  ? "bg-obsidian text-alabaster border-obsidian"
                  : "bg-alabaster text-ink-muted border-stone-line hover:border-obsidian hover:text-ink"
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
        className="rounded-[2px] border border-stone-line bg-alabaster p-6 sm:p-8 lg:p-10"
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
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-limestone">
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

              <ul className="space-y-2.5 pt-3 border-t border-stone-line tabular-nums">
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
