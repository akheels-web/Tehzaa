<div align="center">

<img src="public/images/hyd-chowmahalla-palace.webp" alt="Tehzaa Celebrations — Weddings at iconic Hyderabad palaces" width="100%" />

# TEHZAA CELEBRATIONS

**Shaadi ho ya Pelli — Ekdum Grand Banadenge.**

*Pure-white editorial wedding design, authentic Hyderabadi & Telugu catering, and stress-free event curation across Hyderabad.*

[![Next.js](https://img.shields.io/badge/Next.js-15-141414?style=flat-square&logo=next.js&logoColor=FFFFFF)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-141414?style=flat-square&logo=react&logoColor=FFFFFF)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-A8874E?style=flat-square&logo=typescript&logoColor=FFFFFF)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-525252?style=flat-square&logo=tailwindcss&logoColor=FFFFFF)](https://tailwindcss.com/)

[Overview](#overview) • [Design System](#design-system) • [Features & Architecture](#features--architecture) • [Routes](#routes) • [Getting Started](#getting-started) • [Environment Variables](#environment-variables) • [Project Structure](#project-structure)

</div>

---

## Overview

**Tehzaa Celebrations** is the web platform for a Hyderabad wedding, catering, and event studio out of Road No. 36, Jubilee Hills. Designed with a **100% pure-white gallery aesthetic (`#FFFFFF`)**, flowing wedding calligraphy, and warm, approachable Hyderabadi storytelling, the platform showcases authentic Hindu (*Telugu Pelli Pandiri*, *Marwari Haldi*, *Baraat*), Muslim (*Chowmahalla Nikkah*, *Sanchaq*, *Manjha*, *Walima*), Sikh (*Anand Karaj*), Christian, and HITEC City corporate experiences.

---

## Design System

Configured across [`tailwind.config.ts`](tailwind.config.ts), [`src/app/layout.tsx`](src/app/layout.tsx), and [`src/app/globals.css`](src/app/globals.css):

### Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Pure White** (`white`) | `#FFFFFF` | Open gallery background for every page, header, footer, modal & card |
| **Whisper Gray** (`neutral-50` / `neutral-200`) | `#FAFAFA` / `#E5E5E5` | Soft surface cards and crisp `1px` architectural hairlines |
| **Editorial Ink** (`ink` / `neutral-900`) | `#141414` | Primary display headings, body headlines & solid pill CTAs |
| **Muted Ink** (`neutral-600`) | `#525252` | Conversational copy & secondary descriptors |
| **Champagne** (`champagne`) | `#A8874E` | Restrained wedding script headings, hairline flourishes & timeline markers |

### Wedding Fonts

- **Calligraphy Script:** `Great Vibes` (`--font-script`, `.wedding-script`)
- **Editorial Serif Display:** `Cormorant Garamond` (`--font-display`, `.wedding-display`)
- **UI & Conversational Copy:** `DM Sans` (`--font-sans`)
- **Logo & Hairline Motifs:** [`src/components/brand/TehzaaLogo.tsx`](src/components/brand/TehzaaLogo.tsx) & [`src/components/deccani/DeccaniMotifs.tsx`](src/components/deccani/DeccaniMotifs.tsx) (`CharminarSkylineCrest`, `DeccaniArchFrame`, `TehzeebDivider`, `HeritageGreetingBanner`)

---

## Features & Architecture

- **Floating Collage Hero & Vibe Filter (`InteractiveHero.tsx`):** Pure-white editorial collage showcasing real Hyderabad venues (*Chowmahalla Palace*, *Taj Falaknuma Palace*, *Taramati Baradari*) and authentic wedding feasts with spring motion.
- **Draggable Telugu Pelli vs. Muslim Shaadi Curtain (`PelliVsShaadiCurtain.tsx` & `GangaJamuniShowcase.tsx`):** Interactive split-screen slider comparing a Hindu Telugu Pelli Pandiri alongside a Chowmahalla-style Muslim Nikkah & Walima, paired with a 4-community interactive ritual explorer.
- **Interactive Food World & Menu Builder (`HomeCulinaryStage.tsx`, `CulinarySensoryCraft.tsx`, `CulinaryMenuExplorer.tsx`):** Authentic researched courses spanning **Hyderabadi Muslim Shaadi Dawat** (*Saudi Champagne*, *Lukhmi*, *Pathar ka Gosht*, *Mutton Marag*, *Dum Biryani*, *Sufiyani Biryani*, *Double ka Meetha*, *Qubani ka Meetha*, *Kaddu ki Kheer*, *Badam Firni*, *Sulaimani Chai*) and **Telugu Hindu Pelli Vindhu Bhojanam** (*Panakam*, *Pesarattu*, *Mudda Pappu + Avakaya + Ghee*, *Pulihora*, *Gutti Vankaya*, *Ulavacharu*, *Bobbatlu*, *Pootharekulu*, *Filter Kaapi*) plus an isolated Pure Veg & Jain wing and a 12-dish tasting shortlist builder.
- **Multi-Faith Decor & Palace Vibe Studio (`DecorTraditionStudio.tsx`):** Switch between ritual setups and real Hyderabad palace backdrops (*Chowmahalla Chandeliers*, *Falaknuma White Marble*, *Taramati Stone & Sunset*).
- **Real Palaces Postcard Deck & Photo Scrapbook (`HyderabadPrecinctAtlas.tsx`, `/gallery`):** Interactive venue postcards and multi-filter masonry gallery (`16` showcases) with keyboard-accessible lightbox.
- **Hardened Contact Backend (`/api/contact`):** Zod schema validation (`src/lib/validation.ts`), dual honeypot checks, sliding IP rate-limiting (`5 req / 15 min` via `src/lib/rate-limit.ts`), `?eventType=` + `?brief=` URL pre-filling, and HTML-escaped Telegram dispatch (`src/lib/telegram.ts`).

---

## Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Kinetic pure-white collage landing page, split-screen Telugu/Muslim curtain, menu explorer & venue atlas |
| `/services` | Tradition-filtered overview across all 5 celebration services |
| `/services/floral-decor` | Interactive Multi-Faith Decor Studio & Hyderabad palace vibe matcher |
| `/services/catering` | Inside Our Kitchens + Interactive Build-Your-Menu Card |
| `/services/baraat` | Hyderabadi Marfa, Punjabi Dhol, Telugu Pallaki & Phoolon ki Chadar choreography |
| `/services/corporate-events` | HICC & HITEC City summits + Chowmahalla/Falaknuma executive galas |
| `/services/family-celebrations` | Seemantham, Sanchaq, Manjha, Aqiqah, anniversaries & Gandipet villas |
| `/gallery` | Filterable photo scrapbook across categories, traditions & Hyderabad palaces |
| `/about` | Casual Hyderabad story, studio inspirations & values |
| `/contact` | Studio address info + pre-fillable consultation form |
| `/privacy` | Transparent privacy policy & Telegram dispatch disclosure |
| `/api/contact` | Validated, rate-limited `POST` consultation endpoint |

---

## Getting Started

### Prerequisites
- **Node.js** (LTS) and **npm**
- Network access during `npm run build` so `next/font/google` can download `Great Vibes`, `Cormorant Garamond`, and `DM Sans`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build production bundle (`21` static routes + `/api/contact`) |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint checks |
| `npx tsc --noEmit` | Run strict TypeScript type-checking |

---

## Environment Variables

See [`.env.example`](.env.example): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and optional `NEXT_PUBLIC_SITE_URL`. When Telegram credentials are omitted locally, enquiries still validate and return simulated `TEH-YYYY-XXXX` confirmation codes.

---

<div align="center">

Born &amp; based in **Hyderabad** • Road No. 36, Jubilee Hills

</div>
