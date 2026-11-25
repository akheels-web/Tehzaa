import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL, whatsappHref } from "@/lib/contact";
import { creditForImage } from "@/lib/landing/credits";
import { PageHero } from "@/components/landing/primitives/PageHero";
import { SceneHeading } from "@/components/landing/primitives/SceneHeading";
import { ThreadFaq } from "@/components/landing/primitives/ThreadFaq";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { DepthJaali } from "@/components/landing/primitives/DepthJaali";
import { DawatFormEnvelope } from "@/components/inner/DawatFormEnvelope";

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
    question: "How early should we reach out for Muhurtham or winter wedding dates?",
    answer:
      "For peak October–March Muhurtham dates and heritage buyouts (Chowmahalla, Falaknuma, Taramati Baradari), 4–6 months ahead is sweet! For home functions, anniversaries, or corporate summits, 2–4 weeks usually works great.",
  },
  {
    question: "Can elders taste both Biryani AND Pure Veg Vindhu before booking?",
    answer:
      "Yes! Drop by Road No. 36 in Jubilee Hills — we host proper family tastings where you check spice levels on our Mutton Dum Biryani, Sufiyani Biryani, banana-leaf Vindhu, and inspect our separate Veg/Jain cookware.",
  },
  {
    question: "Do you only handle events in Hyderabad or outstation too?",
    answer:
      "Most of our work happens across Hyderabad & Secunderabad (Jubilee Hills to Old City to Gandipet), though our crew happily travels across Telangana, Vijayawada, Vizag, Udaipur, and Goa for family destination celebrations.",
  },
  {
    question: "How quickly do you reply after I submit the form?",
    answer:
      "You get a Reference Code immediately on screen, and one of our senior planners usually WhatsApps or calls back within two working hours to set up a coffee or venue walkthrough.",
  },
];

const KICKER = "mb-1 block font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-brass-dark";

export default function ContactPage() {
  const whatsappUrl = whatsappHref("Hi Tehzaa! Would love to chat about an upcoming event in Hyderabad.");

  return (
    <div className="min-h-screen bg-marble text-ink">
      <PageHero
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        kicker="Chai pe milenge?"
        title="Tell us about"
        italicTail="your celebration."
        intro="Got a Telugu Pelli Muhurtham, Muslim Nikkah & Walima, house Seemantham, Sanchaq night, or HITEC City summit coming up? Drop by Road No. 36 or write your dawat right below."
        image={{
          src: "/images/real-chowmahalla-palace.webp",
          alt: "Chowmahalla Palace Khilwat courtyard in Hyderabad",
          credit: creditForImage("/images/real-chowmahalla-palace.webp"),
        }}
      />

      {/* Studio directory + the dawat (form) */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <DepthJaali />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-5">
            <ArchFrame
              src="/images/irani-chai-mithai-parlor.webp"
              alt="Irani Chai and Osmania biscuits at the Jubilee Hills tasting studio"
              sizes="(max-width: 1024px) 80vw, 30vw"
              className="mx-auto aspect-[3/3.4] w-full max-w-[340px]"
            />

            <div>
              <h2 className="border-b border-brass/30 pb-4 font-display text-3xl font-medium text-ink">
                Drop by <span className="italic text-ruby">our studios</span>
              </h2>
              <div className="divide-y divide-brass/25">
                <div className="flex items-start gap-4 py-6">
                  <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                  <div>
                    <span className={KICKER}>Design &amp; Food Tasting Studio</span>
                    <h3 className="font-display text-2xl font-medium text-ink">Jubilee Hills Studio</h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed tabular-nums text-ink-muted">Road No. 36, Jubilee Hills, Hyderabad 500033</p>
                    <p className="mt-1.5 font-sans text-xs text-ink-muted">Irani Chai &amp; Filter Kaapi always pouring — quick prior ping helps!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-6">
                  <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                  <div>
                    <span className={KICKER}>Corporate Events Desk</span>
                    <h3 className="font-display text-2xl font-medium text-ink">Financial District Hub</h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed tabular-nums text-ink-muted">Nanakramguda, Gachibowli, Hyderabad 500032</p>
                    <p className="mt-1.5 font-sans text-xs text-ink-muted">Easy stops for HITEC City &amp; HICC summit meetings.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="border-b border-brass/30 pb-4 font-display text-3xl font-medium text-ink">
                Quick <span className="italic text-ruby">numbers</span>
              </h2>
              <div className="divide-y divide-brass/25 font-sans text-sm">
                <div className="flex items-start gap-4 py-5">
                  <Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                  <div>
                    <span className={KICKER}>Phone &amp; WhatsApp</span>
                    <a href={`tel:${STUDIO_PHONE_TEL}`} className="block font-medium tabular-nums text-ink transition-colors hover:text-ruby">
                      {STUDIO_PHONE_DISPLAY}
                    </a>
                    <a href="tel:+914023456789" className="mt-1 block text-xs tabular-nums text-ink-muted transition-colors hover:text-ink">
                      +91 40 2345 6789 (Jubilee Hills Landline)
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                  <div>
                    <span className={KICKER}>Email</span>
                    <a href="mailto:celebrations@tehzaa.com" className="font-medium text-ink transition-colors hover:text-ruby">
                      celebrations@tehzaa.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <Clock aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                  <div>
                    <span className={KICKER}>Studio Timings</span>
                    <p className="tabular-nums text-ink">Monday – Sunday: 10:00 AM – 8:30 PM IST</p>
                    <p className="mt-1 text-xs text-ink-muted">Happy to stay later for after-work family Zoom/studio chats!</p>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-editorial-dark w-full py-4">
                  <MessageCircle aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                  <span>Ping Us Directly on WhatsApp</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <DawatFormEnvelope>
              <ContactForm />
            </DawatFormEnvelope>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-marble-warm py-20 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-8 px-5 sm:px-8">
          <SceneHeading
            kicker="Quick answers before you visit"
            title="Helpful things to"
            italicTail="know upfront."
            intro="Clear timelines, live food tastings at Road No. 36, and transparent studio planning across Hyderabad & Secunderabad."
          />
          <ThreadFaq items={CONSULTATION_FAQS.map((f) => ({ q: f.question, a: f.answer }))} />
        </div>
      </section>
    </div>
  );
}
