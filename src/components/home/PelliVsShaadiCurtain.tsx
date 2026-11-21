"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive draggable split-curtain comparing Telugu Pelli Mandapam decor
 * on the left with Chowmahalla Palace Hyderabadi Nikkah & Walima on the right.
 */
export function PelliVsShaadiCurtain() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, Math.round(rawPct)));
    setPosition(clamped);
  };

  return (
    <div className="space-y-4">
      {/* Sharp Architectural Snap Selector + Drag Cue */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Quick compare Telugu Pelli and Muslim Shaadi stages"
          className="inline-flex items-center border border-stone-line bg-silk p-1 rounded-[2px]"
        >
          <button
            type="button"
            onClick={() => setPosition(85)}
            className={cn(
              "px-4 py-2 rounded-[2px] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer",
              position > 65
                ? "bg-obsidian text-alabaster"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Telugu Pelli
          </button>
          <button
            type="button"
            onClick={() => setPosition(50)}
            className={cn(
              "px-4 py-2 rounded-[2px] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer tabular-nums",
              position >= 35 && position <= 65
                ? "bg-obsidian text-alabaster"
                : "text-ink-muted hover:text-ink"
            )}
          >
            50 / 50 Split
          </button>
          <button
            type="button"
            onClick={() => setPosition(15)}
            className={cn(
              "px-4 py-2 rounded-[2px] text-[11px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer",
              position < 35
                ? "bg-obsidian text-alabaster"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Muslim Shaadi
          </button>
        </div>

        <span className="text-xs font-sans text-ink-muted flex items-center gap-2">
          <MoveHorizontal aria-hidden="true" className="w-3.5 h-3.5 text-brass-dark" />
          Drag the brass divider to compare both styles!
        </span>
      </div>

      {/* Sharp Architectural Split-Curtain Frame */}
      <div
        ref={containerRef}
        onPointerDown={(e) => {
          setIsDragging(true);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (isDragging) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        className="gallery-frame relative aspect-[16/10] sm:aspect-[16/8.5] w-full shadow-gallery select-none overflow-hidden touch-none cursor-ew-resize"
      >
        <div className="relative w-full h-full overflow-hidden bg-limestone">
          {/* Right / Base Layer: Real Chowmahalla Palace */}
          <Image
            src="/images/real-chowmahalla-palace.webp"
            alt="Original photograph of Khilwat Mubarak at Chowmahalla Palace in Hyderabad inspiring Nikkah and Walima receptions"
            fill
            sizes="(max-width: 1024px) 100vw, 85vw"
            className="object-cover pointer-events-none"
          />

          {/* Left Clipped Layer: Telugu Pelli Pandiri */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="/images/floral-mandap-indian.webp"
              alt="Hindu Telugu Kalyana Mandapam Pelli Pandiri dressed in banana trunks, banti puvvu marigolds, and malli jasmine"
              fill
              sizes="(max-width: 1024px) 100vw, 85vw"
              className="object-cover pointer-events-none"
            />
          </div>

          {/* Crisp Architectural Corner Placards */}
          <div className="pointer-events-none absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-[2px] bg-obsidian/90 border border-brass/40 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-alabaster">
            Hindu · Telugu Pelli Pandiri
          </div>
          <div className="pointer-events-none absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-[2px] bg-silk/95 border border-stone-line text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-ink">
            Muslim · Chowmahalla Nikkah &amp; Walima
          </div>

          {/* Vertical Draggable Divider Handle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 z-20 w-px bg-silk shadow"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-[2px] bg-obsidian border border-brass-light shadow-obsidian flex items-center justify-center text-brass-light">
              <MoveHorizontal className="w-4 h-4 stroke-[1.75]" />
            </div>
          </div>

          {/* Accessible Keyboard Range Slider Overlay */}
          <input
            type="range"
            min={8}
            max={92}
            value={position}
            aria-label="Compare Telugu Pelli Mandapam on the left and Hyderabadi Muslim Nikkah stage on the right"
            onChange={(e) => setPosition(Number(e.target.value))}
            className="sr-only focus:not-sr-only focus:absolute focus:bottom-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-30 focus:bg-silk focus:text-ink focus:px-4 focus:py-1.5 focus:rounded-[2px] focus:border focus:border-obsidian"
          />
        </div>
      </div>
    </div>
  );
}
