import React, { useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Deccani pointed-arch outline in objectBoundingBox units (0–1), so the same shape
 * scales to any frame. Springs at 40% height, a slight ogee and a pointed crown.
 */
export const ARCH_PATH =
  "M0,1 L0,0.4 C0,0.2 0.26,0.09 0.44,0.04 Q0.5,0.02 0.5,0 Q0.5,0.02 0.56,0.04 C0.74,0.09 1,0.2 1,0.4 L1,1 Z";

/** Registers the arch clip path once per frame; returns the CSS clip-path value. */
export function ArchClipDef({ id }: { id: string }) {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        <path d={ARCH_PATH} />
      </clipPath>
    </svg>
  );
}

/**
 * A photograph framed in a Deccani arch: outer gold hairline, ivory ring,
 * gold border, then the image. Rings are concentric clipped layers so the
 * arch outline stays continuous at any size.
 */
export function ArchFrame({
  src,
  alt,
  className,
  priority,
  sizes,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  children?: React.ReactNode;
}) {
  const clipId = `arch-${useId().replace(/:/g, "")}`;
  const clip = { clipPath: `url(#${clipId})` };

  return (
    <div className={cn("relative drop-shadow-[0_30px_40px_rgba(92,31,36,0.22)]", className)}>
      <ArchClipDef id={clipId} />
      {/* outer gold hairline */}
      <div className="absolute inset-0 bg-brass/60" style={clip} />
      {/* ivory ring */}
      <div className="absolute inset-px bg-marble" style={clip} />
      {/* gold border */}
      <div className="absolute inset-[11px] bg-brass" style={clip} />
      {/* image */}
      <div className="absolute inset-[13px] overflow-hidden bg-marble-warm" style={clip}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        {children}
      </div>
    </div>
  );
}
