"use client";

import { type MotionValue, useTransform } from "motion/react";
import { mapRange } from "@/lib/landing/progress";

/**
 * Scroll-linked clamped range as a *function* transform. Motion does not
 * hardware-accelerate function transforms, which keeps them in step with Lenis and
 * the section's own scroll offsets (accelerated opacity ran on a different range).
 */
export function useRange(value: MotionValue<number>, input: [number, number], output: [number, number]) {
  return useTransform(value, (v) => mapRange(v, input, output));
}
