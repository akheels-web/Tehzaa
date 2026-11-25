import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Calendar, MapPin, PhoneCall, ChevronRight, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { whatsappHref } from "@/lib/contact";
import { creditForImage } from "@/lib/landing/credits";
import { setupsForService } from "@/lib/landing/setups";
import { PageHero } from "@/components/landing/primitives/PageHero";
import { SceneHeading } from "@/components/landing/primitives/SceneHeading";
import { ThreadFaq } from "@/components/landing/primitives/ThreadFaq";
import { DepthJaali } from "@/components/landing/primitives/DepthJaali";
import { DawatnamaCTA } from "@/components/landing/DawatnamaCTA";
import { SetupsFilmstrip } from "@/components/inner/SetupsFilmstrip";
import { ProcessionLane } from "@/components/inner/ProcessionLane";
import { SHOWCASE_BY_SERVICE } from "@/data/showcase";
import { CulinaryMenuExplorer } from "@/components/services/CulinaryMenuExplorer";
import { CateringPageExperience } from "@/components/services/CateringPageExperience";
import { DecorTraditionStudio } from "@/components/services/DecorTraditionStudio";
import { DisciplineInteractiveShowcase } from "@/components/services/DisciplineInteractiveShowcase";

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
  const relatedGallery = setupsForService(service.id);
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

  const jumpLink =
    "border border-brass/40 bg-marble px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ruby hover:text-ruby";

  return (
    <div className="bg-marble text-ink">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        kicker={service.subtitle}
        title={service.title}
        intro={
          <>
            <p>{service.shortDescription}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-brass/30 py-3 text-sm font-medium tabular-nums text-ink">
              {service.startingPrice && <span>Packages from {service.startingPrice}</span>}
              <span className="inline-flex items-center gap-2 text-ink-muted">
                <MapPin aria-hidden="true" className="h-4 w-4 stroke-[1.5] text-ruby" />
                Across All of Hyderabad
              </span>
            </p>
          </>
        }
        image={{ src: service.heroImage, alt: service.title, credit: creditForImage(service.heroImage) }}
        floating={service.galleryImages.slice(1, 3).map((src) => ({ src, alt: "" }))}
        actions={
          <>
            <Link href="/contact" className="btn-editorial-dark">
              <span>Ask For Custom Quote</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
            </Link>
            <a
              href={whatsappHref(`Hi Tehzaa! Would love to chat about ${service.title} in Hyderabad.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-outline"
            >
              <PhoneCall aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              <span>WhatsApp Us</span>
            </a>
          </>
        }
      />

      {/* Section jump links */}
      <nav aria-label="Jump to section" className="border-y border-brass/30 bg-marble-warm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2.5 px-5 py-4 sm:px-8">
          <a href="#service-offerings" className={jumpLink}>
            What&apos;s Included
          </a>
          {relatedGallery.length > 0 && (
            <a href="#service-gallery" className={jumpLink}>
              Real Hyderabad Setups
            </a>
          )}
          {faqs.length > 0 && (
            <a href="#service-faqs" className={jumpLink}>
              Common Questions
            </a>
          )}
        </div>
      </nav>

      {/* Main column + concierge sidebar (overflow-clip, not hidden: hidden would break the sticky card) */}
      <section className="relative overflow-clip bg-marble py-16 lg:py-20">
        <DepthJaali />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-16 lg:col-span-8">
              <SceneHeading kicker="Why customers love this" title="Done with heart &" italicTail="proper Hyderabadi vibe." intro={service.fullDescription} />

              {/* Interactive world per service */}
              {service.id === "floral-decorations" && <DecorTraditionStudio />}
              {(service.id === "corporate-events" || service.id === "family-celebrations") && (
                <DisciplineInteractiveShowcase serviceId={service.id} />
              )}
              {service.menuCollections && service.menuCollections.length > 0 && (
                <CulinaryMenuExplorer collections={service.menuCollections} embedded />
              )}

              {/* Service breakdown */}
              <section id="service-offerings" className="scroll-mt-28 space-y-8">
                <SceneHeading kicker="Detailed breakdown" title="Everything we" italicTail="take care of." />
                <div className="space-y-6">
                  {service.offerings.map((offering, idx) => (
                    <div key={offering.title} className="space-y-4 border-[5px] border-white bg-white p-6 shadow-ruby outline outline-1 outline-offset-4 outline-brass/40 sm:p-8">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl italic tabular-nums text-ruby">0{idx + 1}</span>
                        <h3 className="font-display text-2xl font-medium text-ink">{offering.title}</h3>
                      </div>
                      <p className="font-sans text-sm leading-relaxed text-ink-muted sm:text-[15px]">{offering.description}</p>
                      <div className="space-y-2.5 border-t border-brass/25 pt-4">
                        {offering.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-3 font-sans text-xs text-ink sm:text-sm">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Concierge sidebar: other services first, then the sticky ivory card (gold border, ruby CTA) */}
            <aside className="space-y-6 lg:col-span-4">
              <div className="space-y-3 border border-brass/30 bg-marble-warm p-6">
                <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-brass-dark">See other things we handle</h4>
                <div className="divide-y divide-brass/25">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      href={`/services/${other.slug}`}
                      className="group flex items-center justify-between py-3 font-sans text-xs text-ink transition-colors hover:text-ruby sm:text-sm"
                    >
                      <span>{other.title}</span>
                      <ChevronRight aria-hidden="true" className="h-4 w-4 stroke-[1.5] text-brass transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="sticky top-28">
                <div className="space-y-6 border border-brass/60 bg-white p-7 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto shadow-ruby outline outline-1 outline-offset-4 outline-brass/30 sm:p-8">
                  <div className="space-y-2">
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brass-dark">Chai pe milenge</span>
                    <h3 className="font-display text-3xl font-medium leading-tight text-ink">
                      Let&apos;s quote this <span className="italic text-ruby">for you</span>
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-ink-muted sm:text-sm">
                      Tell us your guest count and dates — we&apos;ll send back clean numbers with zero hidden surprise fees.
                    </p>
                  </div>

                  {service.startingPrice && (
                    <div className="border border-brass/40 bg-marble p-4">
                      <span className="block font-sans text-[11px] uppercase tracking-[0.14em] text-ink-muted">Packages usually start at</span>
                      <span className="mt-1 block font-display text-3xl font-medium tabular-nums text-ruby">{service.startingPrice}</span>
                      <span className="mt-1 block font-sans text-xs text-ink-muted">Adjusted fairly to your venue &amp; menu</span>
                    </div>
                  )}

                  <div className="space-y-3 border-t border-brass/30 pt-4 font-sans text-xs text-ink-muted">
                    <div className="flex items-center gap-3">
                      <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                      <span>Jubilee Hills • Old City • HITEC City</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 stroke-[1.5] text-ruby" />
                      <span>Itemized transparency from day one</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <Link href="/contact" className="btn-editorial-dark w-full">
                      <Calendar aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                      <span>Book a Chat</span>
                    </Link>
                    <a
                      href={whatsappHref(`Hi Tehzaa! Interested in ${service.title} in Hyderabad.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-outline w-full"
                    >
                      <PhoneCall aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                      <span>WhatsApp Directly</span>
                    </a>
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Baraat signature: the procession (replaces the tabbed showcase on this page) */}
      {service.id === "baraat" && <ProcessionLane items={SHOWCASE_BY_SERVICE.baraat.items} />}

      {/* Real setups filmstrip */}
      {relatedGallery.length > 0 && (
        <section id="service-gallery" className="relative scroll-mt-20 overflow-hidden bg-marble-warm py-16 lg:py-20">
          <DepthJaali />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SceneHeading kicker="From the gallery" title="Real setups around" italicTail="Hyderabad." intro="Drag the strip, or use the arrows." />
              <Link href="/gallery" className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-ruby hover:text-ruby-dark">
                <span>See all</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              </Link>
            </div>
            <SetupsFilmstrip items={relatedGallery} label="Real Hyderabad setups" />
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="bg-marble py-16 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-8 px-5 sm:px-8">
            <SceneHeading kicker="Straight answers" title="Quick" italicTail="questions." />
            <ThreadFaq id="service-faqs" items={faqs.map((f) => ({ q: f.question, a: f.answer }))} className="scroll-mt-28" />
          </div>
        </section>
      )}

      <DawatnamaCTA />
    </div>
  );
}
