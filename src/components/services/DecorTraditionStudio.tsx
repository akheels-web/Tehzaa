"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowUpRight, Castle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeccaniArchFrame } from "@/components/deccani/DeccaniMotifs";

type PalaceBackdrop = "chowmahalla" | "falaknuma" | "taramati" | "golconda";

interface PalaceBackdropMeta {
  id: PalaceBackdrop;
  label: string;
  precinct: string;
  image: string;
  alt: string;
  architecturalNote: string;
}

interface DecorTraditionWorld {
  id: string;
  tabLabel: string;
  faithLabel: string;
  title: string;
  vibePitch: string;
  structuralForm: string;
  botanicalRecipe: string[];
  venueNotes: Record<PalaceBackdrop, string>;
  image: string;
  alt: string;
}

const DECOR_WORLDS: DecorTraditionWorld[] = [
  {
    id: "telugu",
    tabLabel: "Hindu • Telugu Pelli",
    faithLabel: "Telugu, Tamil & South Indian Weddings",
    title: "Traditional Pelli Pandiri, Banana Trunks & Dawn Jasmine",
    vibePitch: "Fresh malli & yellow banti puvvu magic!",
    structuralForm:
      "Teak four-pillar mandapam clad with living green banana trunks, mango-leaf thoranalu, carved deepams, and open-air smoke ventilation above the Agni Kundam and peatalu.",
    botanicalRecipe: [
      "Fresh Malli (Jasmine) & Kanakambaram Strings",
      "Bright Banti Puvvu (Marigold) Cascades",
      "Real Green Banana Trunks & Mango Thoranalu",
      "Lotus Garlands for Jeelakarra-Bellam & Talambralu",
    ],
    venueNotes: {
      chowmahalla:
        "Paired with soft off-white lawn walkways & cool early-morning temple bells.",
      falaknuma:
        "Elevated white marble mandap framing with soft blush & mango toranam highlights.",
      taramati:
        "Sun-kissed sandstone open-arch Pelli Pandiri facing the Golconda Fort ridge.",
      golconda:
        "Granite-framed outdoor mandapam echoing Kakatiya-era stone courtyards along the Golconda horizon.",
    },
    image: "/images/floral-mandap-indian.webp",
    alt: "Telugu Kalyana Mandapam dressed in fresh jasmine, marigolds, and banana pillars",
  },
  {
    id: "nikkah",
    tabLabel: "Muslim • Nikkah & Sanchaq",
    faithLabel: "Hyderabadi Nikkah, Manjha, Sanchaq & Walima",
    title: "Chowmahalla Arches, Sanchaq Thaals & Arsi-Mushaf Mirror",
    vibePitch: "Proper Nawabi charm minus heavy clutter!",
    structuralForm:
      "Pale butter-cream scalloped arches crowned with Belgian chandeliers, decorated Khada Dupatta & Sanchaq thaals, yellow gota-patti Manjha corners, and an intimate Nikkah divan with parda option.",
    botanicalRecipe: [
      "Chidiya Mogra Garlands & White Garden Roses",
      "Antique Brass Fanoos & Belgian Crystal Glow",
      "Festive Yellow Gota-Patti Manjha Curtains",
      "Hand-Dressed Khada Dupatta Sanchaq Trays",
    ],
    venueNotes: {
      chowmahalla:
        "Cleanly frames Khilwat's famous cream arches with cascades of mogra and floor lamps.",
      falaknuma:
        "Crisp candlelit marble steps leading up to an intimate ivory Nikkah sanctuary.",
      taramati:
        "Open breezy hilltop Sufi Qawwali stage framed by warm fairy-lit stone arches.",
      golconda:
        "Dusk Qawwali welcomes & warm candlelit fanoos lines echoing Fateh Darwaza's acoustic grandeur.",
    },
    image: "/images/real-chowmahalla-palace.webp",
    alt: "Original photograph of Khilwat Mubarak courtyard at Chowmahalla Palace in Hyderabad with butter-cream scalloped arches and rooftop cupolas",
  },
  {
    id: "marwari",
    tabLabel: "Hindu • Marwari & Haldi",
    faithLabel: "Marwari, Punjabi & North Indian Festivities",
    title: "Sunset Marigold Haldi, Jhoola Swings & Phoolon Ki Chadar",
    vibePitch: "Bright, loud, full-on dance energy!",
    structuralForm:
      "Vibrant daytime terracotta mats & lotus brass urlis beside a floral wooden swing (jhoola), flipping at sundown into carved stone Jharokha Jaimala stages and fresh rose-petal aisle canopies.",
    botanicalRecipe: [
      "Dense Orange & Yellow Marigold (Genda Phool)",
      "Fresh Pink Tuberose Phoolon Ki Chadar",
      "Brass Bathing Urlis with Floating Lotuses",
      "Hand-Painted Bangle Bar & Mojari Corners",
    ],
    venueNotes: {
      chowmahalla:
        "Rich ruby jewel accents and tall chandeliers transforming lawn Sangeet nights.",
      falaknuma:
        "Pastel English floral twist paired along grand white neoclassical steps.",
      taramati:
        "Taramati Baradari golden hour with terracotta cane seating & open sunset Phere!",
      golconda:
        "Terracotta marigold lawns and dhol welcomes set against timeless Deccani stone ramparts.",
    },
    image: "/images/real-taramati-baradari.webp",
    alt: "Original photograph of Taramati Baradari sandstone plinth and symmetrical twelve-doored Deccani arches",
  },
  {
    id: "interfaith",
    tabLabel: "Sikh, Christian & Fusion",
    faithLabel: "Anand Karaj, Cathedral Vows & Two-Culture Weddings",
    title: "Calm Morning Marble Palki + Lush Cathedral Aisles",
    vibePitch: "Gentle, peaceful & ekdum timeless.",
    structuralForm:
      "Tranquil low-profile bolster seating draped cleanly in ivory Chanderi cotton-silk for Guru Granth Sahib Ji Anand Karaj ceremonies, or crisp garden roses and glass taper aisles.",
    botanicalRecipe: [
      "Ivory Chanderi & Organza Ceiling Drapery",
      "Blush Garden Roses & White Hydrangeas",
      "Weeping Jasmine Vines Along Marble Columns",
      "Calm Tall Brass Floor Lamps & Rose Petals",
    ],
    venueNotes: {
      chowmahalla:
        "Quiet ivory silk sanctuary morning setup before opening crystal halls for dinner.",
      falaknuma:
        "All-white Falaknuma marble columns draped with pastel garden roses and candles.",
      taramati:
        "Open sky Golconda Fort backdrop for sunset vows & acoustic string ensembles.",
      golconda:
        "Serene open-lawn glass taper aisles and ivory floral canopies framed by centuries-old granite bastions.",
    },
    image: "/images/real-falaknuma-palace.webp",
    alt: "Original photograph of Taj Falaknuma Palace white Palladian colonnade and double white marble staircase",
  },
];

const PALACE_BACKDROPS: PalaceBackdropMeta[] = [
  {
    id: "chowmahalla",
    label: "Chowmahalla Palace",
    precinct: "Khilwat, Old City",
    image: "/images/real-chowmahalla-palace.webp",
    alt: "Original photograph of Chowmahalla Palace Khilwat Mubarak scalloped arches and green lawn",
    architecturalNote:
      "Butter-cream lime stucco scalloped arches & Belgian chandeliers.",
  },
  {
    id: "falaknuma",
    label: "Taj Falaknuma",
    precinct: "Falaknuma Hilltop",
    image: "/images/real-falaknuma-palace.webp",
    alt: "Original photograph of Taj Falaknuma Palace white Palladian facade and double marble staircase",
    architecturalNote:
      "White Italianate Palladian colonnade & ceremonial marble stairs.",
  },
  {
    id: "taramati",
    label: "Taramati Baradari",
    precinct: "Gandipet Corridor",
    image: "/images/real-taramati-baradari.webp",
    alt: "Original photograph of Taramati Baradari twelve pointed stone arches on raised granite plinth",
    architecturalNote:
      "Twelve breezy stone-and-lime arches catching sunset views.",
  },
  {
    id: "golconda",
    label: "Golconda Fort",
    precinct: "Ibrahim Bagh",
    image: "/images/real-golconda-fort.webp",
    alt: "Original photograph of Golconda Fort granite ramparts, stone arches, and Bala Hisar hillside",
    architecturalNote:
      "Monumental granite bastions & open-air Deccani citadel lawns.",
  },
];

function DecorParamSync({
  onSelectTradition,
}: {
  onSelectTradition: (idx: number) => void;
}) {
  const searchParams = useSearchParams();
  const traditionParam = searchParams.get("tradition");

  useEffect(() => {
    if (traditionParam) {
      const idx = DECOR_WORLDS.findIndex((w) => w.id === traditionParam);
      if (idx >= 0) onSelectTradition(idx);
    }
  }, [traditionParam, onSelectTradition]);

  return null;
}

/**
 * Architectural Multi-Faith Wedding Decor Studio & Real Hyderabad Palace Backdrop Matcher.
 */
export function DecorTraditionStudio() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [palaceStyle, setPalaceStyle] = useState<PalaceBackdrop>("chowmahalla");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const current = DECOR_WORLDS[activeIdx] || DECOR_WORLDS[0];
  const activePalace =
    PALACE_BACKDROPS.find((b) => b.id === palaceStyle) || PALACE_BACKDROPS[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % DECOR_WORLDS.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + DECOR_WORLDS.length) % DECOR_WORLDS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = DECOR_WORLDS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section aria-labelledby="decor-atelier-heading" className="space-y-8">
      <Suspense fallback={null}>
        <DecorParamSync onSelectTradition={setActiveIdx} />
      </Suspense>

      {/* Header + 4-Palace Dynamic Backdrop Switcher */}
      <div className="border-b border-brass/30 pb-6 flex flex-col gap-5">
        <div className="space-y-2">
          <span className="editorial-kicker block">
            Kirrak decor, bilkul your vibe
          </span>
          <h2 id="decor-atelier-heading" className="display-section text-ink">
            Wedding Decor Studio{" "}
            <span className="editorial-italic">Across All Faiths</span>
          </h2>
          <p className="editorial-body max-w-2xl">
            Pick your ceremony tradition and toggle between Hyderabad&apos;s four
            iconic heritage backdrops below.
          </p>
        </div>

        {/* Real Hyderabad Landmark Switcher */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-subtle block">
            Match To Real Hyderabad Landmark Backdrop
          </span>
          <div
            role="group"
            aria-label="Match wedding decor to Hyderabad palace style"
            className="flex flex-wrap items-center gap-2"
          >
            {PALACE_BACKDROPS.map((p) => {
              const isSelected = palaceStyle === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setPalaceStyle(p.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] border text-xs font-semibold tracking-[0.04em] transition-colors cursor-pointer",
                    isSelected
                      ? "bg-ruby text-marble border-ruby"
                      : "bg-marble text-ink-muted border-brass/40 hover:border-ruby hover:text-ruby"
                  )}
                >
                  <Castle
                    aria-hidden="true"
                    className={cn(
                      "w-3.5 h-3.5 stroke-[1.5]",
                      isSelected ? "text-marble/85" : "text-brass"
                    )}
                  />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tradition Tabs */}
      <div
        role="tablist"
        aria-label="Wedding Decor Traditions"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5"
      >
        {DECOR_WORLDS.map((world, idx) => {
          const isSelected = idx === activeIdx;
          return (
            <button
              key={world.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`decor-tab-${world.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`decor-panel-${world.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveIdx(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={cn(
                "text-left p-4 rounded-[2px] border transition-colors cursor-pointer",
                isSelected
                  ? "bg-ruby text-marble border-ruby"
                  : "bg-marble text-ink border-brass/40 hover:border-ruby"
              )}
            >
              <span
                className={cn(
                  "block text-[11px] font-semibold uppercase tracking-[0.14em] mb-1 truncate tabular-nums",
                  isSelected ? "text-marble/85" : "text-brass-dark"
                )}
              >
                0{idx + 1} • Ceremony Style
              </span>
              <span className="text-xs sm:text-sm font-medium block truncate">
                {world.tabLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Architectural Decor Panel */}
      <div className="border-[5px] border-white bg-white shadow-ruby outline outline-1 outline-offset-4 outline-brass/40 p-6 sm:p-8 lg:p-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`decor-panel-${current.id}`}
            aria-labelledby={`decor-tab-${current.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Primary Tradition Plate + Live Real Landmark Matcher Plate */}
            <div className="md:col-span-5 space-y-4">
              <DeccaniArchFrame variant="mehrab" theme="alabaster">
                <div className="relative aspect-[16/11] w-full bg-marble-warm">
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </DeccaniArchFrame>

              {/* Dynamic Real Palace Backdrop Preview Card */}
              <div className="border border-brass/30 bg-marble p-3 space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brass-dark">
                  <span>Active Venue Backdrop</span>
                  <span className="inline-flex items-center gap-1 text-ink-subtle normal-case tracking-normal font-medium">
                    <MapPin aria-hidden="true" className="w-3 h-3 text-brass" />
                    {activePalace.precinct}
                  </span>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activePalace.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-marble-warm border border-brass/30">
                      <Image
                        src={activePalace.image}
                        alt={activePalace.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display text-lg font-medium text-ink leading-tight">
                        {activePalace.label}
                      </p>
                      <p className="text-xs text-ink-subtle leading-relaxed mt-0.5">
                        {activePalace.architecturalNote}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Ceremony Details & Paired Venue Note */}
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <span className="editorial-kicker block">
                  {current.vibePitch} • {current.faithLabel}
                </span>
                <h3 className="display-card sm:text-3xl text-ink leading-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                {current.structuralForm}
              </p>

              {/* Venue Match Note */}
              <div className="p-4 sm:p-5 bg-marble border border-brass/30 space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-dark block">
                  Paired With {activePalace.label}
                </span>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  {current.venueNotes[palaceStyle]}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-brass/30">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink block">
                  Flowers &amp; Touches Inside This Setup
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.botanicalRecipe.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-xs sm:text-[13px] text-ink-muted leading-snug"
                    >
                      <Check
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] text-brass shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?eventType=Floral%20Decoration&brief=${encodeURIComponent(
                    `Decor Idea: ${current.title} tailored for ${activePalace.label}`
                  )}`}
                  className="btn-editorial-dark"
                >
                  <span>Build This Look For My Venue</span>
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
