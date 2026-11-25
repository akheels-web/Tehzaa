"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useMotionValue } from "motion/react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { useMediaQuery } from "@/components/landing/primitives/useMediaQuery";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

const GAP = 28;

function Frame({ item, onClickCapture }: { item: GalleryItem; onClickCapture?: (e: React.MouseEvent) => void }) {
  return (
    <li className="w-[min(70vw,300px)] flex-none snap-start">
      <Link
        href={`/gallery?category=${encodeURIComponent(item.category)}`}
        onClickCapture={onClickCapture}
        draggable={false}
        className="group block select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-brass"
      >
        <ArchFrame src={item.image} alt={item.title} sizes="300px" className="pointer-events-none aspect-[3/4] w-full" />
        <h3 className="mt-4 font-display text-xl font-medium leading-snug text-ink group-hover:text-ruby">{item.title}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 font-sans text-xs text-ink-muted">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-ruby" />
          {item.venue}
        </p>
      </Link>
    </li>
  );
}

/**
 * Real setups as arch-framed photos on a strip you can drag (with momentum), step with
 * the arrow buttons, or move with ArrowLeft/ArrowRight when the strip has focus.
 * Under reduced motion (or on touch screens) it is a native scroll-snap row.
 */
export function SetupsFilmstrip({ items, label = "Real setups" }: { items: GalleryItem[]; label?: string }) {
  const motionAllowed = useMotionAllowed();
  const fine = useMediaQuery("(pointer: fine)");
  const draggable = motionAllowed && fine;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const dragged = useRef(false);

  useLayoutEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const tr = trackRef.current;
      if (vp && tr) setMaxDrag(Math.max(0, tr.scrollWidth - vp.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  const frameWidth = () => (trackRef.current?.querySelector("li")?.getBoundingClientRect().width ?? 300) + GAP;

  const step = (dir: 1 | -1) => {
    if (draggable) {
      const next = Math.min(0, Math.max(-maxDrag, x.get() - dir * frameWidth()));
      animate(x, next, { duration: 0.6, ease: HOUSE_EASE });
    } else {
      viewportRef.current?.scrollBy({ left: dir * frameWidth(), behavior: motionAllowed ? "smooth" : "auto" });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  // A click right after a drag shouldn't navigate.
  const suppressClickAfterDrag = (e: React.MouseEvent) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous setup"
          className="flex h-11 w-11 items-center justify-center border border-brass/50 text-ruby transition-colors hover:border-ruby hover:bg-ruby hover:text-marble"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next setup"
          className="flex h-11 w-11 items-center justify-center border border-brass/50 text-ruby transition-colors hover:border-ruby hover:bg-ruby hover:text-marble"
        >
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label={`${label}: use the arrow keys to move`}
        onKeyDown={onKeyDown}
        className={cn(
          "-mx-5 px-5 pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass sm:-mx-8 sm:px-8",
          draggable ? "cursor-grab overflow-hidden active:cursor-grabbing" : "snap-x snap-mandatory overflow-x-auto"
        )}
      >
        <motion.ul
          ref={trackRef}
          drag={draggable ? "x" : false}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          style={{ ...(draggable ? { x } : {}), gap: GAP }}
          onDragStart={() => (dragged.current = false)}
          onDrag={(_, info) => {
            if (Math.abs(info.offset.x) > 6) dragged.current = true;
          }}
          className="flex w-max"
        >
          {items.map((item) => (
            <Frame key={item.id} item={item} onClickCapture={suppressClickAfterDrag} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
