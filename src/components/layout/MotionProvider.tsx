"use client";

import React from "react";
import { MotionConfig } from "motion/react";
import { useMotionAllowed } from "@/lib/landing/motionPreference";

/**
 * Respects the visitor's OS reduced-motion setting across all motion/react primitives
 * (with the dev-only ?motion=full preview override from motionPreference.ts).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const motionAllowed = useMotionAllowed();
  return <MotionConfig reducedMotion={motionAllowed ? "never" : "always"}>{children}</MotionConfig>;
}
