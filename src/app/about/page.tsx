import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CharminarSkylineCrest } from "@/components/deccani/DeccaniMotifs";
import { DeccaniCraftInteractive } from "@/components/about/DeccaniCraftInteractive";
import { PageHero } from "@/components/landing/primitives/PageHero";
import { SceneHeading } from "@/components/landing/primitives/SceneHeading";
import { ArchMedallionList } from "@/components/landing/primitives/ArchMedallionList";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { DepthJaali } from "@/components/landing/primitives/DepthJaali";
import { DawatnamaCTA } from "@/components/landing/DawatnamaCTA";
import { QissaThread, type QissaChapter } from "@/components/inner/QissaThread";
import { creditForImage } from "@/lib/landing/credits";

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

  const chapters: QissaChapter[] = [
    {
      title: "Born from tehzeeb",
      body: (
        <p>
          Inspired by <strong className="font-semibold text-ink">Tehzeeb</strong>—plain old warmth, respect, and good manners—Tehzaa
          was born because planning a Hyderabad wedding shouldn&apos;t feel like herding ten stressed vendors.
        </p>
      ),
      image: {
        src: "/images/real-charminar.webp",
        alt: "Charminar in Hyderabad with all four minarets and Char Kaman beyond",
        credit: creditForImage("/images/real-charminar.webp"),
      },
    },
    {
      title: "One weekend, two weddings",
      body: (
        <p>
          One weekend our trucks deliver real green banana trunks &amp; 5 AM mallige flowers for a Telugu Muhurtham in Jubilee Hills;
          the next evening we&apos;re hanging Chowmahalla-style mogra garlands and opening copper Dum Biryani handis for a Banjara Hills Walima.
        </p>
      ),
      image: {
        src: "/images/floral-mandap-indian.webp",
        alt: "A Telugu Pelli Pandiri mandapam dressed with banana trunks, marigolds and jasmine",
      },
    },
    {
      title: "Chai at Road No. 36",
      body: (
        <p>
          Drop by our Road No. 36 lounge anytime — you&apos;ll find floral swatches on one table, Filter Kaapi and Irani Chai pouring on
          another, and zero stiff corporate sales pitches!
        </p>
      ),
      image: {
        src: "/images/irani-chai-mithai-parlor.webp",
        alt: "Brass samovar pouring Irani Chai beside Osmania biscuits",
      },
    },
  ];

  return (
    <div className="bg-marble text-ink">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        kicker="Dil se Hyderabadi"
        title="Real people behind"
        italicTail="Hyderabad's celebrations."
        intro="A wedding, food, and event studio out of Road No. 36, Jubilee Hills — making multi-faith Hyderabadi celebrations joyful, easy, and deeply personal."
        image={{
          src: "/images/real-chowmahalla-palace.webp",
          alt: "Khilwat Mubarak at Chowmahalla Palace in Hyderabad with butter-cream scalloped arches and lawns",
          credit: creditForImage("/images/real-chowmahalla-palace.webp"),
        }}
        floating={[
          { src: "/images/hyd-muslim-dawat-spread.webp", alt: "" },
          { src: "/images/haldi-mehendi-courtyard.webp", alt: "" },
        ]}
      />

      {/* Our qissa */}
      <section className="relative overflow-hidden bg-marble py-20 lg:py-28">
        <DepthJaali />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SceneHeading kicker="How we work" title="One crew that speaks" italicTail="every tradition fluently." className="mb-16" />
          <QissaThread chapters={chapters} />
          <div className="mt-20 space-y-3 border-t border-brass/30 pt-10 text-center">
            <CharminarSkylineCrest theme="light" />
            <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
              Taramati Baradari • Kakatiya Gopuram • Charminar • Falaknuma • Sanctuaries
            </p>
          </div>
        </div>
      </section>

      <DeccaniCraftInteractive />

      {/* Values */}
      <section className="relative overflow-hidden bg-marble py-20 lg:py-24">
        <DepthJaali />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SceneHeading kicker="No drama, only love" title="What shapes" italicTail="every celebration." className="mb-14" />
          <ArchMedallionList items={values.map((v) => ({ title: v.title, body: v.description }))} columns={4} />
        </div>
      </section>

      {/* Teams */}
      <section className="bg-marble-warm py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SceneHeading kicker="Three wings, one number" title="How everything comes" italicTail="together smoothly." className="mb-14" />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {teams.map((item) => (
              <article key={item.label} className="space-y-4 text-center">
                <ArchFrame src={item.image} alt={item.alt} sizes="(max-width: 768px) 80vw, 30vw" className="mx-auto aspect-[3/3.7] w-full max-w-[320px]" />
                {creditForImage(item.image) && (
                  <p className="font-sans text-[10px] text-ink-muted">Photo: {creditForImage(item.image)}</p>
                )}
                <div className="space-y-2 pt-1">
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brass-dark">
                    {item.num} · {item.label}
                  </p>
                  <h3 className="font-display text-2xl font-medium leading-tight text-ink">{item.title}</h3>
                  <p className="mx-auto max-w-sm font-sans text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/contact" className="btn-editorial-dark">
              <span>Schedule a Studio Visit</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      <DawatnamaCTA />
    </div>
  );
}
