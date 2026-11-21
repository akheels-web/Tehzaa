import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  DeccaniArchFrame,
  TehzeebDivider,
} from "@/components/deccani/DeccaniMotifs";

/**
 * Limestone editorial magazine spread sharing Tehzaa's Hyderabad studio story.
 */
export function InteractiveBrandStory() {
  return (
    <section
      id="studio-narrative"
      className="py-20 lg:py-28 bg-limestone text-ink border-b border-stone-line overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Asymmetric Architectural Plates */}
          <div className="lg:col-span-6 relative pb-16 sm:pb-20">
            <DeccaniArchFrame
              variant="dome"
              theme="alabaster"
              className="w-[88%]"
            >
              <div className="relative aspect-[4/4.3] w-full bg-limestone">
                <Image
                  src="/images/real-qutb-shahi-tombs.webp"
                  alt="Original photograph of the Tomb of Muhammad Quli Qutb Shah at Qutb Shahi Tombs in Hyderabad surrounded by Charbagh garden lawns"
                  fill
                  sizes="(max-width: 1024px) 85vw, 42vw"
                  className="object-cover"
                />
              </div>
            </DeccaniArchFrame>

            {/* Crisp Sharp Architectural Gallery Inset (No Slanted Carton) */}
            <div className="absolute right-0 bottom-0 w-[52%] gallery-frame shadow-gallery z-20">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-limestone">
                <Image
                  src="/images/bridal-entry-indian.webp"
                  alt="Bridal arrival beneath fresh mogra and blush rose Phoolon ki Chadar"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="pt-2.5 pb-1 text-center text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-dark">
                Made with chai &amp; heart
              </p>
            </div>
          </div>

          {/* Right Hyderabad Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="editorial-kicker block">Dil se Hyderabadi</span>

            <h2 className="display-section text-ink">
              Why Families Trust Us With{" "}
              <span className="editorial-italic">Their Biggest Days</span>
            </h2>

            <TehzeebDivider theme="light" className="justify-start max-w-xs" />

            <div className="space-y-4 editorial-body">
              <p>
                Weddings here aren&apos;t stiff corporate productions — they&apos;re late-night Irani Chai runs with cousins, morning jasmine garlands arriving on time at{" "}
                <strong className="font-semibold text-ink tabular-nums">
                  5 AM Muhurthams
                </strong>
                , and making sure Dadi, Tatayya, and every visiting chacha feels genuinely looked after.
              </p>
              <p>
                From our Jubilee Hills studio on Road No. 36, we handle both sides effortlessly: Hindu priests &amp; Telugu Pandiri craftsmen work right alongside Deccani khansamas, Baraat bands, and tech-friendly stage crews. You show up smiling —{" "}
                <strong className="font-semibold text-ink">
                  baaki sab hum dekh lenge!
                </strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-stone-line">
              <div>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-dark block mb-1.5 tabular-nums">
                  01 / Kirrak Spaces
                </span>
                <p className="font-display text-2xl font-medium text-ink">
                  Real Palaces &amp; Lawns
                </p>
                <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                  Custom-sketched decor built for Chowmahalla, Falaknuma, Taramati, JRC, or your own backyard.
                </p>
              </div>
              <div className="sm:border-l sm:border-stone-line sm:pl-6">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brass-dark block mb-1.5 tabular-nums">
                  02 / Zero Tension Kitchens
                </span>
                <p className="font-display text-2xl font-medium text-ink">
                  Bilkul Alag Cooking Wings
                </p>
                <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                  Old-city Dum Biryani specialists alongside isolated Pure Veg &amp; Sattvic Jain kitchens.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/about" className="btn-editorial-outline group">
                <span>Meet Our Hyderabad Team</span>
                <ArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
