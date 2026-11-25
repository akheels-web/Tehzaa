"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { ArchFrame } from "./primitives/ArchFrame";
import { JaaliLattice } from "./primitives/JaaliLattice";
import { SceneHeading } from "./primitives/SceneHeading";
import { useRange } from "./primitives/useRange";
import { useMediaQuery } from "./primitives/useMediaQuery";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { indexFromProgress } from "@/lib/landing/progress";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

const HEADING = {
  kicker: "Paanch Darbar",
  title: "Five doors,",
  italicTail: "one celebration.",
  intro: "Decor, dawat, baraat, corporate galas and family functions. Walk through each darbar; every door opens onto a team that does only that.",
};

const count = (n: number) => `0${n + 1} / 0${SERVICES.length}`;

/** Scene 03. The five services as arched doorways in a gallery you walk through. */
export function DarbarsGallery() {
  const motionAllowed = useMotionAllowed();
  const wide = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  return motionAllowed && wide ? <PinnedGallery /> : <SnapGallery />;
}

function SnapGallery() {
  return (
    <section id="darbars" className="relative overflow-hidden bg-marble py-24">
      <JaaliLattice />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SceneHeading {...HEADING} />
      </div>
      <ul className="relative mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:px-8 [scrollbar-width:none]">
        {SERVICES.map((s, i) => (
          <li key={s.slug} className="w-[78vw] max-w-[340px] flex-none snap-center">
            <Link href={`/services/${s.slug}`} className="group block focus-visible:outline-none">
              <ArchFrame src={s.heroImage} alt={s.title} sizes="78vw" className="aspect-[3/4] w-full" />
              <span className="mt-5 block font-sans text-[10px] font-bold tracking-[0.24em] text-brass-dark">{count(i)}</span>
              <h3 className="mt-1 font-display text-2xl font-medium text-ink group-hover:text-ruby group-focus-visible:text-ruby">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-ink-muted">{s.shortDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PinnedGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useRange(scrollYProgress, [0.04, 0.96], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (p) =>
    setActive(indexFromProgress((p - 0.04) / 0.92, SERVICES.length))
  );

  return (
    <section
      ref={sectionRef}
      id="darbars"
      className="relative bg-marble"
      style={{ height: `${SERVICES.length * 70 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <JaaliLattice />
        <div className="relative mx-auto mb-6 flex w-full max-w-7xl items-end justify-between gap-8 px-8 pt-20">
          <SceneHeading {...HEADING} className="[&_h2]:text-[clamp(2.2rem,4vw,3.6rem)] [&_p]:max-w-md [&_p]:text-[15px]" />
          <span className="hidden font-display text-6xl italic tabular-nums text-brass/70 lg:block" aria-hidden="true">
            {count(active)}
          </span>
        </div>

        <motion.ul ref={trackRef} style={{ x }} className="relative flex w-max gap-[4vw] px-[8vw]">
          {SERVICES.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.slug} className="w-[min(19vw,270px)] flex-none">
                <Link href={`/services/${s.slug}`} className="group block focus-visible:outline-none">
                  <motion.div
                    animate={{ scale: isActive ? 1.06 : 0.94, opacity: isActive ? 1 : 0.7 }}
                    transition={{ duration: 0.6, ease: HOUSE_EASE }}
                    className={cn(
                      "origin-bottom transition-[filter] duration-500",
                      isActive && "[filter:drop-shadow(0_0_26px_rgba(176,138,74,0.55))]"
                    )}
                  >
                    <ArchFrame
                      src={s.heroImage}
                      alt={s.title}
                      sizes="320px"
                      className="aspect-[3/4] w-full group-focus-visible:[filter:drop-shadow(0_0_0_2px_#B08A4A)]"
                    />
                  </motion.div>
                  <div className={cn("mt-4 transition-opacity duration-500", isActive ? "opacity-100" : "opacity-60")}>
                    <span className="block font-sans text-[10px] font-bold tracking-[0.24em] text-brass-dark">{count(i)}</span>
                    <h3 className="mt-1 flex items-start justify-between gap-3 font-display text-[1.65rem] font-medium leading-tight text-ink group-hover:text-ruby group-focus-visible:text-ruby">
                      {s.title}
                      <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-brass transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p
                      className={cn(
                        "mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-ink-muted transition-opacity duration-500",
                        !isActive && "opacity-0"
                      )}
                    >
                      {s.shortDescription}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
