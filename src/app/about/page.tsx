import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import {
  CharminarSkylineCrest,
  DeccaniArchFrame,
  HeritageGreetingBanner,
  TehzeebDivider,
} from "@/components/deccani/DeccaniMotifs";
import { DeccaniCraftInteractive } from "@/components/about/DeccaniCraftInteractive";

export const metadata = {
  title: "About Us | Tehzaa Celebrations — Born & Based in Hyderabad",
  description:
    "Meet Tehzaa Celebrations in Jubilee Hills, Hyderabad. Honest planning, fresh flowers, isolated Veg/Non-Veg kitchens, and warm Ganga-Jamuni hospitality across all faiths.",
};

export default function AboutPage() {
  const values = [
    {
      num: "01",
      title: "Warmth Before Showoff",
      description:
        "Grand architecture means nothing if elders wait for water or cold plates. Respect and ease come first.",
    },
    {
      num: "02",
      title: "Fluency Across All Homes",
      description:
        "We know why Sanchaq thaals matter, when Telugu Jeelakarra-Bellam strikes, and how quiet an Anand Karaj morning should stay.",
    },
    {
      num: "03",
      title: "Zero Plastic Shortcuts",
      description:
        "Real mango leaves, fragrant morning jasmine, copper vessels, and breathable linen instead of recycled foam cutouts.",
    },
    {
      num: "04",
      title: "Relaxed Host Families",
      description:
        "When parents actually sit down and eat hot food alongside guests without checking watches, we know we nailed it.",
    },
  ];

  const teams = [
    {
      num: "01",
      label: "Decor & Floral Crew",
      title: "Telugu Mandapams, Nikkah Arches & Sunset Lawns",
      description:
        "Architects, flower weavers, and lighting riggers working together across Chowmahalla, Falaknuma, Taramati Baradari, and home terraces.",
      image: "/images/real-taramati-baradari.webp",
      alt: "Original photograph of Taramati Baradari twelve-arched pavilion overlooking Golconda corridor",
    },
    {
      num: "02",
      label: "Culinary Masters",
      title: "Deccani Khansamas + Separate Pure Veg Brigade",
      description:
        "Old-city coal-dum masters running hand in hand with Andhra-Telangana Arati Aku cooks and isolated Pure Veg / Jain kitchen leads.",
      image: "/images/hyd-muslim-dawat-spread.webp",
      alt: "Hyderabadi Dum Biryani, Sufiyani Biryani, Lukhmi, Pathar ka Gosht, and Qubani ka Meetha",
    },
    {
      num: "03",
      label: "Ground Directors",
      title: "Baraats, Marfa Bands & Clockwork Timing",
      description:
        "Calm onsite captains running sound limits, priest timing, Baraat queues, and HITEC City corporate audio cues seamlessly.",
      image: "/images/bridal-entry-indian.webp",
      alt: "Bridal entry beneath a cascading floral Phoolon ki Chadar",
    },
  ];

  return (
    <div className="bg-alabaster text-ink">
      {/* 1. Alabaster Architectural Header */}
      <section className="pt-28 lg:pt-32 pb-16 sm:pb-20 border-b border-stone-line bg-alabaster">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <HeritageGreetingBanner theme="light" />
              <span className="editorial-kicker block pt-1">
                Dil se Hyderabadi
              </span>
              <h1 className="display-hero text-ink">
                Real People Behind{" "}
                <span className="editorial-italic">
                  Hyderabad&apos;s Celebrations
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="editorial-body">
                A wedding, food, and event studio out of Road No. 36, Jubilee Hills — making multi-faith Hyderabadi celebrations joyful, easy, and deeply personal.
              </p>
            </div>
          </div>

          <div className="mt-12 gallery-frame shadow-gallery">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-limestone">
              <Image
                src="/images/real-chowmahalla-palace.webp"
                alt="Original photograph of Khilwat Mubarak at Chowmahalla Palace in Hyderabad showing butter-cream scalloped arches and lawns"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-3 pb-1 text-xs text-ink-subtle">
              <span className="font-medium text-ink">
                Chowmahalla Palace • Khilwat Mubarak, Old City
              </span>
              <span>Sailko / Wikimedia Commons (CC BY 3.0)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Silk Asymmetric Editorial Narrative */}
      <section className="py-20 lg:py-28 bg-silk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="editorial-kicker">How we work</p>
              <h2 className="display-section text-ink">
                One Crew That Speaks{" "}
                <span className="editorial-italic">
                  Every Tradition Fluently
                </span>
              </h2>
              <TehzeebDivider theme="light" className="justify-start max-w-xs" />

              <div className="space-y-4 editorial-body max-w-2xl">
                <p>
                  Inspired by{" "}
                  <strong className="font-semibold text-ink">Tehzeeb</strong>—plain old warmth, respect, and good manners—Tehzaa was born because planning a Hyderabad wedding shouldn&apos;t feel like herding ten stressed vendors.
                </p>
                <p>
                  One weekend our trucks deliver real green banana trunks &amp; 5 AM mallige flowers for a Telugu Muhurtham in Jubilee Hills; the next evening we&apos;re hanging Chowmahalla-style mogra garlands and opening copper Dum Biryani handis for a Banjara Hills Walima.
                </p>
                <p>
                  Drop by our Road No. 36 lounge anytime — you&apos;ll find floral swatches on one table, Filter Kaapi and Irani Chai pouring on another, and zero stiff corporate sales pitches!
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <DeccaniArchFrame variant="dome" theme="alabaster">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-limestone">
                  <Image
                    src="/images/real-charminar.webp"
                    alt="Original photograph of Charminar in Hyderabad showing all four minarets and Char Kaman beyond"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
              </DeccaniArchFrame>
              <p className="mt-3 text-xs text-ink-subtle text-center">
                Jubilee Hills Studio • Serving Every Corner of the Twin Cities
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-stone-line text-center space-y-3">
            <CharminarSkylineCrest theme="light" />
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-ink-subtle">
              Taramati Baradari • Kakatiya Gopuram • Charminar • Falaknuma • Sanctuaries
            </p>
          </div>
        </div>
      </section>

      {/* 3. Deep Obsidian Interactive Heritage Selector */}
      <DeccaniCraftInteractive />

      {/* 4. Hairline Values Grid on Warm Alabaster */}
      <section className="py-20 lg:py-24 bg-alabaster border-b border-stone-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="editorial-kicker block">No drama, only love</span>
            <h2 className="display-section text-ink">
              What Shapes{" "}
              <span className="editorial-italic">Every Celebration</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item) => (
              <div
                key={item.num}
                className="pt-6 border-t border-brass/50 space-y-3"
              >
                <span className="font-display text-2xl text-brass-dark tabular-nums block">
                  {item.num}
                </span>
                <h3 className="font-display text-2xl font-medium text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Teams Exhibition Plates on Limestone */}
      <section className="py-20 lg:py-24 bg-limestone border-b border-stone-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <p className="editorial-kicker">Three wings, one number</p>
            <h2 className="display-section text-ink">
              How Everything Comes{" "}
              <span className="editorial-italic">Together Smoothly</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teams.map((item) => (
              <article key={item.label} className="space-y-4">
                <div className="gallery-frame shadow-gallery">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-alabaster">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="editorial-kicker">{item.label}</p>
                    <span className="text-xs font-medium text-ink-subtle tabular-nums">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="display-card text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Jubilee Hills Studio Band */}
      <section className="py-20 lg:py-24 bg-silk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="editorial-kicker block">
            Jubilee Hills Studio Invitation
          </span>
          <h2 className="display-section text-ink">
            Come Visit Our{" "}
            <span className="editorial-italic">Jubilee Hills Studio</span>
          </h2>
          <p className="editorial-body max-w-xl mx-auto">
            Bring your parents, fiancé, or event committee over Irani Chai &amp; Filter Kaapi to test our food and pick flowers in person.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-editorial-dark w-full sm:w-auto">
              <span>Schedule a Visit</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </Link>
            <a
              href="tel:+919876543210"
              className="btn-editorial-outline w-full sm:w-auto tabular-nums"
            >
              <Phone aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-dark" />
              <span>+91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
