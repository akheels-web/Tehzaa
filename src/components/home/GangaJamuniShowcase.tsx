"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PelliVsShaadiCurtain } from "@/components/home/PelliVsShaadiCurtain";
import { cn } from "@/lib/utils";

interface TraditionProfile {
  id: string;
  tabLabel: string;
  communityBadge: string;
  scriptTag: string;
  title: string;
  decorVibe: string;
  foodVibe: string;
  rituals: string[];
  image: string;
  alt: string;
  decorHref: string;
  contactHref: string;
}

const TRADITIONS: TraditionProfile[] = [
  {
    id: "telugu",
    tabLabel: "Telugu Pelli",
    communityBadge: "Hindu Wedding • Muhurtham",
    scriptTag: "Subha Muhurtham Vibes",
    title: "Pelli Pandiri, Malli & Proper Banana-Leaf Vindhu",
    decorVibe:
      "Real green banana trunks on four teak pillars, mango leaf thoranalu, fresh banti puvvu (marigolds), jasmine curtains, and Agni Kundam seating on wooden peatalu.",
    foodVibe:
      "Morning Pesarattu-Upma & Minapa Garelu, then full Arati Aku lunch: Mudda Pappu with Avakaya & melting ghee, Chintapandu Pulihora, Gutti Vankaya, Ulavacharu, Bobbatlu & Atreyapuram Pootharekulu.",
    rituals: [
      "Fresh Malli & Banana-Stalk Pelli Pandiri",
      "Jeelakarra Bellam & Mangalya Dharanam Cue",
      "Talambralu Floral Shower Moment",
      "100% Isolated Pure Veg Arati Aku Vindhu",
    ],
    image: "/images/hyd-telugu-vindhu-leaf.webp",
    alt: "Authentic Telugu Pelli Vindhu Bhojanam laid on an emerald banana leaf",
    decorHref: "/services/floral-decor?tradition=telugu",
    contactHref:
      "/contact?eventType=Telugu%20%26%20South%20Indian%20Weddings&brief=Planning%20a%20Telugu%20Pelli%20Pandiri%20with%20authentic%20Arati%20Aku%20Vindhu%20Bhojanam.",
  },
  {
    id: "nikkah",
    tabLabel: "Muslim Shaadi & Walima",
    communityBadge: "Hyderabadi Nikkah • Sanchaq • Manjha",
    scriptTag: "Aadaab, Ekdum Royal!",
    title: "Sanchaq Thaals, Nikkah Arches & Old-City Dawat",
    decorVibe:
      "Yellow gota-patti Manjha corners, decorated Sanchaq thaals for the Khada Dupatta, Chowmahalla-style white scalloped arches, crystal chandeliers, plus Arsi-Mushaf mirror seating.",
    foodVibe:
      "Chilled Saudi Champagne welcome, hot Mutton Marag with Sheermal, crispy Lukhmi, black-stone Pathar ka Gosht, Mutton Dum Biryani + white Sufiyani Biryani, Mirchi ka Salan, Qubani Malai, Double ka Meetha & Kaddu ki Kheer.",
    rituals: [
      "Decorated Sanchaq Thaals & Manjha Canopy",
      "Chowmahalla Arches for Ijab-o-Qubul & Arsi-Mushaf",
      "Hyderabadi Tasha-Marfa & Sufi Qawwali Night",
      "Sulaimani Chai & Live Meetha Paan Bar",
    ],
    image: "/images/real-chowmahalla-palace.webp",
    alt: "Original photograph of Khilwat Mubarak at Chowmahalla Palace in Hyderabad with scalloped arches and twin rooftop cupolas",
    decorHref: "/services/floral-decor?tradition=nikkah",
    contactHref:
      "/contact?eventType=Hyderabadi%20Nikkah%20%26%20Walima&brief=Planning%20a%20Hyderabadi%20Nikkah%20%26%20Walima%20with%20Sanchaq%20and%20full%20Dawat.",
  },
  {
    id: "marwari",
    tabLabel: "Marwari & Punjabi",
    communityBadge: "Baraat • Haldi • Strict Jain",
    scriptTag: "Full-On Dhamaka!",
    title: "Taramati Sunset Haldi, Bagghi Baraat & Jain Food",
    decorVibe:
      "Sunlit banti-puvvu Haldi swing at Taramati Baradari or Gandipet lawns, four-pillar Jharokha Jaimala pavilions, and tube-rose Phoolon ki Chadar walkways.",
    foodVibe:
      "Old Delhi Chaat Gali, Jodhpuri Dal Baati Churma, 24-hour Dal Makhani, live Kesar Jalebi-Rabri — cooked inside a bilkul alag Pure Veg & zero-onion-garlic Jain kitchen hall.",
    rituals: [
      "Dhol & Vintage Car / Bagghi Baraat",
      "Sunset Taramati Sangeet & Phere",
      "100% Isolated Jain Utensils & Halwais",
      "Silver-Thali Gate Milni Welcome",
    ],
    image: "/images/real-taramati-baradari.webp",
    alt: "Original photograph of Taramati Baradari twelve-arched pavilion in Hyderabad overlooking Golconda",
    decorHref: "/services/floral-decor?tradition=marwari",
    contactHref:
      "/contact?eventType=North%20Indian%20%2F%20Punjabi%20%2F%20Marwari%20Ceremonies&brief=Planning%20Marwari%2FPunjabi%20ceremonies%2C%20Baraat%2C%20and%20Pure%20Veg%2FJain%20catering.",
  },
  {
    id: "interfaith",
    tabLabel: "Sikh, Christian & Two-Culture",
    communityBadge: "Anand Karaj • Cathedral • Fusion",
    scriptTag: "Sabka Saath, Pure Love",
    title: "Calm Morning Sanctuary + Evening Dance Floor",
    decorVibe:
      "Taj Falaknuma marble floral steps, clean ivory Chanderi silk Palki canopies for morning Anand Karaj, or crisp white garden roses and candles for Christian ceremonies.",
    foodVibe:
      "Pure veg langar-style breakfast or gourmet Continental brunch followed by a crowd-pleasing evening fusion menu blending Biryani, Chaat, Vindhu & live counters.",
    rituals: [
      "Respectful Morning Palki & Kirtan Setup",
      "White Floral Cathedral Aisles & Candlelight",
      "Two-Culture Telugu-Hyderabadi Fusion Menus",
      "Acoustic Harmony Between Both Families",
    ],
    image: "/images/real-falaknuma-palace.webp",
    alt: "Original photograph of Taj Falaknuma Palace white Palladian facade and double marble staircase in Hyderabad",
    decorHref: "/services/floral-decor?tradition=interfaith",
    contactHref:
      "/contact?eventType=Anand%20Karaj%20%2F%20Sikh%20Wedding&brief=Planning%20a%20two-culture%20or%20sanctuary%20wedding%20in%20Hyderabad.",
  },
];

/**
 * Warm Alabaster split-screen comparison curtain + 4-culture architectural tab explorer.
 */
export function GangaJamuniShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = TRADITIONS[activeIdx] || TRADITIONS[0];

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % TRADITIONS.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + TRADITIONS.length) % TRADITIONS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = TRADITIONS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section
      id="ganga-jamuni-traditions"
      aria-labelledby="ganga-jamuni-heading"
      className="py-20 lg:py-28 bg-alabaster text-ink border-b border-stone-line"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-stone-line">
          <div className="lg:col-span-8 space-y-2.5">
            <span className="editorial-kicker block">
              One city, har tarah ki shaadi
            </span>
            <h2
              id="ganga-jamuni-heading"
              className="display-section text-ink"
            >
              Telugu Pelli to Hyderabadi Nikkah —{" "}
              <span className="editorial-italic">Slide &amp; Compare.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-ink-muted leading-relaxed">
              Every community in Hyderabad celebrates differently. Drag the slider below to compare two iconic looks side-by-side, then tap your celebration style underneath!
            </p>
          </div>
        </div>

        {/* Interactive Split Curtain */}
        <PelliVsShaadiCurtain />

        {/* 4-Culture Architectural Tab Explorer */}
        <div className="space-y-8 pt-4">
          <div
            role="tablist"
            aria-label="Hyderabadi Wedding Traditions"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-stone-line bg-silk divide-y sm:divide-y-0 sm:divide-x divide-stone-line rounded-[2px]"
          >
            {TRADITIONS.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={`tradition-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`tradition-panel-${item.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={cn(
                    "relative text-left p-5 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brass",
                    isSelected
                      ? "bg-obsidian text-alabaster"
                      : "bg-silk text-ink hover:bg-limestone/45"
                  )}
                >
                  <span
                    className={cn(
                      "block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] mb-1.5 tabular-nums",
                      isSelected ? "text-brass-light" : "text-brass-dark"
                    )}
                  >
                    0{idx + 1} · {item.communityBadge}
                  </span>
                  <span className="font-display text-2xl font-medium block leading-snug">
                    {item.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              role="tabpanel"
              id={`tradition-panel-${current.id}`}
              aria-labelledby={`tradition-tab-${current.id}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-stone-line bg-silk p-6 sm:p-8 lg:p-10 rounded-[2px] shadow-gallery"
            >
              <div className="lg:col-span-5">
                <div className="gallery-frame bg-alabaster">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-limestone">
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="editorial-kicker block mb-2">
                    {current.scriptTag}
                  </span>
                  <h3 className="display-card text-3xl sm:text-4xl text-ink">
                    {current.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-line">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-dark block">
                      How the Decor Looks
                    </span>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {current.decorVibe}
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:border-l sm:border-stone-line sm:pl-6">
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-dark block">
                      What&apos;s On The Menu
                    </span>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {current.foodVibe}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-stone-line">
                  {current.rituals.map((ritual) => (
                    <div
                      key={ritual}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-ink"
                    >
                      <Check
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.75] text-brass-dark shrink-0 mt-0.5"
                      />
                      <span>{ritual}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link href={current.decorHref} className="btn-editorial-dark group">
                    <span>Explore Decor Ideas</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>

                  <Link href={current.contactHref} className="btn-editorial-outline">
                    <span>Plan This Style</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-4 h-4 stroke-[1.5] text-brass-dark"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
