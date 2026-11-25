"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { FieldGroup } from "@/lib/landing/formProgress";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

/**
 * A gold thread across the top of the contact card: one knot per field group, tying
 * ruby as each group is complete. Announces newly completed groups to screen readers.
 */
export function ThreadProgress({ groups, complete }: { groups: FieldGroup[]; complete: Record<string, boolean> }) {
  const motionAllowed = useMotionAllowed();
  const done = groups.filter((g) => complete[g.id]).length;
  const [announce, setAnnounce] = useState("");
  const prev = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const newly = groups.find((g) => complete[g.id] && !prev.current[g.id]);
    if (newly) setAnnounce(`${newly.label} complete`);
    prev.current = { ...complete };
  }, [complete, groups]);

  return (
    <div className="mb-8">
      <div className="relative mx-3">
        <span aria-hidden="true" className="absolute left-0 right-0 top-[9px] h-0.5 bg-brass/25" />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-[9px] h-0.5 origin-left bg-brass"
          style={{ width: "100%" }}
          initial={false}
          animate={{ scaleX: groups.length > 1 ? Math.min(1, done / (groups.length - 1)) : 0 }}
          transition={{ duration: motionAllowed ? 0.6 : 0, ease: HOUSE_EASE }}
        />
        <ol className="relative flex justify-between">
          {groups.map((g) => {
            const tied = Boolean(complete[g.id]);
            return (
              <li key={g.id} className="flex flex-col items-center gap-2">
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={tied && motionAllowed ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className={cn(
                    "h-5 w-5 rounded-full border-2 transition-colors duration-300",
                    tied ? "border-ruby bg-ruby" : "border-brass bg-white"
                  )}
                />
                <span className={cn("font-sans text-[10px] font-bold uppercase tracking-[0.16em]", tied ? "text-ruby" : "text-ink-muted")}>
                  {g.label}
                  <span className="sr-only">{tied ? " (complete)" : " (not yet complete)"}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
