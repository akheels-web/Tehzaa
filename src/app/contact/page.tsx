import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Event Concierge | Tehzaa Celebrations Hyderabad",
  description:
    "Schedule a private consultation with Tehzaa Celebrations in Hyderabad. Visit our Jubilee Hills or Financial District studios, or share your wedding, ceremonial, or corporate event enquiry online.",
  keywords: [
    "Tehzaa Celebrations Contact",
    "Hyderabad Wedding Planners",
    "Telugu Wedding Planners Hyderabad",
    "Jubilee Hills Event Atelier",
    "Luxury Event Management Hyderabad",
    "Book Tehzaa Consultation",
  ],
};

const CONSULTATION_FAQS = [
  {
    question: "How far in advance should we schedule a consultation?",
    answer:
      "For auspicious Muhurtham dates, multi-day weddings, and peak winter seasons in Hyderabad, we recommend reaching out four to eight months ahead. For intimate family ceremonies, corporate summits, and floral commissions, two to four weeks notice allows coordinated execution.",
  },
  {
    question: "Do your kitchens accommodate Pure Vegetarian, Jain, and regional cuisines?",
    answer:
      "Yes. We operate dedicated culinary wings for Telugu Vindhu Bhojanam on banana leaf, traditional Hyderabadi Dum delicacies, North Indian & Rajasthani spreads, as well as strict Pure Vegetarian and Jain (no-onion, no-garlic) kitchens with separate cookware.",
  },
  {
    question: "Do you curate celebrations across all communities and outside Hyderabad?",
    answer:
      "Our curators design celebrations rooted in Telugu, Marwari, Punjabi, Hyderabadi, Christian, Sikh, and contemporary traditions. While our ateliers are in Hyderabad, we regularly produce destination weddings across Telangana, Rajasthan, and Goa.",
  },
  {
    question: "What happens after I submit this consultation enquiry?",
    answer:
      "You immediately receive a unique Reference ID on screen. Our senior concierge reviews your preferred date and venue and connects via WhatsApp or telephone within two business hours to arrange a private design salon.",
  },
];

export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hello Tehzaa Celebrations, I would like to schedule a private consultation for an upcoming celebration in Hyderabad."
    );

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* 1. Editorial Hero Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 border-b border-gold/25 bg-ivory-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="editorial-kicker mb-4">
                Hyderabad Atelier • Private Concierge
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-charcoal leading-[1.12]">
                Where Every Tradition{" "}
                <span className="font-medium text-burgundy">
                  Finds Its Grace
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-taupe-dark font-normal leading-relaxed max-w-2xl">
                Inspired by timeless Indian hospitality and the quiet elegance of{" "}
                <span className="font-serif text-charcoal">Tehzeeb</span>. From
                auspicious Telugu Muhurthams and vibrant Sangeet festivities to
                gracious Hyderabadi receptions and HITEC City corporate galas, our
                curators welcome your family to our Jubilee Hills studio.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-gold/30 bg-cream shadow-luxury">
                <Image
                  src="/images/floral-mandap-indian.webp"
                  alt="Tehzaa Celebrations Jubilee Hills design salon and floral mandap craftsmanship"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Editorial Grid: Offices & ContactForm */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studios, Direct Concierge & Philosophy */}
          <div className="lg:col-span-5 space-y-12">
            {/* Hyderabad Studios */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal pb-4 border-b border-gold/25">
                Hyderabad <span className="text-burgundy">Studios</span>
              </h2>

              <div className="divide-y divide-gold/20">
                <div className="py-6 flex items-start gap-4">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-xs text-gold-dark font-medium block mb-1">
                      Boutique Experience Studio
                    </span>
                    <h3 className="font-serif text-xl text-charcoal font-normal">
                      Jubilee Hills Atelier
                    </h3>
                    <p className="text-sm text-taupe-dark leading-relaxed mt-1 tabular-nums">
                      Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                    </p>
                    <p className="text-xs text-taupe-dark mt-2">
                      Private floral &amp; menu consultations by prior appointment.
                    </p>
                  </div>
                </div>

                <div className="py-6 flex items-start gap-4">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-xs text-gold-dark font-medium block mb-1">
                      Corporate Operations Desk
                    </span>
                    <h3 className="font-serif text-xl text-charcoal font-normal">
                      Financial District Hub
                    </h3>
                    <p className="text-sm text-taupe-dark leading-relaxed mt-1 tabular-nums">
                      Financial District, Nanakramguda, Gachibowli, Hyderabad
                      500032
                    </p>
                    <p className="text-xs text-taupe-dark mt-2">
                      Executive summits, tech conferences &amp; hospitality
                      staging.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Communications */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal pb-4 border-b border-gold/25">
                Direct <span className="text-burgundy">Concierge</span>
              </h2>

              <div className="divide-y divide-gold/20 text-sm">
                <div className="py-5 flex items-start gap-4">
                  <Phone aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-xs text-taupe-dark font-medium block mb-1">
                      Telephone &amp; WhatsApp
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="text-charcoal font-medium hover:text-burgundy transition-colors block tabular-nums"
                    >
                      +91 98765 43210
                    </a>
                    <a
                      href="tel:+914023456789"
                      className="text-taupe-dark text-xs hover:text-burgundy transition-colors block mt-1 tabular-nums"
                    >
                      +91 40 2345 6789 (Studio Landline)
                    </a>
                  </div>
                </div>

                <div className="py-5 flex items-start gap-4">
                  <Mail aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-xs text-taupe-dark font-medium block mb-1">
                      Electronic Mail
                    </span>
                    <a
                      href="mailto:celebrations@tehzaa.com"
                      className="text-charcoal font-medium hover:text-burgundy transition-colors"
                    >
                      celebrations@tehzaa.com
                    </a>
                  </div>
                </div>

                <div className="py-5 flex items-start gap-4">
                  <Clock aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 mt-1 stroke-[1.5]" />
                  <div>
                    <span className="text-xs text-taupe-dark font-medium block mb-1">
                      Consultation Hours
                    </span>
                    <p className="text-charcoal font-normal tabular-nums">
                      Monday – Sunday: 10:00 AM – 8:30 PM IST
                    </p>
                    <p className="text-xs text-taupe-dark mt-1">
                      Evening family salon appointments available on request.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-lg border border-emerald-deep/35 bg-ivory-light hover:bg-emerald-deep hover:text-ivory-light text-emerald-deep text-xs font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <MessageCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                  <span>Message Concierge on WhatsApp</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] opacity-75" />
                </a>
              </div>
            </div>

            {/* Atelier Commitments */}
            <div className="pt-2 border-t border-gold/25">
              <span className="editorial-kicker block mb-4">
                The Tehzaa Standard
              </span>
              <ul className="space-y-4 text-xs text-taupe-dark leading-relaxed">
                <li className="pb-3 border-b border-gold/15">
                  <strong className="text-charcoal font-medium block mb-1">
                    Cultural &amp; Ceremonial Fluency
                  </strong>
                  Dedicated expertise across Telugu, North Indian, Marwari,
                  Punjabi, Hyderabadi, Christian, and Sikh wedding protocols.
                </li>
                <li className="pb-3 border-b border-gold/15">
                  <strong className="text-charcoal font-medium block mb-1">
                    Single-Point Creative Direction
                  </strong>
                  One senior curator oversees architectural floral design,
                  culinary tastings, and guest logistics from start to finish.
                </li>
                <li>
                  <strong className="text-charcoal font-medium block mb-1">
                    Transparent Itemized Budgets
                  </strong>
                  Detailed proposals without undisclosed vendor markups or
                  last-minute surprises.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive ContactForm */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 3. Consultation Guidance / FAQs */}
      <section className="py-20 bg-ivory-light border-t border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="editorial-kicker block mb-2">
              Curator Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
              Consultation &amp;{" "}
              <span className="font-medium text-burgundy">
                Planning Guidance
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 border-t border-gold/25 pt-10">
            {CONSULTATION_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="pb-8 border-b border-gold/20 space-y-2.5"
              >
                <h3 className="font-serif text-xl text-charcoal font-normal leading-snug">
                  {faq.question}
                </h3>
                <p className="text-sm text-taupe-dark leading-relaxed">
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
