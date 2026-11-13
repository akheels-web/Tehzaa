import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export const metadata = {
  title: "About Us | Tehzaa Celebrations — The Philosophy of Tehzeeb in Hyderabad",
  description:
    "Discover Tehzaa Celebrations in Hyderabad. Rooted in the ethos of Tehzeeb, we craft luxury Telugu, North Indian, Hyderabadi, and multi-cultural weddings, culinary feasts, and corporate gatherings.",
};

export default function AboutPage() {
  const ethosPillars = [
    {
      num: "01",
      title: "Tehzeeb — Refinement & Warmth",
      description:
        "More than etiquette, Tehzeeb is the unspoken grace with which a host welcomes every generation—ensuring elders are honored, guests feel cherished, and every ritual unfolds calmly.",
    },
    {
      num: "02",
      title: "Rewayat — Living Cultural Fluency",
      description:
        "Hyderabad is a mosaic of heritage. Our team works fluently across Telugu Muhurtham customs, Marwari & Punjabi traditions, Deccani Nikkah & Walima rituals, Christian vows, and Anand Karaj ceremonies.",
    },
    {
      num: "03",
      title: "Nafees — Architectural Restraint",
      description:
        "True luxury breathes. We favor natural botanicals, hand-woven jasmine, raw brass, textured linens, and sculpted light over repetitive commercial templates.",
    },
    {
      num: "04",
      title: "Itminaan — Complete Peace of Mind",
      description:
        "From vendor logistics and venue clearances to segregated Pure Vegetarian kitchens and protocol timing, we carry the operational weight so your family stays present in the moment.",
    },
  ];

  const craftDisciplines = [
    {
      label: "Spatial & Floral Design",
      title: "Hand-Built Mandaps & Botanical Courtyards",
      description:
        "Our spatial architects study sightlines, natural daylight, and venue acoustics before sketching each Kalyana Mandapam, Nikkah canopy, or Haldi lounge—using fresh blooms sourced daily.",
      image: "/images/floral-mandap-indian.webp",
      alt: "Hand-crafted Indian floral mandap installation in Hyderabad",
    },
    {
      label: "Culinary & Kitchen Craft",
      title: "Authentic Regional Feasts Under One Roof",
      description:
        "Traditional Hyderabadi copper-deg dum cooking sits beside dedicated Telugu banana-leaf Vindhu kitchens, royal North Indian spreads, and strictly segregated Pure Vegetarian & Jain preparation zones.",
      image: "/images/catering-indian-thali.webp",
      alt: "Traditional Indian ceremonial banana-leaf Vindhu Bhojanam and thali",
    },
    {
      label: "Processions & Production",
      title: "Poise, Timing & Technical Precision",
      description:
        "Whether directing a jubilant Dhol-led Baraat, a serene Phoolon ki Chadar walkway, or an enterprise keynote in HITEC City, our production leads run every cue on disciplined timelines.",
      image: "/images/bridal-entry-indian.webp",
      alt: "Bridal arrival beneath a traditional floral chadar",
    },
  ];

  return (
    <div className="bg-ivory text-charcoal pt-24">
      {/* 1. Editorial Page Header */}
      <section className="py-16 sm:py-24 border-b border-gold/25 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-5">
              <p className="editorial-kicker">Our heritage &amp; philosophy</p>
              <h1 className="font-serif font-medium tracking-[-0.02em] text-4xl sm:text-6xl lg:text-[64px] leading-[1.06] text-charcoal">
                Where Grace Meets{" "}
                <span className="text-burgundy">Celebration</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed">
                An editorial wedding and event atelier in Hyderabad, shaped by cultural
                reverence, architectural beauty, and regional gastronomy.
              </p>
            </div>
          </div>

          <div className="mt-12 relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-gold/25">
            <Image
              src="/images/hero-indian-wedding.webp"
              alt="Candlelit heritage courtyard styled by Tehzaa Celebrations in Hyderabad"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Brand Story & Hyderabad Roots */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="editorial-kicker">The meaning of Tehzaa</p>
              <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.1]">
                An Ode to Hyderabad’s{" "}
                <span className="text-burgundy">Living Culture</span>
              </h2>
              <div className="hairline-divider w-24" />

              <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed max-w-2xl">
                <p>
                  Inspired by the Urdu word{" "}
                  <strong className="font-medium text-charcoal">Tehzeeb</strong>—meaning
                  refinement, dignity, and wholehearted hospitality—Tehzaa Celebrations
                  was conceived in Hyderabad to bring quiet artistry back to modern
                  gatherings.
                </p>
                <p>
                  Hyderabad itself is a city of extraordinary cultural harmony. Across
                  Jubilee Hills, Banjara Hills, Secunderabad, and Gachibowli, families
                  gather for dawn Telugu Muhurthams, marigold-draped Haldi mornings,
                  candlelit Nikkah evenings, Anand Karaj blessings, and milestone
                  enterprise summits.
                </p>
                <p>
                  From our design and tasting studio on Road No. 36, Jubilee Hills, our
                  architects, floral artisans, culinary directors, and event stewards work
                  as one cohesive house—translating each family’s heritage into spaces and
                  feasts that linger in memory long after the lights dim.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/25">
                <Image
                  src="/images/nikkah-walima-arch.webp"
                  alt="Architectural floral celebration arch curated in Hyderabad"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-taupe-dark">
                Jubilee Hills Design Studio • Financial District Operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision on Deep Emerald Band */}
      <section className="py-24 bg-emerald-deep text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-4 border-t border-ivory/25 pt-8">
              <p className="text-xs text-gold-light font-medium">
                Our mission
              </p>
              <h3 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-4xl text-ivory">
                To Honor Tradition with{" "}
                <span className="text-ivory-dark">Thoughtful Precision</span>
              </h3>
              <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
                To elevate weddings, family milestones, and corporate gatherings into
                calm, deeply personal experiences—combining bespoke architectural
                design, authentic regional kitchens, and behind-the-scenes stewardship
                so hosts can celebrate without worry.
              </p>
            </div>

            <div className="space-y-4 border-t border-ivory/25 pt-8">
              <p className="text-xs text-gold-light font-medium">
                Our vision
              </p>
              <h3 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-4xl text-ivory">
                Hyderabad’s Standard of{" "}
                <span className="text-ivory-dark">Quiet Luxury</span>
              </h3>
              <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
                To set the benchmark in South India for culturally fluent celebration
                design—celebrated equally for our respect toward sacred customs, our
                culinary authenticity across every Indian palate, and our architectural
                restraint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Guiding Principles */}
      <section className="py-24 lg:py-32 bg-cream border-b border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="editorial-kicker mb-3">Guiding values</p>
            <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.1]">
              The Principles That{" "}
              <span className="text-burgundy">Shape Our Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ethosPillars.map((item) => (
              <div
                key={item.num}
                className="pt-6 border-t border-gold/25 space-y-3"
              >
                <span className="font-serif text-lg text-gold-dark tabular-nums block">
                  {item.num}
                </span>
                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Approach to Event Perfection */}
      <section className="py-24 lg:py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="editorial-kicker mb-3">Our craft</p>
            <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.1]">
              Three Pillars of{" "}
              <span className="text-burgundy">Execution</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {craftDisciplines.map((item) => (
              <article key={item.label} className="space-y-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gold/25">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gold-dark font-medium">
                    {item.label}
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Consultation CTA */}
      <section className="py-20 sm:py-24 bg-cream border-t border-gold/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="editorial-kicker">Visit our studio</p>
          <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.1]">
            Let Us Host Your Family’s{" "}
            <span className="text-burgundy">Next Milestone</span>
          </h2>
          <p className="text-sm sm:text-base text-charcoal/75 max-w-xl mx-auto leading-relaxed">
            Meet our designers and culinary directors at our Jubilee Hills studio to review
            material swatches, spatial layouts, and curated tasting menus.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-dark active:scale-[0.98] text-ivory text-sm font-medium transition-[background-color,transform] duration-200"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </Link>
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold/40 hover:bg-ivory text-charcoal text-sm font-medium tabular-nums transition-colors duration-200"
            >
              <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
