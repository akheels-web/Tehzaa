"use client";

import React, { useEffect, useRef, useState } from "react";
import { type MotionValue, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { useRange } from "@/components/landing/primitives/useRange";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

export interface QissaChapter {
  title: string;
  body: React.ReactNode;
  image?: { src: string; alt: string; credit?: string };
}

function Chapter({ chapter, index, fill }: { chapter: QissaChapter; index: number; fill: MotionValue<number> }) {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLLIElement>(null);
  // The knot ties once the gold thread's fill reaches it (robust to fast scrolls and jumps).
  const threshold = useRef(1);
  const [tied, setTied] = useState(false);
  useEffect(() => {
    const li = ref.current;
    const list = li?.parentElement;
    if (li && list && list.offsetHeight > 0) threshold.current = (li.offsetTop + 12) / list.offsetHeight;
    setTied(fill.get() >= threshold.current);
  }, [fill]);
  useMotionValueEvent(fill, "change", (v) => setTied(v >= threshold.current));
  const isTied = tied || !motionAllowed;
  const flip = index % 2 === 1;

  return (
    <li ref={ref} className="relative grid grid-cols-1 items-center gap-8 pl-10 md:grid-cols-12 md:gap-12 md:pl-14">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[5px] top-2 h-4 w-4 rounded-full border-2 transition-colors duration-500 md:left-[13px]",
          isTied ? "border-ruby bg-ruby" : "border-brass bg-marble"
        )}
      />
      <div className={cn("md:col-span-7", flip && "md:order-2")}>
        <span className="font-display text-4xl italic tabular-nums text-brass/80">0{index + 1}</span>
        <h3 className="mt-1 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-tight text-ink">{chapter.title}</h3>
        <div className="mt-4 max-w-xl font-sans text-[15px] leading-[1.75] text-ink-muted sm:text-[17px]">{chapter.body}</div>
      </div>
      {chapter.image && (
        <motion.figure
          initial={motionAllowed ? { opacity: 0, x: flip ? -40 : 40 } : false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: HOUSE_EASE }}
          className={cn("md:col-span-5", flip && "md:order-1")}
        >
          <ArchFrame
            src={chapter.image.src}
            alt={chapter.image.alt}
            sizes="(max-width: 768px) 80vw, 32vw"
            className="mx-auto aspect-[3/3.8] w-full max-w-[320px]"
          />
          {chapter.image.credit && (
            <figcaption className="mt-3 text-center font-sans text-[10px] text-ink-muted">Photo: {chapter.image.credit}</figcaption>
          )}
        </motion.figure>
      )}
    </li>
  );
}

/**
 * About signature, "Our qissa": the studio's story as chapters strung on a vertical gold
 * thread that fills as you read; each chapter's knot ties ruby and its arch photo slides
 * in. Not pinned. Under reduced motion the thread is full and nothing moves.
 */
export function QissaThread({ chapters }: { chapters: QissaChapter[] }) {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 50%"] });
  const fill = useRange(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative space-y-20 md:space-y-28">
      <span aria-hidden="true" className="absolute bottom-0 left-[12px] top-0 w-0.5 bg-brass/25 md:left-[20px]" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-[12px] top-0 w-0.5 origin-top bg-brass md:left-[20px]"
        style={motionAllowed ? { scaleY: fill } : undefined}
      />
      {chapters.map((c, i) => (
        <Chapter key={c.title} chapter={c} index={i} fill={fill} />
      ))}
    </ol>
  );
}
