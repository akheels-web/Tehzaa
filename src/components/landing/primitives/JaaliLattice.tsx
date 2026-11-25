import React, { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Gold Deccani jaali: an eight-point-star lattice (two overlapping squares joined by
 * a diagonal grid), stroked in gold leaf. With `edgeMask` it only shows near the edges,
 * like light through a carved stone screen.
 */
export function JaaliLattice({
  className,
  edgeMask = true,
}: {
  className?: string;
  edgeMask?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={
        edgeMask
          ? {
              maskImage: "radial-gradient(ellipse at center, transparent 38%, #000 82%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, transparent 38%, #000 82%)",
            }
          : undefined
      }
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`jaali-${id}`} width="56" height="56" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#B08A4A" strokeOpacity="0.28" strokeWidth="1">
              {/* eight-point star = square + square rotated 45° */}
              <rect x="18" y="18" width="20" height="20" />
              <rect x="18" y="18" width="20" height="20" transform="rotate(45 28 28)" />
              {/* lattice joining neighbouring stars */}
              <path d="M0 0 L14 14 M56 0 L42 14 M0 56 L14 42 M56 56 L42 42" />
              <path d="M28 0 V4 M28 52 V56 M0 28 H4 M52 28 H56" />
              <circle cx="28" cy="28" r="3" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#jaali-${id})`} />
      </svg>
    </div>
  );
}
