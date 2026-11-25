"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight } from "lucide-react";
import { RASMEIN, type Rasm } from "@/lib/landing/rasmein";
import { indexFromProgress, sliceScrollTarget } from "@/lib/landing/progress";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { getLenis } from "@/components/layout/SmoothScroll";
import { ArchFrame } from "./primitives/ArchFrame";
import { JaaliLattice } from "./primitives/JaaliLattice";
import { SceneHeading } from "./primitives/SceneHeading";
import { useMediaQuery } from "./primitives/useMediaQuery";
import { useRange } from "./primitives/useRange";
import { cn } from "@/lib/utils";

const HEADING = {
  kicker: "Hamari Rasmein",
  title: "Every rasm,",
  italicTail: "tied with care.",
};

const SCROLL_START = 0.04;
const SCROLL_SPAN = 0.92;

function GalleryLink() {
  return (
    <Link
      href="/gallery"
      className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink underline decoration-brass underline-offset-[6px] hover:text-ruby"
    >
      See them in our gallery
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function RasmText({ r }: { r: Rasm }) {
  return (
    <>
      <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brass-dark">{r.tradition}</span>
      <h3 className="mt-1 font-display text-[clamp(2rem,3vw,2.75rem)] font-medium leading-none text-ink">{r.name}</h3>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-muted">{r.meaning}</p>
      <p className="mt-3 border-l-2 border-brass pl-3 font-sans text-sm leading-relaxed text-ink">
        <span className="font-bold text-ruby">We take care of: </span>
        {r.weHandle}
      </p>
    </>
  );
}

/** Scene 06. A gold garland thread that ties each wedding rite in turn as you scroll. */
export function RasmeinThread() {
  const motionAllowed = useMotionAllowed();
  const wide = useMediaQuery("(min-width: 1024px)");
  return motionAllowed && wide ? <PinnedThread /> : <StackedThread />;
}

/** Mobile and reduced motion: stacked cards strung on a thread down the left edge. */
function StackedThread() {
  return (
    <section className="relative overflow-hidden bg-marble-warm py-24">
      <JaaliLattice />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <SceneHeading {...HEADING} intro="The rites of a Hyderabadi wedding, from both sides of the family." />
        <ol className="relative mt-12 space-y-10 border-l-2 border-brass/60 pl-6">
          {RASMEIN.map((r) => (
            <li key={r.id} className="relative">
              <span aria-hidden="true" className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-2 border-marble bg-ruby" />
              <div className="relative mb-5 aspect-[4/3] overflow-hidden border-[5px] border-white shadow-ruby">
                <Image src={r.image} alt={r.alt} fill sizes="(max-width: 768px) 90vw, 600px" className="object-cover" />
              </div>
              <RasmText r={r} />
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <GalleryLink />
        </div>
      </div>
    </section>
  );
}

function PinnedThread() {
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const threadFill = useRange(scrollYProgress, [SCROLL_START, SCROLL_START + SCROLL_SPAN], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setActive(indexFromProgress((p - SCROLL_START) / SCROLL_SPAN, RASMEIN.length))
  );

  /** Scroll so rasm `i` sits in the middle of its slice of the pinned range. */
  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const target = sliceScrollTarget({
      top: el.getBoundingClientRect().top + window.scrollY,
      range: el.offsetHeight - window.innerHeight,
      start: SCROLL_START,
      span: SCROLL_SPAN,
      index: i,
      count: RASMEIN.length,
    });
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target });
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = RASMEIN.length - 1;
    const next =
      e.key === "ArrowDown" ? Math.min(last, i + 1)
      : e.key === "ArrowUp" ? Math.max(0, i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    goTo(next);
  };

  const r = RASMEIN[active];

  return (
    <section ref={sectionRef} className="relative bg-marble-warm" style={{ height: `${RASMEIN.length * 60 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <JaaliLattice />
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-10 px-8 pt-16">
          {/* Thread + rasm list */}
          <div className="col-span-4">
            <SceneHeading {...HEADING} className="[&_h2]:text-[clamp(2.2rem,3.6vw,3.4rem)]" />
            <div className="relative mt-8 pl-8">
              <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-brass/25" />
              <motion.span
                aria-hidden="true"
                className="absolute bottom-2 left-[7px] top-2 w-0.5 origin-top bg-brass"
                style={{ scaleY: threadFill }}
              />
              <div role="tablist" aria-orientation="vertical" aria-label="Wedding rites" className="space-y-1">
                {RASMEIN.map((item, i) => {
                  const tied = i <= active;
                  const isActive = i === active;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="rasm-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => goTo(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className="group relative flex w-full items-center py-1.5 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -left-8 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 transition-colors duration-500",
                          tied ? "border-ruby bg-ruby" : "border-brass bg-marble-warm"
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-xl transition-colors duration-300",
                          isActive ? "text-ruby" : "text-ink-muted group-hover:text-ink"
                        )}
                      >
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Arch image */}
          <div className="relative col-span-4 aspect-[3/4] w-full">
            {RASMEIN.map((item, i) => (
              <motion.div
                key={item.id}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
                transition={{ duration: 0.7, ease: HOUSE_EASE }}
                aria-hidden={i !== active}
              >
                <ArchFrame src={item.image} alt={item.alt} sizes="30vw" className="h-full w-full" />
              </motion.div>
            ))}
          </div>

          {/* Text */}
          <div id="rasm-panel" role="tabpanel" aria-live="polite" className="col-span-4">
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: HOUSE_EASE }}
            >
              <span className="mb-3 block font-display text-5xl italic tabular-nums text-brass/70">
                0{active + 1}
                <span className="text-2xl"> / 0{RASMEIN.length}</span>
              </span>
              <RasmText r={r} />
            </motion.div>
            <div className="mt-8">
              <GalleryLink />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
