"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Consultation & Vision",
    subtitle: "Listening & cultural alignment",
    description:
      "A private conversation at our Jubilee Hills studio or your chosen venue to understand family rituals, guest hospitality flow, and celebratory tone.",
    deliverable: "Cultural ritual map, guest hospitality flow & preliminary venue brief",
    image: "/images/hero-indian-wedding.webp",
    alt: "Candlelit wedding courtyard consultation aesthetic in Hyderabad",
  },
  {
    step: "02",
    title: "Design & Tasting",
    subtitle: "Material palette & culinary preview",
    description:
      "Architectural spatial layouts, floral and textile swatches, and a curated family tasting with our regional chefs and master khansamas.",
    deliverable: "Scaled floor elevations, botanical & linen swatches & private menu tasting",
    image: "/images/catering-indian-thali.webp",
    alt: "Curated Indian feast and menu tasting spread",
  },
  {
    step: "03",
    title: "Production & Protocol",
    subtitle: "Craftsmanship & rehearsal",
    description:
      "Custom structural fabrication, dawn botanical sourcing, acoustic calibration, and synchronized venue run-sheets.",
    deliverable: "Segregated kitchen prep, cold-chain florals & minute-by-minute run sheet",
    image: "/images/floral-mandap-indian.webp",
    alt: "Fresh jasmine and marigold mandap architectural craftsmanship",
  },
  {
    step: "04",
    title: "The Celebration",
    subtitle: "Unhurried presence",
    description:
      "Your family arrives solely as gracious hosts while our stewards orchestrate every welcome, ceremony, and dining course calmly.",
    deliverable: "Dedicated floor directors, elders’ concierge & seamless ceremony cues",
    image: "/images/bridal-entry-indian.webp",
    alt: "Gracious bridal arrival beneath a floral canopy",
  },
];

/**
 * Four-step planning timeline with interactive phase selection.
 */
export function AnimatedPlanningTimeline() {
  const [focusedStep, setFocusedStep] = useState(0);
  const currentStep = STEPS[focusedStep] || STEPS[0];

  return (
    <div className="pt-16 border-t border-gold/25">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="max-w-2xl">
          <p className="editorial-kicker mb-3">Our process</p>
          <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.08]">
            From First Sketch to{" "}
            <span className="text-burgundy">Final Toast</span>
          </h2>
        </div>
        <p className="text-xs text-taupe-dark max-w-xs">
          Select any phase to inspect how Tehzaa orchestrates your celebration.
        </p>
      </div>

      {/* Connected Progress Track (Desktop) */}
      <div className="hidden lg:grid grid-cols-4 gap-6 mb-4" aria-hidden="true">
        {STEPS.map((item, idx) => {
          const isCompletedOrActive = idx <= focusedStep;
          return (
            <div key={item.step} className="flex items-center">
              <div
                className={cn(
                  "h-px w-full transition-colors duration-300",
                  isCompletedOrActive ? "bg-burgundy/60" : "bg-gold/25"
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((item, idx) => {
          const isFocused = focusedStep === idx;
          return (
            <button
              key={item.step}
              type="button"
              aria-pressed={isFocused}
              onMouseEnter={() => setFocusedStep(idx)}
              onFocus={() => setFocusedStep(idx)}
              onClick={() => setFocusedStep(idx)}
              className={cn(
                "text-left p-6 rounded-xl border transition-[background-color,border-color,box-shadow] duration-200 flex flex-col justify-between cursor-pointer",
                isFocused
                  ? "bg-ivory border-burgundy/40 shadow-royale"
                  : "bg-ivory/60 border-gold/25 hover:border-gold/50"
              )}
            >
              <div className="w-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-gold/20 bg-cream mb-5">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "font-serif text-3xl font-medium tabular-nums transition-colors",
                      isFocused ? "text-burgundy" : "text-gold-dark/70"
                    )}
                  >
                    {item.step}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-2 h-2 rotate-45 transition-colors",
                      isFocused ? "bg-burgundy" : "bg-gold/30"
                    )}
                  />
                </div>

                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  {item.title}
                </h3>
                <p className="text-xs text-gold-dark font-medium mt-2">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-charcoal/75 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Deliverable Readout */}
      <div
        aria-live="polite"
        className="mt-6 px-5 py-4 rounded-xl bg-ivory border border-gold/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
      >
        <div className="flex items-center gap-3 text-xs">
          <span className="font-serif text-base font-medium text-burgundy tabular-nums">
            Phase {currentStep.step}
          </span>
          <span aria-hidden="true" className="text-gold/50">•</span>
          <span className="font-medium text-charcoal">{currentStep.title}</span>
        </div>
        <p className="text-xs text-taupe-dark">
          <span className="font-medium text-gold-dark">Key outcome:</span>{" "}
          {currentStep.deliverable}
        </p>
      </div>
    </div>
  );
}

