"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ArchFrame } from "./ArchFrame";
import { DepthJaali } from "./DepthJaali";
import { ParallaxLayer } from "./ParallaxLayer";
import { RevealTitle } from "./RevealTitle";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Inner-page hero in the Falaknuma Marble language: breadcrumbs, kicker, word-reveal
 * title with a ruby italic tail, intro and actions on the left; an arch-framed photo
 * (with optional licence credit) and up to two floating photos at different depths on
 * the right. `side` replaces the photo with any custom visual (e.g. the catering deg).
 */
export function PageHero({
  crumbs,
  kicker,
  title,
  italicTail,
  intro,
  actions,
  image,
  floating = [],
  side,
  compact = false,
}: {
  crumbs?: Crumb[];
  kicker: string;
  title: string;
  italicTail?: string;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  image?: { src: string; alt: string; credit?: string };
  floating?: { src: string; alt: string }[];
  side?: React.ReactNode;
  compact?: boolean;
}) {
  const hasVisual = Boolean(side || image);
  const floats = compact ? [] : floating.slice(0, 2);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-marble to-marble-warm",
        compact ? "pb-14 pt-28 lg:pt-32" : "pb-20 pt-28 lg:pb-24 lg:pt-36"
      )}
    >
      <DepthJaali />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className={cn(hasVisual ? "lg:col-span-7" : "lg:col-span-10")}>
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-ink-muted">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight aria-hidden="true" className="h-3 w-3 text-brass" />}
                    {c.href ? (
                      <Link href={c.href} className="hover:text-ruby">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <span className="mb-4 block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ruby sm:text-xs">
            {kicker}
          </span>
          <RevealTitle
            as="h1"
            italicTail={italicTail}
            // size first: tailwind-merge drops a leading-* that precedes a text-* size
            className={cn(compact ? "text-[clamp(2.6rem,5.5vw,4.75rem)]" : "text-[clamp(2.8rem,6vw,5.5rem)]", "leading-[0.95]")}
          >
            {title}
          </RevealTitle>
          {intro && (
            <div className="mt-6 max-w-xl font-sans text-[15px] leading-[1.7] text-ink-muted sm:text-[17px]">{intro}</div>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>

        {hasVisual && (
          <div className="relative lg:col-span-5">
            {side ?? (
              image && (
                <figure className="relative mx-auto w-full max-w-[400px]">
                  <ArchFrame src={image.src} alt={image.alt} priority sizes="(max-width: 1024px) 90vw, 36vw" className="aspect-[3/4.1] w-full" />
                  {image.credit && (
                    <figcaption className="mt-3 text-center font-sans text-[10px] text-ink-muted">Photo: {image.credit}</figcaption>
                  )}
                </figure>
              )
            )}
            {floats.map((f, i) => (
              <ParallaxLayer
                key={f.src}
                speed={i === 0 ? 0.5 : -0.35}
                pointer
                className={cn(
                  "absolute hidden w-[clamp(96px,9vw,140px)] md:block",
                  i === 0 ? "-left-6 top-6 lg:-left-16" : "-right-2 bottom-16 lg:-right-8"
                )}
              >
                <div className={cn("border-[5px] border-white bg-white shadow-ruby", i === 0 ? "-rotate-6" : "rotate-[5deg]")}>
                  <div className="relative aspect-[4/5]">
                    <Image src={f.src} alt={f.alt} fill sizes="140px" className="object-cover" />
                  </div>
                </div>
              </ParallaxLayer>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
