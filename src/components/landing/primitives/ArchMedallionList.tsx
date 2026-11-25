"use client";

import React from "react";
import { motion } from "motion/react";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

/** Small gold Deccani arch holding a numeral. */
function Medallion({ n }: { n: number }) {
  return (
    <span className="relative flex h-[72px] w-14 flex-none items-end justify-center pb-3">
      <svg viewBox="0 0 56 72" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M2 70 V30 C2 16 16 8 25 5 Q28 4 28 1 Q28 4 31 5 C40 8 54 16 54 30 V70 Z"
          fill="rgba(176,138,74,0.08)"
          stroke="#B08A4A"
          strokeWidth="1.2"
        />
        <path d="M7 70 V32 C7 21 18 13 28 9 C38 13 49 21 49 32 V70" fill="none" stroke="#B08A4A" strokeOpacity="0.45" />
      </svg>
      <span className="relative font-display text-2xl italic tabular-nums text-ruby">{String(n).padStart(2, "0")}</span>
    </span>
  );
}

/** Numbered promises/values as gold arch medallions with a staggered reveal. */
export function ArchMedallionList({
  items,
  columns = 3,
  className,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={cn("grid gap-x-10 gap-y-10", cols, className)}>
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: HOUSE_EASE, delay: i * 0.05 }}
          className="flex gap-5"
        >
          <Medallion n={i + 1} />
          <div className="pt-1">
            <h3 className="font-display text-2xl font-medium leading-tight text-ink">{item.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
