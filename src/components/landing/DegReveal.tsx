"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { DegIllustration } from "./DegIllustration";
import { DepthJaali } from "./primitives/DepthJaali";
import { SceneHeading } from "./primitives/SceneHeading";
import { getDegMenus, type DegMenuKey } from "@/lib/landing/menus";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { ParallaxLayer } from "./primitives/ParallaxLayer";
import { cn } from "@/lib/utils";

const KEYS: DegMenuKey[] = ["dawat", "vindhu", "veg"];

/** Scene 04. Break the dum on a copper deg and the wedding menu spills out. */
export function DegReveal() {
  const menus = useMemo(() => getDegMenus(), []);
  const [open, setOpen] = useState(false);
  const motionAllowed = useMotionAllowed();
  const degRef = useRef<HTMLDivElement>(null);
  const degInView = useInView(degRef, { amount: 0.2 });
  const [tab, setTab] = useState<DegMenuKey>("dawat");
  const tabRefs = useRef<Record<DegMenuKey, HTMLButtonElement | null>>({ dawat: null, vindhu: null, veg: null });

  const onTabKey = (e: React.KeyboardEvent, current: DegMenuKey) => {
    const i = KEYS.indexOf(current);
    const next =
      e.key === "ArrowRight" ? KEYS[(i + 1) % KEYS.length]
      : e.key === "ArrowLeft" ? KEYS[(i - 1 + KEYS.length) % KEYS.length]
      : e.key === "Home" ? KEYS[0]
      : e.key === "End" ? KEYS[KEYS.length - 1]
      : null;
    if (!next) return;
    e.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-marble to-marble-warm py-24 lg:py-32">
      <DepthJaali />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* The deg (mid depth plane) */}
        <ParallaxLayer speed={0.18} className="lg:col-span-5">
          <div ref={degRef}>
          {/* Pointer target (tap or lift the lid); the pill button below is the keyboard control. */}
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen((o) => !o)}
            onPanEnd={(_, info) => {
              if (!open && info.offset.y < -40) setOpen(true);
            }}
            className="group relative mx-auto block w-full max-w-[420px] cursor-pointer touch-pan-y"
          >
            <DegIllustration open={open} steaming={open && motionAllowed && degInView} />
          </motion.button>
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] transition-colors",
                open ? "border border-ruby/40 text-ruby hover:bg-ruby hover:text-marble" : "bg-ruby text-marble hover:bg-ruby-dark"
              )}
              aria-pressed={open}
              aria-controls="deg-menu"
            >
              {open ? <RotateCcw aria-hidden="true" className="h-4 w-4" /> : null}
              {open ? "Reset dum" : "Break the dum"}
            </button>
          </div>
          {!open && (
            <p className="mt-3 text-center font-sans text-xs text-ink-muted">Tap the deg, or lift its lid upward.</p>
          )}
          </div>
        </ParallaxLayer>

        {/* The menu */}
        <div className="lg:col-span-7">
          <SceneHeading
            kicker="Dil se Dawat"
            title="Break the dum,"
            italicTail="the dawat begins."
            intro="Coal-dum biryani khansamas and banana-leaf Vindhu cooks, in separate kitchens. Open the deg to see what's cooking."
          />

          <div role="tablist" aria-label="Menus" className="mt-8 flex flex-wrap gap-2 border-b border-brass/30">
            {KEYS.map((k) => (
              <button
                key={k}
                ref={(el) => {
                  tabRefs.current[k] = el;
                }}
                role="tab"
                id={`deg-tab-${k}`}
                aria-selected={tab === k}
                aria-controls="deg-menu"
                tabIndex={tab === k ? 0 : -1}
                onClick={() => setTab(k)}
                onKeyDown={(e) => onTabKey(e, k)}
                className={cn(
                  "-mb-px border-b-2 px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] transition-colors",
                  tab === k ? "border-ruby text-ruby" : "border-transparent text-ink-muted hover:text-ink"
                )}
              >
                {menus[k].label}
              </button>
            ))}
          </div>

          <div id="deg-menu" role="tabpanel" aria-labelledby={`deg-tab-${tab}`} className="mt-6 min-h-[340px]">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.ul key={tab} className="grid gap-3 sm:grid-cols-2" initial="hidden" animate="shown" exit="gone">
                  {menus[tab].dishes.map((d, i) => (
                    <motion.li
                      key={d.name}
                      variants={{
                        hidden: { opacity: 0, x: -60, y: 24, rotate: -4 },
                        shown: { opacity: 1, x: 0, y: 0, rotate: 0 },
                        gone: { opacity: 0, y: -10 },
                      }}
                      transition={{ duration: 0.55, ease: HOUSE_EASE, delay: i * 0.05 }}
                      className="border border-brass/30 bg-white/70 p-4 shadow-[0_10px_24px_-16px_rgba(92,31,36,0.35)]"
                    >
                      <div className="flex items-start gap-2">
                        {d.veg && (
                          <span className="mt-1.5 inline-flex h-3 w-3 flex-none items-center justify-center border border-emerald-600" title="Vegetarian">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                            <span className="sr-only">Vegetarian</span>
                          </span>
                        )}
                        <h3 className="font-display text-lg font-semibold leading-snug text-ink">{d.name}</h3>
                      </div>
                      <p className="mt-1.5 line-clamp-2 font-sans text-[13px] leading-relaxed text-ink-muted">{d.note}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="sealed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[340px] items-center justify-center border border-dashed border-brass/40 p-8 text-center"
                >
                  <p className="font-display text-2xl italic text-ink-muted">
                    The deg is still on dum.
                    <span className="mt-2 block font-sans text-sm not-italic">Break the seal to see the {menus[tab].label} menu.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/services/catering"
            className="group mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink underline decoration-brass underline-offset-[6px] hover:text-ruby"
          >
            See full menus
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
