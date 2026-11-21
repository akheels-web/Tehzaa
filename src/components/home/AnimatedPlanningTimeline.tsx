"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Chai Pe Charcha",
    subtitle: "Grab Irani Chai or Filter Kaapi & talk dreams",
    description:
      "Swing by Road No. 36 in Jubilee Hills (or hop on a quick WhatsApp call). Tell us your dates, traditions, guest count, and what matters most to Amma, Nanna, or Dadi.",
    deliverable: "Clear venue shortlist, rough ritual map & honest budget guide",
    image: "/images/irani-chai-mithai-parlor.webp",
    alt: "Warm Irani Chai and Filter Kaapi hospitality session at Tehzaa Hyderabad",
  },
  {
    step: "02",
    title: "Decor Swatches & Tasting",
    subtitle: "Touch the flowers, taste the Biryani & Bobbatlu",
    description:
      "Review real 3D layouts for your Mandapam or Nikkah stage, match marigold and mogra swatches, and bring family elders to taste every dish fresh from our kitchen.",
    deliverable: "Custom stage sketches + finalized food tasting notes",
    image: "/images/hyd-muslim-dawat-spread.webp",
    alt: "Curated Hyderabadi Shaadi food tasting table spread",
  },
  {
    step: "03",
    title: "Zero-Tension Prep",
    subtitle: "We fight the traffic & vendors, not you",
    description:
      "Dawn jasmine flower trucks, isolated Veg/Jain cookware delivery, Baraat band coordination, and hotel clearances — all run on quiet checklists by our crew.",
    deliverable: "Locked minute-by-minute run sheet + kitchen setup audit",
    image: "/images/real-taramati-baradari.webp",
    alt: "Original photograph of Taramati Baradari open stone pavilion in Hyderabad framed for sunset wedding ceremonies",
  },
  {
    step: "04",
    title: "Full Dhamaka Day",
    subtitle: "You just get dressed up and enjoy!",
    description:
      "Zero frantic phone calls while getting mehndi or greeting cousins. Our floor captains cue the Nadaswaram, Marfa, Phera timing, and dinner service seamlessly.",
    deliverable: "Happy parents, smiling guests & clean late-night wrap-up",
    image: "/images/baraat-grand-entry.webp",
    alt: "Jubilant Baraat arrival and wedding celebration in Hyderabad",
  },
];

/**
 * Architectural planning journey timeline with shared layoutId spring marker.
 */
export function AnimatedPlanningTimeline() {
  const [focusedStep, setFocusedStep] = useState(0);
  const currentStep = STEPS[focusedStep] || STEPS[0];

  return (
    <div className="pt-16 border-t border-stone-line">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl space-y-2.5">
          <span className="editorial-kicker block">No stress, step by step</span>
          <h2 className="display-section text-ink">
            From First{" "}
            <span className="editorial-italic">Chai to Final Baraat</span>
          </h2>
        </div>
        <p className="text-xs text-ink-muted max-w-xs">
          Tap any step along the track to see how we take the load off your family.
        </p>
      </div>

      {/* Animated Horizontal Track (Desktop) */}
      <div className="hidden lg:grid grid-cols-4 gap-5 mb-5 items-center" aria-hidden="true">
        {STEPS.map((item, idx) => {
          const isActive = idx === focusedStep;
          const isCompleted = idx <= focusedStep;
          return (
            <div key={item.step} className="relative flex items-center h-6">
              <div
                className={cn(
                  "h-px w-full transition-colors duration-300",
                  isCompleted ? "bg-brass-dark" : "bg-stone-line"
                )}
              />
              {isActive && (
                <motion.span
                  layoutId="active-timeline-marker"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute left-4 w-3 h-3 rotate-45 bg-obsidian border border-brass-light shadow"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((item, idx) => {
          const isFocused = focusedStep === idx;
          return (
            <motion.button
              key={item.step}
              type="button"
              aria-pressed={isFocused}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              onMouseEnter={() => setFocusedStep(idx)}
              onFocus={() => setFocusedStep(idx)}
              onClick={() => setFocusedStep(idx)}
              className={cn(
                "text-left p-4 rounded-[2px] border transition-colors duration-200 flex flex-col justify-between cursor-pointer",
                isFocused
                  ? "bg-alabaster border-obsidian shadow-gallery"
                  : "bg-silk border-stone-line hover:border-obsidian/40"
              )}
            >
              <div className="w-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-stone-line bg-limestone mb-4">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "font-display text-3xl font-medium tabular-nums transition-colors",
                      isFocused ? "text-ink" : "text-ink-subtle"
                    )}
                  >
                    {item.step}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-2 h-2 rotate-45 transition-colors",
                      isFocused ? "bg-brass-dark" : "bg-stone-line"
                    )}
                  />
                </div>

                <h3 className="font-display text-2xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="text-xs text-brass-dark font-semibold mt-1.5">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-ink-muted mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Live Step Outcome Readout */}
      <div
        aria-live="polite"
        className="mt-6 px-5 py-4 rounded-[2px] bg-alabaster border border-stone-line flex flex-col sm:flex-row sm:items-center justify-between gap-2"
      >
        <div className="flex items-center gap-3 text-xs">
          <span className="font-display text-lg font-medium text-ink tabular-nums">
            Step {currentStep.step}
          </span>
          <span aria-hidden="true" className="text-brass-dark">
            /
          </span>
          <span className="font-semibold text-ink">{currentStep.title}</span>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted">
          <span className="font-semibold text-brass-dark">What you get:</span>{" "}
          {currentStep.deliverable}
        </p>
      </div>
    </div>
  );
}
