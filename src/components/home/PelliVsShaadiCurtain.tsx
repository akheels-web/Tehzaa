"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const MIN = 8;
const MAX = 92;
const clamp = (v: number) => Math.max(MIN, Math.min(MAX, Math.round(v)));

/** Small Charminar finial (dome + minaret tip) used as the divider knob. */
function CharminarFinial() {
  return (
    <svg viewBox="0 0 32 40" className="h-7 w-6" aria-hidden="true">
      <path
        d="M16 2 L16 7 M12 12 Q16 5 20 12 Z M10 13 H22 M11 13 V22 Q16 17 21 22 V13 M8 22 H24 V25 H8 Z M10 25 V36 M22 25 V36 M14 36 V30 Q16 27 18 30 V36 M8 36 H24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Drag-to-compare curtain: Telugu Pelli Pandiri on the left, Chowmahalla Nikkah &
 * Walima on the right. Pointer drag, or focus the gold handle and use the arrow keys.
 */
export function PelliVsShaadiCurtain({
  onPositionChange,
}: {
  onPositionChange?: (pct: number) => void;
}) {
  const [position, setPositionState] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setPosition = (v: number) => {
    const next = clamp(v);
    setPositionState(next);
    onPositionChange?.(next);
  };

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(((clientX - rect.left) / rect.width) * 100);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = { ArrowLeft: -5, ArrowRight: 5 }[e.key as "ArrowLeft" | "ArrowRight"];
    if (step) setPosition(position + step);
    else if (e.key === "Home") setPosition(MIN);
    else if (e.key === "End") setPosition(MAX);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border-[6px] border-white bg-marble-warm shadow-ruby outline outline-1 outline-offset-4 outline-brass/50 sm:aspect-[16/9]"
    >
      <Image
        src="/images/real-chowmahalla-palace.webp"
        alt="Khilwat Mubarak at Chowmahalla Palace in Hyderabad, the setting for Nikkah and Walima receptions"
        fill
        sizes="(max-width: 1024px) 100vw, 80vw"
        className="pointer-events-none object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src="/images/floral-mandap-indian.webp"
          alt="Telugu Pelli Pandiri mandapam dressed with banana trunks, marigolds and jasmine"
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="pointer-events-none object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 bg-marble/95 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-ruby sm:left-4 sm:top-4 sm:text-[11px]">
        Telugu Pelli
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 bg-marble/95 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-ruby sm:right-4 sm:top-4 sm:text-[11px]">
        Shaadi &amp; Walima
      </span>

      {/* Gold divider with Charminar-finial knob (the slider) */}
      <div className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-brass" style={{ left: `${position}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare Telugu Pelli Pandiri (left) with Chowmahalla Nikkah and Walima (right)"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={position}
          aria-valuetext={`${position}% Telugu Pelli`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-14 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-t-full border border-brass bg-marble text-brass-dark shadow-ruby"
        >
          <CharminarFinial />
        </div>
      </div>
    </div>
  );
}
