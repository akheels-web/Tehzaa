"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const CULINARY_TRADITIONS = [
  {
    id: "hyderabadi",
    tab: "Hyderabadi & Deccani",
    title: "Royal Copper-Deg Heritage",
    description:
      "Authentic slow-cooked Nizami culinary feasts anchored by wood-fired Kachche Gosht ki Dum Biryani, char-seared Pathar ka Gosht, and saffron desserts.",
    dishes: [
      "Kachche Gosht ki Dum Biryani",
      "Pathar ka Gosht",
      "Hyderabadi Mutton Marag",
      "Mirchi ka Salan & Baghara Baingan",
      "Double ka Meetha & Khubani ka Meetha",
    ],
    image: "/images/catering-hyderabadi-feast.webp",
    caption: "Copper-Deg Biryani & Deccani Grills",
    dietary: "Authentic Wood-Fired Dum Preparation",
  },
  {
    id: "telugu",
    tab: "Telugu Vindhu Bhojanam",
    title: "Traditional Banana-Leaf Sit-Down",
    description:
      "Ceremonial Andhra & Telangana wedding hospitality served on fresh Arati Aaku with festive delicacies, chutneys, and heirloom sweets.",
    dishes: [
      "Gutti Vankaya Kura",
      "Ulavacharu Biryani & Pulihora",
      "Mamidikaya Pappu & Gongura Pachadi",
      "Boorelu, Bobbatlu & Pootharekulu",
      "Semiya Payasam & Live Filter Kaapi",
    ],
    image: "/images/catering-indian-thali.webp",
    caption: "Ceremonial Arati Aaku Vindhu Bhojanam",
    dietary: "Available as 100% Traditional Veg Sadhya",
  },
  {
    id: "north-indian",
    tab: "North Indian & Mughlai",
    title: "Chaat Gali & Royal Mithai",
    description:
      "Vibrant Old Delhi Chaat lanes, 24-hour simmered Dal Makhani, Rajasthani classics, and live piping-hot Jalebi with Kesar Rabri.",
    dishes: [
      "Live Old Delhi Chaat Gali",
      "24-Hour Dal Makhani & Paneer Lababdar",
      "Rajasthani Dal Baati Churma",
      "Sheermal, Missi & Tandoori Breads",
      "Live Jalebi with Kesar Rabri & Paan Bar",
    ],
    image: "/images/catering-indian-thali.webp",
    caption: "North Indian Feast & Live Chaat Theatre",
    dietary: "Live Tandoor & Halwai Counters",
  },
  {
    id: "veg-jain",
    tab: "Pure Veg & Jain Kitchens",
    title: "Strictly Segregated Sattvic Prep",
    description:
      "Dedicated pure-vegetarian chefs, untouched brass & steel cookware, and separate prep zones honoring sacred family traditions.",
    dishes: [
      "100% Segregated Cookware & Prep Zone",
      "No-Onion, No-Garlic Ceremonial Menus",
      "Sattvic Temple-Style Thali & Farali",
      "Kesar Badam Thandai & Dry-Fruit Halwas",
      "Dedicated Silver & Brass Serviceware",
    ],
    image: "/images/catering-hyderabadi-feast.webp",
    caption: "Segregated Pure Vegetarian & Jain Hospitality",
    dietary: "Zero Cross-Contamination Protocol",
  },
];

/**
 * Interactive Deep Emerald Gastronomy band with live tradition switching.
 */
export function HomeCulinaryStage() {
  const [activeId, setActiveId] = useState(CULINARY_TRADITIONS[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current =
    CULINARY_TRADITIONS.find((c) => c.id === activeId) || CULINARY_TRADITIONS[0];

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % CULINARY_TRADITIONS.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + CULINARY_TRADITIONS.length) % CULINARY_TRADITIONS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = CULINARY_TRADITIONS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveId(CULINARY_TRADITIONS[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-emerald-deep text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Interactive Dish Explorer */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <p className="text-xs font-sans font-medium text-gold-light mb-3">
                Indian &amp; Hyderabadi gastronomy
              </p>
              <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-ivory leading-[1.08]">
                Feasts Rooted in{" "}
                <span className="text-ivory-dark">
                  Every Tradition
                </span>
              </h2>
            </div>

            {/* Interactive Tradition Tabs */}
            <div
              role="tablist"
              aria-label="Culinary Traditions"
              className="flex flex-wrap gap-2 border-b border-ivory/20 pb-5"
            >
              {CULINARY_TRADITIONS.map((item, idx) => {
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
                    onClick={() => setActiveId(item.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-200 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light",
                      isSelected
                        ? "bg-ivory text-charcoal border-ivory"
                        : "bg-transparent text-ivory/80 border-ivory/25 hover:border-gold-light hover:text-ivory"
                    )}
                  >
                    {item.tab}
                  </button>
                );
              })}
            </div>

            {/* Active Collection Details */}
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
                className="space-y-5 min-h-[248px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory">
                    {current.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-md border border-gold-light/40 text-gold-light">
                    <Leaf aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    {current.dietary}
                  </span>
                </div>

                <p className="text-sm text-ivory/80 leading-relaxed">
                  {current.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-2">
                  {current.dishes.map((dish) => (
                    <li
                      key={dish}
                      className="flex items-center gap-2 text-xs sm:text-sm text-ivory/90"
                    >
                      <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-gold-light shrink-0" />
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="pt-2">
              <Link
                href="/services/catering"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ivory text-charcoal hover:bg-ivory-dark text-sm font-medium transition-colors duration-200"
              >
                <span>Explore Full Wedding Menus</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Right Culinary Visual Stage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">
              <div className="sm:col-span-7 space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-ivory/25 bg-charcoal">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.image + current.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image}
                        alt={current.caption}
                        fill
                        sizes="(max-width: 1024px) 100vw, 35vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="text-xs text-gold-light">
                  {current.caption}
                </p>
              </div>

              <div className="sm:col-span-5 space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-ivory/25 bg-charcoal">
                  <Image
                    src={
                      current.image === "/images/catering-hyderabadi-feast.webp"
                        ? "/images/catering-indian-thali.webp"
                        : "/images/catering-hyderabadi-feast.webp"
                    }
                    alt="Authentic Indian and Hyderabadi wedding delicacies"
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover opacity-90"
                  />
                </div>
                <p className="text-xs text-ivory/75">
                  Live regional counters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

