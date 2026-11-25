"use client";

import React from "react";
import { motion } from "motion/react";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { cn } from "@/lib/utils";

const word = {
  hidden: { y: "105%" },
  shown: { y: "0%" },
};

function Words({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={word}
            transition={{ duration: 0.8, ease: HOUSE_EASE, delay: delayOffset + i * 0.06 }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/**
 * Heading whose words rise one by one from a hairline, like gold thread being
 * pulled through zardozi. The optional `italicTail` sets one ruby italic line.
 */
export function RevealTitle({
  as = "h2",
  children,
  italicTail,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: string;
  italicTail?: string;
  className?: string;
}) {
  const motionAllowed = useMotionAllowed();
  const classes = cn("font-display font-medium tracking-[-0.02em] text-ink", className);

  // Reduced motion (and the server render): plain heading, fully visible.
  if (!motionAllowed) {
    const Static = as;
    return (
      <Static className={classes}>
        {children}
        {italicTail && <span className="block italic text-ruby">{italicTail}</span>}
      </Static>
    );
  }

  const Tag = motion[as];
  const headWords = children.split(" ").length;
  return (
    <Tag
      className={classes}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <Words text={children} />
      {italicTail && (
        <span className="block italic text-ruby">
          <Words text={italicTail} delayOffset={headWords * 0.06 + 0.1} />
        </span>
      )}
    </Tag>
  );
}
