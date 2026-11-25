# Falaknuma Marble Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Tehzaa homepage with a light "Falaknuma Marble" landing page of seven immersive, interactive scroll scenes, and align the header, footer and colour tokens site-wide.

**Architecture:** Each scene is a client component in `src/components/landing/`, composed by `src/app/page.tsx`. Shared primitives (jaali lattice, arch frame, word reveal, petals, parallax layer) live in `src/components/landing/primitives/`. Scroll choreography uses Motion's `useScroll`/`useTransform` on sticky sections. Lenis provides smooth scrolling through a single provider in `layout.tsx`. Pure logic (scroll progress → active index, venue/rasm data) lives in `src/lib/landing/` and is unit-tested with Vitest.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind 3.4, `motion` 12 (`motion/react`), `lenis` (new runtime dependency), Vitest (new dev dependency, logic tests only).

**Spec:** `docs/superpowers/specs/2026-11-25-landing-page-redesign-design.md`

## Global Constraints

- Only runtime dependency added: `lenis`. No GSAP, no Three.js. (Vitest is dev-only.)
- Palette: marble ivory `#FBF8F2` → warm marble `#F3ECE0`; gold leaf `#B08A4A`; deep gold text `#7A5929`; ruby `#7A1F2B`; ruby dark `#5C1F24`; ink headings `#2A1A14`; body `#5A463A`; rose petal `#E9B8B8` (decorative only). Update the values of existing tokens (`alabaster`, `brass`, `garnet`, `ink`); keep `obsidian` in the config.
- Shadows are warm ruby-tinted `rgba(92,31,36,.25)`, never grey. No rounded SaaS cards; photos sit in white mats with gold hairlines or in Deccani arch masks.
- Fonts: Cormorant Garamond 500 display (hero `clamp(3rem, 7vw, 6.5rem)`), Manrope body. At most one italic ruby phrase per heading.
- House easing `[0.22, 1, 0.36, 1]`; spring only for draggable elements; reveal durations 0.4–0.9s; entrances `viewport={{ once: true }}`.
- Animate only `transform`, `opacity`, `clip-path`, and sparing `filter: blur`. No infinite animation except petals (CSS, paused off-screen) and the scene-05 pin pulse.
- Reduced motion (`prefers-reduced-motion: reduce`): Lenis off, no pinning, no scroll-linked motion, arch shown full size, sections stacked.
- Anti-slop: no gradient blobs, glassmorphism, sparkle/star icons, emoji, invented stats, star ratings, avatars, invented people's names or quotes. At most one slang phrase per heading/CTA cluster.
- Images: only the existing files in `public/images/`. Hero arch image uses `priority`.
- Every drag interaction has a button or keyboard alternative; existing ARIA tab patterns (`ArrowLeft`/`ArrowRight`/`Home`/`End`) are followed.
- Phone/WhatsApp number comes from one constant: `src/lib/contact.ts`.
- Branch: work on `feat/falaknuma-landing`, not `main`.
- Every task ends with `npx tsc --noEmit` passing; the final task also runs `npm run build` and `npm run lint`.

## Review Focus

1. **Reduced motion on:** every pinned scene (01, 03, 06) renders as a normal stacked section with all content visible and no blank pinned space. Tested in Tasks 3, 5, 8 via `useReducedMotion` branches and verified in Task 11.
2. **Touch-only phones at 375px:** no horizontal page scroll; scene 03 becomes a scroll-snap row; the deg, curtain and map work by tap. Verified per scene and in Task 11.
3. **Keyboard-only visitor:** they can reach and operate the curtain (arrow keys), deg lid (button), dish tabs, map pins (list fallback), rasm tabs and dawatnama buttons, with visible focus. Each scene task has a keyboard check.
4. **Fast scroll or jump links:** clicking "Enter the Darbar" or using the browser's back/forward with Lenis lands at the right section, past `scroll-padding-top`, without stuck pinned states. Checked in Tasks 1 and 11.
5. **Scroll progress at the edges (0, 1, out of range, NaN):** index helpers clamp and never return an out-of-range index. Pinned by unit tests in Task 1.

---

### Task 1: Foundation (branch, tokens, Lenis, contact constant, logic helpers, Vitest)

**Files:**
- Create: `src/components/layout/SmoothScroll.tsx`
- Create: `src/lib/contact.ts`
- Create: `src/lib/landing/progress.ts`
- Create: `src/lib/landing/motion.ts`
- Create: `src/lib/landing/progress.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (add `lenis`, devDep `vitest`, script `"test": "vitest run"`)
- Modify: `tailwind.config.ts` (token values per Global Constraints; add `marble: { DEFAULT: "#FBF8F2", warm: "#F3ECE0" }`, `ruby: { DEFAULT: "#7A1F2B", dark: "#5C1F24" }`, `petal: "#E9B8B8"`; set `alabaster`→`#FBF8F2`/`#F3ECE0`, `brass`→`#B08A4A` with `dark: "#7A5929"`, `garnet`→`#7A1F2B`/`dark: "#5C1F24"`, `ink`→`#2A1A14` / `muted: "#5A463A"`; add `boxShadow.ruby: "0 30px 60px -20px rgba(92,31,36,.25)"`)
- Modify: `src/app/globals.css` (CSS variables and `body` background to the new values; add Lenis' recommended `html.lenis` CSS)
- Modify: `src/app/layout.tsx` (wrap children in `<SmoothScroll>` inside `MotionProvider`)

**Interfaces:**
- Produces:
  - `SmoothScroll({ children }: { children: React.ReactNode }): JSX.Element`. Creates one Lenis instance (`lerp: 0.1`, `anchors: true`) unless `prefers-reduced-motion: reduce` matches; destroys it on unmount.
  - `src/lib/contact.ts`: `export const STUDIO_PHONE_DISPLAY = "+91 98765 43210"`, `export const STUDIO_PHONE_TEL = "+919876543210"`, `export function whatsappHref(message: string): string` (returns `https://wa.me/919876543210?text=${encodeURIComponent(message)}`).
  - `src/lib/landing/progress.ts`: `export function clampProgress(p: number): number` (NaN→0, clamps to [0,1]); `export function indexFromProgress(progress: number, count: number): number` (returns `Math.min(count - 1, Math.floor(clampProgress(progress) * count))`, `0` when `count <= 0`).
  - `src/lib/landing/motion.ts`: `export const HOUSE_EASE = [0.22, 1, 0.36, 1] as const`, `export const REVEAL_DURATION = 0.7`.

- [ ] **Step 1: Create the branch.** Run `git checkout -b feat/falaknuma-landing`. Expected: `Switched to a new branch`.
- [ ] **Step 2: Install dependencies.** Run `npm install lenis` and `npm install -D vitest`. Expected: both appear in `package.json`.
- [ ] **Step 3: Write the failing tests** in `src/lib/landing/progress.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { clampProgress, indexFromProgress } from "./progress";
import { whatsappHref } from "../contact";

describe("clampProgress", () => {
  it("clamps and handles NaN", () => {
    expect(clampProgress(-0.5)).toBe(0);
    expect(clampProgress(1.7)).toBe(1);
    expect(clampProgress(Number.NaN)).toBe(0);
    expect(clampProgress(0.42)).toBe(0.42);
  });
});

describe("indexFromProgress", () => {
  it("maps progress to a valid index", () => {
    expect(indexFromProgress(0, 5)).toBe(0);
    expect(indexFromProgress(0.39, 5)).toBe(1);
    expect(indexFromProgress(1, 5)).toBe(4);
    expect(indexFromProgress(2, 5)).toBe(4);
    expect(indexFromProgress(-1, 5)).toBe(0);
    expect(indexFromProgress(Number.NaN, 5)).toBe(0);
    expect(indexFromProgress(0.5, 0)).toBe(0);
  });
});

describe("whatsappHref", () => {
  it("encodes the message", () => {
    expect(whatsappHref("Chai pe milenge?")).toBe("https://wa.me/919876543210?text=Chai%20pe%20milenge%3F");
  });
});
```

- [ ] **Step 4: Run** `npm test`. Expected: FAIL (modules not found).
- [ ] **Step 5: Implement** `vitest.config.ts` (node environment, `@` alias → `src`), `progress.ts`, `contact.ts`, `motion.ts` per Interfaces.
- [ ] **Step 6: Run** `npm test`. Expected: 3 suites PASS.
- [ ] **Step 7: Implement** `SmoothScroll.tsx`, the token and CSS changes, and the `layout.tsx` wrap.
- [ ] **Step 8: Verify.** Run `npx tsc --noEmit` (exit 0). Run `npm run dev` and open `/`, `/services` and `/contact`. Expected: smooth scrolling; the ivory ground is `#FBF8F2`; inner pages render with the new tones and no broken colours. With reduced motion emulated, scrolling is native.
- [ ] **Step 9: Commit.** `git add -A && git commit -m "feat(landing): marble tokens, Lenis smooth scroll, contact constant, progress helpers"`

---

### Task 2: Shared landing primitives

**Files:**
- Create: `src/components/landing/primitives/JaaliLattice.tsx`
- Create: `src/components/landing/primitives/ArchFrame.tsx`
- Create: `src/components/landing/primitives/RevealTitle.tsx`
- Create: `src/components/landing/primitives/Petals.tsx`
- Create: `src/components/landing/primitives/ParallaxLayer.tsx`
- Create: `src/components/landing/primitives/SceneHeading.tsx`

**Interfaces:**
- Consumes: `HOUSE_EASE`, `REVEAL_DURATION` (Task 1).
- Produces:
  - `JaaliLattice({ className?: string; edgeMask?: boolean }): JSX.Element`. An SVG `<pattern>` of an eight-point Deccani star lattice stroked in `#B08A4A` at about 0.35 opacity; with `edgeMask` (default true), a radial mask shows it only at the edges. `aria-hidden`.
  - `ArchFrame({ src: string; alt: string; className?: string; priority?: boolean; sizes: string; children?: React.ReactNode }): JSX.Element`. A `next/image` `fill` inside a container with a scalloped Deccani arch top (CSS `clip-path` or an SVG mask), a 2px `#B08A4A` border, a 10px ivory outer ring and a gold hairline outside it, and `shadow-ruby`.
  - `RevealTitle({ as?: "h1" | "h2" | "h3"; children: string; italicTail?: string; className?: string }): JSX.Element`. Splits `children` into words; each word rises (`y: "100%" → 0`) out of an `overflow-hidden` span with a 0.06s stagger, `HOUSE_EASE`, once in view; `italicTail` renders as a ruby italic line. Reduced motion: no animation. The full text stays in the DOM for screen readers.
  - `Petals({ count?: number }): JSX.Element`. At most 8 CSS-animated rose petals (`#E9B8B8`); an `IntersectionObserver` sets `animation-play-state: paused` when off-screen; returns `null` under reduced motion.
  - `ParallaxLayer({ speed: number; children: React.ReactNode; className?: string; pointer?: boolean }): JSX.Element`. Translates `y` by `speed * scrollYProgress * 100px` of the nearest section (Motion `useScroll` with `target` = own ref, offset `["start end","end start"]`). With `pointer` on fine-pointer devices, adds up to ±`speed*12px` x/y from the cursor via a spring. Static under reduced motion.
  - `SceneHeading({ kicker: string; title: string; italicTail?: string; intro?: string; align?: "left" | "center" }): JSX.Element`. Kicker in tracked deep-gold Manrope, then `RevealTitle`, then intro in body colour. Used by scenes 02–07.

- [ ] **Step 1: Implement all six primitives** per Interfaces.
- [ ] **Step 2: Add a temporary harness.** Create `src/app/dev-primitives/page.tsx` rendering each primitive with a real image (`/images/real-falaknuma-palace.webp`).
- [ ] **Step 3: Verify.** Run `npx tsc --noEmit` (exit 0). Open `/dev-primitives`. Expected: the jaali shows only at the edges; the arch has a scalloped top with gold and ivory rings; title words rise once; petals drift and stop when scrolled away; layers move at different rates. With reduced motion emulated: everything is static and visible.
- [ ] **Step 4: Remove the harness.** Delete `src/app/dev-primitives/`.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(landing): jaali, arch frame, reveal title, petals, parallax primitives"`

---

### Task 3: Scene 01, The Arch opens (hero)

**Files:**
- Create: `src/components/landing/ArchPortalHero.tsx`
- Modify: `src/app/page.tsx` (temporarily render `<ArchPortalHero />` above the existing content)

**Interfaces:**
- Consumes: `ArchFrame`, `JaaliLattice`, `RevealTitle`, `Petals`, `ParallaxLayer` (Task 2); `indexFromProgress` (Task 1).
- Produces: `ArchPortalHero(): JSX.Element` with `id="top"`. The CTA "Enter the Darbar" links to `#darbars` (scene 03 provides that id).

Decisions:
- Outer `section` height `250vh` on `md+` and `200vh` below; the inner stage is `sticky top-0 h-screen`.
- `scrollYProgress` (target the section, offset `["start start","end end"]`) drives the arch width and height from `min(36vw, 300px)` × `min(54vh, 440px)` up to `100vw` × `100vh`, and the arch border radius to `0` over progress 0.15→0.85.
- Arch photos cross-fade by `indexFromProgress(progress, 3)` across `["/images/real-falaknuma-palace.webp", "/images/real-charminar.webp", "/images/real-chowmahalla-palace.webp"]`. Only the first image gets `priority`.
- Two floating photos as `ParallaxLayer` (`speed` 0.6 and −0.4, `pointer`): `/images/hyd-muslim-dawat-spread.webp` (upper left, rotate −6°) and `/images/floral-mandap-indian.webp` (upper right, rotate 5°), in white 5px mats. They translate outward as progress rises.
- Copy: kicker "Jubilee Hills · Hyderabad"; title `RevealTitle as="h1"` "A Nizam's welcome," with `italicTail` "for your wedding."; side line "Palaces, dum ki biryani and full dhamaka baraats, planned end to end."; primary button "Enter the Darbar" (ruby) and secondary link "Plan your event" → `/contact`. Title and side fade out over progress 0.1→0.35.
- Reduced motion: section height `auto`, no sticky, arch shown at full content width with the Falaknuma image.

- [ ] **Step 1: Implement** `ArchPortalHero` per decisions and mount it in `page.tsx`.
- [ ] **Step 2: Verify desktop (1440px).** The arch grows to full screen while pinned, photos cross-fade Falaknuma → Charminar → Chowmahalla, and the page releases cleanly into the next section. "Enter the Darbar" scrolls smoothly (Lenis anchors).
- [ ] **Step 3: Verify mobile (375px), keyboard and reduced motion.** No horizontal scroll; Tab reaches both CTAs with visible focus; with reduced motion there is no pin and everything is visible.
- [ ] **Step 4: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(landing): scene 01 arch portal hero"`

---

### Task 4: Scene 02, Pelli & Shaadi curtain

**Files:**
- Create: `src/components/landing/PelliShaadiScene.tsx`
- Modify: `src/components/home/PelliVsShaadiCurtain.tsx` (restyle; add an `onPositionChange?: (pct: number) => void` prop; replace the `obsidian` selected state with ruby; replace the handle with a gold line and a small Charminar-finial SVG knob; make the handle a `role="slider"` with `aria-valuemin=8`, `aria-valuemax=92`, `aria-valuenow`, and ArrowLeft/ArrowRight ±5, Home 8, End 92)
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SceneHeading`, `JaaliLattice` (Task 2).
- Produces: `PelliShaadiScene(): JSX.Element`.

Decisions:
- Heading: kicker "Ganga-Jamuni Tehzeeb"; title "Pelli & Shaadi," with `italicTail` "one city, one dil."
- Ritual labels: when position > 60, fade in "Pelli Pandiri · Jeelakarra Bellam · Talambralu" on the Pelli side; when < 40, fade in "Sanchaq · Manjha · Nikkah · Walima" on the Shaadi side.
- Two buttons under the curtain, using the exact URLs from `GangaJamuniShowcase.tsx`: "Plan a Telugu Pelli" → `/contact?eventType=Telugu%20%26%20South%20Indian%20Weddings&brief=Planning%20a%20Telugu%20Pelli%20Pandiri%20with%20authentic%20Arati%20Aku%20Vindhu%20Bhojanam.` and "Plan a Shaadi & Walima" → `/contact?eventType=Hyderabadi%20Nikkah%20%26%20Walima&brief=Planning%20a%20Hyderabadi%20Nikkah%20%26%20Walima%20with%20Sanchaq%20and%20full%20Dawat.`
- Background: warm marble with jaali at the edges.

- [ ] **Step 1: Implement** the curtain changes and `PelliShaadiScene`; mount it after the hero.
- [ ] **Step 2: Verify.** Drag works with mouse and touch emulation; the keyboard slider moves ±5; labels swap sides; both buttons open `/contact` with the event type and brief prefilled in the form.
- [ ] **Step 3: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 4: Commit.** `git add -A && git commit -m "feat(landing): scene 02 pelli and shaadi curtain"`

---

### Task 5: Scene 03, The Five Darbars

**Files:**
- Create: `src/components/landing/DarbarsGallery.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SERVICES` from `@/data/services` (fields `slug`, `title`, `shortDescription`, `heroImage`); `ArchFrame`, `SceneHeading` (Task 2); `indexFromProgress` (Task 1).
- Produces: `DarbarsGallery(): JSX.Element` with `id="darbars"`.

Decisions:
- Heading: kicker "Paanch Darbar"; title "Five doors," with `italicTail` "one celebration."
- Desktop (`md+`, fine pointer, motion allowed): the section height is `(SERVICES.length * 70 + 100)vh`; a sticky stage contains a horizontal track of arches (each `w-[min(32vw,380px)]`, `aspect-[3/4]`). Track `x` maps progress 0→1 to `0 → -(trackWidth - viewportWidth)`, measured with a `ResizeObserver`. The active index is `indexFromProgress(progress, SERVICES.length)`; the active arch scales to 1.06 and gets a gold glow (`box-shadow: 0 0 0 1px #B08A4A, 0 0 40px rgba(176,138,74,.35)`), and its title and `shortDescription` show beneath. Inactive arches sit at opacity 0.7.
- Each arch is a `Link` to `/services/${slug}`, with a counter "0{n} / 05".
- Mobile, coarse pointer or reduced motion: a plain horizontal `overflow-x-auto snap-x snap-mandatory` row with all text visible and no pinning.

- [ ] **Step 1: Implement** `DarbarsGallery` and mount it after scene 02.
- [ ] **Step 2: Verify.** At 1440px, vertical scroll moves the arches sideways, the active one glows, and the last arch fully reaches view before release. At 375px, swiping snaps and the page has no horizontal overflow. Tab focuses each arch link. Reduced motion shows the snap row.
- [ ] **Step 3: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 4: Commit.** `git add -A && git commit -m "feat(landing): scene 03 five darbars horizontal gallery"`

---

### Task 6: Scene 04, Lift the deg

**Files:**
- Create: `src/components/landing/DegReveal.tsx`
- Create: `src/components/landing/DegIllustration.tsx`
- Create: `src/lib/landing/menus.ts`
- Create: `src/lib/landing/menus.test.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SERVICES` (catering entry, `slug === "catering"`, its `menuCollections`); `SceneHeading` (Task 2).
- Produces:
  - `export type DegMenuKey = "dawat" | "vindhu" | "veg"`.
  - `export function getDegMenus(): Record<DegMenuKey, { label: string; dishes: CulinaryDishDetail[] }>`. `dawat` = catering `menuCollections[0]` ("Hyderabadi Muslim Shaadi & Walima Dawat"), label "Shaadi Dawat"; `vindhu` = `[1]`, label "Pelli Vindhu"; `veg` = `[3]` ("Pure Veg & Sattvic Jain"), label "Pure Veg & Jain". Each takes the first 8 dishes; finds collections by title prefix, not index, so reordering the data doesn't break it.
  - `DegIllustration({ open: boolean }): JSX.Element`. An SVG copper deg (gradient `#B87333` → `#6E3D18`) with a dough ring that "cracks" (dash animation) and a lid that lifts and tilts 18° when `open`, plus 3 steam wisps (opacity/y, 2.4s, only while open and in view).
  - `DegReveal(): JSX.Element`.
- [ ] **Step 1: Write the failing test** in `menus.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getDegMenus } from "./menus";

describe("getDegMenus", () => {
  it("returns three labelled menus with 1-8 real dishes each", () => {
    const m = getDegMenus();
    expect(Object.keys(m)).toEqual(["dawat", "vindhu", "veg"]);
    expect(m.dawat.label).toBe("Shaadi Dawat");
    for (const k of ["dawat", "vindhu", "veg"] as const) {
      expect(m[k].dishes.length).toBeGreaterThan(0);
      expect(m[k].dishes.length).toBeLessThanOrEqual(8);
    }
    expect(m.veg.dishes.every((d) => d.veg === true)).toBe(true);
  });
});
```

- [ ] **Step 2: Run** `npm test -- menus`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement** `getDegMenus` per Interfaces.
- [ ] **Step 4: Run** `npm test -- menus`. Expected: PASS.
- [ ] **Step 5: Implement** `DegIllustration` and `DegReveal`.
  - Heading: kicker "Dil se Dawat"; title "Break the dum," with `italicTail` "the dawat begins."
  - The lid is a `<button aria-pressed={open}>` labelled "Break the dum"; when open it reads "Reset dum". It also opens on a drag of the lid upward past 40px.
  - On open, dish cards (name, `note`, a veg dot in `emerald-600` when `veg`) fan out from the deg with a 0.05s stagger.
  - Tabs follow the ARIA tablist pattern with arrow, Home and End keys; switching tabs re-staggers the cards.
  - Link "See full menus" → `/services/catering`.
- [ ] **Step 6: Verify.** Click, tap, keyboard Enter and drag all open it; steam shows only while open; tabs switch with arrows; reduced motion opens instantly with no steam.
- [ ] **Step 7: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat(landing): scene 04 lift-the-deg menu reveal"`

---

### Task 7: Scene 05, Hyderabad by night lamps (venue map)

**Files:**
- Create: `src/lib/landing/venues.ts`
- Create: `src/lib/landing/venues.test.ts`
- Create: `src/components/landing/VenueMap.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `HYDERABAD_MONUMENTS` from `@/data/monuments` (`id`, `name`, `builtEra`, `celebrationRole`, `image`, `alt`); `SceneHeading`, `ArchFrame` (Task 2).
- Produces:
  - `export interface MapVenue { id: string; name: string; era: string; line: string; image: string; alt: string; x: number; y: number }` (x, y in a `0 0 1000 700` viewBox).
  - `export const MAP_VENUES: MapVenue[]`. The six monuments plus HICC. Pin positions (schematic, from real lat/long): `charminar` 827,520; `chowmahalla-palace` 807,538 (render its pin offset 14px left so it doesn't overlap); `taj-falaknuma-palace` 780,652; `golconda-fort` 340,424; `taramati-baradari` 133,481; `qutb-shahi-tombs` 300,372; `hicc` 133,44 with name "HICC & HITEC City", era "Today's Hyderabad", line "Summits by day, palace galas by night.", image `/images/corporate-gala-hyderabad.webp`. For monuments, `line` = `celebrationRole`.
  - `VenueMap(): JSX.Element`.
- [ ] **Step 1: Write the failing test** in `venues.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { MAP_VENUES } from "./venues";
import { HYDERABAD_MONUMENTS } from "@/data/monuments";

describe("MAP_VENUES", () => {
  it("covers every monument plus HICC, inside the viewBox, with unique ids", () => {
    const ids = MAP_VENUES.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const m of HYDERABAD_MONUMENTS) expect(ids).toContain(m.id);
    expect(ids).toContain("hicc");
    for (const v of MAP_VENUES) {
      expect(v.x).toBeGreaterThanOrEqual(0); expect(v.x).toBeLessThanOrEqual(1000);
      expect(v.y).toBeGreaterThanOrEqual(0); expect(v.y).toBeLessThanOrEqual(700);
      expect(v.image.startsWith("/images/")).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run** `npm test -- venues`. Expected: FAIL.
- [ ] **Step 3: Implement** `MAP_VENUES`.
- [ ] **Step 4: Run** `npm test -- venues`. Expected: PASS.
- [ ] **Step 5: Implement** `VenueMap`.
  - Heading: kicker "Shehar ki raunaq"; title "Hyderabad's palaces," with `italicTail` "our address book."
  - The SVG map, in gold hairlines on marble, shows: the Musi river as a soft blue-grey path (`rgba(120,150,170,.5)`) curving west→east through about y 440–480; a dotted Old City boundary around the Charminar cluster; the label "HITEC City" near HICC; Golconda's fort walls as a small ring. The path draws itself (`pathLength` 0→1) once in view.
  - Pins are `<button>`s placed at percentage positions over the SVG, with a soft pulse (CSS `box-shadow` keyframe, paused under reduced motion). Hover, focus or tap sets the active venue; a framed card (`ArchFrame` image, name, era, line) shows beside the map on desktop and below it on mobile. The default active pin is `chowmahalla-palace`.
  - Screen readers get a visually-hidden `<ul>` of venues; pins have `aria-label` = name and `aria-pressed`.
- [ ] **Step 6: Verify.** Hovering or tapping each pin updates the card; Tab cycles the pins; the map scales without overflow at 375px; reduced motion gives no draw or pulse.
- [ ] **Step 7: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat(landing): scene 05 hyderabad venue map"`

---

### Task 8: Scene 06, Hamari Rasmein

**Files:**
- Create: `src/lib/landing/rasmein.ts`
- Create: `src/lib/landing/rasmein.test.ts`
- Create: `src/components/landing/RasmeinThread.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `ArchFrame`, `SceneHeading` (Task 2); `indexFromProgress` (Task 1).
- Produces:
  - `export interface Rasm { id: string; name: string; tradition: "Muslim" | "Telugu Hindu" | "Shared"; meaning: string; weHandle: string; image: string; alt: string }`.
  - `export const RASMEIN: Rasm[]`. Exactly 7, in this order, with these images:
    1. `sanchaq`, Muslim: `/images/bridal-entry-indian.webp`
    2. `manjha-haldi`, Shared: `/images/haldi-mehendi-courtyard.webp`
    3. `mehendi`, Shared: `/images/family-celebration-indian.webp`
    4. `pelli-pandiri`, Telugu Hindu: `/images/floral-mandap-indian.webp`
    5. `baraat`, Shared: `/images/baraat-grand-entry.webp`
    6. `nikkah`, Muslim: `/images/nikkah-walima-arch.webp`
    7. `walima-vindhu`, Shared: `/images/hyd-muslim-dawat-spread.webp`

    `meaning` is one factual sentence; `weHandle` is one sentence drawn from existing `services.ts` copy. No people's names or quotes.
  - `RasmeinThread(): JSX.Element`.
- [ ] **Step 1: Write the failing test** in `rasmein.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { RASMEIN } from "./rasmein";

describe("RASMEIN", () => {
  it("has the 7 rasms in order with real image files", () => {
    expect(RASMEIN.map((r) => r.id)).toEqual([
      "sanchaq", "manjha-haldi", "mehendi", "pelli-pandiri", "baraat", "nikkah", "walima-vindhu",
    ]);
    for (const r of RASMEIN) {
      expect(existsSync(join(process.cwd(), "public", r.image))).toBe(true);
      expect(r.meaning.length).toBeGreaterThan(20);
      expect(r.weHandle.length).toBeGreaterThan(20);
    }
  });
});
```

- [ ] **Step 2: Run** `npm test -- rasmein`. Expected: FAIL.
- [ ] **Step 3: Implement** `RASMEIN`.
- [ ] **Step 4: Run** `npm test -- rasmein`. Expected: PASS.
- [ ] **Step 5: Implement** `RasmeinThread`.
  - Heading: kicker "Hamari Rasmein"; title "Every rasm," with `italicTail` "tied with care."
  - Desktop with motion allowed: the section is `(RASMEIN.length * 60 + 60)vh` with a sticky stage. On the left, the rasm list sits along a vertical gold thread (an SVG line whose `pathLength` follows progress), and each rasm gets a small knot dot that fills ruby when passed. On the right, an `ArchFrame` cross-fades to the active rasm's image, with name, tradition, meaning and weHandle revealed. Active = `indexFromProgress(progress, 7)`.
  - The list items are tabs (ARIA tablist, vertical orientation, ArrowUp/ArrowDown/Home/End). Clicking a tab scrolls (via Lenis' `scrollTo`, or `window.scrollTo` when Lenis is off) to that rasm's progress position.
  - Mobile or reduced motion: stacked cards with the thread on the left edge; each card shows its image and text with no pinning.
  - Link "See them in our gallery" → `/gallery`.
- [ ] **Step 6: Verify.** Scrolling ties each knot in turn and swaps the image; tab clicks jump correctly; the arrow keys work; the 375px stacked layout and reduced motion are correct.
- [ ] **Step 7: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat(landing): scene 06 hamari rasmein thread"`

---

### Task 9: Scene 07, Your dawatnama (call to action)

**Files:**
- Create: `src/components/landing/DawatnamaCTA.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `STUDIO_PHONE_DISPLAY`, `STUDIO_PHONE_TEL`, `whatsappHref`, `HOUSE_EASE` (Task 1); `JaaliLattice` (Task 2).
- Produces: `DawatnamaCTA(): JSX.Element`.

Decisions:
- A ruby envelope (`#7A1F2B` body, flap `#5C1F24`, gold `#B08A4A` edges) about `min(92vw, 560px)` wide, centred on marble with jaali.
- When 40% in view (`useInView`, once), the flap rotates `rotateX(0 → 180deg)` (perspective 1200px, 0.9s, `HOUSE_EASE`), then the ivory card slides up 60% out of the envelope. The card reads: kicker "Aapki dawat, hamara intezaam"; heading "Chai pe milenge?"; line "Tell us your dates and your venue. We'll come to Jubilee Hills with Irani chai and a plan."; buttons "Plan your event" → `/contact` (ruby) and "WhatsApp us" → `whatsappHref("Aadaab! I'd like to plan an event with Tehzaa.")` (outline); phone link `tel:${STUDIO_PHONE_TEL}` showing `STUDIO_PHONE_DISPLAY`.
- The gold wax seal is a `<button aria-label="Replay invitation">` that replays the animation.
- Reduced motion: the card is shown open with no animation.

- [ ] **Step 1: Implement** `DawatnamaCTA` and mount it as the last scene.
- [ ] **Step 2: Verify.** The flap opens once on scroll; the seal replays; all three links are correct (WhatsApp opens `wa.me` with the encoded text); it fits at 375px; reduced motion shows the card open.
- [ ] **Step 3: Run** `npx tsc --noEmit`. Expected: exit 0.
- [ ] **Step 4: Commit.** `git add -A && git commit -m "feat(landing): scene 07 dawatnama call to action"`

---

### Task 10: Assemble the page and remove old homepage components

**Files:**
- Modify: `src/app/page.tsx` (render only the seven scenes in order: `ArchPortalHero`, `PelliShaadiScene`, `DarbarsGallery`, `DegReveal`, `VenueMap`, `RasmeinThread`, `DawatnamaCTA`; remove the promises grid and the Falaknuma CTA)
- Move: `src/components/home/PelliVsShaadiCurtain.tsx` → `src/components/landing/PelliVsShaadiCurtain.tsx` (update the import in `PelliShaadiScene`)
- Delete: every other file in `src/components/home/`, after confirming no remaining imports

**Interfaces:**
- Consumes: all scene components (Tasks 3–9).

- [ ] **Step 1: Find remaining imports.** Run `grep -rn "components/home" src`. Expected after the edits: no matches.
- [ ] **Step 2: Rewrite `page.tsx`**, move the curtain file and delete the unused home components.
- [ ] **Step 3: Run** `npx tsc --noEmit && npm test`. Expected: exit 0; all tests pass.
- [ ] **Step 4: Verify.** A full scroll of `/` at 1440px shows the scenes in order 01→07 with no leftover old sections and no console errors.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat(landing): assemble seven-scene homepage, remove old home components"`

---

### Task 11: Site chrome, final verification and docs

**Files:**
- Modify: `src/components/layout/Header.tsx` (on `/` before scrolling past 40px: transparent background, ink text. After scrolling, or on other routes: `bg-marble/90 backdrop-blur` with a 1px `#B08A4A`/40 bottom hairline. Nav hover: gold underline growing from the centre. Mobile drawer: marble with a `JaaliLattice` edge. Keep all keyboard/ARIA behaviour.)
- Modify: `src/components/layout/Footer.tsx` (marble background with ink text; a ruby `#7A1F2B` band holding the oversized TEHZAA wordmark in ivory; `CharminarSkylineCrest theme="light"` in gold; links hover to ruby; replace hard-coded phone/WhatsApp with `src/lib/contact.ts`)
- Modify: `src/components/layout/WhatsAppButton.tsx` (ruby fill, 2px gold ring, uses `whatsappHref`)
- Modify: `AGENTS.md` (replace the Brand & Design System and the home-components list with the Falaknuma Marble system and `src/components/landing/` structure)

- [ ] **Step 1: Implement** the header, footer and WhatsApp changes.
- [ ] **Step 2: Run** `npx tsc --noEmit && npm test && npm run lint && npm run build`. Expected: all exit 0; build lists all routes.
- [ ] **Step 3: Check the browser at 1440, 768 and 375px.** Every scene works by mouse, touch emulation and keyboard, with no horizontal scroll and no console errors. Inner pages (`/services`, `/services/catering`, `/gallery`, `/about`, `/contact`) render legibly with the new tokens and footer.
- [ ] **Step 4: Check reduced motion (emulated).** No pinning, no smooth scroll, all content of scenes 01, 03 and 06 visible and stacked.
- [ ] **Step 5: Check jump links.** "Enter the Darbar" and the browser back/forward land correctly with Lenis on.
- [ ] **Step 6: Run Lighthouse (mobile)** on `npm run start` for `/`. Compare against `main` (stash, build, measure first). Expected: performance no more than 10 points lower.
- [ ] **Step 7: Run the anti-slop audit.** `grep -rniE "sparkle|✨|500\+|rating|★|glass" src/components/landing src/app/page.tsx`. Expected: no matches.
- [ ] **Step 8: Commit.** `git add -A && git commit -m "feat(landing): marble header, footer and whatsapp; docs"`
