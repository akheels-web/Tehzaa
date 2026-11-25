"use client";

import React, { useEffect, useRef } from "react";
import { useMotionAllowed } from "@/lib/landing/motionPreference";

// Fixed, hand-placed values (no Math.random) so server and client render identically.
const PETALS = [
  { left: "8%", dur: 11, delay: -2, size: 11, sway: 30 },
  { left: "21%", dur: 14, delay: -9, size: 9, sway: -24 },
  { left: "37%", dur: 12, delay: -5, size: 12, sway: 36 },
  { left: "52%", dur: 15, delay: -12, size: 8, sway: -30 },
  { left: "66%", dur: 13, delay: -3, size: 10, sway: 26 },
  { left: "78%", dur: 16, delay: -7, size: 12, sway: -34 },
  { left: "88%", dur: 12, delay: -10, size: 9, sway: 22 },
  { left: "95%", dur: 14, delay: -1, size: 10, sway: -20 },
];

/**
 * Rose petals drifting down (CSS only, at most 8). Paused while off-screen;
 * not rendered at all under reduced motion.
 */
export function Petals({ count = 6 }: { count?: number }) {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.style.setProperty("--petal-state", entry.isIntersecting ? "running" : "paused");
    });
    io.observe(el);
    return () => io.disconnect();
  }, [motionAllowed]);

  if (!motionAllowed) return null;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.slice(0, Math.min(count, 8)).map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-8 block rounded-[60%_0_60%_0] bg-petal"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.35,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              "--sway": `${p.sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
