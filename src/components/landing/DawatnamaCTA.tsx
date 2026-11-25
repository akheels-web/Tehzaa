"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "motion/react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL, whatsappHref } from "@/lib/contact";
import { useMotionAllowed } from "@/lib/landing/motionPreference";
import { DepthJaali } from "./primitives/DepthJaali";
import { Envelope } from "./primitives/Envelope";
import { ParallaxLayer } from "./primitives/ParallaxLayer";
import { Petals } from "./primitives/Petals";

/** Scene 07 (and the closing CTA of inner pages). A ruby dawatnama that opens into the call to action. */
export function DawatnamaCTA() {
  const motionAllowed = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (inView) setOpen(true);
  }, [inView]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const replay = () => {
    setOpen(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), 700);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-marble to-marble-warm pb-24 pt-[clamp(16rem,48vw,22rem)] lg:pb-32">
      <DepthJaali />
      <Petals count={5} />

      <ParallaxLayer speed={0.12}>
        <div ref={ref} className="relative mx-auto w-[min(92vw,560px)]">
          <Envelope
            open={open}
            motionAllowed={motionAllowed}
            onReplay={replay}
            cardClassName="border border-brass/50 bg-marble p-5 text-center outline outline-1 outline-offset-[-8px] outline-brass/40 sm:p-7"
          >
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brass-dark sm:text-[11px]">
              Aapki dawat, hamara intezaam
            </span>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-medium leading-none text-ink">
              Chai pe <span className="italic text-ruby">milenge?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-muted sm:text-[15px]">
              Tell us your dates and your venue. We&apos;ll come to Jubilee Hills with Irani chai and a plan.
            </p>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-ruby px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-marble transition-colors hover:bg-ruby-dark"
              >
                Plan your event
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={whatsappHref("Aadaab! I'd like to plan an event with Tehzaa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-ruby/40 px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ruby transition-colors hover:border-ruby"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
            <a
              href={`tel:${STUDIO_PHONE_TEL}`}
              className="mt-3 inline-flex items-center gap-2 font-sans text-sm tabular-nums text-ink hover:text-ruby"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5 text-brass-dark" />
              {STUDIO_PHONE_DISPLAY}
            </a>
          </Envelope>
        </div>
      </ParallaxLayer>
    </section>
  );
}
