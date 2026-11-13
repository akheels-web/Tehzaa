import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Tehzaa Celebrations Hyderabad",
  description:
    "Privacy Policy for Tehzaa Celebrations. Transparent practices regarding event inquiry details, Telegram concierge notifications, data retention, and client deletion rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-gold-dark hover:text-burgundy transition-colors mb-10"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
          <span>Back to Home</span>
        </Link>

        {/* Editorial Header */}
        <header className="border-b border-gold/25 pb-10 mb-12 space-y-4">
          <p className="editorial-kicker">Client confidentiality &amp; trust</p>
          <h1 className="font-serif font-normal text-4xl sm:text-5xl text-charcoal leading-[1.12]">
            Privacy <span className="text-burgundy">Policy</span>
          </h1>
          <p className="text-xs text-taupe-dark">
            Tehzaa Celebrations Pvt. Ltd. • Road No. 36, Jubilee Hills, Hyderabad 500033
          </p>
        </header>

        {/* Legal Sections */}
        <div className="space-y-10 text-sm text-charcoal/85 leading-relaxed">
          <section className="space-y-3 border-b border-gold/20 pb-8">
            <h2 className="font-serif text-2xl font-normal text-burgundy">
              1. Introduction &amp; Scope
            </h2>
            <p>
              At <strong>Tehzaa Celebrations Pvt. Ltd.</strong> (“Tehzaa”, “we”, “our”), we
              treat every family celebration and corporate brief with discretion. This
              Privacy Policy describes how personal information shared through our website,
              event inquiry forms, WhatsApp concierge channel, and studio appointments is
              collected, used, and safeguarded.
            </p>
          </section>

          <section className="space-y-3 border-b border-gold/20 pb-8">
            <h2 className="font-serif text-2xl font-normal text-burgundy">
              2. Information We Collect
            </h2>
            <p>
              When you submit an inquiry via our Contact page or reach out to our
              concierge, we collect only the details necessary to prepare your event
              proposal:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
              <li>
                <strong>Contact Details:</strong> Full Name, Indian Mobile / WhatsApp
                Number, and optional Email Address.
              </li>
              <li>
                <strong>Event Specifications:</strong> Celebration Category (such as
                Telugu &amp; South Indian Wedding, North Indian &amp; Marwari Ceremony,
                Nikkah &amp; Walima, Floral Decor, Catering, Baraat, Seemantham,
                Namakaranam, Gruhapravesham, Corporate Gala, or Milestone Birthday),
                preferred date, Hyderabad venue or neighborhood, estimated guest count,
                and indicative budget range.
              </li>
              <li>
                <strong>Dietary &amp; Styling Notes:</strong> Any regional menu
                requirements (including Pure Vegetarian or Sattvic Jain kitchen requests)
                and aesthetic notes shared voluntarily.
              </li>
              <li>
                <strong>Security Metadata:</strong> IP-based rate limiting counters and
                anti-spam honeypot checks used strictly to prevent automated abuse.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-b border-gold/20 pb-8">
            <h2 className="font-serif text-2xl font-normal text-burgundy">
              3. Purpose of Processing
            </h2>
            <p>Your inquiry information is used solely to:</p>
            <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
              <li>
                Prepare tailored floral, spatial, and catering proposals aligned with your
                family’s traditions.
              </li>
              <li>
                Contact you via telephone, WhatsApp, or email to arrange venue
                walkthroughs and studio menu tastings.
              </li>
              <li>
                Coordinate logistics with vetted venue and production partners once you
                confirm a booking.
              </li>
            </ul>
            <p>
              We never sell, rent, or disclose your personal contact details to third-party
              marketing brokers or unsolicited callers.
            </p>
          </section>

          <section className="space-y-3 border-b border-gold/20 pb-8">
            <h2 className="font-serif text-2xl font-normal text-burgundy">
              4. Real-Time Concierge Notifications (Telegram Bot API)
            </h2>
            <p>
              To provide timely responses from our Hyderabad planning desk, validated
              inquiry payloads from our contact form are dispatched instantaneously over
              encrypted HTTPS to an internal, access-restricted concierge channel via the{" "}
              <strong>Telegram Bot API</strong>.
            </p>
            <p>
              All submitted text is sanitized server-side prior to transmission, and only
              authorized Tehzaa senior planners have access to incoming inquiry alerts.
            </p>
          </section>

          <section className="space-y-3 border-b border-gold/20 pb-8">
            <h2 className="font-serif text-2xl font-normal text-burgundy">
              5. Data Retention &amp; Safeguards
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-charcoal/80">
              <li>
                <strong>Unconfirmed Inquiries:</strong> Retained only for up to 180 days
                to support follow-up consultations, after which records are removed or
                anonymized.
              </li>
              <li>
                <strong>Confirmed Commissions:</strong> Event agreements and billing
                records are retained as required under applicable Indian statutory
                regulations.
              </li>
              <li>
                <strong>Transport Security:</strong> All form submissions and API
                communications operate over TLS-encrypted HTTPS connections.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-b border-gold/20 pb-8">
            <h2 className="font-serif text-2xl font-normal text-burgundy">
              6. Your Rights &amp; Deletion Requests
            </h2>
            <p>
              You may request at any time to review, update, or permanently delete the
              inquiry details we hold for you. We honor deletion requests promptly without
              unnecessary friction.
            </p>
          </section>

          <section className="p-7 rounded-2xl bg-cream border border-gold/25 space-y-3">
            <h2 className="font-serif text-xl font-normal text-charcoal">
              7. Contact Our Privacy Desk
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75">
              For data access, correction, or deletion inquiries, please reach our
              Hyderabad studio directly:
            </p>
            <div className="text-xs sm:text-sm space-y-1 pt-1 text-charcoal">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:celebrations@tehzaa.com"
                  className="text-burgundy hover:underline"
                >
                  celebrations@tehzaa.com
                </a>
              </p>
              <p>
                <strong>Telephone:</strong> +91 98765 43210 / +91 40 2345 6789
              </p>
              <p>
                <strong>Studio:</strong> Road No. 36, Jubilee Hills, Hyderabad, Telangana
                500033
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
