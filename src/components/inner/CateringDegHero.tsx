"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowDown, RotateCcw } from "lucide-react";
import { DegIllustration } from "@/components/landing/DegIllustration";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

/**
 * Catering hero visual: the copper deg. Tap it (or the pill) to break the dum; once open,
 * a "Choose your kitchen" link jumps to the menu explorer. Steam only runs while open,
 * on screen, and with motion allowed.
 */
export function CateringDegHero({ menuAnchor }: { menuAnchor: string }) {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[420px] text-center">
      {/* Pointer target; the pill below is the keyboard control. */}
      <motion.button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        onPanEnd={(_, info) => {
          if (!open && info.offset.y < -40) setOpen(true);
        }}
        className="block w-full cursor-pointer touch-pan-y"
      >
        <DegIllustration open={open} steaming={open && motionAllowed && inView} />
      </motion.button>

      <div className="mt-2 flex flex-col items-center gap-3">
        <button
          type="button"
          aria-pressed={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] transition-colors",
            open ? "border border-ruby/40 text-ruby hover:bg-ruby hover:text-marble" : "bg-ruby text-marble hover:bg-ruby-dark"
          )}
        >
          {open && <RotateCcw aria-hidden="true" className="h-4 w-4" />}
          {open ? "Reset dum" : "Break the dum"}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.a
              key="kitchen"
              href={`#${menuAnchor}`}
              initial={motionAllowed ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: HOUSE_EASE, delay: motionAllowed ? 0.4 : 0 }}
              className="inline-flex items-center gap-2 font-display text-xl italic text-ruby underline decoration-brass underline-offset-4"
            >
              Choose your kitchen
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
