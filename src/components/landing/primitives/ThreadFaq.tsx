"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { cn } from "@/lib/utils";

/**
 * FAQs strung on a vertical gold thread. Each question is a native <details>/<summary>
 * (keyboard and screen-reader behaviour for free); its knot ties ruby when open and the
 * answer eases open (instantly when motion is off).
 */
export function ThreadFaq({
  items,
  id,
  className,
}: {
  items: { q: string; a: React.ReactNode }[];
  id?: string;
  className?: string;
}) {
  const motionAllowed = useMotionAllowed();
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());

  return (
    <div id={id} className={cn("relative pl-8", className)}>
      <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-brass/40" />
      {items.map((item, i) => {
        const open = openSet.has(i);
        return (
          <details
            key={item.q}
            open={open}
            onToggle={(e) => {
              const isOpen = (e.currentTarget as HTMLDetailsElement).open;
              setOpenSet((prev) => {
                const next = new Set(prev);
                if (isOpen) next.add(i);
                else next.delete(i);
                return next;
              });
            }}
            className="group relative border-b border-brass/25 py-1"
          >
            <summary className="relative flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-display text-xl font-medium text-ink marker:hidden hover:text-ruby [&::-webkit-details-marker]:hidden">
              {/* knot lives in <summary> so it shows while the item is closed */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-8 top-[1.2rem] h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300",
                  open ? "border-ruby bg-ruby" : "border-brass bg-marble"
                )}
              />
              {item.q}
              <Plus
                aria-hidden="true"
                className={cn("mt-1 h-4 w-4 flex-none text-brass transition-transform duration-300", open && "rotate-45 text-ruby")}
              />
            </summary>
            {/* Always rendered (in the HTML for crawlers and find-in-page); eases open. */}
            <motion.div
              initial={false}
              animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: motionAllowed ? 0.4 : 0, ease: HOUSE_EASE }}
              className="overflow-hidden"
            >
              <div className="pb-5 pr-8 font-sans text-[15px] leading-relaxed text-ink-muted">{item.a}</div>
            </motion.div>
          </details>
        );
      })}
    </div>
  );
}
