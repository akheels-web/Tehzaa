"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

const RUBY = "#7A1F2B";
const RUBY_DARK = "#5C1F24";
const GOLD = "#B08A4A";

const flapVariants = {
  closed: { rotateX: 0, transition: { duration: 0.6, ease: HOUSE_EASE } },
  open: { rotateX: 180, transition: { duration: 0.9, ease: HOUSE_EASE } },
};
const invitationCard = {
  closed: { y: "0%", transition: { duration: 0.5, ease: HOUSE_EASE } },
  open: { y: "-62%", transition: { duration: 0.9, ease: HOUSE_EASE, delay: 0.55 } },
};
const letterheadCard = {
  closed: { y: 48, opacity: 0, transition: { duration: 0.4, ease: HOUSE_EASE } },
  open: { y: 0, opacity: 1, transition: { duration: 0.9, ease: HOUSE_EASE, delay: 0.5 } },
};

/** Front pocket (V cut) with a gold edge and frame. */
function Pocket() {
  return (
    <svg viewBox="0 0 100 64" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden="true">
      <path d="M0 26 L50 46 L100 26 L100 64 L0 64 Z" fill={RUBY_DARK} />
      <path d="M0 26 L50 46 L100 26" fill="none" stroke={GOLD} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <rect x="0.6" y="0.6" width="98.8" height="62.8" fill="none" stroke={GOLD} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Seal({ onClick, label }: { onClick?: () => void; label: string }) {
  const cls =
    "absolute bottom-[12%] left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#D9B26A] font-display text-2xl italic text-[#5C1F24] shadow-[0_6px_14px_rgba(40,10,10,0.4)]";
  const style = { background: "radial-gradient(circle at 35% 35%, #E7C27D, #B08A4A 60%, #8A6A34)" };
  if (!onClick) {
    return (
      <span aria-hidden="true" className={cls} style={style}>
        T
      </span>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cn(cls, "transition-transform hover:scale-105")} style={style}>
      T
    </button>
  );
}

/**
 * A ruby envelope with a gold-edged flap and wax seal.
 * - `invitation`: a short card rises 62% out of the pocket (homepage dawatnama).
 * - `letterhead`: the envelope sits above; once the flap opens, a tall card (e.g. a form)
 *   rises into place just beneath it.
 * When motion is off, everything renders in its open state with no animation.
 */
export function Envelope({
  open,
  motionAllowed,
  children,
  variant = "invitation",
  className,
  cardClassName,
  onReplay,
  sealLabel = "Replay invitation",
}: {
  open: boolean;
  motionAllowed: boolean;
  children: React.ReactNode;
  variant?: "invitation" | "letterhead";
  className?: string;
  cardClassName?: string;
  onReplay?: () => void;
  sealLabel?: string;
}) {
  // Once the flap has flipped open it tucks behind the card; it comes forward again to close.
  const [flapBehind, setFlapBehind] = useState(false);
  const state = !motionAllowed || open ? "open" : "closed";
  const initial = motionAllowed ? "closed" : false;

  const flap = (
    <motion.div
      variants={flapVariants}
      initial={initial}
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
  );

  const replay = onReplay
    ? () => {
        setFlapBehind(false);
        onReplay();
      }
    : undefined;

  if (variant === "letterhead") {
    return (
      <div className={cn("relative [perspective:1200px]", className)}>
        <div className="relative mx-auto aspect-[1/0.42] w-[min(100%,520px)]">
          <div className="absolute inset-0 shadow-ruby" style={{ background: RUBY }} />
          <Pocket />
          {flap}
          <Seal onClick={replay} label={sealLabel} />
        </div>
        <motion.div variants={letterheadCard} initial={initial} animate={state} className={cn("relative z-30 -mt-10", cardClassName)}>
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("relative [perspective:1200px]", className)}>
      <div className="relative aspect-[1/1.25] w-full sm:aspect-[1/0.66]">
        <div className="absolute inset-0 shadow-ruby" style={{ background: RUBY }} />
        <motion.div
          variants={invitationCard}
          initial={initial}
          animate={state}
          className={cn("absolute left-[4%] top-[6%] z-10 h-[88%] w-[92%]", cardClassName)}
        >
          {children}
        </motion.div>
        <Pocket />
        {flap}
        <Seal onClick={replay} label={sealLabel} />
      </div>
    </div>
  );
}
