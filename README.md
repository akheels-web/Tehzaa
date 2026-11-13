<div align="center">

<img src="public/images/hero-indian-wedding.webp" alt="Tehzaa Celebrations — Curated Indian weddings and events in Hyderabad" width="100%" />

# TEHZAA CELEBRATIONS

**Luminous, editorial event architecture, floral artistry, and bespoke hospitality for Hyderabad's diverse communities.**

*Inspired by **Tehzeeb** — cultural reverence, thoughtful detail, and warm hospitality.*

[![Next.js](https://img.shields.io/badge/Next.js-15-282522?style=flat-square&logo=next.js&logoColor=F4EDE2)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-263B32?style=flat-square&logo=react&logoColor=F4EDE2)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-90643D?style=flat-square&logo=typescript&logoColor=F4EDE2)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-6B292D?style=flat-square&logo=tailwindcss&logoColor=F4EDE2)](https://tailwindcss.com/)

[Overview](#overview) • [Design System](#design-system) • [Features & Architecture](#features--architecture) • [Routes](#routes) • [Getting Started](#getting-started) • [Environment Variables](#environment-variables) • [Project Structure](#project-structure)

</div>

---

## Overview

**Tehzaa Celebrations** is the web platform for a luxury Hyderabad event and celebration house serving Telugu, North Indian, Hyderabadi/Deccani, Marwari, Punjabi, Christian, Sikh, and corporate communities. Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**, the application pairs a Warm Ivory editorial aesthetic with accessible interactive experiences, local WebP photography, structured SEO metadata, and a hardened inquiry backend connected to the Telegram Bot API.

---

## Design System

The interface is grounded in tactile hospitality tones, crisp architectural hairlines, and high-contrast editorial typography configured in [`tailwind.config.ts`](tailwind.config.ts) and [`src/app/globals.css`](src/app/globals.css).

### Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Warm Ivory** (`ivory`) | `#F4EDE2` | Primary editorial canvas and translucent header surface |
| **Cream** (`cream`) | `#FAF7F2` | Elevated surface cards and alternating section bands |
| **Antique Gold** (`gold` / `gold-dark`) | `#90643D` / `#754F2E` | `1px` architectural hairlines, monogram strokes, kickers, focus rings |
| **Burgundy** (`burgundy`) | `#6B292D` | Ceremonial warmth and high-impact editorial accents |
| **Deep Emerald** (`emerald-deep`) | `#263B32` | Featured gastronomy stage, dietary badges, primary concierge CTAs |
| **Dark Charcoal** (`charcoal`) | `#282522` | Primary body copy and serif display headlines |
| **Muted Taupe** (`taupe` / `taupe-dark`) | `#806B56` / `#665443` | Secondary descriptors and metadata captions |

### Typography & Brand Mark

- **Display Headings:** `Playfair Display` (`--font-playfair` via `next/font/google`)
- **UI & Body Copy:** `Plus Jakarta Sans` (`--font-jakarta` via `next/font/google`)
- **Bespoke Monogram:** [`src/components/brand/TehzaaLogo.tsx`](src/components/brand/TehzaaLogo.tsx) — custom fine-line scalloped arch & lotus-petal SVG emblem (`1.5px` stroke) paired with a `Cormorant Garamond` wordmark and `Manrope` descriptor in both `light` and `dark` themes.

---

## Features & Architecture

### Editorial & Interactive Showcase
- **Interactive Hero (`InteractiveHero.tsx`):** Full-bleed twilight showcase with a 4-scene live mood switcher and prioritized local WebP imagery.
- **Sticky Disciplines Explorer (`InteractiveDisciplines.tsx`):** Accessible `<button aria-expanded>` accordion paired with framed discipline previews.
- **Deep Emerald Culinary Stage (`HomeCulinaryStage.tsx` & `CulinaryMenuExplorer.tsx`):** WAI-ARIA `tablist`/`tab`/`tabpanel` menu collection explorer with keyboard arrow navigation highlighting *Hyderabadi & Deccani*, *Telugu Vindhu Bhojanam*, *North Indian & Rajasthani*, *Pure Veg & Jain*, and *Live Global Stations*.
- **Portfolio Archive (`/gallery`):** Discipline category tabs, Hyderabad venue filters, deep-linked `?category=` URL state, and a keyboard-accessible lightbox (`Esc`, `ArrowLeft`, `ArrowRight`, focus trap & focus restoration).
- **Editorial Planning Chronicle & Community Reflections:** 4-phase celebration timeline (`AnimatedPlanningTimeline.tsx`) and Hyderabad family & corporate quote deck (`InteractiveTestimonials.tsx`) with local celebration photography.

### Consultation API & Security (`/api/contact`)
- **Schema Validation (`src/lib/validation.ts`):** Powered by `zod` and `react-hook-form`, supporting Indian mobile number validation, guest count coercion (`1–50,000`), inclusive Hyderabad event types, and client-side error summary jump links.
- **Rate Limiting (`src/lib/rate-limit.ts`):** Sliding/window in-memory IP limiter enforcing **5 requests per 15 minutes** with `HTTP 429` + `Retry-After` headers and automatic cache cleanup.
- **Bot & Injection Protection (`src/lib/telegram.ts`):** Dual honeypot anti-spam trap (`honeypot` / `companyWebsite`), full HTML entity escaping, `8s` abort controller timeout, and unique `TEH-YYYY-XXXX` reference IDs. Falls back to graceful offline console logging when Telegram credentials are omitted.

### Accessibility & SEO
- **Keyboard & Reduced Motion:** Skip-to-Main-Content link (`#main-content`), `scroll-padding-top: 5.5rem`, global `:focus-visible` Antique Gold outlines, and `<MotionProvider>` (`MotionConfig reducedMotion="user"`) plus CSS `prefers-reduced-motion` safeguards.
- **Structured Data & Discovery:** Dynamic [`sitemap.ts`](src/app/sitemap.ts), [`robots.ts`](src/app/robots.ts), route-level OpenGraph metadata using `/images/hero-indian-wedding.webp`, and embedded `LocalBusiness` / `ProfessionalService` JSON-LD ([`JsonLd.tsx`](src/components/seo/JsonLd.tsx)).

---

## Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Editorial landing experience, service showcase, culinary stage, portfolio preview, process & reviews |
| `/services` | Alternating editorial spreads across all 5 celebration disciplines |
| `/services/floral-decor` | Mandaps, architectural florals, and ambient wedding lighting |
| `/services/catering` | Bespoke multi-tradition gastronomy with interactive `CulinaryMenuExplorer` |
| `/services/baraat` | Royal processions, vintage motorcades, brass ensembles, and grand arrivals |
| `/services/corporate-events` | Leadership summits, product launches, and executive gala dinners in Hyderabad |
| `/services/family-celebrations` | Haldi, Mehendi, Seemantham, cradle ceremonies, anniversaries, and intimate milestones |
| `/gallery` | Curated Hyderabad portfolio archive with category/venue filters and modal lightbox |
| `/about` | Brand story, *Tehzeeb* philosophy, guiding principles, and craft disciplines |
| `/contact` | Consultation booking studio with Jubilee Hills & Financial District studio details and FAQs |
| `/privacy` | Privacy policy covering consultation data retention, Telegram dispatch, and deletion rights |
| `/api/contact` | `POST` handler for validated, rate-limited consultation inquiries |

---

## Getting Started

### Prerequisites
- **Node.js** (LTS) and **npm**
- Network access during `npm run build` so `next/font/google` can download `Playfair Display` and `Plus Jakarta Sans`.

### Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional for local preview; Telegram falls back to simulation)
cp .env.example .env.local

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Compile and build the optimized production bundle (21 static pages + `/api/contact`) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js ESLint checks |
| `npx tsc --noEmit` | Run strict TypeScript type-checking |

> **Tip:** Stop `npm run dev` before running `npm run build` (or clean `.next/` before restarting `npm run dev`) so dev `vendor-chunks` and production build manifests never collide.

---

## Environment Variables

Copy [`.env.example`](.env.example) to `.env.local` and supply your values:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `TELEGRAM_BOT_TOKEN` | Optional* | Bot token from `@BotFather` for real-time consultation alerts |
| `TELEGRAM_CHAT_ID` | Optional* | Target user or group chat ID receiving formatted inquiry notifications |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical base URL (defaults to `http://localhost:3000` locally) |

\*When Telegram variables are omitted, submissions still validate, generate a `TEH-YYYY-XXXX` booking reference, and log a simulated dispatch cleanly on the server.

---

## Project Structure

```text
Tehzaa/
├── public/
│   └── images/                  # 10 curated local .webp celebration assets
├── src/
│   ├── app/
│   │   ├── about/               # Brand story & philosophy
│   │   ├── api/contact/         # POST consultation endpoint
│   │   ├── contact/             # Inquiry page & studio info
│   │   ├── gallery/             # Filterable portfolio & lightbox
│   │   ├── privacy/             # Privacy & data handling policy
│   │   ├── services/            # Overview + [slug] canonical service pages
│   │   ├── globals.css          # Editorial utilities, reduced-motion & focus tokens
│   │   ├── layout.tsx           # Root shell, Google Fonts, Skip link, JSON-LD
│   │   ├── page.tsx             # Home editorial canvas
│   │   ├── robots.ts            # Search crawler directives
│   │   └── sitemap.ts           # Canonical XML sitemap
│   ├── components/
│   │   ├── brand/               # TehzaaLogo SVG monogram + wordmark
│   │   ├── contact/             # ContactForm with Zod + RHF + error summary
│   │   ├── home/                # Hero, Brand Story, Disciplines, Culinary, Timeline, Testimonials
│   │   ├── layout/              # Header, Footer, WhatsAppButton, MotionProvider
│   │   ├── seo/                 # LocalBusiness & OfferCatalog JSON-LD
│   │   └── services/            # CulinaryMenuExplorer
│   ├── data/                    # Typed service catalog, gallery archive & testimonials
│   └── lib/                     # Zod schemas, IP rate-limiter, Telegram mailer & utils
├── .env.example
├── AGENTS.md                    # Design system & architectural conventions
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

<div align="center">

Crafted for **Tehzaa Celebrations** • Jubilee Hills & Financial District, Hyderabad

</div>
