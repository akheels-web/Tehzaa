"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useMotionAllowed } from "@/lib/landing/motionPreference";

/**
 * Moves its children at a different rate from the page scroll (and, with `pointer`,
 * a little with the cursor on mouse devices) to build marble-and-photo depth.
 * Positive `speed` drifts up faster than the page; negative lags behind.
 */
export function ParallaxLayer({
  speed,
  children,
  className,
  pointer = false,
}: {
  speed: number;
  children: React.ReactNode;
  className?: string;
  pointer?: boolean;
}) {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const y = useTransform([scrollY, sy], ([a, b]: number[]) => a + b);

  useEffect(() => {
    if (!pointer || !motionAllowed || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set(((e.clientX / window.innerWidth) * 2 - 1) * speed * 12);
      py.set(((e.clientY / window.innerHeight) * 2 - 1) * speed * 12);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer, motionAllowed, speed, px, py]);

  if (!motionAllowed) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y }}>
      {children}
    </motion.div>
  );
}
