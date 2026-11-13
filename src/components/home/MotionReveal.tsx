"use client";

import React from "react";
import { motion } from "motion/react";

interface MotionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Subtle editorial fade-up reveal using motion/react.
 * Uses viewport={{ once: true, amount: "some" }} so tall blocks never stay hidden.
 */
export function MotionReveal({
  children,
  delay = 0,
  className,
}: MotionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
