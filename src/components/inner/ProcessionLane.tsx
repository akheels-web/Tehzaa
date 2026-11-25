"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll } from "motion/react";
import type { ShowcaseItem } from "@/data/showcase";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { DepthJaali } from "@/components/landing/primitives/DepthJaali";
import { SceneHeading } from "@/components/landing/primitives/SceneHeading";
import { useMediaQuery } from "@/components/landing/primitives/useMediaQuery";
import { useRange } from "@/components/landing/primitives/useRange";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { indexFromProgress } from "@/lib/landing/progress";
import { cn } from "@/lib/utils";

const HEADING = {
  kicker: "Full dhamaka entries",
  title: "Here comes",
  italicTail: "the baraat.",
  intro: "Four ways Hyderabad arrives at a wedding, from Old City Tasha-Marfa to a Telugu Pallaki and the bride's Phoolon ki Chadar.",
};

function EntryCard({ item, lead, className }: { item: ShowcaseItem; lead: boolean; className?: string }) {
  return (
    <motion.article
      animate={lead ? { scale: [1, 1.06, 1] } : { scale: 0.94 }}
      transition={{ duration: lead ? 0.5 : 0.4 }}
      className={cn("origin-bottom", className)}
    >
      <ArchFrame src={item.image} alt={item.alt} sizes="300px" className="aspect-[3/3.6] w-full" />
      <span
        className={cn(
          "mt-4 block font-sans text-[10px] font-bold uppercase tracking-[0.22em] transition-colors",
          lead ? "text-ruby" : "text-brass-dark"
        )}
      >
        {lead ? "Now arriving" : item.subtitle}
      </span>
      <h3 className="mt-1 font-display text-2xl font-medium leading-tight text-ink [@media(max-height:780px)]:text-xl">{item.tab}</h3>
      <ul className="mt-2 space-y-1 font-sans text-xs leading-relaxed text-ink-muted [@media(max-height:780px)]:hidden">
        {item.cues.slice(0, 2).map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </motion.article>
  );
}

/**
 * Baraat signature: the four baraat entries march in from the right along a gold road
 * as you scroll; the entry in front gets a drum-beat pulse. Stacked list on small
 * screens and under reduced motion.
 */
export function ProcessionLane({ items }: { items: ShowcaseItem[] }) {
  const motionAllowed = useMotionAllowed();
  const wide = useMediaQuery("(min-width: 768px)");
  return motionAllowed && wide ? <PinnedLane items={items} /> : <StackedLane items={items} />;
}

function StackedLane({ items }: { items: ShowcaseItem[] }) {
  return (
    <section className="relative overflow-hidden bg-marble-warm py-20">
      <DepthJaali />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <SceneHeading {...HEADING} />
        <ol className="relative mt-12 space-y-12 border-l-2 border-brass/60 pl-6">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span aria-hidden="true" className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-2 border-marble bg-ruby" />
              <EntryCard item={item} lead={false} className="max-w-sm" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PinnedLane({ items }: { items: ShowcaseItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowW, setRowW] = useState(1600);
  const [lead, setLead] = useState(0);

  useLayoutEffect(() => {
    const measure = () => rowRef.current && setRowW(rowRef.current.scrollWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const t = useRange(scrollYProgress, [0.05, 0.95], [0, 1]);
  // Row starts just off the right edge (60vw) and ends with its last card at 40vw from the left.
  const x = useMotionTemplate`calc(60vw - ${t} * (${rowW}px + 20vw))`;
  useMotionValueEvent(scrollYProgress, "change", (p) => setLead(indexFromProgress((p - 0.05) / 0.9, items.length)));

  return (
    <section ref={sectionRef} className="relative h-[220svh] bg-marble-warm">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <DepthJaali />
        <div className="relative mx-auto mb-8 w-full max-w-7xl px-8 pt-20">
          <SceneHeading {...HEADING} className="[&_h2]:text-[clamp(2.2rem,4vw,3.6rem)] [@media(max-height:780px)]:[&_p]:hidden" />
        </div>

        <motion.div ref={rowRef} style={{ x }} className="relative flex w-max items-start gap-16 [--card-w:min(22vw,290px,calc((100svh-26rem)/1.2))]">
          {/* the road, along the arch bases (arch height = 1.2 × card width; card width also bounded by viewport height) */}
          <span aria-hidden="true" className="absolute -left-[60vw] -right-[60vw] top-[calc(var(--card-w)*1.2+2px)] h-px bg-brass/80" />
          <span
            aria-hidden="true"
            className="absolute -left-[60vw] -right-[60vw] top-[calc(var(--card-w)*1.2+8px)] h-1 bg-[radial-gradient(circle,#E9A23B_1.5px,transparent_2px)] bg-[length:22px_4px] opacity-70"
          />
          {items.map((item, i) => (
            <EntryCard key={item.id} item={item} lead={i === lead} className="w-[var(--card-w)]" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
