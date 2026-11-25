"use client";

import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import type { ServiceCategory } from "@/data/services";
import { ArchClipDef } from "@/components/landing/primitives/ArchFrame";
import { useMediaQuery } from "@/components/landing/primitives/useMediaQuery";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

const leafTransition = { duration: 0.9, ease: HOUSE_EASE };
const leftLeaf = { closed: { rotateY: 0 }, open: { rotateY: -76 } };
const rightLeaf = { closed: { rotateY: 0 }, open: { rotateY: 76 } };

/** One ivory door leaf with a carved gold jaali panel and a brass knob. */
function Leaf({ side, pid }: { side: "left" | "right"; pid: string }) {
  return (
    <motion.div
      variants={side === "left" ? leftLeaf : rightLeaf}
      transition={leafTransition}
      className={cn(
        "absolute inset-y-0 w-1/2 bg-[#F6EFE2] [backface-visibility:hidden]",
        side === "left" ? "left-0 origin-left border-r border-brass/50" : "right-0 origin-right border-l border-brass/50"
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 160" preserveAspectRatio="none" className="absolute inset-[12%_14%_8%] h-[80%] w-[72%]">
        <defs>
          <pattern id={`${pid}-${side}`} width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="none" stroke="#B08A4A" strokeOpacity="0.55" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect x="1" y="1" width="58" height="158" fill={`url(#${pid}-${side})`} stroke="#B08A4A" strokeWidth="1" />
      </svg>
      <span
        className={cn(
          "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brass shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
          side === "left" ? "right-2" : "left-2"
        )}
      />
    </motion.div>
  );
}

function Door({ service, index, dimmed }: { service: ServiceCategory; index: number; dimmed: boolean }) {
  const motionAllowed = useMotionAllowed();
  const coarse = useMediaQuery("(pointer: coarse)");
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const clipId = `door-${useId().replace(/:/g, "")}`;
  const clip = { clipPath: `url(#${clipId})` };

  // Mouse/keyboard: doors swing open on hover or focus. Touch: they open as they scroll in.
  const [focused, setFocused] = useState(false);
  const touchOpen = coarse && inView;

  return (
    <motion.li
      animate={{ opacity: dimmed ? 0.35 : 1 }}
      transition={{ duration: 0.4 }}
      className="list-none"
    >
      <motion.div
        initial="closed"
        animate={touchOpen || focused ? "open" : "closed"}
        whileHover="open"
        transition={{ delayChildren: coarse ? index * 0.12 : 0 }}
      >
        <Link
          ref={ref}
          href={`/services/${service.slug}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-brass"
        >
          <div className="relative aspect-[3/4.3] w-full drop-shadow-[0_24px_30px_rgba(92,31,36,0.22)]">
            <ArchClipDef id={clipId} />
            <div className="absolute inset-0 bg-brass/60" style={clip} />
            <div className="absolute inset-px bg-marble" style={clip} />
            <div className="absolute inset-[9px] bg-brass" style={clip} />
            <div className="absolute inset-[11px] overflow-hidden [perspective:900px]" style={clip}>
              <Image src={service.heroImage} alt="" fill sizes="(max-width: 768px) 80vw, 20vw" className="object-cover" />
              {motionAllowed && (
                <>
                  <Leaf side="left" pid={clipId} />
                  <Leaf side="right" pid={clipId} />
                </>
              )}
            </div>
          </div>
          <span className="mt-5 block font-sans text-[10px] font-bold tracking-[0.24em] text-brass-dark">
            0{index + 1} / 05
          </span>
          <h3 className="mt-1 font-display text-2xl font-medium leading-tight text-ink group-hover:text-ruby group-focus-visible:text-ruby">
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-ink-muted">{service.shortDescription}</p>
        </Link>
      </motion.div>
    </motion.li>
  );
}

/**
 * The five services as arched double doors. Ivory leaves with gold jaali swing open on
 * hover or keyboard focus (or as they scroll in on touch screens) to reveal the service.
 * With motion off, the doors are shown open (no leaves).
 */
export function DarbarDoors({
  services,
  isDimmed = () => false,
}: {
  services: ServiceCategory[];
  isDimmed?: (s: ServiceCategory) => boolean;
}) {
  return (
    <ul aria-label="Our five services" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
      {services.map((s, i) => (
        <Door key={s.slug} service={s} index={i} dimmed={isDimmed(s)} />
      ))}
    </ul>
  );
}
