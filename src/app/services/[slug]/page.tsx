import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
  Calendar,
  MapPin,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { CulinaryMenuExplorer } from "@/components/services/CulinaryMenuExplorer";
import { CateringPageExperience } from "@/components/services/CateringPageExperience";
import { DecorTraditionStudio } from "@/components/services/DecorTraditionStudio";
import { DisciplineInteractiveShowcase } from "@/components/services/DisciplineInteractiveShowcase";
import { DeccaniArchFrame } from "@/components/deccani/DeccaniMotifs";

const SLUG_TO_ID: Record<string, string> = {
  "floral-decor": "floral-decorations",
  "floral-event-decorations": "floral-decorations",
  catering: "catering-services",
  "catering-food-services": "catering-services",
  baraat: "baraat",
  "baraat-grand-entries": "baraat",
  "corporate-events": "corporate-events",
  "family-celebrations": "family-celebrations",
  "social-family-celebrations": "family-celebrations",
};

export function generateStaticParams() {
  return Object.keys(SLUG_TO_ID).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceId = SLUG_TO_ID[slug];
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    return {
      title: "Service Not Found | Tehzaa Celebrations",
    };
  }

  return {
    title: `${service.title} | Tehzaa Celebrations Hyderabad`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Tehzaa Celebrations Hyderabad`,
      description: service.shortDescription,
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

const SERVICE_FAQS: Record<string, ServiceFAQ[]> = {
  "floral-decorations": [
    {
      question:
        "Can you handle authentic Telugu Pelli Pandiri setups AND Hyderabadi Muslim Nikkah / Sanchaq decor?",
      answer:
        "Yes! We keep separate craft crews — one well-versed in banana trunks, mango thoranalu, Agni Kundam ventilation, and dawn jasmine strings; the other skilled in Chowmahalla arches, Belgian chandelier styling, Sanchaq thaal wrapping, and yellow gota-patti Manjha nights.",
    },
    {
      question:
        "Can you match real venues like Chowmahalla, Falaknuma, or Taramati Baradari without damaging heritage stonework?",
      answer:
        "100%. All our heritage frames use zero-bolt freestanding rigs and clean counterbalance bases approved by Falaknuma, Chowmahalla, Taj Krishna, and Archaeological rules at Taramati Baradari.",
    },
    {
      question:
        "How do you keep malli and rose garlands looking crisp during 5 AM Telugu Muhurthams or hot afternoon Haldis?",
      answer:
        "Flowers come straight off morning chillers in Jubilee Hills, and two botanical finishers stay backstage misting and swapping garlands right up until photos.",
    },
  ],
  "catering-services": [
    {
      question:
        "Do you really keep Pure Vegetarian and Jain cooking 100% separate from Mutton & Chicken Biryanis?",
      answer:
        "Hau ji — strictly separate! Isolated cooking wing, completely different brass & steel bartan (utensils), separate oil/ghee tins, and vegetarian-only halwais so neither spoon nor pan ever crosses.",
    },
    {
      question:
        "Can you serve both Hyderabadi Muslim Shaadi staples (Sufiyani, Pathar, Lukhmi, Qubani) AND authentic Telugu banana-leaf Vindhu?",
      answer:
        "Yes! Our Old-City Deccani khansamas prepare Mutton Dum Biryani, creamy Sufiyani Biryani, Saudi Champagne, Mutton Marag, and triple sweets; our Telugu kitchen serves full Arati Aku Vindhu from Mudda Pappu & Avakaya to Gutti Vankaya, Ulavacharu, and Pootharekulu.",
    },
    {
      question:
        "Can our elders come taste everything first at your Jubilee Hills kitchen?",
      answer:
        "Definitely! Use the Build Your Menu Card above, add up to 12 dishes you're curious about, and drop by Road No. 36 with family elders to taste and fine-tune every spice level.",
    },
  ],
  baraat: [
    {
      question:
        "Do you organize authentic Hyderabadi Tasha-Marfa as well as Punjabi Dhol Baraats and Nadaswaram?",
      answer:
        "Yes — whether your family dances to proper Hyderabadi Marfa, blasts Punjabi Dhol behind a vintage tourer or Bagghi carriage, or prefers classical morning Nadaswaram & Pallaki.",
    },
    {
      question:
        "Are your cold sparklers and mist cleared for indoor Hyderabad hotel ballrooms?",
      answer:
        "Everything we run indoors uses hotel-cleared smokeless cold sparks and dry-ice low fog certified by Taj Krishna, ITC Kohenur, Park Hyatt, and HICC.",
    },
  ],
  "corporate-events": [
    {
      question:
        "Which venues in Hyderabad do you work at for summits and client galas?",
      answer:
        "We regularly handle conferences at HICC Novotel, ITC Kohenur, and Sheraton Financial District, plus heritage evening buyouts at Taj Falaknuma Palace and Chowmahalla.",
    },
    {
      question:
        "Can you turn a serious tech conference room into a gala dinner on the same evening?",
      answer:
        "Yes — our standby staging team clears keynotes cleanly into dinner tablescapes during a 45-minute cocktail/chai break.",
    },
  ],
  "family-celebrations": [
    {
      question:
        "Will you take up smaller house functions like Seemantham, Sanchaq, Manjha, Aqiqah, or 80-person anniversaries?",
      answer:
        "Of course! Living rooms, society terraces, Moinabad villas, and boutique Banjara Hills lawns are half of what we love doing most.",
    },
    {
      question:
        "Do you handle cleanup when the guests leave late at night?",
      answer:
        "Yes — our teardown crew packs every flower stand and plate cleanly before checking out so homeowners wake up spotless.",
    },
  ],
};

function getRelatedGalleryItems(serviceId: string): GalleryItem[] {
  if (serviceId === "floral-decorations") {
    return GALLERY_ITEMS.filter(
      (item) => item.category === "Floral" || item.category === "Weddings"
    );
  }
  if (serviceId === "catering-services") {
    return GALLERY_ITEMS.filter((item) => item.category === "Catering");
  }
  if (serviceId === "baraat") {
    return GALLERY_ITEMS.filter((item) => item.category === "Weddings");
  }
  if (serviceId === "corporate-events") {
    return GALLERY_ITEMS.filter((item) => item.category === "Corporate");
  }
  if (serviceId === "family-celebrations") {
    return GALLERY_ITEMS.filter((item) => item.category === "Family");
  }
  return GALLERY_ITEMS.slice(0, 2);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceId = SLUG_TO_ID[slug];

  if (!serviceId) {
    notFound();
  }

  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  const faqs = SERVICE_FAQS[service.id] || [];
  const relatedGallery = getRelatedGalleryItems(service.id);
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  if (service.id === "catering-services") {
    return (
      <CateringPageExperience
        service={service}
        faqs={faqs}
        otherServices={otherServices}
      />
    );
  }

  return (
    <div className="bg-alabaster text-ink">
      {/* Band 1: Alabaster Split Editorial Hero */}
      <section className="pt-28 lg:pt-32 pb-16 border-b border-stone-line bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 text-xs font-medium text-ink-subtle mb-8"
          >
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="w-3 h-3 text-brass" />
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <ChevronRight aria-hidden="true" className="w-3 h-3 text-brass" />
            <span className="text-ink font-semibold" aria-current="page">
              {service.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="editorial-kicker block">{service.subtitle}</span>

              <h1 className="display-hero text-ink">{service.title}</h1>

              <p className="editorial-body">{service.shortDescription}</p>

              <div className="border-t border-b border-stone-line py-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-ink tabular-nums">
                {service.startingPrice && (
                  <span>Packages from {service.startingPrice}</span>
                )}
                {service.startingPrice && (
                  <span aria-hidden="true" className="text-brass">
                    •
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-ink-muted">
                  <MapPin
                    aria-hidden="true"
                    className="w-4 h-4 stroke-[1.5] text-brass"
                  />
                  Across All of Hyderabad
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link href="/contact" className="btn-editorial-dark">
                  <span>Ask For Custom Quote</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </Link>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hi Tehzaa! Would love to chat about ${service.title} in Hyderabad.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-outline"
                >
                  <PhoneCall
                    aria-hidden="true"
                    className="w-4 h-4 stroke-[1.5] text-brass"
                  />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <DeccaniArchFrame variant="mehrab" theme="alabaster">
                <div className="relative aspect-[16/10] w-full bg-limestone">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </DeccaniArchFrame>
            </div>
          </div>

          {/* Section Jump Links */}
          <nav
            aria-label="Jump to section"
            className="mt-10 pt-6 border-t border-stone-line flex flex-wrap items-center gap-2.5"
          >
            {service.menuCollections && service.menuCollections.length > 0 && (
              <a
                href="#culinary-collections-heading"
                className="px-4 py-2 rounded-[2px] bg-silk border border-stone-line hover:border-obsidian text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted hover:text-ink transition-colors"
              >
                Build Your Menu
              </a>
            )}
            <a
              href="#service-offerings"
              className="px-4 py-2 rounded-[2px] bg-silk border border-stone-line hover:border-obsidian text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted hover:text-ink transition-colors"
            >
              What&apos;s Included
            </a>
            {relatedGallery.length > 0 && (
              <a
                href="#service-gallery"
                className="px-4 py-2 rounded-[2px] bg-silk border border-stone-line hover:border-obsidian text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted hover:text-ink transition-colors"
              >
                Real Hyderabad Setups
              </a>
            )}
            <a
              href="#service-faqs"
              className="px-4 py-2 rounded-[2px] bg-silk border border-stone-line hover:border-obsidian text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted hover:text-ink transition-colors"
            >
              Common Questions
            </a>
          </nav>
        </div>
      </section>

      {/* Band 2: Silk White Main Atelier + Obsidian Concierge Sidebar */}
      <section className="bg-silk border-b border-stone-line py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-4">
                <span className="editorial-kicker block">
                  Why customers love this
                </span>
                <h2 className="display-section text-ink">
                  Done With{" "}
                  <span className="editorial-italic">
                    Heart &amp; Proper Hyderabadi Vibe
                  </span>
                </h2>
                <p className="editorial-body">{service.fullDescription}</p>
              </div>

              {/* Interactive Worlds per Service */}
              {service.id === "floral-decorations" && <DecorTraditionStudio />}

              {(service.id === "baraat" ||
                service.id === "corporate-events" ||
                service.id === "family-celebrations") && (
                <DisciplineInteractiveShowcase serviceId={service.id} />
              )}

              {service.menuCollections && service.menuCollections.length > 0 && (
                <CulinaryMenuExplorer
                  collections={service.menuCollections}
                  embedded
                />
              )}

              {/* Service Breakdown */}
              <section id="service-offerings" className="space-y-8">
                <div className="border-b border-stone-line pb-4">
                  <span className="editorial-kicker block mb-2">
                    Detailed breakdown
                  </span>
                  <h2 className="display-section text-ink">
                    Everything We{" "}
                    <span className="editorial-italic">Take Care Of</span>
                  </h2>
                </div>

                <div className="space-y-5">
                  {service.offerings.map((offering, idx) => (
                    <div
                      key={offering.title}
                      className="p-6 sm:p-8 rounded-[2px] bg-alabaster border border-stone-line space-y-4"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-2xl font-medium text-brass-dark tabular-nums">
                          0{idx + 1}
                        </span>
                        <h3 className="display-card text-ink">{offering.title}</h3>
                      </div>

                      <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                        {offering.description}
                      </p>

                      <div className="pt-4 border-t border-stone-line space-y-2.5">
                        {offering.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-3 text-xs sm:text-sm text-ink"
                          >
                            <Check
                              aria-hidden="true"
                              className="w-4 h-4 stroke-[1.5] text-brass shrink-0 mt-0.5"
                            />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Deep Obsidian Concierge Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-[2px] bg-obsidian text-ink-light p-7 sm:p-8 border border-obsidian-line shadow-obsidian space-y-6">
                  <div className="space-y-2">
                    <span className="editorial-kicker-light block">
                      Chai pe milenge
                    </span>
                    <h3 className="display-card text-ink-light">
                      Let&apos;s Quote This For You
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-lightMuted leading-relaxed">
                      Tell us your guest count and dates — we&apos;ll send back
                      clean numbers with zero hidden surprise fees.
                    </p>
                  </div>

                  {service.startingPrice && (
                    <div className="p-4 rounded-[2px] bg-obsidian-elevated border border-obsidian-line">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-ink-lightMuted block">
                        Packages usually start at
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-medium text-brass-light mt-1 block tabular-nums">
                        {service.startingPrice}
                      </span>
                      <span className="text-xs text-ink-lightMuted block mt-1">
                        Adjusted fairly to your venue &amp; menu
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 text-xs border-t border-obsidian-line pt-4 text-ink-lightMuted">
                    <div className="flex items-center gap-3">
                      <MapPin
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] text-brass-light shrink-0"
                      />
                      <span>Jubilee Hills • Old City • HITEC City</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] text-brass-light shrink-0"
                      />
                      <span>Itemized transparency from day one</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <Link href="/contact" className="btn-editorial-light w-full">
                      <Calendar aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                      <span>Book a Chat</span>
                    </Link>

                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hi Tehzaa! Interested in ${service.title} in Hyderabad.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-outline-dark w-full"
                    >
                      <PhoneCall
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] text-brass-light"
                      />
                      <span>WhatsApp Directly</span>
                    </a>
                  </div>
                </div>

                {/* Other Services Architectural Index */}
                <div className="rounded-[2px] bg-alabaster p-6 border border-stone-line space-y-3">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brass-dark">
                    See other things we handle
                  </h4>
                  <div className="divide-y divide-stone-line">
                    {otherServices.map((other) => (
                      <Link
                        key={other.id}
                        href={`/services/${other.slug}`}
                        className="flex items-center justify-between text-xs sm:text-sm text-ink hover:text-brass-dark py-3 transition-colors group"
                      >
                        <span>{other.title}</span>
                        <ChevronRight
                          aria-hidden="true"
                          className="w-4 h-4 stroke-[1.5] text-brass group-hover:translate-x-0.5 transition-transform duration-200"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Band 3: Deep Obsidian Related Work Exhibition */}
      {relatedGallery.length > 0 && (
        <section
          id="service-gallery"
          className="bg-obsidian text-ink-light py-16 lg:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-obsidian-line pb-5">
              <div>
                <span className="editorial-kicker-light block mb-2">
                  From the gallery
                </span>
                <h2 className="display-section text-ink-light">
                  Real Setups Around{" "}
                  <span className="font-display italic font-normal text-brass-light tracking-[-0.01em]">
                    Hyderabad
                  </span>
                </h2>
              </div>
              <Link
                href="/gallery"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-brass-light hover:text-ink-light inline-flex items-center gap-1.5 transition-colors"
              >
                <span>See all</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedGallery.slice(0, 2).map((item) => (
                <Link
                  key={item.id}
                  href="/gallery"
                  className="group rounded-[2px] border border-obsidian-line bg-obsidian-elevated overflow-hidden flex flex-col hover:border-brass/60 transition-colors"
                >
                  <div className="p-2.5">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 48vw"
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 rounded-[2px] bg-obsidian/90 border border-brass/40 text-brass-light text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1">
                        {item.tradition}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 pt-3 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="display-card text-ink-light group-hover:text-brass-light transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-lightMuted mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-obsidian-line flex items-center justify-between text-xs text-ink-lightMuted tabular-nums">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin
                          aria-hidden="true"
                          className="w-3.5 h-3.5 stroke-[1.5] text-brass-light"
                        />
                        {item.venue}
                      </span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Band 4: Limestone Hairline FAQs */}
      {faqs.length > 0 && (
        <section
          id="service-faqs"
          className="bg-limestone border-t border-stone-line py-16 lg:py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="editorial-kicker block">Straight answers</span>
              <h2 className="display-section text-ink">
                Quick <span className="editorial-italic">Questions</span>
              </h2>
            </div>

            <div className="divide-y divide-stone-line border-t border-b border-stone-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5 sm:py-6">
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 font-display text-xl sm:text-2xl font-medium text-ink">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="text-brass-dark group-open:rotate-45 transition-transform duration-200 font-sans text-xl leading-none shrink-0"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-[15px] text-ink-muted leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
