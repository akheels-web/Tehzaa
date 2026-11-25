"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ArchClipDef, ArchFrame } from "./primitives/ArchFrame";
import { JaaliLattice } from "./primitives/JaaliLattice";
import { Petals } from "./primitives/Petals";
import { RevealTitle } from "./primitives/RevealTitle";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { indexFromProgress } from "@/lib/landing/progress";
import { useRange } from "./primitives/useRange";
import { creditForImage } from "@/lib/landing/credits";

const PORTAL_VIEWS = [
  { src: "/images/real-falaknuma-palace.webp", name: "Taj Falaknuma Palace", alt: "Taj Falaknuma Palace's white Palladian facade and marble staircase in Hyderabad" },
  { src: "/images/real-charminar.webp", name: "Charminar", alt: "Charminar's four minarets and stucco arches in Hyderabad's Old City" },
  { src: "/images/real-chowmahalla-palace.webp", name: "Chowmahalla Palace", alt: "Khilwat Mubarak at Chowmahalla Palace with its cream scalloped arches" },
];

const TITLE = "A Nizam's welcome,";
const TAIL = "for your wedding.";
const SIDE_LINE = "Palaces, dum ki biryani and full dhamaka baraats, planned end to end.";

function HeroCopy({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="mb-4 block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ruby sm:text-xs">
        Jubilee Hills · Hyderabad
      </span>
      <RevealTitle as="h1" italicTail={TAIL} className="text-[clamp(3rem,7vw,6.5rem)] leading-[0.92]">
        {TITLE}
      </RevealTitle>
    </div>
  );
}

function HeroActions({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 max-w-xs font-sans text-[15px] leading-[1.65] text-ink-muted">{SIDE_LINE}</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#darbars"
          className="inline-flex items-center gap-2.5 bg-ruby px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-marble transition-colors hover:bg-ruby-dark"
        >
          Enter the Darbar
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
        </a>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-2 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink underline decoration-brass decoration-1 underline-offset-[6px] hover:text-ruby"
        >
          Plan your event
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

/** Static layout for reduced motion (and the server render). */
function StaticHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-marble to-marble-warm pb-20 pt-32 lg:pt-40">
      <JaaliLattice />
      <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <HeroCopy />
          <HeroActions />
        </div>
        <ArchFrame
          src={PORTAL_VIEWS[0].src}
          alt={PORTAL_VIEWS[0].alt}
          priority
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="mx-auto aspect-[3/4.2] w-full max-w-[420px] lg:col-span-5"
        />
        <p className="text-center font-sans text-[10px] text-ink-muted lg:col-span-5 lg:col-start-8">
          Photo: {creditForImage(PORTAL_VIEWS[0].src)}
        </p>
      </div>
    </section>
  );
}

/**
 * Scene 01. A Deccani arch on ivory marble that, as you scroll, opens like a
 * palace doorway until the palace fills the screen: Falaknuma, then Charminar,
 * then Chowmahalla.
 */
export function ArchPortalHero() {
  const motionAllowed = useMotionAllowed();
  if (!motionAllowed) return <StaticHero />;
  return <PortalHero />;
}

function PortalHero() {
  const ref = useRef<HTMLElement>(null);
  const clipId = "hero-portal-arch";

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Arch grows from a doorway to the full screen. Geometry is CSS (vw/svh + per-breakpoint
  // start variables on the section), so the server HTML is already right on every device.
  const grow = useRange(scrollYProgress, [0.08, 0.8], [0, 1]);
  const archW = useMotionTemplate`calc(var(--arch-w0) + (102vw - var(--arch-w0)) * ${grow})`;
  const archH = useMotionTemplate`calc(var(--arch-h0) + (102svh - var(--arch-h0)) * ${grow})`;
  const archTop = useMotionTemplate`calc(var(--arch-top0) + (50svh - var(--arch-top0)) * ${grow})`;

  // Palace views cross-fade inside the arch; the last one dissolves to full-bleed.
  const charminarOpacity = useRange(scrollYProgress, [0.3, 0.42], [0, 1]);
  const chowmahallaOpacity = useRange(scrollYProgress, [0.58, 0.7], [0, 1]);
  const fullBleedOpacity = useRange(scrollYProgress, [0.78, 0.9], [0, 1]);

  // Copy steps aside as the doorway opens.
  const copyOpacity = useRange(scrollYProgress, [0.06, 0.28], [1, 0]);
  // Faded-out copy must not stay focusable (Shift+Tab back from scene 02 would land on invisible links).
  const [copyHidden, setCopyHidden] = useState(false);
  useMotionValueEvent(copyOpacity, "change", (o) => setCopyHidden(o < 0.05));
  const copyY = useRange(scrollYProgress, [0.06, 0.28], [0, -40]);
  const cueOpacity = useRange(scrollYProgress, [0, 0.05], [1, 0]);

  // Floating photos drift outward and away.
  const drift = useRange(scrollYProgress, [0, 0.5], [0, 1]);
  const leftX = useMotionTemplate`calc(${drift} * -25vw)`;
  const rightX = useMotionTemplate`calc(${drift} * 25vw)`;
  const floatY = useMotionTemplate`calc(${drift} * -20svh)`;
  const floatOpacity = useRange(scrollYProgress, [0.25, 0.5], [1, 0]);

  // Cursor tilt on mouse devices.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(px, { stiffness: 50, damping: 16 });
  const tiltY = useSpring(py, { stiffness: 50, damping: 16 });
  const nearX = useTransform(tiltX, (v) => v * 18);
  const nearY = useTransform(tiltY, (v) => v * 14);
  const farX = useTransform(tiltX, (v) => v * -8);
  const farY = useTransform(tiltY, (v) => v * -6);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  const [viewIndex, setViewIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setViewIndex(indexFromProgress((p - 0.08) / 0.84, 3));
  });

  const clip = { clipPath: `url(#${clipId})` };

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[200svh] [--arch-h0:min(calc(56vw*1.42),34svh)] [--arch-top0:32svh] [--arch-w0:56vw] md:h-[250svh] md:[--arch-h0:min(calc(min(28vw,330px)*1.42),60svh)] md:[--arch-top0:54svh] md:[--arch-w0:min(28vw,330px)]"
    >
      <ArchClipDef id={clipId} />
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-gradient-to-b from-marble to-marble-warm">
        <JaaliLattice />
        <Petals count={7} />

        {/* Floating photos at two depths */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[4%] top-[18%] hidden w-[clamp(120px,12vw,180px)] md:block"
          style={{ x: leftX, y: floatY, opacity: floatOpacity }}
        >
          <motion.div style={{ x: nearX, y: nearY, rotate: -6 }} className="border-[5px] border-white bg-white shadow-ruby">
            <div className="relative aspect-[4/5]">
              <Image src="/images/hyd-muslim-dawat-spread.webp" alt="" fill sizes="180px" className="object-cover" />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="absolute right-[5%] top-[14%] hidden w-[clamp(110px,10.5vw,160px)] md:block"
          style={{ x: rightX, y: floatY, opacity: floatOpacity }}
        >
          <motion.div style={{ x: farX, y: farY, rotate: 5 }} className="border-[5px] border-white bg-white shadow-ruby">
            <div className="relative aspect-[4/5]">
              <Image src="/images/floral-mandap-indian.webp" alt="" fill sizes="160px" className="object-cover" />
            </div>
          </motion.div>
        </motion.div>

        {/* The portal arch */}
        <motion.div
          className="absolute left-1/2 z-10"
          style={{ width: archW, height: archH, top: archTop, x: "-50%", y: "-50%" }}
        >
          <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
            <div className="absolute inset-0 bg-brass/60" style={clip} />
            <div className="absolute inset-px bg-marble" style={clip} />
            <div className="absolute inset-[10px] bg-brass" style={clip} />
            <div className="absolute inset-[12px] overflow-hidden bg-marble-warm" style={clip}>
              <Image src={PORTAL_VIEWS[0].src} alt={PORTAL_VIEWS[0].alt} fill priority sizes="100vw" className="object-cover" />
              <motion.div className="absolute inset-0" style={{ opacity: charminarOpacity }}>
                <Image src={PORTAL_VIEWS[1].src} alt={PORTAL_VIEWS[1].alt} fill sizes="100vw" className="object-cover object-[center_30%]" />
              </motion.div>
              <motion.div className="absolute inset-0" style={{ opacity: chowmahallaOpacity }}>
                <Image src={PORTAL_VIEWS[2].src} alt={PORTAL_VIEWS[2].alt} fill sizes="100vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A1A14]/60 to-transparent px-4 pb-3 pt-10 text-center">
                <span key={viewIndex} className="whitespace-nowrap font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-marble sm:text-[10px] sm:tracking-[0.24em]">
                  {PORTAL_VIEWS[viewIndex].name}
                </span>
                <span className="mt-0.5 block truncate font-sans text-[8px] text-marble/80">
                  Photo: {creditForImage(PORTAL_VIEWS[viewIndex].src)}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* The arch dissolves into a full-bleed palace view */}
        <motion.div aria-hidden="true" className="absolute inset-0 z-20" style={{ opacity: fullBleedOpacity }}>
          <Image src={PORTAL_VIEWS[2].src} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A14]/55 via-transparent to-transparent" />
          <span className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display text-[clamp(1.5rem,3vw,2.5rem)] italic text-marble">
            Chowmahalla Palace, Old City
            <span className="mt-1 block text-center font-sans text-[10px] not-italic text-marble/80">
              Photo: {creditForImage(PORTAL_VIEWS[2].src)}
            </span>
          </span>
        </motion.div>

        {/* Copy */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-10 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-14"
          style={{ opacity: copyOpacity, y: copyY }}
          inert={copyHidden || undefined}
        >
          <HeroCopy className="max-w-[min(92vw,640px)] md:max-w-[46%]" />
          <HeroActions className="md:max-w-[30%] md:text-right [&>div]:md:justify-end [&>p]:md:ml-auto" />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-28 z-30 hidden -translate-x-1/2 text-center md:block"
          style={{ opacity: cueOpacity }}
        >
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brass-dark">
            Scroll to enter
          </span>
          <span className="mx-auto mt-2 block h-8 w-px origin-top animate-pulse bg-brass" />
        </motion.div>
      </div>
    </section>
  );
}
