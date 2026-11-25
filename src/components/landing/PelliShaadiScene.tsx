"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { PelliVsShaadiCurtain } from "./PelliVsShaadiCurtain";
import { DepthJaali } from "./primitives/DepthJaali";
import { ParallaxLayer } from "./primitives/ParallaxLayer";
import { SceneHeading } from "./primitives/SceneHeading";
import { HOUSE_EASE } from "@/lib/landing/motion";
import { cn } from "@/lib/utils";

const PELLI_RITES = "Pelli Pandiri · Jeelakarra Bellam · Talambralu";
const SHAADI_RITES = "Sanchaq · Manjha · Nikkah · Walima";

const PELLI_HREF =
  "/contact?eventType=Telugu%20%26%20South%20Indian%20Weddings&brief=Planning%20a%20Telugu%20Pelli%20Pandiri%20with%20authentic%20Arati%20Aku%20Vindhu%20Bhojanam.";
const SHAADI_HREF =
  "/contact?eventType=Hyderabadi%20Nikkah%20%26%20Walima&brief=Planning%20a%20Hyderabadi%20Nikkah%20%26%20Walima%20with%20Sanchaq%20and%20full%20Dawat.";

function Rites({ show, text, align }: { show: boolean; text: string; align: "left" | "right" }) {
  return (
    <div className={cn("min-h-[3rem] flex-1", align === "right" && "text-right")}>
      <AnimatePresence initial={false}>
        {show && (
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: HOUSE_EASE }}
            className="font-display text-[clamp(1.1rem,2vw,1.6rem)] italic text-ruby"
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Scene 02. One city, two wedding traditions: drag the gold line between them. */
export function PelliShaadiScene() {
  const [position, setPosition] = useState(50);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-marble-warm to-marble py-24 lg:py-32">
      <DepthJaali />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SceneHeading
            kicker="Ganga-Jamuni Tehzeeb"
            title="Pelli & Shaadi,"
            italicTail="one city, one dil."
            intro="Hyderabad celebrates both, often in the same family. Drag the gold line to move between a Telugu Pelli Pandiri and a Chowmahalla Nikkah."
          />
          <span className="flex items-center gap-2 font-sans text-xs text-ink-muted">
            <MoveHorizontal aria-hidden="true" className="h-4 w-4 text-brass-dark" />
            Drag, or focus the handle and use arrow keys
          </span>
        </div>

        <ParallaxLayer speed={0.12}>
          <PelliVsShaadiCurtain onPositionChange={setPosition} />
        </ParallaxLayer>

        <div className="mt-6 flex items-start gap-6">
          <Rites show={position > 60} text={PELLI_RITES} align="left" />
          <Rites show={position < 40} text={SHAADI_RITES} align="right" />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            href={PELLI_HREF}
            className="group inline-flex items-center justify-center gap-2.5 border border-ruby/40 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ruby transition-colors hover:border-ruby hover:bg-ruby hover:text-marble"
          >
            Plan a Telugu Pelli
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={SHAADI_HREF}
            className="group inline-flex items-center justify-center gap-2.5 border border-ruby/40 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ruby transition-colors hover:border-ruby hover:bg-ruby hover:text-marble"
          >
            Plan a Shaadi &amp; Walima
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
