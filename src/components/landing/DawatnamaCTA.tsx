"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL, whatsappHref } from "@/lib/contact";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { JaaliLattice } from "./primitives/JaaliLattice";
import { Petals } from "./primitives/Petals";

const RUBY = "#7A1F2B";
const RUBY_DARK = "#5C1F24";
const GOLD = "#B08A4A";

const flap = {
  closed: { rotateX: 0, transition: { duration: 0.6, ease: HOUSE_EASE } },
  open: { rotateX: 180, transition: { duration: 0.9, ease: HOUSE_EASE } },
};
const card = {
  closed: { y: "0%", transition: { duration: 0.5, ease: HOUSE_EASE } },
  open: { y: "-62%", transition: { duration: 0.9, ease: HOUSE_EASE, delay: 0.55 } },
};

/** Scene 07. A ruby dawatnama (invitation) that opens into the call to action. */
export function DawatnamaCTA() {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [open, setOpen] = useState(false);
  // Once the flap has flipped open it tucks behind the card; it comes forward again to close.
  const [flapBehind, setFlapBehind] = useState(false);

  useEffect(() => {
    if (inView) setOpen(true);
  }, [inView]);

  const replay = () => {
    setFlapBehind(false);
    setOpen(false);
    window.setTimeout(() => setOpen(true), 700);
  };

  const state = !motionAllowed || open ? "open" : "closed";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-marble to-marble-warm pb-24 pt-[clamp(16rem,48vw,22rem)] lg:pb-32">
      <JaaliLattice />
      <Petals count={5} />

      <div ref={ref} className="relative mx-auto w-[min(92vw,560px)] [perspective:1200px]">
        <div className="relative aspect-[1/1.25] w-full sm:aspect-[1/0.66]">
          {/* envelope back */}
          <div className="absolute inset-0 shadow-ruby" style={{ background: RUBY }} />

          {/* the invitation card */}
          <motion.div
            variants={card}
            initial={motionAllowed ? "closed" : false}
            animate={state}
            className="absolute left-[4%] top-[6%] z-10 h-[88%] w-[92%] border border-brass/50 bg-marble p-5 text-center outline outline-1 outline-offset-[-8px] outline-brass/40 sm:p-7"
          >
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brass-dark sm:text-[11px]">
              Aapki dawat, hamara intezaam
            </span>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-medium leading-none text-ink">
              Chai pe <span className="italic text-ruby">milenge?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-muted sm:text-[15px]">
              Tell us your dates and your venue. We&apos;ll come to Jubilee Hills with Irani chai and a plan.
            </p>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-ruby px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-marble transition-colors hover:bg-ruby-dark"
              >
                Plan your event
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={whatsappHref("Aadaab! I'd like to plan an event with Tehzaa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-ruby/40 px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ruby transition-colors hover:border-ruby"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
            <a
              href={`tel:${STUDIO_PHONE_TEL}`}
              className="mt-3 inline-flex items-center gap-2 font-sans text-sm tabular-nums text-ink hover:text-ruby"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5 text-brass-dark" />
              {STUDIO_PHONE_DISPLAY}
            </a>
          </motion.div>

          {/* front pocket (V cut) with gold edge */}
          <svg viewBox="0 0 100 64" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden="true">
            <path d="M0 26 L50 46 L100 26 L100 64 L0 64 Z" fill={RUBY_DARK} />
            <path d="M0 26 L50 46 L100 26" fill="none" stroke={GOLD} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <rect x="0.6" y="0.6" width="98.8" height="62.8" fill="none" stroke={GOLD} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* flap */}
          <motion.div
            variants={flap}
            initial={motionAllowed ? "closed" : false}
            animate={state}
            onAnimationComplete={(def) => setFlapBehind(def === "open")}
            style={{ zIndex: flapBehind || !motionAllowed ? 5 : 30 }}
            className="absolute inset-x-0 top-0 h-[62%] origin-top [backface-visibility:visible]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0 0 L100 0 L50 38 Z" fill={RUBY_DARK} />
              <path d="M0 0 L50 38 L100 0" fill="none" stroke={GOLD} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
          </motion.div>

          {/* wax seal: replays the opening */}
          <button
            type="button"
            onClick={replay}
            aria-label="Replay invitation"
            className="absolute bottom-[12%] left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#D9B26A] font-display text-2xl italic text-[#5C1F24] shadow-[0_6px_14px_rgba(40,10,10,0.4)] transition-transform hover:scale-105"
            style={{ background: "radial-gradient(circle at 35% 35%, #E7C27D, #B08A4A 60%, #8A6A34)" }}
          >
            T
          </button>
        </div>
      </div>
    </section>
  );
}
