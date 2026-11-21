import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  DeccaniArchFrame,
  HeritageGreetingBanner,
} from "@/components/deccani/DeccaniMotifs";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Tehzaa Celebrations — Jubilee Hills, Hyderabad",
  description:
    "Drop by over Irani Chai or Filter Kaapi at our Jubilee Hills studio, or drop your Hyderabad wedding, food tasting, or corporate brief right online!",
  keywords: [
    "Tehzaa Celebrations Contact",
    "Hyderabad Wedding Planners",
    "Telugu Wedding Planners Hyderabad",
    "Jubilee Hills Event Studio",
    "Book Tehzaa Food Tasting",
  ],
};

const CONSULTATION_FAQS = [
  {
    num: "01",
    question: "How early should we reach out for Muhurtham or winter wedding dates?",
    answer:
      "For peak October–March Muhurtham dates and heritage buyouts (Chowmahalla, Falaknuma, Taramati Baradari), 4–6 months ahead is sweet! For home functions, anniversaries, or corporate summits, 2–4 weeks usually works great.",
  },
  {
    num: "02",
    question: "Can elders taste both Biryani AND Pure Veg Vindhu before booking?",
    answer:
      "Yes! Drop by Road No. 36 in Jubilee Hills — we host proper family tastings where you check spice levels on our Mutton Dum Biryani, Sufiyani Biryani, banana-leaf Vindhu, and inspect our separate Veg/Jain cookware.",
  },
  {
    num: "03",
    question: "Do you only handle events in Hyderabad or outstation too?",
    answer:
      "Most of our work happens across Hyderabad & Secunderabad (Jubilee Hills to Old City to Gandipet), though our crew happily travels across Telangana, Vijayawada, Vizag, Udaipur, and Goa for family destination celebrations.",
  },
  {
    num: "04",
    question: "How quickly do you reply after I submit the form?",
    answer:
      "You get a Reference Code immediately on screen, and one of our senior planners usually WhatsApps or calls back within two working hours to set up a coffee or venue walkthrough.",
  },
];

export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hi Tehzaa! Would love to chat about an upcoming event in Hyderabad."
    );

  return (
    <div className="min-h-screen bg-alabaster text-ink">
      {/* 1. Alabaster Studio Header */}
      <section className="pt-28 pb-14 lg:pt-32 lg:pb-16 border-b border-stone-line bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <HeritageGreetingBanner theme="light" />

              <span className="editorial-kicker block pt-1">
                Chai pe milenge?
              </span>

              <h1 className="display-hero text-ink">
                Tell Us About{" "}
                <span className="editorial-italic">
                  Your Celebration!
                </span>
              </h1>

              <p className="editorial-body max-w-2xl">
                Got a Telugu Pelli Muhurtham, Muslim Nikkah &amp; Walima, house Seemantham, Sanchaq night, or HITEC City summit coming up? Drop by Road No. 36 or ping us right below!
              </p>
            </div>

            <div className="lg:col-span-5">
              <DeccaniArchFrame variant="mehrab" theme="alabaster">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-limestone">
                  <Image
                    src="/images/real-chowmahalla-palace.webp"
                    alt="Original photograph of Chowmahalla Palace Khilwat courtyard in Hyderabad"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </DeccaniArchFrame>
              <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-subtle text-center">
                Chowmahalla Palace Inspiration • Jubilee Hills Tasting Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Studio Details + Luxury Silk Concierge Form */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Hairline Studio Directory */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="display-card text-ink pb-4 border-b border-stone-line">
                Drop By{" "}
                <span className="editorial-italic">Our Studios</span>
              </h2>

              <div className="divide-y divide-stone-line">
                <div className="py-6 flex items-start gap-4">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-brass shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="editorial-kicker block mb-1">
                      Design &amp; Food Tasting Studio
                    </span>
                    <h3 className="font-display text-2xl text-ink font-medium">
                      Jubilee Hills Studio
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed mt-1 tabular-nums">
                      Road No. 36, Jubilee Hills, Hyderabad 500033
                    </p>
                    <p className="text-xs text-ink-subtle mt-1.5">
                      Irani Chai &amp; Filter Kaapi always pouring — quick prior ping helps!
                    </p>
                  </div>
                </div>

                <div className="py-6 flex items-start gap-4">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-brass shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="editorial-kicker block mb-1">
                      Corporate Events Desk
                    </span>
                    <h3 className="font-display text-2xl text-ink font-medium">
                      Financial District Hub
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed mt-1 tabular-nums">
                      Nanakramguda, Gachibowli, Hyderabad 500032
                    </p>
                    <p className="text-xs text-ink-subtle mt-1.5">
                      Easy stops for HITEC City &amp; HICC summit meetings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="display-card text-ink pb-4 border-b border-stone-line">
                Quick{" "}
                <span className="editorial-italic">Numbers</span>
              </h2>

              <div className="divide-y divide-stone-line text-sm">
                <div className="py-5 flex items-start gap-4">
                  <Phone aria-hidden="true" className="w-4 h-4 text-brass shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle block mb-1">
                      Phone &amp; WhatsApp
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="text-ink font-medium hover:text-brass-dark transition-colors block tabular-nums"
                    >
                      +91 98765 43210
                    </a>
                    <a
                      href="tel:+914023456789"
                      className="text-ink-subtle text-xs hover:text-ink transition-colors block mt-1 tabular-nums"
                    >
                      +91 40 2345 6789 (Jubilee Hills Landline)
                    </a>
                  </div>
                </div>

                <div className="py-5 flex items-start gap-4">
                  <Mail aria-hidden="true" className="w-4 h-4 text-brass shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle block mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:celebrations@tehzaa.com"
                      className="text-ink font-medium hover:text-brass-dark transition-colors"
                    >
                      celebrations@tehzaa.com
                    </a>
                  </div>
                </div>

                <div className="py-5 flex items-start gap-4">
                  <Clock aria-hidden="true" className="w-4 h-4 text-brass shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle block mb-1">
                      Studio Timings
                    </span>
                    <p className="text-ink tabular-nums">
                      Monday – Sunday: 10:00 AM – 8:30 PM IST
                    </p>
                    <p className="text-xs text-ink-subtle mt-1">
                      Happy to stay later for after-work family Zoom/studio chats!
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-dark w-full py-4"
                >
                  <MessageCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                  <span>Ping Us Directly on WhatsApp</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 3. Architectural Limestone & Obsidian Consultation FAQs */}
      <section className="py-20 lg:py-24 bg-limestone border-t border-stone-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2px] bg-obsidian text-ink-light border border-obsidian-line p-8 sm:p-10 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 shadow-obsidian">
            <div className="max-w-2xl space-y-2.5">
              <span className="editorial-kicker-light block">
                Quick answers before you visit
              </span>
              <h2 className="display-section text-ink-light">
                Helpful Things to{" "}
                <span className="editorial-italic text-brass-light">
                  Know Upfront
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-lightMuted max-w-sm leading-relaxed">
              Clear timelines, live food tastings at Road No. 36, and transparent studio planning across Hyderabad &amp; Secunderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CONSULTATION_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="p-6 sm:p-8 rounded-[2px] bg-silk border border-stone-line space-y-3"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-brass-dark tabular-nums block">
                  {faq.num}
                </span>
                <h3 className="font-display text-2xl text-ink font-medium leading-snug">
                  {faq.question}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
