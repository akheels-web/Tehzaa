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

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80 pt-16 pb-10 border-t border-gold/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-gold/25">
          {/* Column 1: Brand & Inclusive Hyderabad Philosophy */}
          <div className="space-y-5">
            <Link
              href="/"
              aria-label="Tehzaa Celebrations Home"
              className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <TehzaaLogo theme="light" size="md" />
            </Link>

            <p className="text-xs leading-relaxed text-ivory/80">
              Inspired by the timeless principle of{" "}
              <span className="text-gold-light font-serif text-sm">Tehzeeb</span>—refinement,
              reverence, and wholehearted hospitality. Based in Hyderabad, we curate
              weddings, floral architecture, regional feasts, and landmark gatherings
              across every tradition.
            </p>

            <div className="pt-2 border-t border-gold/15">
              <p className="text-xs text-gold-light font-medium mt-3">
                Honoring every tradition
              </p>
              <p className="text-xs text-ivory/75 mt-1 leading-relaxed">
                Telugu &amp; South Indian Mandapams • North Indian &amp; Marwari Ceremonies
                • Deccani Nikkah &amp; Walima • HITEC City Corporate Galas
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tehzaa Celebrations on Instagram"
                className="w-9 h-9 rounded-lg border border-gold/25 flex items-center justify-center text-ivory/80 hover:text-gold-light hover:border-gold transition-colors"
              >
                <Instagram aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tehzaa Celebrations on Facebook"
                className="w-9 h-9 rounded-lg border border-gold/25 flex items-center justify-center text-ivory/80 hover:text-gold-light hover:border-gold transition-colors"
              >
                <Facebook aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tehzaa Celebrations on LinkedIn"
                className="w-9 h-9 rounded-lg border border-gold/25 flex items-center justify-center text-ivory/80 hover:text-gold-light hover:border-gold transition-colors"
              >
                <Linkedin aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Column 2: Curated Services */}
          <div>
            <h3 className="font-serif text-lg text-ivory font-medium mb-5 pb-2 border-b border-gold/25">
              Curated Services
            </h3>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-ivory/80 hover:text-gold-light transition-colors inline-flex items-center gap-2 py-0.5 group"
                  >
                    <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold/70 group-hover:text-gold-light group-hover:translate-x-0.5 transition-[color,transform] duration-200" />
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/gallery"
                  className="text-ivory/80 hover:text-gold-light transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold/70 group-hover:text-gold-light group-hover:translate-x-0.5 transition-[color,transform] duration-200" />
                  <span>Celebration Portfolio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-ivory/80 hover:text-gold-light transition-colors inline-flex items-center gap-2 py-0.5 group"
                >
                  <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold/70 group-hover:text-gold-light group-hover:translate-x-0.5 transition-[color,transform] duration-200" />
                  <span>Our Philosophy &amp; Craft</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hyderabad Studios */}
          <div>
            <h3 className="font-serif text-lg text-ivory font-medium mb-5 pb-2 border-b border-gold/25">
              Hyderabad Studios
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory font-medium block">
                    Design &amp; Tasting Studio
                  </span>
                  <span className="text-ivory/75 leading-relaxed block mt-1">
                    Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory font-medium block">
                    Corporate Operations Desk
                  </span>
                  <span className="text-ivory/75 leading-relaxed block mt-1">
                    Financial District, Nanakramguda, Gachibowli, Hyderabad 500032
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-ivory font-medium block">Consultation Hours</span>
                  <span className="text-ivory/75 block mt-1 tabular-nums">
                    Mon – Sun: 10:00 AM – 8:30 PM (By Appointment)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Event Concierge */}
          <div>
            <h3 className="font-serif text-lg text-ivory font-medium mb-5 pb-2 border-b border-gold/25">
              Event Concierge
            </h3>
            <div className="space-y-4 text-xs">
              <p className="text-ivory/75 leading-relaxed">
                Speak directly with our senior curators to arrange a venue walkthrough or private menu tasting.
              </p>

              <div className="space-y-2 tabular-nums">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-ivory hover:text-gold-light transition-colors"
                >
                  <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-light shrink-0" />
                  <span className="font-medium">+91 98765 43210 (Concierge &amp; WhatsApp)</span>
                </a>
                <a
                  href="tel:+914023456789"
                  className="flex items-center gap-2 text-ivory hover:text-gold-light transition-colors"
                >
                  <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-light shrink-0" />
                  <span>+91 40 2345 6789 (Jubilee Hills Studio)</span>
                </a>
                <a
                  href="mailto:celebrations@tehzaa.com"
                  className="flex items-center gap-2 text-ivory hover:text-gold-light transition-colors"
                >
                  <Mail aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-light shrink-0" />
                  <span>celebrations@tehzaa.com</span>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-burgundy hover:bg-burgundy-light border border-gold/30 text-xs font-medium text-ivory transition-colors"
                >
                  Request Private Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/75 gap-4">
          <p>
            © {new Date().getFullYear()} Tehzaa Celebrations. Crafted in Hyderabad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <Link href="/about" className="hover:text-gold-light transition-colors">
              About Us
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/gallery" className="hover:text-gold-light transition-colors">
              Portfolio
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/contact" className="hover:text-gold-light transition-colors">
              Contact
            </Link>
            <span className="text-gold/40">•</span>
            <Link href="/privacy" className="hover:text-gold-light transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
