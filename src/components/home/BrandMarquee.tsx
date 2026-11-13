import React from "react";

const CELEBRATION_RIBBON = [
  "Telugu Muhurtham",
  "Royal Baraat",
  "Nikkah & Walima",
  "Sangeet & Haldi",
  "Vindhu Bhojanam",
  "Shahi Dastarkhwan",
  "Anand Karaj",
  "HITEC City Galas",
  "Seemantham & Naming",
];

/**
 * Calm horizontal tradition band connecting the Hero to the Studio Narrative.
 */
export function BrandMarquee() {
  return (
    <div
      aria-label="Celebration traditions curated by Tehzaa"
      className="w-full bg-charcoal text-ivory/85 border-y border-gold/25 py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {CELEBRATION_RIBBON.map((item, idx) => (
          <React.Fragment key={item}>
            <span className="text-xs font-sans font-medium text-ivory/85 whitespace-nowrap">
              {item}
            </span>
            {idx < CELEBRATION_RIBBON.length - 1 && (
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rotate-45 bg-gold-light inline-block shrink-0"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

