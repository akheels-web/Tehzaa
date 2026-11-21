"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Leaf, UtensilsCrossed } from "lucide-react";
import { JaaliPattern } from "@/components/deccani/DeccaniMotifs";
import { cn } from "@/lib/utils";

interface DishPreview {
  name: string;
  tag: string;
  note: string;
}

interface CulinaryTab {
  id: string;
  tab: string;
  scriptNote: string;
  title: string;
  dietary: string;
  description: string;
  image: string;
  alt: string;
  dishes: DishPreview[];
}

const CULINARY_TABS: CulinaryTab[] = [
  {
    id: "muslim-dawat",
    tab: "Muslim Shaadi Dawat",
    scriptNote: "Biryani Bina Dawat? Nakko Ji!",
    title: "Proper Hyderabadi Shaadi & Walima Spread",
    dietary: "Coal-Dum Copper Handi",
    description:
      "Chilled Saudi Champagne and crispy Lukhmi at the door, Mutton Marag with saffron Sheermal, Kachche Gosht ki Dum Biryani, mild creamy Sufiyani Biryani, Mirchi ka Salan, plus triple sweets so nobody leaves sad!",
    image: "/images/hyd-muslim-dawat-spread.webp",
    alt: "Authentic Hyderabadi Muslim wedding feast featuring copper-deg Dum Biryani, Sufiyani Biryani, Lukhmi, Pathar ka Gosht, Qubani ka Meetha, and Badam ki Firni",
    dishes: [
      {
        name: "Kachche Gosht Dum Biryani & Sufiyani",
        tag: "Mains",
        note: "Coal-dum saffron red-spice Biryani served alongside snow-white milky Sufiyani Biryani & Mirchi ka Salan.",
      },
      {
        name: "Pathar ka Gosht, Lukhmi & Mutton Marag",
        tag: "Shuruwat",
        note: "Stone-seared kebabs, crispy minced-meat squares, and almond-pepper Marag with warm Paan Naan.",
      },
      {
        name: "Saudi Champagne & Badam Milk",
        tag: "Welcome",
        note: "Hyd's iconic sparkling apple-mint non-alcoholic welcome fizz and warm kesar Badam Milk.",
      },
      {
        name: "Qubani Malai, Double ka Meetha & Firni",
        tag: "Meetha",
        note: "Stewed apricots with whipped cream, ghee-toasted bread pudding, Kaddu ki Kheer & clay-pot Firni.",
      },
    ],
  },
  {
    id: "telugu-vindhu",
    tab: "Telugu Pelli Vindhu",
    scriptNote: "Arati Aku Meeda Bhojanam!",
    title: "Traditional Banana-Leaf Pelli Vindhu Bhojanam",
    dietary: "100% Pure Veg Pankti",
    description:
      "Served with real Andhra & Telangana warmth on freshly washed green banana leaves — from auspicious Panakam and crisp morning Pesarattu to piping-hot Mudda Pappu, Avakaya, Gutti Vankaya, and Atreyapuram Pootharekulu.",
    image: "/images/hyd-telugu-vindhu-leaf.webp",
    alt: "Authentic Hyderabadi Telugu Hindu Pelli Vindhu Bhojanam on a fresh green banana leaf with Mudda Pappu, Pulihora, Gutti Vankaya, Bobbatlu, Pootharekulu, and brass Filter Kaapi",
    dishes: [
      {
        name: "Mudda Pappu, Avakaya & Melting Ghee",
        tag: "First Course",
        note: "Steaming white rice topped with plain toor dal, spicy mango Avakaya, Kandi Podi & hot cow ghee.",
      },
      {
        name: "Gutti Vankaya, Pulihora & Mamidikaya Pappu",
        tag: "Leaf Mains",
        note: "Stuffed baby brinjals, tangy tamarind Pulihora, green-mango dal & crisp Minapa Garelu vadas.",
      },
      {
        name: "Ulavacharu with Cream & Pachi Pulusu",
        tag: "Telangana Love",
        note: "Slow-reduced horsegram delicacy with fresh farm cream beside summer-fresh raw tamarind Pachi Pulusu.",
      },
      {
        name: "Bobbatlu, Pootharekulu & Filter Kaapi",
        tag: "Bhakshanam",
        note: "Hot ghee chana-jaggery Bobbatlu (Bakshalu), paper-thin Pootharekulu & brass davara Filter Kaapi.",
      },
    ],
  },
  {
    id: "veg-jain",
    tab: "Pure Veg & Jain (Alag Kitchen)",
    scriptNote: "Hau Ji, Bilkul Separate!",
    title: "100% Isolated Pure Veg & No-Onion-Garlic Jain",
    dietary: "Untouched Vessels & Oil",
    description:
      "We keep a completely separate kitchen hall, fresh utensils, untouched ghee/oil tins, and dedicated halwais — zero mixing ever, whether it's Marwari Dal Baati Churma or strict root-free Jain menus.",
    image: "/images/catering-indian-thali.webp",
    alt: "Segregated Pure Vegetarian and Jain Indian ceremonial thali spread",
    dishes: [
      {
        name: "Old Delhi Chaat Gali & Palak Patta",
        tag: "Live Counter",
        note: "Crispy spinach chaat, hot Aloo Tikki & five-water Suji Golgappe (available zero onion/garlic too).",
      },
      {
        name: "Jodhpuri Dal Baati Churma & Gatte",
        tag: "Rajasthani",
        note: "Ghee-dipped cracked wheat baatis, Panchmel dal, rose churma & spiced yogurt gatte curry.",
      },
      {
        name: "Sattvic Temple Thali & Panchratna",
        tag: "Strict Jain",
        note: "Root-free, onion-free, garlic-free festive gravies crafted with toasted cashew & jeera tadka.",
      },
      {
        name: "Live Kesar Jalebi, Rabri & Moong Halwa",
        tag: "Hot Mithai",
        note: "Paper-thin saffron jalebis straight from copper tai over thick chilled kesar rabri.",
      },
    ],
  },
  {
    id: "chai-counters",
    tab: "Chai, Paan & Reception",
    scriptNote: "Night Still Young Hai!",
    title: "Irani Chai, Sulaimani, Paan & Telangana Hits",
    dietary: "Late-Night Crowd Favorites",
    description:
      "Because half the wedding memories happen around midnight tea counters! From creamy Irani Chai with Osmania biscuits and spicy Telangana non-veg reception starters to fresh Meetha Paan and Lychee Cream.",
    image: "/images/irani-chai-mithai-parlor.webp",
    alt: "Porcelain Irani Chai cups with Osmania biscuits, brass Filter Kaapi, Double ka Meetha, and Jalebi",
    dishes: [
      {
        name: "Irani Chai Samovar & Osmania Biscuits",
        tag: "Hyderabad Classic",
        note: "Strong reduced mawa chai poured with warm oven-fresh sweet-salty butter biscuits past midnight.",
      },
      {
        name: "Apollo Fish, Chicken 65 & Natu Kodi",
        tag: "Telangana Reception",
        note: "Bold Telugu non-veg reception hits alongside Bagara Khana and spicy Mutton Pulusu.",
      },
      {
        name: "Lychee Cream & Sunrise Pudding",
        tag: "Trending Desserts",
        note: "Chilled cream fruit bowls loved across contemporary Hyderabadi Valima receptions.",
      },
      {
        name: "Sulaimani Chai & Silver Meetha Paan",
        tag: "Post-Feast",
        note: "Digestive spiced lemon black tea followed by folded rose-gulkand Banarasi & Calcutti Meetha Paan.",
      },
    ],
  },
];

/**
 * Dramatic Deep Obsidian fine-dining stage with WAI-ARIA tabs and interactive dish tasting notes.
 */
export function HomeCulinaryStage() {
  const [activeId, setActiveId] = useState(CULINARY_TABS[0].id);
  const [selectedDishIdx, setSelectedDishIdx] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current =
    CULINARY_TABS.find((c) => c.id === activeId) || CULINARY_TABS[0];

  const handleSelectTab = (id: string) => {
    setActiveId(id);
    setSelectedDishIdx(0);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % CULINARY_TABS.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + CULINARY_TABS.length) % CULINARY_TABS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = CULINARY_TABS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      handleSelectTab(CULINARY_TABS[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-obsidian text-ink-light border-y border-obsidian-line overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <JaaliPattern tone="dark" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Editorial Split Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-obsidian-line">
          <div className="max-w-2xl space-y-2.5">
            <span className="editorial-kicker-light block">
              {current.scriptNote}
            </span>
            <h2 className="display-section text-ink-light">
              Proper Hyderabadi Food That{" "}
              <span className="font-display italic font-normal text-brass-light">
                People Actually Remember
              </span>
            </h2>
          </div>

          <Link
            href="/services/catering"
            className="btn-editorial-light group self-start lg:self-auto"
          >
            <UtensilsCrossed aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            <span>Open Full Menu Builder</span>
            <ArrowRight
              aria-hidden="true"
              className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Architectural Category Tabs */}
        <div
          role="tablist"
          aria-label="Hyderabadi Wedding Food Collections"
          className="flex flex-wrap gap-2.5"
        >
          {CULINARY_TABS.map((item, idx) => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`home-culinary-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`home-culinary-panel-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelectTab(item.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={cn(
                  "px-4 py-2.5 rounded-[2px] text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-colors duration-200 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light",
                  isSelected
                    ? "bg-alabaster text-obsidian border-alabaster"
                    : "bg-obsidian-elevated text-ink-lightMuted border-obsidian-line hover:border-brass-light hover:text-ink-light"
                )}
              >
                {item.tab}
              </button>
            );
          })}
        </div>

        {/* Obsidian Culinary Theatre Stage */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`home-culinary-panel-${current.id}`}
            aria-labelledby={`home-culinary-tab-${current.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Dark Gallery Plate */}
            <div className="lg:col-span-6">
              <div className="gallery-frame-dark shadow-obsidian">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian">
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <div className="pt-3.5 pb-1 px-1 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-lightMuted">
                  <span className="font-medium text-ink-light">{current.tab}</span>
                  <span className="inline-flex items-center gap-1.5 text-brass-light font-semibold text-[11px] uppercase tracking-[0.14em]">
                    <Leaf aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
                    {current.dietary}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Dish Tasting Plates */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2.5">
                <h3 className="display-card text-2xl sm:text-3xl text-ink-light">
                  {current.title}
                </h3>
                <p className="text-sm text-ink-lightMuted leading-relaxed">
                  {current.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {current.dishes.map((dish, dIdx) => {
                  const isDishOpen = dIdx === selectedDishIdx;
                  return (
                    <button
                      key={dish.name}
                      type="button"
                      aria-expanded={isDishOpen}
                      onClick={() => setSelectedDishIdx(dIdx)}
                      className={cn(
                        "text-left p-4 rounded-[2px] border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light",
                        isDishOpen
                          ? "bg-obsidian-muted border-brass-light text-ink-light"
                          : "bg-obsidian-elevated border-obsidian-line text-ink-light hover:border-brass/60"
                      )}
                    >
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-brass-light block mb-1.5">
                        {dish.tag}
                      </span>
                      <span className="font-display text-xl font-medium block leading-snug text-ink-light">
                        {dish.name}
                      </span>
                      <p className="text-xs mt-2 leading-relaxed text-ink-lightMuted">
                        {dish.note}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
