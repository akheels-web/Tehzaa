import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import type { ServiceCategory } from "@/data/services";
import { CulinaryMenuExplorer } from "@/components/services/CulinaryMenuExplorer";
import { whatsappHref } from "@/lib/contact";
import { PageHero } from "@/components/landing/primitives/PageHero";
import { SceneHeading } from "@/components/landing/primitives/SceneHeading";
import { ThreadFaq } from "@/components/landing/primitives/ThreadFaq";
import { ArchFrame } from "@/components/landing/primitives/ArchFrame";
import { DepthJaali } from "@/components/landing/primitives/DepthJaali";
import { CateringDegHero } from "@/components/inner/CateringDegHero";

interface CateringPageExperienceProps {
  service: ServiceCategory;
  faqs: { question: string; answer: string }[];
  otherServices: ServiceCategory[];
}

const VEG = {
  title: "Locked Pure Veg & Jain Wing",
  description:
    "Untouched cookware, separate prep chefs, and an isolated cooking zone for Telugu Pelli, Marwari, and Sattvic Jain feasts — zero non-veg cross-contact.",
};
const NON_VEG = {
  title: "Wood-Charcoal & Granite Hearth",
  description:
    "Atta-sealed copper degs steamed slow over tamarind-wood coals alongside heated black Deccani stone for smoky Pathar ka Gosht.",
};
const SHARED = {
  title: "Calm Hospitality Across Scale",
  description:
    "Paced banana-leaf sit-downs for 150 elders or 2,500-guest palace dastarkhwans from Jubilee Hills and Old City to Gachibowli.",
};

const MENU_ANCHOR = "culinary-collections-heading";

function Kitchen({
  tone,
  label,
  item,
  image,
  alt,
}: {
  tone: "veg" | "nonveg";
  label: string;
  item: { title: string; description: string };
  image: string;
  alt: string;
}) {
  const veg = tone === "veg";
  return (
    <article className="text-center">
      <ArchFrame src={image} alt={alt} sizes="(max-width: 768px) 80vw, 30vw" className="mx-auto aspect-[3/3.8] w-full max-w-[340px]" />
      <span
        className={
          "mt-6 inline-flex items-center gap-2 border px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] " +
          (veg ? "border-emerald-600/50 text-emerald-700" : "border-ruby/50 text-ruby")
        }
      >
        <span className={"h-2 w-2 rounded-full " + (veg ? "bg-emerald-600" : "bg-ruby")} aria-hidden="true" />
        {label}
      </span>
      <h3 className="mt-3 font-display text-3xl font-medium text-ink">{item.title}</h3>
      <p className="mx-auto mt-2 max-w-sm font-sans text-[15px] leading-relaxed text-ink-muted">{item.description}</p>
    </article>
  );
}

export function CateringPageExperience({ service, faqs, otherServices }: CateringPageExperienceProps) {
  return (
    <div className="bg-marble text-ink">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        kicker="Dil se Dawat"
        title="Hyderabadi Shaadi & Pelli"
        italicTail="catering."
        intro={
          <>
            <p>{service.shortDescription}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-brass/30 py-3 text-sm font-medium tabular-nums text-ink">
              <span>{service.startingPrice ? `Packages from ${service.startingPrice}` : "Tailored Wedding Menus"}</span>
              <span className="text-brass" aria-hidden="true">•</span>
              <span>100% Pure Veg Kitchens Available</span>
              <span className="text-brass" aria-hidden="true">•</span>
              <span>Live Degs &amp; Counters</span>
            </p>
          </>
        }
        side={<CateringDegHero menuAnchor={MENU_ANCHOR} />}
        actions={
          <>
            <a href={`#${MENU_ANCHOR}`} className="btn-editorial-dark">
              <span>Explore Menus</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
            </a>
            <Link href="/contact?eventType=Catering" className="btn-editorial-outline">
              <span>Book a Studio Tasting</span>
            </Link>
          </>
        }
      />

      {service.menuCollections && service.menuCollections.length > 0 && (
        <CulinaryMenuExplorer collections={service.menuCollections} />
      )}

      {/* Inside our kitchens: veg and non-veg, apart */}
      <section className="relative overflow-hidden bg-marble-warm py-20 lg:py-24">
        <DepthJaali />
        <div className="relative mx-auto max-w-6xl space-y-14 px-5 sm:px-8">
          <SceneHeading
            kicker="Inside our kitchens"
            title="Separate kitchens. Real fire."
            italicTail="Honest taste."
            align="center"
          />
          <div className="relative grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
            <span aria-hidden="true" className="absolute inset-y-6 left-1/2 hidden w-px bg-brass/50 md:block" />
            <Kitchen
              tone="veg"
              label="Veg kitchen"
              item={VEG}
              image="/images/catering-indian-thali.webp"
              alt="A pure vegetarian thali served from Tehzaa's separate veg kitchen"
            />
            <Kitchen
              tone="nonveg"
              label="Non-veg kitchen"
              item={NON_VEG}
              image="/images/hyderabadi-dum-biryani-deg.webp"
              alt="Coal-fired copper biryani handis sealed for slow dum service"
            />
          </div>

          {/* Shared standard, beneath both kitchens */}
          <div className="grid grid-cols-1 items-center gap-8 border-t border-brass/40 pt-10 sm:grid-cols-12">
            <div className="sm:col-span-4">
              <div className="border-[5px] border-white shadow-ruby">
                <div className="relative aspect-[16/11]">
                  <Image
                    src="/images/irani-chai-mithai-parlor.webp"
                    alt="Brass samovar Irani Chai with Osmania biscuits for guests of both kitchens"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-8">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brass-dark">Both kitchens</span>
              <h3 className="mt-2 font-display text-3xl font-medium text-ink">{SHARED.title}</h3>
              <p className="mt-2 max-w-xl font-sans text-[15px] leading-relaxed text-ink-muted">{SHARED.description}</p>
              <p className="mt-3 font-sans text-xs text-ink-muted">Brass samovar Irani Chai, crisp Osmania biscuits &amp; late-night Meetha Paan.</p>
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="bg-marble py-16 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-8 px-5 sm:px-8">
            <SceneHeading kicker="Straight answers" title="Catering questions" italicTail="families ask." />
            <ThreadFaq id="service-faqs" items={faqs.map((f) => ({ q: f.question, a: f.answer }))} className="scroll-mt-28" />
          </div>
        </section>
      )}

      {/* Tasting invitation + other services */}
      <section className="bg-marble-warm py-16 lg:py-24">
        <div className="mx-auto max-w-6xl space-y-12 px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 border-[6px] border-white bg-white p-8 shadow-ruby outline outline-1 outline-offset-4 outline-brass/40 sm:p-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <ArchFrame
                src="/images/catering-hyderabadi-feast.webp"
                alt="A Hyderabadi wedding feast laid out for a tasting"
                sizes="240px"
                className="mx-auto aspect-[3/4] w-full max-w-[220px]"
              />
            </div>
            <div className="space-y-4 lg:col-span-9">
              <SceneHeading
                kicker="Jubilee Hills kitchen studio"
                title="Taste the biryani & mirchi ka salan"
                italicTail="before you book."
                intro="Share your guest count and dates — we'll arrange a calm tasting session with our head khansama and pure-veg maharaj, plus clear per-plate pricing."
              />
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link href="/contact?eventType=Catering" className="btn-editorial-dark">
                  <span>Schedule a Food Tasting</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                </Link>
                <a
                  href={whatsappHref("Aadaab / Namaskaram Tehzaa! We would like to discuss wedding catering and book a menu tasting.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-outline"
                >
                  <PhoneCall aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
                  <span>WhatsApp Kitchen</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-brass/30 pt-6 sm:flex-row sm:items-center">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-brass-dark">Explore other disciplines</span>
            <div className="flex flex-wrap gap-2.5">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="border border-brass/40 bg-marble px-4 py-2 font-sans text-xs font-semibold tracking-[0.06em] text-ink transition-colors hover:border-ruby hover:text-ruby"
                >
                  {other.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
