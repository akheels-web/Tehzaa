# Tehzaa Celebrations Architecture & Agent Memory

## Brand & Design System
- **Brand Identity**: Luminous, editorial Indian celebration house inspired by *Tehzeeb* (elegance, cultural reverence, warm hospitality), serving all communities of Hyderabad.
- **Logo Component**: `src/components/brand/TehzaaLogo.tsx` — fine-line scalloped arch & lotus-petal SVG monogram (`1.5px` stroke) paired with uppercase `Cormorant Garamond` wordmark (`TEHZAA`) and tracked `Manrope` descriptor (`CELEBRATIONS`), supporting `theme="light" | "dark"`.
- **Color Palette Tokens**:
  - Antique Gold: `#90643D` (`gold`, `gold-light: #A77B52`, `gold-dark: #754F2E`)
  - Burgundy: `#6B292D` (`burgundy`, `burgundy-light: #82363B`, `burgundy-dark: #521F22`)
  - Warm Ivory: `#F4EDE2` (`ivory`, `ivory-light: #FAF7F2`, `ivory-dark: #EADCCB`)
  - Cream: `#FAF7F2` (`cream`)
  - Deep Emerald: `#263B32` (`emerald`, `emerald-deep`)
  - Dark Charcoal: `#282522` (`charcoal`, `charcoal-light: #3A3632`)
  - Muted Taupe: `#806B56` (`taupe`)
- **Typography**:
  - Headings: `Playfair Display` (Google Font serif, via `next/font/google`, `--font-playfair`)
  - Body: `Plus Jakarta Sans` (Google Font sans, via `next/font/google`, `--font-jakarta`)
- **Local Visual Assets (`public/images/`, WebP format)**:
  - `/images/hero-indian-wedding.webp`
  - `/images/floral-mandap-indian.webp`
  - `/images/catering-hyderabadi-feast.webp`
  - `/images/catering-indian-thali.webp`
  - `/images/baraat-grand-entry.webp`
  - `/images/bridal-entry-indian.webp`
  - `/images/haldi-mehendi-courtyard.webp`
  - `/images/nikkah-walima-arch.webp`
  - `/images/corporate-gala-hyderabad.webp`
  - `/images/family-celebration-indian.webp`

## Key Architecture & Setup
- **Framework**: Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS.
- **Path Aliases**: `@/*` mapped to `src/*` in `tsconfig.json` and `next.config.mjs`.
- **Canonical Service Slugs (PRD Section 5)**:
  - `/services/floral-decor`
  - `/services/catering` (includes `menuCollections` for Hyderabadi, Telugu Vindhu Bhojanam, North Indian/Rajasthani, Pure Veg & Jain, and Live Global stations)
  - `/services/baraat`
  - `/services/corporate-events`
  - `/services/family-celebrations`
- **Build Note**: Next.js requires network access during `npm run build` to download `next/font/google` resources (`fonts.googleapis.com`).

## Directory Structure & Implemented Routes
- `src/components/brand/TehzaaLogo.tsx`: Custom fine-line SVG monogram + wordmark.
- `src/components/layout/`:
  - `Header.tsx`: Translucent Warm Ivory editorial navigation with `TehzaaLogo`, keyboard-accessible canonical service dropdown, mobile drawer, and `Plan Your Event` CTA (`/contact`).
  - `Footer.tsx`: `TehzaaLogo`, inclusive Hyderabad community philosophy, canonical service links, `/gallery`, `/about`, `/privacy`, `/contact`, and Hyderabad studios (Jubilee Hills, Financial District).
  - `WhatsAppButton.tsx`: Refined floating concierge action button (`Deep Emerald` with `1px` gold border) with hover/focus tooltip.
  - `MotionProvider.tsx`: Client `MotionConfig reducedMotion="user"` wrapper honoring OS reduced-motion preferences.
- `src/data/`:
  - `services.ts`: 5 categories with canonical slugs, local `/images/`, and `menuCollections` on `catering`.
  - `gallery.ts`: 12 portfolio items across Hyderabad venues using local `/images/`.
  - `testimonials.ts`: Diverse Hyderabad community family & corporate testimonials (`avatar` optional, no stock faces).
- `src/components/home/`:
  - `InteractiveHero.tsx`: Calm full-bleed hero with staggered headline reveal and live 4-scene mood switcher.
  - `BrandMarquee.tsx`: Static editorial celebration tradition ribbon.
  - `InteractiveBrandStory.tsx`: Dual-frame editorial narrative with architectural seal.
  - `InteractiveDisciplines.tsx`: Sticky split-stage service discipline explorer.
  - `HomeCulinaryStage.tsx`: Interactive Deep Emerald Indian & Hyderabadi gastronomy showcase.
  - `ParallaxGalleryShowcase.tsx`: Offset editorial portfolio grid with quick discipline filters.
  - `AnimatedPlanningTimeline.tsx`: Interactive 4-step planning chronicle with gold hairline track.
  - `InteractiveTestimonials.tsx`: Interactive editorial quote deck with community selector.
  - `MotionReveal.tsx`: Client `motion/react` reveal wrapper.
- `src/app/page.tsx`: Editorial Warm Ivory & Cream Home page with full-bleed Hero (`/images/hero-indian-wedding.webp`), asymmetric Tehzeeb intro, 5 canonical services, Deep Emerald Indian & Hyderabadi Culinary band, featured gallery, architectural pillars & 4-step process, typographic client reflections, 8 Hyderabad precincts, and consultation CTA.
- `src/app/about/page.tsx`: Editorial brand story, Tehzeeb philosophy across Hyderabad communities, Mission & Vision, 4 Guiding Principles, and 3 Craft Disciplines (no fabricated stats/years).
- `src/app/privacy/page.tsx`: Editorial Warm Ivory Privacy Policy covering inquiry data, Telegram notifications, retention, and deletion rights.
- `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.ts`: Root metadata (`/images/hero-indian-wedding.webp`), typography utilities, and design tokens.
- `src/app/api/contact/route.ts`, `src/components/contact/ContactForm.tsx`, `src/lib/validation.ts`, `src/lib/rate-limit.ts`, `src/lib/telegram.ts`.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/seo/JsonLd.tsx`.
