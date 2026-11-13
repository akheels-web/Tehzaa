"use client";

import React from "react";
import { MotionConfig } from "motion/react";

/**
 * Respects the visitor's OS reduced-motion setting across all motion/react primitives.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

