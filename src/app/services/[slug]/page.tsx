import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
  Calendar,
  MapPin,
  HelpCircle,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { CulinaryMenuExplorer } from "@/components/services/CulinaryMenuExplorer";

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
        "Can you craft traditional Telugu Kalyana Mandapams and Pelli Pandiris as well as Nikkah or Jaimala stages?",
      answer:
        "Yes. Our floral architects design authentic South Indian banana-stalk, coconut-frond, and jasmine-curtain Pelli Pandiris with sacred mango-leaf toranams, alongside scalloped Nikkah and Walima arches, North Indian Jaimala pavilions, Christian altar florals, and Anand Karaj courtyard canopies.",
    },
    {
      question:
        "How early should we reserve Tehzaa for auspicious Muhurtham and winter wedding dates in Hyderabad?",
      answer:
        "For peak Muhurtham and winter wedding dates (October through March), we recommend reaching out 3 to 6 months in advance so we can secure cold-chain floral sourcing and dedicate our lead production artisans to your family.",
    },
    {
      question:
        "How do fresh jasmine, marigold, and rose installations stay vibrant through morning rituals and evening receptions?",
      answer:
        "We source daily from regional growers, condition stems via refrigerated transport, and station an on-site botanical team to mist, hydrate, and refresh garlands and mandap drapes between ceremonial hours.",
    },
    {
      question:
        "Do you provide mood boards and spatial elevation drawings before installation?",
      answer:
        "Yes. Every design commission includes curated fabric and botanical swatches at our Jubilee Hills studio along with scaled venue layouts and 3D perspective visualizations.",
    },
  ],
  "catering-services": [
    {
      question:
        "Do you maintain separate kitchens for Pure Vegetarian and Sattvic Jain menus alongside Hyderabadi Dum feasts?",
      answer:
        "Strictly yes. Our Pure Vegetarian and Jain-friendly kitchens operate with completely segregated cookware, utensils, preparation zones, service brassware, and dedicated halwais—ensuring zero cross-contact for traditional Telugu Vindhu Bhojanam and Marwari ceremonial meals.",
    },
    {
      question:
        "Are both traditional Telugu Banana-Leaf Vindhu Bhojanam and Hyderabadi copper-deg Dum Biryani prepared fresh on site?",
      answer:
        "Yes. Our culinary brigade includes regional Telugu Vindhu chefs preparing fresh Gutti Vankaya, Pulihora, Mamidikaya Pappu, and Bobbatlu alongside master Hyderabadi khansamas slow-cooking Kachche Gosht ki Dum Biryani and Pathar ka Gosht on site.",
    },
    {
      question:
        "Can our family schedule a private menu tasting before finalizing the dishes?",
      answer:
        "We host curated private tastings for key family decision-makers or corporate committees so you can refine spice profiles, regional dishes, and dessert pairings prior to the event.",
    },
    {
      question:
        "Do you accommodate live interactive stations such as Old Delhi Chaat, Filter Kaapi, and Irani Chai?",
      answer:
        "Yes. We custom-build interactive culinary counters including Old Delhi Chaat Gali, brass-tumbler Filter Kaapi, Irani Chai with Osmania biscuits, charcoal tandoor grills, and global Pan-Asian or Italian stations.",
    },
  ],
  baraat: [
    {
      question:
        "Do you support both North Indian Baraat processions and traditional South Indian ceremonial welcomes?",
      answer:
        "Yes. From energetic Punjabi dhol and brass-band Baraats with vintage tourers or Bagghi carriages to traditional South Indian Pallaki processions accompanied by classical Nadaswaram-Thavil and Hyderabadi Marfa troupes, we choreograph each tradition authentically.",
    },
    {
      question:
        "Are your cold sparklers and atmospheric low-fog effects approved for indoor Hyderabad hotel ballrooms?",
      answer:
        "Yes. We use venue-certified, smokeless cold sparkler fountains and clean dry-ice low-fog systems compliant with safety standards across Taj Krishna, ITC Kohenur, Park Hyatt, and HICC.",
    },
    {
      question:
        "What is included in a custom Bridal Phoolon Ki Chadar or Pallaki walkway?",
      answer:
        "We hand-weave fresh tube-rose, jasmine, and rose Phoolon ki Chadar canopies or floral Pallaki palanquins, paired with live shehnai, flute, or acoustic violinists and coordinated family escort cues.",
    },
    {
      question:
        "How do you manage Baraat route timing and venue-gate coordination?",
      answer:
        "Dedicated route stewards manage sound boundaries, lighting rigs, guest pacing, and venue security handoffs so the Baraat arrives right on your Muhurtham or Jaimala schedule.",
    },
  ],
  "corporate-events": [
    {
      question:
        "Which Hyderabad convention centers and business hotels do you regularly produce at?",
      answer:
        "We regularly design and execute summits, launches, and galas at HICC Novotel in HITEC City, ITC Kohenur in Gachibowli, Sheraton Financial District, Park Hyatt, and Taj Krishna.",
    },
    {
      question:
        "Do you provide complete stage fabrication, P2.5/P3 LED walls, and hybrid broadcast AV?",
      answer:
        "Yes. Our technical production wing delivers custom scenic stage builds, wide-format LED keynote backdrops, line-array audio engineering, confidence monitors, and multi-camera live streaming.",
    },
    {
      question:
        "How do you handle high-volume delegate registration and VIP speaker hospitality?",
      answer:
        "We deploy QR-enabled check-in desks, branded delegate badging, multilingual floor concierges, private greenroom lounges for leadership speakers, and curated Hyderabadi executive gifting.",
    },
    {
      question:
        "Can you transition a daytime conference hall into an evening gala dinner smoothly?",
      answer:
        "Yes. Our turnaround crews orchestrate lighting shifts, table resets, acoustic staging, and curated multi-cuisine dinner service during scheduled networking breaks.",
    },
  ],
  "family-celebrations": [
    {
      question:
        "Do you style traditional family ceremonies like Seemantham, Namakaranam, and Gruhapravesham at home?",
      answer:
        "Yes. We specialize in intimate residential courtyards and boutique banquet rooms—styling fresh mango-leaf toranams, floral swings, brass lamps, traditional seating, and home-style vegetarian feasts.",
    },
    {
      question:
        "Can you produce weekend celebrations at private farmhouses in Gandipet, Moinabad, or Shamshabad?",
      answer:
        "Completely. We bring full turnkey infrastructure to private villas and farmhouses, including fairy-light canopies, poolside lounge cabanas, acoustic sound setups, power backup, and mobile kitchens.",
    },
    {
      question:
        "What entertainment and keepsakes work well for Silver and Golden Anniversaries or 1st Birthdays?",
      answer:
        "For milestone anniversaries we curate archival family portrait walls, live ghazal or classical ensembles, and seated multi-generational dinners; for 1st birthdays we craft storybook pastel installations and interactive family activities.",
    },
    {
      question:
        "What guest count range do you work with for private social gatherings?",
      answer:
        "We bring the same level of refinement to intimate 25-guest terrace soirées as we do to 400-guest milestone anniversary galas.",
    },
  ],
};

function getRelatedGalleryItems(serviceId: string): GalleryItem[] {
  if (serviceId === "floral-decorations") {
    return GALLERY_ITEMS.filter(
      (item) =>
        item.category === "Floral" ||
        item.tags.some(
          (t) =>
            t.toLowerCase().includes("mandapam") ||
            t.toLowerCase().includes("floral") ||
            t.toLowerCase().includes("marigold")
        )
    );
  }
  if (serviceId === "catering-services") {
    return GALLERY_ITEMS.filter((item) => item.category === "Catering");
  }
  if (serviceId === "baraat") {
    return GALLERY_ITEMS.filter(
      (item) =>
        item.tags.some(
          (t) =>
            t.toLowerCase().includes("baraat") ||
            t.toLowerCase().includes("bridal") ||
            t.toLowerCase().includes("chadar")
        ) || item.category === "Weddings"
    );
  }
  if (serviceId === "corporate-events") {
    return GALLERY_ITEMS.filter((item) => item.category === "Corporate");
  }
  if (serviceId === "family-celebrations") {
    return GALLERY_ITEMS.filter((item) => item.category === "Family");
  }
  return GALLERY_ITEMS.slice(0, 3);
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

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal">
      {/* Editorial Split Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-gold/25">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 text-xs text-taupe-dark mb-8"
        >
          <Link href="/" className="hover:text-burgundy transition-colors">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="w-3 h-3 text-gold/60" />
          <Link href="/services" className="hover:text-burgundy transition-colors">
            Services
          </Link>
          <ChevronRight aria-hidden="true" className="w-3 h-3 text-gold/60" />
          <span className="text-charcoal font-medium" aria-current="page">{service.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Typography */}
          <div className="lg:col-span-6 space-y-6">
            <span className="editorial-kicker block">{service.subtitle}</span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-charcoal tracking-tight leading-[1.08]">
              {service.title}
            </h1>

            <p className="text-base text-charcoal/80 leading-relaxed font-sans">
              {service.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {service.startingPrice && (
                <span className="px-4 py-2 rounded-md bg-cream border border-gold/30 text-xs font-semibold text-burgundy tabular-nums">
                  Commissions from {service.startingPrice}
                </span>
              )}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cream border border-gold/25 text-xs text-charcoal/80">
                <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                Hyderabad &amp; Secunderabad
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-dark active:scale-[0.98] text-cream text-xs font-medium transition-[background-color,transform] duration-200"
              >
                <span>Request Custom Proposal</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
              </Link>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  `Hello Tehzaa Celebrations, I would like to inquire about ${service.title} in Hyderabad.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gold/40 text-charcoal hover:bg-cream text-xs font-medium transition-colors"
              >
                <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Right Framed Hero Photograph */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/30 bg-cream shadow-luxury">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section Jump Navigation */}
        <nav
          aria-label="Service sections"
          className="mt-10 pt-6 border-t border-gold/20 flex flex-wrap items-center gap-2"
        >
          {service.menuCollections && service.menuCollections.length > 0 && (
            <a
              href="#culinary-collections-heading"
              className="px-3.5 py-1.5 rounded-lg bg-cream border border-gold/25 hover:border-burgundy/50 text-xs font-medium text-charcoal/85 hover:text-burgundy transition-colors"
            >
              Culinary Menus
            </a>
          )}
          <a
            href="#service-offerings"
            className="px-3.5 py-1.5 rounded-lg bg-cream border border-gold/25 hover:border-burgundy/50 text-xs font-medium text-charcoal/85 hover:text-burgundy transition-colors"
          >
            Offerings &amp; Scope
          </a>
          <a
            href="#service-process"
            className="px-3.5 py-1.5 rounded-lg bg-cream border border-gold/25 hover:border-burgundy/50 text-xs font-medium text-charcoal/85 hover:text-burgundy transition-colors"
          >
            Our Process
          </a>
          <a
            href="#service-faqs"
            className="px-3.5 py-1.5 rounded-lg bg-cream border border-gold/25 hover:border-burgundy/50 text-xs font-medium text-charcoal/85 hover:text-burgundy transition-colors"
          >
            FAQs
          </a>
        </nav>
      </section>

      {/* Main Two-Column Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Primary Column (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Editorial Narrative */}
            <section className="space-y-4">
              <span className="editorial-kicker block">
                The Tehzaa perspective
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal leading-tight">
                Honoring Heritage with{" "}
                <span className="text-burgundy">Unstated</span> Poise
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                {service.fullDescription}
              </p>
            </section>

            {/* Catering Menu Collections Explorer (Rendered for Catering) */}
            {service.menuCollections && service.menuCollections.length > 0 && (
              <CulinaryMenuExplorer collections={service.menuCollections} />
            )}

            {/* Service-Specific Offerings */}
            <section id="service-offerings" className="space-y-8">
              <div className="border-b border-gold/25 pb-4">
                <span className="editorial-kicker block mb-2">
                  Scope of craft
                </span>
                <h2 className="font-serif text-3xl font-normal text-charcoal">
                  Curated Offerings &amp; Specifications
                </h2>
              </div>

              <div className="space-y-6">
                {service.offerings.map((offering, idx) => (
                  <div
                    key={offering.title}
                    className="p-6 sm:p-8 rounded-xl bg-cream border border-gold/25 space-y-4"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-xl text-gold-dark tabular-nums">
                        0{idx + 1}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                        {offering.title}
                      </h3>
                    </div>

                    <p className="text-sm text-charcoal/75 leading-relaxed">
                      {offering.description}
                    </p>

                    <div className="pt-4 border-t border-gold/20 space-y-2">
                      {offering.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-3 text-xs sm:text-sm text-charcoal/90"
                        >
                          <Check aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Visual Archive Trio */}
            {service.galleryImages.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-end justify-between border-b border-gold/25 pb-4">
                  <div>
                    <span className="editorial-kicker block mb-2">
                      Visual study
                    </span>
                    <h2 className="font-serif text-3xl font-normal text-charcoal">
                      Atmosphere &amp; Staging
                    </h2>
                  </div>
                  <Link
                    href="/gallery"
                    className="text-xs font-medium text-burgundy hover:text-gold-dark inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Full gallery</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.galleryImages.map((img, i) => (
                    <div
                      key={`${img}-${i}`}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/25 bg-cream"
                    >
                      <Image
                        src={img}
                        alt={`${service.title} visual study ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Showcase from gallery.ts */}
            {relatedGallery.length > 0 && (
              <section className="space-y-6">
                <div className="border-b border-gold/25 pb-4">
                  <span className="editorial-kicker block mb-2">
                    Curated portfolio
                  </span>
                  <h2 className="font-serif text-3xl font-normal text-charcoal">
                    Related Celebrations Across Hyderabad
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedGallery.slice(0, 2).map((item) => (
                    <Link
                      key={item.id}
                      href="/gallery"
                      className="group rounded-xl border border-gold/25 bg-cream overflow-hidden flex flex-col hover:border-gold/60 transition-colors"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 35vw"
                          className="object-cover"
                        />
                        <span className="absolute top-3 left-3 rounded-md bg-ivory/95 border border-gold/30 text-charcoal text-xs font-medium px-3 py-1">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="font-serif text-xl font-normal text-charcoal group-hover:text-burgundy transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-charcoal/75 mt-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-taupe-dark font-medium">
                          <span className="inline-flex items-center gap-1">
                            <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                            {item.venue}
                          </span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 4-Step Execution Workflow */}
            <section id="service-process" className="rounded-2xl border border-gold/25 bg-cream p-6 sm:p-10 space-y-8">
              <div className="border-b border-gold/20 pb-4">
                <span className="editorial-kicker block mb-2">
                  Our process
                </span>
                <h2 className="font-serif text-3xl font-normal text-charcoal">
                  From First Conversation to Celebration
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  {
                    step: "01",
                    title: "Consultation & Cultural Alignment",
                    text: "We meet at our Jubilee Hills studio or your venue to understand family customs, guest hospitality expectations, and architectural flow.",
                  },
                  {
                    step: "02",
                    title: "Design Boards & Private Tastings",
                    text: "Botanical color palettes, spatial drawings, and curated culinary tastings align every sense prior to production.",
                  },
                  {
                    step: "03",
                    title: "Pre-Production & Logistics",
                    text: "Vendor scheduling, cold-chain floral sourcing, kitchen segregation, and venue load-in permissions are locked down calmly.",
                  },
                  {
                    step: "04",
                    title: "On-Site Direction",
                    text: "Senior directors supervise every cue, ceremony timing, and hospitality detail so your family enjoys every moment.",
                  },
                ].map((item) => (
                  <div key={item.step} className="space-y-2">
                    <span className="font-serif text-2xl text-gold-dark tabular-nums block">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* All-Community FAQs */}
            <section id="service-faqs" className="space-y-6">
              <div className="border-b border-gold/25 pb-4">
                <span className="editorial-kicker block mb-2">
                  Questions &amp; answers
                </span>
                <h2 className="font-serif text-3xl font-normal text-charcoal">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="p-6 rounded-xl bg-cream border border-gold/25 space-y-2"
                  >
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal flex items-start gap-3">
                      <HelpCircle aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark shrink-0 mt-1" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/80 pl-7 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Editorial Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Consultation Card */}
              <div className="rounded-2xl bg-emerald-deep text-ivory p-7 sm:p-8 border border-gold/30 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs text-gold-light font-medium block">
                    Hyderabad private concierge
                  </span>
                  <h3 className="font-serif text-3xl font-normal text-cream">
                    Commission This Service
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    Connect with our design directors and culinary leads for a tailored proposal and venue walkthrough.
                  </p>
                </div>

                {service.startingPrice && (
                  <div className="p-4 rounded-xl bg-emerald-dark/60 border border-ivory/15">
                    <span className="text-xs text-ivory-dark block">
                      Starting investment
                    </span>
                    <span className="font-serif text-2xl font-normal text-cream mt-1 block tabular-nums">
                      {service.startingPrice}
                    </span>
                    <span className="text-xs text-ivory/75 block mt-1">
                      Itemized proposal tailored to guest count &amp; venue
                    </span>
                  </div>
                )}

                <div className="space-y-3 text-xs border-t border-ivory/15 pt-4 text-ivory/85">
                  <div className="flex items-center gap-3">
                    <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-ivory-dark shrink-0" />
                    <span>Jubilee Hills • Banjara Hills • Financial District</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-ivory-dark shrink-0" />
                    <span>Transparent itemized estimates &amp; venue compliance</span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-ivory hover:bg-cream text-charcoal font-medium text-xs transition-colors"
                  >
                    <Calendar aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    <span>Schedule Consultation</span>
                  </Link>

                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                      `Hello Tehzaa Celebrations, I am interested in ${service.title} for an upcoming event in Hyderabad.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-ivory/30 text-xs font-medium text-ivory hover:bg-ivory/10 transition-colors"
                  >
                    <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Ideal Occasions */}
              <div className="rounded-xl bg-cream p-6 border border-gold/25 space-y-4">
                <h4 className="font-serif text-lg font-medium text-burgundy">
                  Ideal Ceremonies &amp; Occasions
                </h4>
                <ul className="space-y-2">
                  {service.idealFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-xs sm:text-sm text-charcoal/85"
                    >
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Disciplines */}
              <div className="rounded-xl bg-cream p-6 border border-gold/25 space-y-3">
                <h4 className="text-xs font-medium text-taupe-dark">
                  Other celebration disciplines
                </h4>
                <div className="divide-y divide-gold/15">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      href={`/services/${other.slug}`}
                      className="flex items-center justify-between text-xs sm:text-sm text-charcoal/85 hover:text-burgundy py-3 transition-colors group"
                    >
                      <span>{other.title}</span>
                      <ChevronRight aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
