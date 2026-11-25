import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SERVICES } from "@/data/services";
import { GALLERY_ITEMS } from "@/data/gallery";
import { TESTIMONIALS } from "@/data/testimonials";
import { ArchPortalHero } from "@/components/landing/ArchPortalHero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { PelliShaadiScene } from "@/components/landing/PelliShaadiScene";
import { InteractiveBrandStory } from "@/components/home/InteractiveBrandStory";
import { DarbarsGallery } from "@/components/landing/DarbarsGallery";
import { DegReveal } from "@/components/landing/DegReveal";
import { ParallaxGalleryShowcase } from "@/components/home/ParallaxGalleryShowcase";
import { AnimatedPlanningTimeline } from "@/components/home/AnimatedPlanningTimeline";
import { RasmeinThread } from "@/components/landing/RasmeinThread";
import { DawatnamaCTA } from "@/components/landing/DawatnamaCTA";
import { VenueMap } from "@/components/landing/VenueMap";
import { MotionReveal } from "@/components/home/MotionReveal";
import { TehzeebDivider } from "@/components/deccani/DeccaniMotifs";

export default function HomePage() {
  const promises = [
    {
      num: "01",
      title: "Pelli, Shaadi & Everything In Between",
      description:
        "Telugu Muhurthams, Muslim Sanchaq & Walimas, Marwari Phere, Anand Karaj, Cathedral Vows — zero awkward guesswork.",
    },
    {
      num: "02",
      title: "Kirrak Original Sets",
      description:
        "No copy-pasted wedding stages. Fresh malli, banti puvvu, white arches, and real chandeliers tailored to your venue.",
    },
    {
      num: "03",
      title: "Bilkul Alag Veg & Non-Veg Kitchens",
      description:
        "Coal-dum Biryani khansamas and banana-leaf Vindhu cooks working cleanly apart — zero mixing ever.",
    },
    {
      num: "04",
      title: "Clean Itemized Quotes",
      description:
        "Honest numbers upfront with zero sneaky last-minute add-ons when wedding week hits.",
    },
    {
      num: "05",
      title: "Every Hyderabad Palace & Villa",
      description:
        "Smooth logistics at Chowmahalla, Taj Falaknuma, Taramati Baradari, Taj Krishna, JRC, HICC, and Gandipet farmhouses.",
    },
    {
      num: "06",
      title: "Parents Actually Enjoy Too",
      description:
        "Calm ground directors handle band timings, elders' comfort, and vendor cues so your family stays on the dance floor.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-alabaster text-ink">
      {/* 1. Cinematic Deep Obsidian Hero with Charminar & Chowmahalla */}
      <ArchPortalHero />

      {/* 2. Limestone Architectural Highlights Ribbon */}
      <BrandMarquee />

      {/* 3. Warm Alabaster Interactive Split-Curtain Telugu Pelli vs Muslim Shaadi Explorer */}
      <PelliShaadiScene />

      <DarbarsGallery />

      <DegReveal />

      <VenueMap />

      <RasmeinThread />

      <DawatnamaCTA />

      {/* 4. Limestone Editorial Hyderabad Studio Story */}
      <InteractiveBrandStory />

      {/* 5. Warm Alabaster Five Services Index Lookbook */}

      {/* 6. Deep Obsidian Fine-Dining Culinary Stage (Biryani Bina Dawat? Nakko Ji!) */}

      {/* 7. Warm Alabaster Staggered Photo Scrapbook */}
      <ParallaxGalleryShowcase items={GALLERY_ITEMS} />

      {/* 8. Silk White Promises + Animated Planning Journey */}
      <section className="py-20 lg:py-28 bg-silk text-ink border-b border-stone-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
              <div className="lg:col-span-7 space-y-2.5">
                <span className="editorial-kicker block">
                  Six promises from our team
                </span>
                <h2 className="display-section text-ink">
                  Full Dhamaka,{" "}
                  <span className="editorial-italic">Zero Tension.</span>
                </h2>
                <p className="pt-2 editorial-body max-w-xl">
                  You shouldn&apos;t be stressed about flower trucks or cold Biryani at your own family wedding. Leave the headache to us!
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="gallery-frame bg-alabaster shadow-gallery">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-limestone">
                    <Image
                      src="/images/haldi-mehendi-courtyard.webp"
                      alt="Sunlit marigold Haldi and Manjha courtyard styled by Tehzaa in Hyderabad"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {promises.map((item, idx) => (
                <MotionReveal key={item.num} delay={idx * 0.04}>
                  <div className="pt-5 border-t border-stone-line space-y-2">
                    <span className="font-display text-xl text-brass-dark tabular-nums block">
                      {item.num}
                    </span>
                    <h3 className="font-display text-2xl font-medium text-ink">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>

          <AnimatedPlanningTimeline />
        </div>
      </section>

      {/* 9. Limestone Hand-Signed Wedding Guestbook */}

      {/* 10. Deep Obsidian Authentic Hyderabad Monuments Exhibition */}

      {/* 11. Warm Alabaster Architectural Taj Falaknuma Invitation CTA */}
      <section className="py-20 lg:py-28 bg-alabaster text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-stone-line bg-silk p-3 sm:p-4 rounded-[2px] shadow-gallery">
            <div className="border border-brass/30 overflow-hidden bg-silk">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] bg-limestone">
                  <Image
                    src="/images/real-falaknuma-palace.webp"
                    alt="Original photograph of Taj Falaknuma Palace white Palladian colonnade and double marble staircase in Hyderabad"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>

                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
                  <TehzeebDivider theme="light" className="justify-start max-w-[180px]" />

                  <div>
                    <span className="editorial-kicker block mb-2.5">
                      Chai pe milenge?
                    </span>
                    <h2 className="display-section text-ink">
                      Let&apos;s Talk About{" "}
                      <span className="editorial-italic">Your Big Day!</span>
                    </h2>
                  </div>

                  <p className="editorial-body max-w-xl">
                    Got wedding dates, looking at Chowmahalla or Falaknuma, or want to sample our Biryani and Telugu Vindhu first? Drop by our Jubilee Hills studio over Irani Chai or ping us right here.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link href="/contact" className="btn-editorial-dark group">
                      <span>Plan Your Event</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                    <a
                      href="tel:+919876543210"
                      className="btn-editorial-outline tabular-nums"
                    >
                      <Phone
                        aria-hidden="true"
                        className="w-4 h-4 stroke-[1.5] text-brass-dark"
                      />
                      <span>+91 98765 43210</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
