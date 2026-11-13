import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { SERVICES } from "@/data/services";
import { GALLERY_ITEMS } from "@/data/gallery";
import { TESTIMONIALS } from "@/data/testimonials";
import { InteractiveHero } from "@/components/home/InteractiveHero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { InteractiveBrandStory } from "@/components/home/InteractiveBrandStory";
import { InteractiveDisciplines } from "@/components/home/InteractiveDisciplines";
import { HomeCulinaryStage } from "@/components/home/HomeCulinaryStage";
import { ParallaxGalleryShowcase } from "@/components/home/ParallaxGalleryShowcase";
import { AnimatedPlanningTimeline } from "@/components/home/AnimatedPlanningTimeline";
import { InteractiveTestimonials } from "@/components/home/InteractiveTestimonials";
import { MotionReveal } from "@/components/home/MotionReveal";

export default function HomePage() {
  const pillars = [
    {
      num: "01",
      title: "Pan-Cultural Fluency",
      description:
        "Deep familiarity with Telugu Muhurtham customs, Marwari & Punjabi rituals, Deccani Nikkah & Walima etiquette, Christian vows, and Anand Karaj ceremonies.",
    },
    {
      num: "02",
      title: "Bespoke Spatial Artistry",
      description:
        "Custom-proportioned mandaps, carved floral pandiris, and architectural drapery crafted fresh for each venue’s light and landscape.",
    },
    {
      num: "03",
      title: "Authentic & Segregated Kitchens",
      description:
        "Copper-deg Hyderabadi feasts and traditional banana-leaf Vindhu Bhojanam prepared alongside dedicated Pure Vegetarian & Jain cookware.",
    },
    {
      num: "04",
      title: "Transparent Curation",
      description:
        "Clear, itemized production plans and milestone schedules designed so host families enjoy unhurried clarity from day one.",
    },
    {
      num: "05",
      title: "Hyderabad Venue Mastery",
      description:
        "Coordinated operations across Jubilee Hills estates, Banjara Hills heritage palaces, HICC convention halls, and Gandipet lakefront retreats.",
    },
    {
      num: "06",
      title: "Unobtrusive Concierge",
      description:
        "Calm, disciplined on-ground directors guiding processions, elders’ comfort, artist cues, and guest hospitality behind the scenes.",
    },
  ];

  const hyderabadAreas = [
    { name: "Jubilee Hills", note: "Private villas, studios & boutique clubs" },
    { name: "Banjara Hills", note: "Heritage palace lawns & grand ballrooms" },
    { name: "Gachibowli", note: "Luxury convention hotels & banquet suites" },
    { name: "HITEC City", note: "Enterprise summits & leadership galas" },
    { name: "Madhapur", note: "Contemporary lifestyle venues & terraces" },
    { name: "Kondapur", note: "Spacious mandapams & garden conventions" },
    { name: "Secunderabad", note: "Historic cantonment clubs & estates" },
    { name: "Shamshabad", note: "Destination resorts & lakeside farmhouses" },
  ];

  return (
    <div className="flex flex-col w-full bg-ivory text-charcoal">
      {/* 1. Scroll-Parallax & Live Scene Switcher Hero */}
      <InteractiveHero />

      {/* 2. Kinetic Celebration Tradition Ribbon */}
      <BrandMarquee />

      {/* 3. Dual-Frame Parallax Brand Story & Rotating Atelier Seal */}
      <InteractiveBrandStory />

      {/* 4. Sticky Split-Stage Discipline Explorer */}
      <InteractiveDisciplines services={SERVICES} />

      {/* 5. Interactive Deep Emerald Indian & Hyderabadi Culinary Stage */}
      <HomeCulinaryStage />

      {/* 6. Staggered Scroll-Parallax Portfolio & Category Quick-Filter */}
      <ParallaxGalleryShowcase items={GALLERY_ITEMS} />

      {/* 7. Why Choose Tehzaa + Scroll-Animated 4-Step Planning Timeline */}
      <section className="py-24 lg:py-32 bg-cream border-y border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
              <div className="lg:col-span-7">
                <p className="editorial-kicker mb-3">Why families trust Tehzaa</p>
                <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.08]">
                  Quiet Rigor Behind{" "}
                  <span className="text-burgundy">Every Detail</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-charcoal/75 max-w-xl leading-relaxed">
                  Every floral arch, segregated kitchen, and ceremonial cue is orchestrated by dedicated specialists so your family hosts without hurry.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gold/25 bg-ivory">
                  <Image
                    src="/images/haldi-mehendi-courtyard.webp"
                    alt="Sunlit marigold Haldi and Mehendi courtyard styled by Tehzaa Celebrations"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
              {pillars.map((pillar, idx) => (
                <MotionReveal key={pillar.num} delay={idx * 0.04}>
                  <div className="pt-6 border-t border-gold/25 space-y-2 group">
                    <span className="font-serif text-lg text-gold-dark tabular-nums block group-hover:text-burgundy transition-colors">
                      {pillar.num}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-charcoal">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>

          <AnimatedPlanningTimeline />
        </div>
      </section>

      {/* 8. Interactive Editorial Client Reflections */}
      <InteractiveTestimonials testimonials={TESTIMONIALS} />

      {/* 9. Hyderabad Coverage & Serene Final CTA */}
      <section className="py-24 lg:py-32 bg-cream border-t border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p className="editorial-kicker mb-2">Service presence</p>
                <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-4xl text-charcoal">
                  Serving Every Precinct of the{" "}
                  <span className="text-burgundy">Twin Cities</span>
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-taupe-dark">
                <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                <span>Studio: Road No. 36, Jubilee Hills</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {hyderabadAreas.map((area, idx) => (
                <MotionReveal key={area.name} delay={idx * 0.03}>
                  <div className="p-5 rounded-xl bg-ivory border border-gold/25 hover:border-burgundy/40 transition-colors space-y-1 h-full">
                    <h3 className="font-serif text-lg font-medium text-charcoal">
                      {area.name}
                    </h3>
                    <p className="text-xs text-taupe-dark leading-relaxed">
                      {area.note}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>

          {/* Serene Consultation CTA */}
          <div className="rounded-2xl bg-ivory border border-gold/30 shadow-royale overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] bg-charcoal">
                <Image
                  src="/images/nikkah-walima-arch.webp"
                  alt="Architectural floral celebration arch curated by Tehzaa Celebrations in Hyderabad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
                <div>
                  <p className="editorial-kicker mb-3">Private consultations</p>
                  <h2 className="font-serif font-medium tracking-[-0.02em] text-3xl sm:text-5xl text-charcoal leading-[1.08]">
                    Begin Planning Your{" "}
                    <span className="text-burgundy">Celebration</span>
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-charcoal/75 max-w-xl leading-relaxed">
                  Share your wedding dates, ceremonial traditions, or corporate gathering
                  brief with our Hyderabad concierge team for a tailored proposal and menu
                  tasting.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-dark active:scale-[0.98] text-ivory text-sm font-medium transition-[background-color,transform] duration-200"
                  >
                    <span>Plan Your Event</span>
                    <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                  </Link>
                  <a
                    href="tel:+919876543210"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gold/40 hover:bg-ivory-dark/50 text-charcoal text-sm font-medium tabular-nums transition-colors duration-200"
                  >
                    <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                    <span>+91 98765 43210</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
