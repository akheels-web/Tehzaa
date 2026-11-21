import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TehzeebDivider } from "@/components/deccani/DeccaniMotifs";

export const metadata = {
  title: "Privacy Policy | Tehzaa Celebrations Hyderabad",
  description:
    "Simple, honest Privacy Policy for Tehzaa Celebrations covering event inquiry details, Telegram alerts, data retention, and deletion requests.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 lg:pt-32 pb-24 bg-alabaster text-ink min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brass-dark hover:text-ink transition-colors mb-10 rounded-[2px]"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
          <span>Back to Home</span>
        </Link>

        {/* Architectural Header */}
        <header className="border-b border-stone-line pb-10 mb-12 space-y-3">
          <span className="editorial-kicker block">Your trust matters</span>
          <h1 className="display-hero text-ink">
            Privacy <span className="editorial-italic">Policy</span>
          </h1>
          <p className="text-xs text-ink-subtle tabular-nums pt-1">
            Tehzaa Celebrations Pvt. Ltd. • Road No. 36, Jubilee Hills, Hyderabad 500033
          </p>
          <TehzeebDivider theme="light" className="justify-start max-w-xs pt-2" />
        </header>

        {/* Legal Sections */}
        <div className="space-y-10 text-[15px] text-ink-muted leading-[1.72]">
          <section className="space-y-3 border-b border-stone-line pb-8">
            <h2 className="display-card text-ink">
              1. Who We Are &amp; Promise
            </h2>
            <p>
              At <strong className="font-semibold text-ink">Tehzaa Celebrations Pvt. Ltd.</strong> (&ldquo;Tehzaa&rdquo;, &ldquo;we&rdquo;), your family event notes, phone numbers, and wedding plans stay strictly private. This page explains calmly how information from our Contact form and WhatsApp studio chats gets handled.
            </p>
          </section>

          <section className="space-y-3 border-b border-stone-line pb-8">
            <h2 className="display-card text-ink">
              2. What You Share With Us
            </h2>
            <ul className="list-disc pl-5 space-y-2.5 text-ink-muted">
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
          </section>

          <section className="space-y-3 border-b border-stone-line pb-8">
            <h2 className="display-card text-ink">
              3. How We Use It
            </h2>
            <p>
              We only use your details to build your event quote, invite you for tastings at Jubilee Hills, and coordinate on-ground teams once booked. We never sell or rent numbers to external brokers or cold-callers.
            </p>
          </section>

          <section className="space-y-3 border-b border-stone-line pb-8">
            <h2 className="display-card text-ink">
              4. Studio Inquiry Alerts (Telegram Bot API)
            </h2>
            <p>
              Form enquiries are sanitized and dispatched instantaneously over encrypted HTTPS to an access-restricted internal planner channel via the <strong className="font-semibold text-ink">Telegram Bot API</strong> so our Hyderabad desk sees your brief right away.
            </p>
          </section>

          <section className="space-y-3 border-b border-stone-line pb-8">
            <h2 className="display-card text-ink">
              5. Retention &amp; Deletion
            </h2>
            <p>
              Unconfirmed enquiries are deleted or anonymized within 180 days. Want your inquiry deleted earlier? Just email or message our studio anytime and we&apos;ll wipe it cleanly.
            </p>
          </section>

          <section className="p-7 sm:p-8 rounded-[2px] bg-silk border border-stone-line shadow-gallery space-y-3">
            <span className="editorial-kicker block">Direct Studio Contact</span>
            <h2 className="display-card text-ink">
              6. Reach Out Anytime
            </h2>
            <div className="text-sm space-y-1.5 pt-2 text-ink-muted tabular-nums">
              <p>
                <strong className="font-semibold text-ink">Email:</strong>{" "}
                <a
                  href="mailto:celebrations@tehzaa.com"
                  className="text-ink underline decoration-brass underline-offset-4 hover:text-brass-dark transition-colors"
                >
                  celebrations@tehzaa.com
                </a>
              </p>
              <p>
                <strong className="font-semibold text-ink">Phone:</strong> +91 98765 43210 / +91 40 2345 6789
              </p>
              <p>
                <strong className="font-semibold text-ink">Studio:</strong> Road No. 36, Jubilee Hills, Hyderabad 500033
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
