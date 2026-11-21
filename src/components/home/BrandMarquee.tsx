import React from "react";

const CELEBRATION_RIBBON = [
  "Shaadi & Walima",
  "Telugu Pelli Pandiri",
  "Sanchaq & Manjha",
  "Dum Biryani & Sufiyani",
  "Arati Aku Vindhu",
  "Full Dhamaka Baraat & Marfa",
  "Anand Karaj & Cathedral Vows",
  "Pure Veg Alag Kitchen",
  "Zero Tension",
];

/**
 * Refined Limestone architectural index ribbon uniting Hyderabad's traditions.
 */
export function BrandMarquee() {
  return (
    <div
      aria-label="Hyderabadi wedding highlights curated by Tehzaa"
      className="w-full bg-limestone text-ink-muted border-b border-stone-line py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
        {CELEBRATION_RIBBON.map((item, idx) => (
          <React.Fragment key={item}>
            <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted whitespace-nowrap">
              {item}
            </span>
            {idx < CELEBRATION_RIBBON.length - 1 && (
              <span
                aria-hidden="true"
                className="w-1 h-1 rotate-45 bg-brass inline-block shrink-0"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
