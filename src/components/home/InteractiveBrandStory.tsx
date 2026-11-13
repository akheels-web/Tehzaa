import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Dual-photograph narrative section with overlapping framing
 * and a static architectural Atelier seal.
 */
export function InteractiveBrandStory() {
  return (
    <section
      id="studio-narrative"
      className="py-24 lg:py-32 bg-ivory overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Dual-Frame Photography */}
          <div className="lg:col-span-6 relative pb-12 sm:pb-16">
            <div className="relative w-[86%] aspect-[4/5] overflow-hidden rounded-2xl border border-gold/30 bg-cream">
              <Image
                src="/images/floral-mandap-indian.webp"
                alt="Hand-crafted South Indian Kalyana Mandapam draped in jasmine and marigolds"
                fill
                sizes="(max-width: 1024px) 85vw, 42vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping Inset Frame */}
            <div className="absolute right-0 bottom-0 w-[52%] aspect-[4/5] overflow-hidden rounded-xl border-4 border-ivory shadow-luxury bg-cream z-10">
              <Image
                src="/images/bridal-entry-indian.webp"
                alt="Graceful Indian bridal procession under a canopy of fresh tuberose and roses"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Static Architectural Seal */}
            <div
              aria-hidden="true"
              className="hidden sm:flex absolute -top-6 right-8 w-24 h-24 items-center justify-center z-20 pointer-events-none"
            >
              <svg viewBox="0 0 120 120" className="w-full h-full text-gold-dark">
                <defs>
                  <path
                    id="tehzaa-seal-circle"
                    d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                  />
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="#FAF7F2"
                  fillOpacity="0.95"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="1"
                />
                <text
                  fill="currentColor"
                  fontSize="9.2"
                  fontWeight="600"
                  letterSpacing="3.4"
                >
                  <textPath href="#tehzaa-seal-circle" startOffset="0%">
                    TEHZAA • HYDERABAD • TEHZEEB •
                  </textPath>
                </text>
                <circle cx="60" cy="60" r="3" fill="#6B292D" />
              </svg>
            </div>
          </div>

          {/* Right Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <p className="editorial-kicker">The spirit of Tehzeeb</p>

            <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl lg:text-[52px] leading-[1.08] text-charcoal">
              Hospitality Elevated to{" "}
              <span className="text-burgundy">Living Art</span>
            </h2>

            <div className="hairline-divider w-28" />

            <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed">
              <p>
                In Hyderabad, hospitality is never hurried.{" "}
                <strong className="font-semibold text-charcoal">Tehzeeb</strong> lives in
                the scent of dawn-woven jasmine, the grace extended to elders, and the
                abundance of an unhurried festive table.
              </p>
              <p>
                Tehzaa Celebrations brings this shared cultural poise to every community
                in the city—whether crafting a sunlit Telugu Pelli Pandiri, a vibrant Marwari
                Haldi courtyard, a dignified Nikkah pavilion, or a flagship summit in HITEC City.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-gold/25">
              <div>
                <span className="text-xs font-medium text-gold-dark block mb-1 tabular-nums">
                  01 / Spatial craft
                </span>
                <p className="font-serif text-xl font-medium text-charcoal">
                  Bespoke Architecture
                </p>
                <p className="text-xs sm:text-sm text-charcoal/75 mt-1 leading-relaxed">
                  Every mandap, arch, and tablescape is drawn uniquely for your venue&apos;s
                  scale and natural light.
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-gold-dark block mb-1 tabular-nums">
                  02 / Kitchen integrity
                </span>
                <p className="font-serif text-xl font-medium text-charcoal">
                  Regional Mastery
                </p>
                <p className="text-xs sm:text-sm text-charcoal/75 mt-1 leading-relaxed">
                  Specialist regional chefs with strictly segregated Pure Vegetarian and
                  Jain cookware.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-burgundy/40 hover:bg-burgundy hover:text-ivory text-sm font-medium text-burgundy transition-colors duration-200"
              >
                <span>Discover Our House</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

