import React from "react";
import { RevealTitle } from "./RevealTitle";
import { cn } from "@/lib/utils";

/** Kicker + word-reveal title + intro, shared by scenes 02–07. */
export function SceneHeading({
  kicker,
  title,
  italicTail,
  intro,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  italicTail?: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span className="mb-4 block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brass-dark sm:text-xs">
        {kicker}
      </span>
      <RevealTitle className="text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.98]" italicTail={italicTail}>
        {title}
      </RevealTitle>
      {intro && (
        <p className="mt-5 font-sans text-[15px] leading-[1.7] text-ink-muted sm:text-[17px]">{intro}</p>
      )}
    </div>
  );
}
