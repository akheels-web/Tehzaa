import React from "react";
import { PageHero } from "@/components/landing/primitives/PageHero";
import { STUDIO_PHONE_DISPLAY } from "@/lib/contact";

export const metadata = {
  title: "Privacy Policy | Tehzaa Celebrations Hyderabad",
  description:
    "Simple, honest Privacy Policy for Tehzaa Celebrations covering event inquiry details, Telegram alerts, data retention, and deletion requests.",
};

/** Small gold arch holding a section number. */
function SectionMark({ n }: { n: number }) {
  return (
    <span className="relative inline-flex h-12 w-10 flex-none items-end justify-center pb-2" aria-hidden="true">
      <svg viewBox="0 0 40 48" className="absolute inset-0 h-full w-full">
        <path d="M2 47 V20 C2 10 12 5 18 3 Q20 2 20 0.5 Q20 2 22 3 C28 5 38 10 38 20 V47 Z" fill="rgba(176,138,74,0.08)" stroke="#B08A4A" strokeWidth="1" />
      </svg>
      <span className="relative font-display text-lg italic tabular-nums text-ruby">{n}</span>
    </span>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="flex gap-5 border-b border-brass/25 pb-8">
      <SectionMark n={n} />
      <div className="space-y-3">
        <h2 className="display-card text-ink">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-marble text-ink">
      <PageHero
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        kicker="Your trust matters"
        title="Privacy"
        italicTail="policy."
        intro={
          <p className="text-sm tabular-nums">Tehzaa Celebrations Pvt. Ltd. • Road No. 36, Jubilee Hills, Hyderabad 500033</p>
        }
      />

      <div className="mx-auto max-w-3xl px-5 pb-24 pt-4 sm:px-8">
        <div className="space-y-10 font-sans text-[15px] leading-[1.72] text-ink-muted">
          <Section n={1} title="Who We Are & Promise">
            <p>
              At <strong className="font-semibold text-ink">Tehzaa Celebrations Pvt. Ltd.</strong> (&ldquo;Tehzaa&rdquo;, &ldquo;we&rdquo;), your family event notes, phone numbers, and wedding plans stay strictly private. This page explains calmly how information from our Contact form and WhatsApp studio chats gets handled.
            </p>
          </Section>

          <Section n={2} title="What You Share With Us">
            <ul className="list-disc space-y-2.5 pl-5">
              <li>
                <strong className="font-semibold text-ink">Contact Info:</strong> Name, Indian WhatsApp / mobile number, and email (if provided).
              </li>
              <li>
                <strong className="font-semibold text-ink">Event Brief:</strong> Celebration type (Telugu Pelli, Muslim Nikkah &amp; Walima, Baraat, Corporate Gala, House Function, Catering), dates, rough guest count, and Hyderabad venue.
              </li>
              <li>
                <strong className="font-semibold text-ink">Food &amp; Decor Preferences:</strong> Separate Pure Veg/Jain requirements, tasting selections, or style inspirations.
              </li>
              <li>
                <strong className="font-semibold text-ink">Basic Abuse Checks:</strong> Temporary IP rate limits and invisible honeypot checks solely to block automated spam bots.
              </li>
            </ul>
          </Section>

          <Section n={3} title="How We Use It">
            <p>
              We only use your details to build your event quote, invite you for tastings at Jubilee Hills, and coordinate on-ground teams once booked. We never sell or rent numbers to external brokers or cold-callers.
            </p>
          </Section>

          <Section n={4} title="Studio Inquiry Alerts (Telegram Bot API)">
            <p>
              Form enquiries are sanitized and dispatched instantaneously over encrypted HTTPS to an access-restricted internal planner channel via the <strong className="font-semibold text-ink">Telegram Bot API</strong> so our Hyderabad desk sees your brief right away.
            </p>
          </Section>

          <Section n={5} title="Retention & Deletion">
            <p>
              Unconfirmed enquiries are deleted or anonymized within 180 days. Want your inquiry deleted earlier? Just email or message our studio anytime and we&apos;ll wipe it cleanly.
            </p>
          </Section>

          <section className="flex gap-5 border-[5px] border-white bg-white p-7 shadow-ruby outline outline-1 outline-offset-4 outline-brass/40 sm:p-8">
            <SectionMark n={6} />
            <div className="space-y-3">
              <span className="editorial-kicker block">Direct Studio Contact</span>
              <h2 className="display-card text-ink">Reach Out Anytime</h2>
              <div className="space-y-1.5 pt-2 text-sm tabular-nums">
                <p>
                  <strong className="font-semibold text-ink">Email:</strong>{" "}
                  <a href="mailto:celebrations@tehzaa.com" className="text-ink underline decoration-brass underline-offset-4 transition-colors hover:text-ruby">
                    celebrations@tehzaa.com
                  </a>
                </p>
                <p>
                  <strong className="font-semibold text-ink">Phone:</strong> {STUDIO_PHONE_DISPLAY} / +91 40 2345 6789
                </p>
                <p>
                  <strong className="font-semibold text-ink">Studio:</strong> Road No. 36, Jubilee Hills, Hyderabad 500033
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
