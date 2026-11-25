import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { TehzaaLogo } from "@/components/brand/TehzaaLogo";
import { CharminarSkylineCrest } from "@/components/deccani/DeccaniMotifs";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="relative bg-marble-warm text-ink pt-16 pb-10 border-t border-brass/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Shared Heritage Skyline Elevation */}
        <div className="pb-12 mb-14 border-b border-brass/30 text-center space-y-3">
          <CharminarSkylineCrest theme="light" />
          <p className="font-display italic text-2xl sm:text-3xl font-normal text-ruby pt-1">
            Made with love, tea &amp; Hyderabadi tehzeeb
          </p>
          <p className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.18em] text-ink-muted">
            Shaadi • Telugu Pelli • Anand Karaj • Cathedral Vows • HITEC City Galas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-brass/30">
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <Link
              href="/"
              aria-label="Tehzaa Celebrations Home"
              className="inline-block rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-marble"
            >
              <TehzaaLogo theme="light" size="md" />
            </Link>

            <p className="text-sm leading-relaxed text-ink-muted">
              Shaadi ho ya Pelli — we take care of everything from fresh Jasmine mandaps and Nikkah arches to copper-deg Dum Biryani and Pure Veg banana-leaf Vindhu, so your family actually gets to enjoy the party!
            </p>

            <div className="pt-3 border-t border-brass/30">
              <p className="text-[11px] uppercase tracking-[0.16em] text-brass-dark font-semibold mt-1">
                Zero stress, full dhamaka
              </p>
              <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                Chowmahalla • Taj Falaknuma • Taramati Baradari • Golconda • Jubilee Hills • HITEC City
              </p>
            </div>

            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tehzaa Celebrations on Instagram"
                className="w-9 h-9 border border-brass/40 bg-marble flex items-center justify-center text-ink-muted hover:text-ruby hover:border-ruby transition-colors"
              >
                <Instagram aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tehzaa Celebrations on Facebook"
                className="w-9 h-9 border border-brass/40 bg-marble flex items-center justify-center text-ink-muted hover:text-ruby hover:border-ruby transition-colors"
              >
                <Facebook aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tehzaa Celebrations on LinkedIn"
                className="w-9 h-9 border border-brass/40 bg-marble flex items-center justify-center text-ink-muted hover:text-ruby hover:border-ruby transition-colors"
              >
                <Linkedin aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Column 2: What We Do */}
          <div>
            <h3 className="font-display text-2xl text-ink font-medium mb-5 pb-2.5 border-b border-brass/30">
              What We Do
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-ink-muted hover:text-ruby transition-colors inline-flex items-center gap-2 py-0.5 group"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="w-3.5 h-3.5 stroke-[1.5] text-brass-dark group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                    />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/gallery"
                  className="text-ink-muted hover:text-ruby transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 stroke-[1.5] text-brass-dark group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                  />
                  <span>Photo Scrapbook (Our Work)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-ink-muted hover:text-ruby transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 stroke-[1.5] text-brass-dark group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                  />
                  <span>About Our Hyderabad Team</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studios */}
          <div>
            <h3 className="font-display text-2xl text-ink font-medium mb-5 pb-2.5 border-b border-brass/30">
              Drop By Over Chai
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark shrink-0 mt-1" />
                <div>
                  <span className="text-ink font-medium block">
                    Wedding &amp; Tasting Lounge
                  </span>
                  <span className="text-xs text-ink-muted leading-relaxed block mt-0.5">
                    Road No. 36, Jubilee Hills, Hyderabad 500033
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark shrink-0 mt-1" />
                <div>
                  <span className="text-ink font-medium block">
                    Corporate Ops Desk
                  </span>
                  <span className="text-xs text-ink-muted leading-relaxed block mt-0.5">
                    Financial District, Nanakramguda, Gachibowli 500032
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark shrink-0 mt-1" />
                <div>
                  <span className="text-ink font-medium block">When We&apos;re Open</span>
                  <span className="text-xs text-ink-muted block mt-0.5 tabular-nums">
                    Mon – Sun: 10:00 AM – 8:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Talk To Us */}
          <div>
            <h3 className="font-display text-2xl text-ink font-medium mb-5 pb-2.5 border-b border-brass/30">
              Talk To Us
            </h3>
            <div className="space-y-4 text-sm">
              <p className="text-ink-muted leading-relaxed">
                Got dates locked or just throwing around ideas? Ping us anytime — no tension!
              </p>

              <div className="space-y-2.5 text-xs tabular-nums">
                <a
                  href={`tel:${STUDIO_PHONE_TEL}`}
                  className="flex items-center gap-2.5 text-ink hover:text-ruby transition-colors"
                >
                  <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark shrink-0" />
                  <span className="font-medium">{STUDIO_PHONE_DISPLAY} (WhatsApp too)</span>
                </a>
                <a
                  href="tel:+914023456789"
                  className="flex items-center gap-2.5 text-ink-muted hover:text-ruby transition-colors"
                >
                  <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark shrink-0" />
                  <span>+91 40 2345 6789 (Jubilee Hills Studio)</span>
                </a>
                <a
                  href="mailto:celebrations@tehzaa.com"
                  className="flex items-center gap-2.5 text-ink-muted hover:text-ruby transition-colors"
                >
                  <Mail aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark shrink-0" />
                  <span>celebrations@tehzaa.com</span>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-3.5 px-5 bg-ruby hover:bg-ruby-dark text-[11px] font-semibold uppercase tracking-[0.15em] text-marble transition-colors"
                >
                  Book a Chai Pe Charcha
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Monumental Architectural Wordmark Band */}
        <div className="my-2 bg-ruby py-10 sm:py-12 text-center overflow-hidden shadow-ruby outline outline-1 outline-offset-4 outline-brass/50">
          <p className="text-[11px] font-sans uppercase tracking-[0.26em] text-[#E7C27D] tabular-nums mb-3">
            17.3850° N · 78.4867° E — HYDERABAD ATELIER
          </p>
          <p
            aria-hidden="true"
            className="font-display font-medium uppercase tracking-[0.22em] text-[clamp(3.25rem,14vw,10.5rem)] leading-[0.88] text-marble/90 select-none"
          >
            TEHZAA
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>
            © {new Date().getFullYear()} Tehzaa Celebrations. Born &amp; based in Hyderabad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <Link href="/about" className="hover:text-ruby transition-colors">
              About Us
            </Link>
            <span aria-hidden="true" className="text-brass/60">•</span>
            <Link href="/gallery" className="hover:text-ruby transition-colors">
              Our Work
            </Link>
            <span aria-hidden="true" className="text-brass/60">•</span>
            <Link href="/contact" className="hover:text-ruby transition-colors">
              Contact
            </Link>
            <span aria-hidden="true" className="text-brass/60">•</span>
            <Link href="/privacy" className="hover:text-ruby transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
