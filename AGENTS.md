# Tehzaa Celebrations Architecture & Agent Memory

## Brand & Design System (Deccani Editorial Luxury Aesthetic)
- **Brand Identity**: Warm, conversational Hyderabad wedding, catering & event studio rooted in *Tehzeeb* and joyful hospitality across Hindu, Muslim, Sikh, Christian, and corporate communities.
- **Color Palette Tokens (`tailwind.config.ts` & `src/app/globals.css`)**:
  - **Warm Alabaster (`alabaster`)**: `#F9F6F1` / `#F5F1EA` (`warm`) — primary editorial page ground.
  - **Silk White (`silk`)**: `#FFFFFF` — architectural gallery mats, menus, sticky tasting cards, and dropdown surfaces.
  - **Limestone (`limestone`)**: `#EFE9DF` / `#E2DAD0` (`dark` / `stone-line`) — warm tonal section bands and 1px structural hairlines.
  - **Deep Obsidian (`obsidian`)**: `#12100E` (`DEFAULT`), `#1A1715` (`elevated`), `#26211D` (`muted`), `#2E2823` (`obsidian-line`) — dramatic dark cinematic chapters, Hero showcase, Culinary Theatre, Monument Atlas, and monumental Footer.
  - **Burnished Deccani Brass (`brass`)**: `#A27B43` (`DEFAULT` borders/icons/rules), `#C7A36B` (`light` high-contrast gold text/italics on Deep Obsidian), `#7A5929` (`dark` AA gold text/italics/kickers on Alabaster & Silk), `#E8DCCB` (`pale`).
  - **Royal Garnet (`garnet`)**: `#5C1F24` (`light: #7A2D34`, `dark: #421519`) — restrained ceremonial jewel accent.
  - **Editorial Ink Hierarchy (`ink`)**: `#161412` (`DEFAULT`), `#4A453F` (`muted`), `#6E675F` (`subtle`) on light surfaces; `#F5F1EA` (`light`), `#BEB6AA` (`lightMuted`) on Deep Obsidian.
  - Standard Tailwind `emerald-*` scale is preserved untouched for vegetarian dietary indicators.
- **2-Font Editorial Typography (`next/font/google` in `src/app/layout.tsx`, zero `Great_Vibes`)**:
  - **Display Serif**: `Cormorant_Garamond` (`400`, `500`, `600`, `700`; `normal` & `italic`; `--font-display`, `font-display` / `font-serif`) powering fluid `clamp()` utilities `.display-hero`, `.display-section`, `.display-card`, and `.editorial-italic`.
  - **Body & UI Sans**: `Manrope` (`400`, `500`, `600`, `700`; `--font-sans`, `font-sans`) powering legible `15px–17px` `.editorial-body`, tracked `11px–12px` `.editorial-kicker` / `.editorial-kicker-light`, sharp architectural CTAs, and `tabular-nums` numerals.
- **Architectural Framing & UI Grammar (`src/app/globals.css`)**:
  - Sharp `rounded-none` / `rounded-[2px]` gallery frames (`.gallery-frame`, `.gallery-frame-dark`) and `1px` rules (`.hairline-rule`, `.hairline-rule-dark`), replacing generic rounded SaaS boxes.
  - Sharp architectural buttons: `.btn-editorial-dark`, `.btn-editorial-light`, `.btn-editorial-outline`, `.btn-editorial-outline-dark`.
  - Alternating surface cadence: **Deep Obsidian (`#12100E`)** ↔ **Warm Alabaster (`#F9F6F1`)** ↔ **Limestone (`#EFE9DF`)** ↔ **Silk White (`#FFFFFF`)**.
- **Logo Component (`src/components/brand/TehzaaLogo.tsx`)**: Fine-line `1.25px` Deccani scalloped arch & lotus SVG emblem paired with `Cormorant Garamond` uppercase `TEHZAA` and tracked `Manrope` `HYDERABAD CELEBRATIONS` descriptor (`theme="light" | "dark"`, `size="sm" | "md" | "lg"`).
- **Authentic Local Visual Assets (`public/images/`, 21 WebP files)**:
  - **Verified Real Hyderabad Monument Photographs (`src/data/monuments.ts`, Wikimedia Commons CC-licensed)**: `/images/real-charminar.webp`, `/images/real-chowmahalla-palace.webp`, `/images/real-falaknuma-palace.webp`, `/images/real-golconda-fort.webp`, `/images/real-taramati-baradari.webp`, `/images/real-qutb-shahi-tombs.webp`.
  - **Editorial, Culinary & Celebration Suite (15 WebP files)**: `/images/anand-karaj-cathedral-garden.webp`, `/images/baraat-grand-entry.webp`, `/images/bridal-entry-indian.webp`, `/images/catering-hyderabadi-feast.webp`, `/images/catering-indian-thali.webp`, `/images/corporate-gala-hyderabad.webp`, `/images/family-celebration-indian.webp`, `/images/floral-mandap-indian.webp`, `/images/haldi-mehendi-courtyard.webp`, `/images/hero-indian-wedding.webp`, `/images/hyderabadi-dum-biryani-deg.webp`, `/images/hyd-muslim-dawat-spread.webp`, `/images/hyd-telugu-vindhu-leaf.webp`, `/images/irani-chai-mithai-parlor.webp`, `/images/nikkah-walima-arch.webp`.

## Key Architecture & Setup
- **Framework**: Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS, Framer/Motion (`motion/react`).
- **Path Aliases**: `@/*` mapped to `src/*` in `tsconfig.json` and `next.config.mjs`.
- **Canonical Service Slugs (PRD Section 5)**:
  - `/services/floral-decor` (Interactive Multi-Faith Decor Studio + Real Chowmahalla / Taj Falaknuma / Taramati Baradari / Golconda Palace Matcher)
  - `/services/catering` (Full-width luxury `CateringPageExperience.tsx` + hairline `CulinaryMenuExplorer.tsx` covering Muslim Shaadi Dawat, Telugu Pelli Vindhu Bhojanam, Telangana Non-Veg & North Indian, isolated Pure Veg & Jain, and Irani Chai/Paan)
  - `/services/baraat` (Marfa, Punjabi Dhol, Telugu Pallaki, Phoolon ki Chadar)
  - `/services/corporate-events` (HICC & HITEC Summits, Palace Gala Dinners)
  - `/services/family-celebrations` (Seemantham, Namakaranam, Sanchaq, Manjha, Aqiqah, Anniversaries & Farmhouses)
- **Build Note**: Next.js requires network access during `npm run build` to download `next/font/google` resources (`fonts.googleapis.com`). Avoid mixing `next dev` and `next build` artifacts inside `.next`.

## Directory Structure & Implemented Modules
- `src/components/deccani/DeccaniMotifs.tsx`: Architectural SVG & motif components (`DeccaniArchFrame` with `theme="alabaster" | "dark" | "obsidian"`, `JaaliPattern`, `TehzeebDivider`, `CharminarSkylineCrest`, `HeritageGreetingBanner`).
- `src/components/layout/`: Transparent-to-frosted `Header.tsx` (`bg-alabaster/65` → `bg-alabaster/95`), Deep Obsidian architectural `Footer.tsx` featuring `CharminarSkylineCrest theme="dark"` and monumental `TEHZAA` wordmark, Deep Obsidian + Brass `WhatsAppButton.tsx`, and `MotionProvider.tsx` (`MotionConfig reducedMotion="user"`).
- `src/data/`: `monuments.ts` (`HYDERABAD_MONUMENTS`), `services.ts`, `gallery.ts`, `testimonials.ts`.
- `src/components/home/`: `InteractiveHero.tsx` (Deep Obsidian hero framed by real Charminar & Chowmahalla photography), `BrandMarquee.tsx`, `PelliVsShaadiCurtain.tsx`, `GangaJamuniShowcase.tsx`, `InteractiveBrandStory.tsx`, `InteractiveDisciplines.tsx`, `HomeCulinaryStage.tsx` (Deep Obsidian culinary theatre), `ParallaxGalleryShowcase.tsx`, `AnimatedPlanningTimeline.tsx`, `InteractiveTestimonials.tsx`, `HyderabadPrecinctAtlas.tsx` (all 6 real monuments), and `MotionReveal.tsx`.
- `src/components/services/`, `src/components/about/`, `src/components/contact/`, `src/components/seo/`: Luxury editorial interactive builders (`CateringPageExperience.tsx`, `CulinaryMenuExplorer.tsx`, `DecorTraditionStudio.tsx`, `DisciplineInteractiveShowcase.tsx`, `ServicesTraditionIndex.tsx`, `DeccaniCraftInteractive.tsx`, `ContactForm.tsx` with `<Suspense>` `?eventType=` + `?brief=` sync, and `JsonLd.tsx`).
