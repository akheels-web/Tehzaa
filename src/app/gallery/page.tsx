"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  PhoneCall,
  ArrowUpRight,
  Info,
} from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryItem,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

const VENUE_FILTERS = [
  "All Venues",
  "Taj Krishna",
  "ITC Kohenur",
  "Park Hyatt",
  "HICC Novotel",
  "JRC & Jubilee Hills",
  "Secunderabad & Begumpet",
  "Gandipet & Moinabad Farmhouses",
  "Financial District & Shamshabad",
];

function matchesVenueFilter(item: GalleryItem, filter: string): boolean {
  if (filter === "All Venues") return true;
  const venue = item.venue.toLowerCase();
  const location = item.location.toLowerCase();

  switch (filter) {
    case "Taj Krishna":
      return venue.includes("taj krishna");
    case "ITC Kohenur":
      return venue.includes("itc kohenur");
    case "Park Hyatt":
      return venue.includes("park hyatt");
    case "HICC Novotel":
      return venue.includes("hicc") || venue.includes("convention centre");
    case "JRC & Jubilee Hills":
      return venue.includes("jrc") || location.includes("jubilee hills");
    case "Secunderabad & Begumpet":
      return (
        location.includes("secunderabad") || location.includes("begumpet")
      );
    case "Gandipet & Moinabad Farmhouses":
      return (
        location.includes("gandipet") ||
        location.includes("moinabad") ||
        venue.includes("farmhouse") ||
        venue.includes("villa")
      );
    case "Financial District & Shamshabad":
      return (
        location.includes("financial district") ||
        location.includes("shamshabad")
      );
    default:
      return true;
  }
}

const MASONRY_ASPECTS = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[16/11]",
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");
  const initialCategory: GalleryCategory =
    initialCategoryParam &&
    (GALLERY_CATEGORIES as readonly string[]).includes(initialCategoryParam)
      ? (initialCategoryParam as GalleryCategory)
      : "All";

  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>(initialCategory);
  const [selectedVenue, setSelectedVenue] = useState<string>("All Venues");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (
      initialCategoryParam &&
      (GALLERY_CATEGORIES as readonly string[]).includes(initialCategoryParam)
    ) {
      setSelectedCategory(initialCategoryParam as GalleryCategory);
    }
  }, [initialCategoryParam]);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesVenue = matchesVenueFilter(item, selectedVenue);
      return matchesCategory && matchesVenue;
    });
  }, [selectedCategory, selectedVenue]);

  const handleOpenLightbox = (
    index: number,
    triggerEl: HTMLButtonElement | null
  ) => {
    triggerRef.current = triggerEl;
    setLightboxIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : (prev as number) - 1
    );
  }, [lightboxIndex, filteredItems.length]);

  const handleNextImage = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : (prev as number) + 1
    );
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [lightboxIndex !== null]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevImage();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextImage();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleCloseLightbox, handlePrevImage, handleNextImage]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  const currentItem: GalleryItem | null =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  return (
    <div className="pt-28 pb-24 bg-ivory text-charcoal min-h-screen">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-gold/25">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-3">
              <span className="editorial-kicker">
                Portfolio &amp; Visual Archive
              </span>
              <span className="h-px w-12 bg-gold/40" aria-hidden="true" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-charcoal tracking-tight leading-[1.08]">
              Celebrations Across{" "}
              <span className="text-burgundy">Hyderabad</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal/80 max-w-2xl leading-relaxed font-sans">
              A curated retrospective of sacred Kalyana Mandapams, scalloped Nikkah &amp; Walima pavilions, copper-deg Hyderabadi Dastarkhwans, Telugu Vindhu Bhojanam dining, HITEC City conferences, and intimate family blessings.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-dark text-cream text-xs font-semibold transition-colors"
            >
              <span>Discuss Your Vision</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>
        </div>

        {/* PRD Section 5 Editorial Transparency Note */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-cream border border-gold/25 flex items-start gap-3 text-xs sm:text-sm text-charcoal/75 leading-relaxed">
          <Info aria-hidden="true" className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-charcoal">
              Curated Showcase Note:
            </span>{" "}
            The gallery below presents illustrative celebration studies and signature architectural aesthetics produced across Hyderabad’s premier venues. Full private client wedding albums and unreleased family commissions are shared confidentially during in-person consultations at our Jubilee Hills studio.
          </p>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl bg-cream border border-gold/25 p-6 sm:p-8 space-y-6">
          {/* Category Tabs */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="editorial-kicker">Filter by Discipline</span>
              <span
                aria-live="polite"
                className="text-xs text-taupe-dark font-medium tabular-nums"
              >
                Showing {filteredItems.length} of {GALLERY_ITEMS.length} showcases
              </span>
            </div>

            <div
              role="group"
              aria-label="Filter showcases by discipline"
              className="flex flex-wrap gap-2"
            >
              {GALLERY_CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? GALLERY_ITEMS.length
                    : GALLERY_ITEMS.filter((i) => i.category === cat).length;
                const isActive = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedVenue("All Venues");
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors border flex items-center gap-2 cursor-pointer",
                      isActive
                        ? "bg-burgundy text-cream border-burgundy"
                        : "bg-ivory text-charcoal/80 border-gold/25 hover:border-gold/60 hover:text-charcoal"
                    )}
                  >
                    <span>{cat}</span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded tabular-nums",
                        isActive
                          ? "bg-cream/20 text-cream"
                          : "bg-charcoal/10 text-charcoal/70"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hyderabad Venue Filter Chips */}
          <div className="pt-5 border-t border-gold/20 space-y-3">
            <span className="text-xs font-medium text-taupe-dark block">
              Hyderabad Venue &amp; Neighbourhood
            </span>
            <div
              role="group"
              aria-label="Filter showcases by Hyderabad venue"
              className="flex flex-wrap gap-2"
            >
              {VENUE_FILTERS.map((venue) => {
                const isActive = selectedVenue === venue;
                return (
                  <button
                    key={venue}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedVenue(venue)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
                      isActive
                        ? "bg-emerald-deep text-ivory border-emerald-deep"
                        : "bg-ivory text-charcoal/75 border-gold/20 hover:border-gold/50 hover:text-charcoal"
                    )}
                  >
                    {venue}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {filteredItems.length === 0 ? (
          <div className="p-16 rounded-2xl bg-cream border border-gold/25 text-center space-y-4">
            <h2 className="font-serif text-3xl font-normal text-charcoal">
              No showcases match this combination
            </h2>
            <p className="text-sm text-charcoal/75 max-w-md mx-auto">
              Reset the discipline or venue filter to view all curated Hyderabad celebration studies.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedVenue("All Venues");
              }}
              className="px-6 py-3 rounded-lg bg-burgundy text-cream text-xs font-semibold hover:bg-burgundy-dark transition-colors cursor-pointer"
            >
              Show All Showcases
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => {
              const aspectClass =
                MASONRY_ASPECTS[index % MASONRY_ASPECTS.length];

              return (
                <article
                  key={item.id}
                  className="break-inside-avoid rounded-xl border border-gold/25 bg-cream overflow-hidden group transition-colors hover:border-gold/60"
                >
                  <button
                    type="button"
                    onClick={(e) => handleOpenLightbox(index, e.currentTarget)}
                    className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-burgundy"
                    aria-label={`Open full view of ${item.title}`}
                  >
                    {/* Image Viewport */}
                    <div
                      className={cn(
                        "relative w-full overflow-hidden bg-ivory",
                        aspectClass
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent opacity-40 group-hover:opacity-65 transition-opacity" />

                      <span className="absolute top-3 left-3 rounded-lg bg-ivory/95 border border-gold/30 text-charcoal text-xs font-medium px-3 py-1">
                        {item.category}
                      </span>

                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 p-2 rounded-lg bg-ivory/95 border border-gold/30 text-charcoal opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity"
                      >
                        <Maximize2 className="w-4 h-4 stroke-[1.5]" />
                      </span>
                    </div>

                    {/* Editorial Caption */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs text-gold-dark font-medium">
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5] shrink-0" />
                          {item.venue}
                        </span>
                        <span className="shrink-0 text-taupe-dark tabular-nums">
                          {item.date}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl font-normal text-charcoal group-hover:text-burgundy transition-colors leading-snug">
                        {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-gold/15 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-taupe-dark px-2.5 py-0.5 rounded bg-ivory border border-gold/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Keyboard-Accessible Full-Screen Lightbox Modal */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 sm:p-8"
          onClick={handleCloseLightbox}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl rounded-2xl bg-cream border border-gold/40 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold/25 bg-ivory text-charcoal">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-burgundy font-semibold">
                  {currentItem.category}
                </span>
                <span aria-hidden="true" className="text-gold/50">•</span>
                <span aria-live="polite" className="text-taupe-dark tabular-nums">
                  {(lightboxIndex ?? 0) + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs text-taupe-dark">
                  Arrow keys to browse • Esc to close
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-lg border border-gold/30 bg-cream text-charcoal hover:bg-burgundy hover:text-cream hover:border-burgundy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 flex flex-col">
              {/* Image Stage */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[55vh] bg-charcoal flex items-center justify-center">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  priority
                  className="object-contain"
                />

                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-ivory/90 border border-gold/40 text-charcoal hover:bg-burgundy hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                      aria-label="Previous showcase"
                    >
                      <ChevronLeft aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-ivory/90 border border-gold/40 text-charcoal hover:bg-burgundy hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
                      aria-label="Next showcase"
                    >
                      <ChevronRight aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  </>
                )}
              </div>

              {/* Narrative Footer */}
              <div className="p-6 sm:p-8 bg-cream border-t border-gold/25 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <h2
                      id="lightbox-title"
                      className="font-serif text-2xl sm:text-3xl font-normal text-charcoal"
                    >
                      {currentItem.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gold-dark font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                        {currentItem.venue}, {currentItem.location}
                      </span>
                      <span aria-hidden="true" className="text-gold/40">•</span>
                      <span className="tabular-nums">{currentItem.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 shrink-0">
                    <Link
                      href="/contact"
                      onClick={() => setLightboxIndex(null)}
                      className="px-5 py-2.5 rounded-lg bg-burgundy hover:bg-burgundy-dark text-cream text-xs font-semibold transition-colors"
                    >
                      Inquire for Similar Event
                    </Link>
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hello Tehzaa Celebrations, I loved the "${currentItem.title}" showcase at ${currentItem.venue}. I'd like to plan something similar.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg border border-gold/35 text-charcoal hover:bg-ivory text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                    >
                      <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-gold-dark" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {currentItem.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {currentItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-ivory border border-gold/25 text-xs text-taupe-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-2xl border border-gold/25 bg-emerald-deep text-ivory p-8 sm:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-medium text-ivory-dark block">
              Jubilee Hills Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-cream leading-tight">
              View Private Commissions &amp; Material Swatches in Person
            </h2>
            <p className="text-sm text-ivory/80 leading-relaxed">
              Visit our studio in Hyderabad to explore confidential family celebration albums, botanical pairings, and tailored culinary tastings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-ivory hover:bg-cream text-charcoal text-xs font-semibold transition-colors"
            >
              Book Private Consultation
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-lg border border-ivory/30 text-ivory hover:bg-ivory/10 text-xs font-medium transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-24 bg-ivory text-charcoal min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 w-64 rounded-lg bg-cream border border-gold/20 animate-pulse" />
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
