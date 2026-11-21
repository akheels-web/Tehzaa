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
  GALLERY_TRADITIONS,
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryTradition,
  GalleryItem,
} from "@/data/gallery";
import {
  DeccaniArchFrame,
  HeritageGreetingBanner,
} from "@/components/deccani/DeccaniMotifs";
import { cn } from "@/lib/utils";

const VENUE_FILTERS = [
  "All Venues",
  "Chowmahalla Palace",
  "Taj Falaknuma Palace",
  "Taramati Baradari",
  "Taj Krishna & Banjara Hills",
  "JRC & Jubilee Hills",
  "HICC & Gachibowli",
  "Gandipet & Moinabad",
  "Secunderabad & Begumpet",
];

function matchesVenueFilter(item: GalleryItem, filter: string): boolean {
  if (filter === "All Venues") return true;
  const venue = item.venue.toLowerCase();
  const location = item.location.toLowerCase();

  switch (filter) {
    case "Chowmahalla Palace":
      return venue.includes("chowmahalla");
    case "Taj Falaknuma Palace":
      return venue.includes("falaknuma");
    case "Taramati Baradari":
      return venue.includes("taramati");
    case "Taj Krishna & Banjara Hills":
      return venue.includes("taj krishna") || location.includes("banjara hills");
    case "JRC & Jubilee Hills":
      return venue.includes("jrc") || location.includes("jubilee hills");
    case "HICC & Gachibowli":
      return (
        venue.includes("hicc") ||
        venue.includes("convention centre") ||
        location.includes("gachibowli") ||
        location.includes("hitec") ||
        location.includes("financial district")
      );
    case "Gandipet & Moinabad":
      return (
        location.includes("gandipet") ||
        location.includes("moinabad") ||
        venue.includes("farmhouse") ||
        venue.includes("villa")
      );
    case "Secunderabad & Begumpet":
      return location.includes("secunderabad") || location.includes("begumpet");
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

function GallerySearchParamSync({
  onSelectCategory,
}: {
  onSelectCategory: (cat: GalleryCategory) => void;
}) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (
      categoryParam &&
      (GALLERY_CATEGORIES as readonly string[]).includes(categoryParam)
    ) {
      onSelectCategory(categoryParam as GalleryCategory);
    }
  }, [categoryParam, onSelectCategory]);

  return null;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("All");
  const [selectedTradition, setSelectedTradition] =
    useState<GalleryTradition>("All Traditions");
  const [selectedVenue, setSelectedVenue] = useState<string>("All Venues");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesTradition =
        selectedTradition === "All Traditions" ||
        item.tradition === selectedTradition;
      const matchesVenue = matchesVenueFilter(item, selectedVenue);
      return matchesCategory && matchesTradition && matchesVenue;
    });
  }, [selectedCategory, selectedTradition, selectedVenue]);

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

  const isLightboxOpen = lightboxIndex !== null;

  useEffect(() => {
    if (isLightboxOpen) {
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [isLightboxOpen]);

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
    <div className="bg-alabaster text-ink min-h-screen">
      <Suspense fallback={null}>
        <GallerySearchParamSync onSelectCategory={setSelectedCategory} />
      </Suspense>

      {/* 1. Alabaster Architectural Lookbook Header */}
      <section className="pt-28 lg:pt-32 pb-14 bg-alabaster border-b border-stone-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-5">
              <HeritageGreetingBanner theme="light" />

              <span className="editorial-kicker block pt-1">
                Real venues, real dawat
              </span>

              <h1 className="display-hero text-ink">
                Hyderabad&apos;s Best{" "}
                <span className="editorial-italic">Moments</span>
              </h1>

              <p className="editorial-body max-w-2xl">
                Browse Telugu Pelli Pandiris, Chowmahalla Nikkah courts, Taj Falaknuma marble receptions, Taramati Baradari sunsets, proper Shaadi &amp; Vindhu food spreads, and family ghar functions.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-editorial-dark">
                  <span>Plan Something Like This</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </div>
            </div>

            {/* Real Hyderabad Monument Double Plate */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-3 sm:gap-4 items-end">
              <div className="col-span-5">
                <DeccaniArchFrame variant="mehrab" theme="alabaster">
                  <div className="relative aspect-[3/4] w-full bg-limestone">
                    <Image
                      src="/images/real-charminar.webp"
                      alt="Original photograph of Charminar and Char Kaman in Old City Hyderabad"
                      fill
                      priority
                      sizes="(max-width: 1024px) 40vw, 18vw"
                      className="object-cover"
                    />
                  </div>
                </DeccaniArchFrame>
              </div>
              <div className="col-span-7 space-y-2">
                <div className="gallery-frame shadow-gallery">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-limestone">
                    <Image
                      src="/images/real-chowmahalla-palace.webp"
                      alt="Original photograph of Khilwat Mubarak courtyard at Chowmahalla Palace Hyderabad"
                      fill
                      priority
                      sizes="(max-width: 1024px) 60vw, 24vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-subtle tabular-nums">
                  Charminar • Chowmahalla Palace
                </p>
              </div>
            </div>
          </div>

          {/* Friendly Showcase Note */}
          <div className="mt-10 p-4 sm:p-5 rounded-[2px] bg-limestone/70 border border-stone-line border-l-2 border-l-brass flex items-start gap-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
            <Info aria-hidden="true" className="w-4 h-4 text-brass-dark shrink-0 mt-0.5 stroke-[1.5]" />
            <p>
              <span className="font-semibold text-ink">Heads up:</span> What you see below are showcase studies &amp; aesthetic previews across Hyderabad palaces. Full private family wedding albums stay confidential — drop by Road No. 36 in Jubilee Hills over chai to flip through those!
            </p>
          </div>
        </div>
      </section>

      {/* 2. Architectural Filter Controls on Limestone */}
      <section className="bg-limestone border-b border-stone-line py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Category Filters */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="editorial-kicker">Filter by category</span>
              <span
                aria-live="polite"
                className="text-xs text-ink-muted font-medium tabular-nums"
              >
                Showing {filteredItems.length} of {GALLERY_ITEMS.length}
              </span>
            </div>

            <div
              role="group"
              aria-label="Filter showcases by category"
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
                      "px-4 py-2 rounded-[2px] text-xs sm:text-sm font-medium transition-colors border flex items-center gap-2 cursor-pointer",
                      isActive
                        ? "bg-obsidian text-alabaster border-obsidian"
                        : "bg-silk text-ink-muted border-stone-line hover:border-obsidian hover:text-ink"
                    )}
                  >
                    <span>{cat}</span>
                    <span
                      className={cn(
                        "text-[11px] px-1.5 py-0.5 rounded-[2px] tabular-nums",
                        isActive
                          ? "bg-brass/25 text-brass-light"
                          : "bg-alabaster text-ink-subtle"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Community Filter */}
          <div className="pt-5 border-t border-stone-line space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle block">
              Pick by community or food vibe
            </span>
            <div
              role="group"
              aria-label="Filter showcases by tradition"
              className="flex flex-wrap gap-2"
            >
              {GALLERY_TRADITIONS.map((trad) => {
                const isActive = selectedTradition === trad;
                return (
                  <button
                    key={trad}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedTradition(trad)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-[2px] text-xs font-medium border transition-colors cursor-pointer",
                      isActive
                        ? "bg-obsidian text-alabaster border-obsidian"
                        : "bg-silk text-ink-muted border-stone-line hover:border-obsidian hover:text-ink"
                    )}
                  >
                    {trad}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palace & Venue Filters */}
          <div className="pt-5 border-t border-stone-line space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle block">
              Hyderabad Palace or Area
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
                      "px-3.5 py-1.5 rounded-[2px] text-xs font-medium border transition-colors cursor-pointer",
                      isActive
                        ? "bg-obsidian text-alabaster border-obsidian"
                        : "bg-silk text-ink-muted border-stone-line hover:border-obsidian hover:text-ink"
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

      {/* 3. Exhibition Plates Masonry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {filteredItems.length === 0 ? (
          <div className="p-14 sm:p-16 rounded-[2px] bg-silk border border-stone-line shadow-gallery text-center space-y-4">
            <h2 className="display-section text-ink">
              No matches for that combo yet!
            </h2>
            <p className="text-sm text-ink-muted max-w-md mx-auto">
              Clear the filters to see all our Hyderabad weddings, palaces, and catering spreads.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTradition("All Traditions");
                setSelectedVenue("All Venues");
              }}
              className="btn-editorial-dark cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-7 space-y-7">
            {filteredItems.map((item, index) => {
              const aspectClass =
                MASONRY_ASPECTS[index % MASONRY_ASPECTS.length];
              const plateNumber = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={item.id}
                  className="break-inside-avoid rounded-[2px] border border-stone-line bg-silk overflow-hidden group transition-colors hover:border-brass shadow-gallery"
                >
                  <button
                    type="button"
                    onClick={(e) => handleOpenLightbox(index, e.currentTarget)}
                    className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brass"
                    aria-label={`Open full photo of ${item.title}`}
                  >
                    <div className="p-3 pb-0">
                      <div
                        className={cn(
                          "relative w-full overflow-hidden bg-limestone",
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

                        <span className="absolute top-3 left-3 rounded-[2px] bg-alabaster/95 border border-stone-line text-ink text-[11px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1">
                          {item.category}
                        </span>

                        <span className="absolute top-3 right-3 rounded-[2px] bg-obsidian/85 text-alabaster text-[11px] font-medium px-2 py-0.5 tabular-nums">
                          {plateNumber}
                        </span>

                        <span
                          aria-hidden="true"
                          className="absolute bottom-3 right-3 p-2 rounded-[2px] bg-alabaster/95 border border-stone-line text-ink opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4 stroke-[1.5]" />
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs text-brass-dark font-medium">
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <MapPin aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
                          {item.venue}
                        </span>
                        <span className="shrink-0 text-ink-subtle tabular-nums">
                          {item.date}
                        </span>
                      </div>

                      <h2 className="display-card text-ink group-hover:text-brass-dark transition-colors">
                        {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-stone-line flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-ink-subtle px-2.5 py-0.5 rounded-[2px] bg-alabaster border border-stone-line"
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

      {/* Dramatic Deep Obsidian Full-Screen Lightbox */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-md p-4 sm:p-8"
          onClick={handleCloseLightbox}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl rounded-[2px] bg-obsidian-elevated border border-obsidian-line overflow-hidden shadow-obsidian flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-obsidian-line bg-obsidian text-ink-light">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-brass-light font-semibold uppercase tracking-[0.16em]">
                  {currentItem.tradition}
                </span>
                <span aria-hidden="true" className="text-obsidian-line">•</span>
                <span aria-live="polite" className="text-ink-lightMuted tabular-nums">
                  {(lightboxIndex ?? 0) + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-xs text-ink-lightMuted">
                  Arrow keys to browse • Esc to close
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-[2px] border border-obsidian-line bg-obsidian-elevated text-ink-light hover:bg-brass hover:text-obsidian hover:border-brass transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X aria-hidden="true" className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 flex flex-col">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[54vh] bg-obsidian flex items-center justify-center">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 95vw, 1024px"
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-[2px] bg-obsidian/90 border border-brass/40 text-ink-light hover:bg-brass hover:text-obsidian transition-colors cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-[2px] bg-obsidian/90 border border-brass/40 text-ink-light hover:bg-brass hover:text-obsidian transition-colors cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-6 sm:p-8 bg-obsidian-elevated border-t border-obsidian-line text-ink-light space-y-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                  <div className="space-y-1.5">
                    <h2
                      id="lightbox-title"
                      className="font-display text-2xl sm:text-3xl font-medium text-ink-light leading-tight"
                    >
                      {currentItem.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-brass-light font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="w-3.5 h-3.5 stroke-[1.5]" />
                        {currentItem.venue}, {currentItem.location}
                      </span>
                      <span aria-hidden="true" className="text-obsidian-line">•</span>
                      <span className="tabular-nums">{currentItem.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 shrink-0">
                    <Link
                      href={`/contact?brief=${encodeURIComponent(
                        `Loved the gallery card "${currentItem.title}" at ${currentItem.venue}.`
                      )}`}
                      onClick={() => setLightboxIndex(null)}
                      className="btn-editorial-light"
                    >
                      Want Something Like This!
                    </Link>
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hi Tehzaa! Loved "${currentItem.title}" at ${currentItem.venue}. Can we chat?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-outline-dark"
                    >
                      <PhoneCall aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-brass-light" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-ink-lightMuted leading-relaxed">
                  {currentItem.description}
                </p>

                <div className="p-4 rounded-[2px] bg-obsidian border border-obsidian-line text-xs text-ink-lightMuted leading-relaxed">
                  <span className="font-semibold text-brass-light">Behind the Setup:</span>{" "}
                  {currentItem.craftNotes}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {currentItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-[2px] bg-obsidian border border-obsidian-line text-xs text-ink-lightMuted"
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

      {/* 4. Luxury Studio Invitation Band on Limestone */}
      <section className="bg-limestone border-t border-stone-line py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2px] border border-obsidian-line bg-obsidian text-ink-light p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-obsidian">
            <div className="lg:col-span-7 space-y-4">
              <span className="editorial-kicker-light block">
                Chai pe milenge
              </span>
              <h2 className="display-section text-ink-light">
                Want to Flip Through Private Wedding Albums In Person?
              </h2>
              <p className="text-sm sm:text-base text-ink-lightMuted leading-relaxed max-w-2xl">
                Swing by Road No. 36 in Jubilee Hills — we&apos;ll show you real full-day albums, floral mockups, and let you taste freshly cooked Biryani and Vindhu samples.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-editorial-light">
                  Book a Visit
                </Link>
                <Link href="/services" className="btn-editorial-outline-dark">
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="gallery-frame-dark">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
                  <Image
                    src="/images/real-qutb-shahi-tombs.webp"
                    alt="Original photograph of Qutb Shahi Tombs surrounded by serene Ibrahim Bagh gardens in Hyderabad"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
