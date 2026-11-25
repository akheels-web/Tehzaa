# Inner Pages (Falaknuma Marble Part 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `/services`, `/services/[slug]`, `/about`, `/contact`, `/gallery` and `/privacy` into the Falaknuma Marble language, with one signature interaction per page.

**Architecture:**
- New shared pieces live in `src/components/landing/primitives/`: `PageHero`, `ThreadFaq`, `ArchMedallionList`, and `Envelope` (factored out of `DawatnamaCTA`).
- Page-specific signatures live in `src/components/inner/`.
- Existing service, about, contact and gallery components keep their logic and are restyled in place.
- Pure logic (contact group progress, setups-by-service, baraat entries) lives in `src/lib/landing/` and is tested with Vitest.

**Tech Stack:** Next.js 15, React 19, Tailwind 3.4, `motion/react`, Lenis (already installed), Vitest.

**Spec:** `docs/superpowers/specs/2026-11-25-inner-pages-redesign-design.md` (builds on `docs/superpowers/specs/2026-11-25-landing-page-redesign-design.md`).

## Global Constraints

- **Palette and motion** are as in the landing spec:
  - marble `#FBF8F2`/`#F3ECE0`, gold `#B08A4A` (text `#7A5929`), ruby `#7A1F2B`/`#5C1F24`, ink `#2A1A14`/`#5A463A`
  - `HOUSE_EASE`, function transforms via `useRange`
  - every motion branch reads `useMotionAllowed()`
- **No `obsidian` classes** remain in these routes or their components. The one exception is the gallery lightbox backdrop, which uses `bg-[#2A1A14]/95`, not obsidian.
- **No new content**: no people, quotes, numbers or photos. Copy is moved or restyled only, except short headings and kickers in the landing voice.
- **Behaviour preserved:**
  - contact form validation, prefill, honeypot, error summary and success code
  - `/api/contact` unchanged
  - gallery `?category=`, filters and lightbox focus trap
  - decor `?tradition=`
  - ARIA tab patterns
  - `generateStaticParams` and `JsonLd`
- **Reduced motion** gives a static, fully visible fallback for every signature. **375px** has no horizontal scroll.
- Every task ends with `npx tsc --noEmit` exit 0. Tasks with logic also end with `npm test` green.

## Review Focus

1. **Contact form under the new envelope and progress rail:** submitting with errors still focuses the error summary, and a valid submit still shows the reference code. Owned by Task 7; browser check.
2. **Prefilled contact links** (`?eventType=…&brief=…` from homepage scene 02 and the services doors) still fill the fields. "Your event" must not tie on prefill alone, because the location is required. Covered by the `groupProgress` test in Task 7.
3. **Gallery filter changes while the lightbox is open, or deep-linked `?category=`:** layout animation must not break focus return or the `aria-live` count. Task 8; browser check.
4. **Keyboard-only use of the services doors and the filmstrip:** doors open on focus with a visible ring, and the filmstrip moves one frame per ArrowLeft/ArrowRight. Tasks 2 and 3.
5. **Reduced motion on the baraat procession** (the only new pinned scene): it shows as a stacked list with no blank pinned space. Task 4.

---

### Task 1: Shared inner-page primitives

**Files:**
- Create in `src/components/landing/primitives/`: `PageHero.tsx`, `ThreadFaq.tsx`, `ArchMedallionList.tsx`, `Envelope.tsx`
- Modify: `src/components/landing/DawatnamaCTA.tsx` (use `Envelope`)
- Modify: `src/components/landing/VenueMap.tsx` (show `credit` in the card)
- Modify: `src/lib/landing/venues.ts` (add `credit?: string` from `creditLicense`), plus its test

**Interfaces (produces):**
- `PageHero(props)`:
  - **Props:** `{ crumbs?: { label: string; href?: string }[]; kicker: string; title: string; italicTail?: string; intro?: string; actions?: React.ReactNode; image?: { src: string; alt: string; credit?: string }; floating?: { src: string; alt: string }[]; side?: React.ReactNode; compact?: boolean }`
  - **Background and grid:** marble gradient with `DepthJaali`; 12-column grid with the copy in 7 columns and the visual in 5.
  - **Visual:** `side` overrides `image`. `image` renders in an `ArchFrame` with a credit line under it. Up to 2 `floating` photos sit in `ParallaxLayer`s at speeds 0.5 and −0.35, hidden below `md`.
  - **Sizing:** `compact` reduces the vertical padding and hides `floating`.
  - **Static under reduced motion:** via the primitives it uses.
- `ThreadFaq({ items: { q: string; a: React.ReactNode }[]; id?: string })`: a `<div id>` holding a vertical gold thread with `<details>` items. Each knot is ruby when open. The answer wrapper animates height via a motion `div`, and the body shows instantly when motion is off. Keyboard behaviour is native `<summary>`.
- `ArchMedallionList({ items: { title: string; body: string }[]; columns?: 2 | 3 | 4 })`: each item has a 56×72 gold arch medallion holding a `0n` numeral, then title and body, with a 0.05s stagger reveal.
- `Envelope({ open: boolean; motionAllowed: boolean; children: React.ReactNode; className?: string; onReplay?: () => void; sealLabel?: string })`:
  - Contains the back, pocket, flap and seal currently in `DawatnamaCTA`, including the `flapBehind` state and the card `y` variants.
  - `children` is the card content.
  - The card height is set by the caller through `className` on an inner wrapper. Expose a `cardClassName?: string` prop too.
- `MapVenue.credit?: string`.

- [ ] **Step 1: Write the failing test.** Extend `src/lib/landing/venues.test.ts`: `it("carries the CC credit for every monument")`, expecting `MAP_VENUES.filter(v => v.id !== "hicc").every(v => (v.credit ?? "").includes("Wikimedia"))` to be `true`.
- [ ] **Step 2: Watch it fail.** Run `npm test -- venues`. Expected: FAIL.
- [ ] **Step 3: Make it pass.** Add `credit: m.creditLicense` in `venues.ts`, then render it in `VenueMap`'s card as `text-[10px] text-ink-muted`. Run `npm test`. Expected: all PASS.
- [ ] **Step 4: Build the primitives.** Implement `PageHero`, `ThreadFaq`, `ArchMedallionList` and `Envelope`, then refactor `DawatnamaCTA` onto `Envelope` with no visual change.
- [ ] **Step 5: Verify.** Run `npx tsc --noEmit` (exit 0). In the browser, the homepage dawatnama still opens, the seal replays it, and the flap tucks behind the card.
- [ ] **Step 6: Commit.** `feat(inner): page hero, thread faq, arch medallions, shared envelope`

### Task 2: `/services`, Darbar doors

**Files:**
- Create: `src/components/inner/DarbarDoors.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/components/services/ServicesTraditionIndex.tsx` (restyle only, plus an exported filter state hook, see below)

**Interfaces:**
- `DarbarDoors({ services: ServiceCategory[]; dimmed?: (s: ServiceCategory) => boolean })`
  - **Structure:** five arched door frames in a responsive grid (5 columns at `lg`, 2–3 at `md`, 1 on mobile). Each is a `Link` to `/services/${slug}` holding the photo (`heroImage`) behind two leaves.
  - **Leaves:** ivory, each with a gold jaali panel. They rotate `rotateY(-70deg)` (left, origin-left) and `rotateY(70deg)` (right, origin-right), with perspective 1000px.
  - **Opening:** on `:hover` or `:focus-visible`, via a motion `whileHover` / `whileFocus` variant on the Link. On coarse pointers they open with `useInView(once)` and a 0.12s stagger by index.
  - **Reduced motion:** the leaves are not rendered (photo shown).
  - **Under the frame:** title and `shortDescription`.
  - **Focus:** visible ring `focus-visible:outline-2 outline-brass outline-offset-4`.
  - **`dimmed`:** dimmed doors get `opacity-40`.
- `ServicesTraditionIndex` keeps its markup and logic. Restyle only:
  - obsidian / limestone → marble and `ArchFrame`
  - active chip ruby
  - section frames become arch-topped
- To share the filter with the doors, lift the selected-tradition state. `ServicesTraditionIndex` accepts optional `{ tradition, onTraditionChange }` props (controlled when given). `services/page.tsx` becomes a client island (`ServicesExplorer`) that holds the state and renders the filter chips, `DarbarDoors` and the sections.

- [ ] **Step 1: Hero.** Rewrite the page hero as `PageHero`: crumbs Home › Services; kicker and title from the existing copy; floating photos from 2 service `heroImage`s.
- [ ] **Step 2: Doors and filter.** Implement `DarbarDoors` and the controlled filter; place the doors above the restyled sections.
- [ ] **Step 3: Promises band.** Replace the obsidian promises band with `ArchMedallionList`, using the four existing items verbatim.
- [ ] **Step 4: Closing sections.** Restyle the venues spread, then append `<DawatnamaCTA />`.
- [ ] **Step 5: Verify.** Run `npx tsc --noEmit`. In the browser at 1440, 1366 and 375:
  - doors swing on hover and on Tab focus, with a visible ring
  - on 375 touch emulation, doors open as they scroll in
  - a filter chip dims non-matching doors and sections
  - reduced motion shows photos with no leaves
  - `grep -n obsidian src/app/services/page.tsx src/components/services/ServicesTraditionIndex.tsx` returns nothing
- [ ] **Step 6: Commit.** `feat(inner): services darbar doors`

### Task 3: Service template, hero, sidebar, setups filmstrip, FAQs

**Files:**
- Create: `src/lib/landing/setups.ts`, `src/lib/landing/setups.test.ts`
- Create: `src/components/inner/SetupsFilmstrip.tsx`
- Modify: `src/app/services/[slug]/page.tsx`
- Modify: `src/components/services/DecorTraditionStudio.tsx`, `src/components/services/DisciplineInteractiveShowcase.tsx` (restyle only)

**Interfaces:**
- `setupsForService(serviceId: string): GalleryItem[]`. Moves the inline filter from `[slug]/page.tsx` (lines ~160–180) verbatim:
  - `floral-decorations` → Floral + Weddings
  - `catering-services` → Catering
  - `baraat` → Weddings
  - `corporate-events` → Corporate
  - `family-celebrations` → Family
  - anything else → `[]`
- `SetupsFilmstrip({ items: GalleryItem[]; id?: string })`:
  - **Motion on:** a `motion.ul` with `drag="x"` and `dragConstraints` = the measured overflow. Each item is an `ArchFrame` (`aspect-[3/4]`, `w-[min(70vw,300px)]`) with the item title and venue below, linking to `/gallery?category=${item.category}`.
  - **Controls:** prev and next buttons move by one frame width, using animate on the `x` motion value. The list is `tabIndex=0` with `aria-label`, and ArrowLeft/ArrowRight move one frame.
  - **Reduced motion:** a `snap-x` overflow row with a visible scrollbar on fine pointers, plus the same buttons using `scrollBy`.
  - **Drag vs click:** clicking a frame after a drag of more than 6px is suppressed.

- [ ] **Step 1: Write the failing test** in `setups.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { setupsForService } from "./setups";
import { GALLERY_ITEMS } from "@/data/gallery";

describe("setupsForService", () => {
  it("maps each service to its gallery categories", () => {
    expect(setupsForService("catering-services").every((i) => i.category === "Catering")).toBe(true);
    expect(setupsForService("floral-decorations").every((i) => i.category === "Floral" || i.category === "Weddings")).toBe(true);
    expect(setupsForService("floral-decorations").length).toBe(
      GALLERY_ITEMS.filter((i) => i.category === "Floral" || i.category === "Weddings").length
    );
    expect(setupsForService("nope")).toEqual([]);
  });
});
```

- [ ] **Step 2: Watch it fail.** Run `npm test -- setups`. Expected: FAIL.
- [ ] **Step 3: Make it pass.** Implement `setups.ts`, and have `[slug]/page.tsx` use it. Run `npm test`. Expected: PASS.
- [ ] **Step 4: Rework the template.** In `[slug]/page.tsx` (non-catering):
  - Hero: `PageHero` with crumbs Home › Services › title. `image` is `service.heroImage` (credit is the matching monument's `creditLicense` when the image is a `real-*.webp`, looked up in `HYDERABAD_MONUMENTS` by `image`). `floating` is `galleryImages[1..2]`. Actions are the existing CTAs.
  - The obsidian concierge sidebar becomes a sticky ivory card with a gold border and a ruby CTA.
  - The obsidian "Real setups" band becomes `SetupsFilmstrip` (id kept for the jump link).
  - FAQs become `ThreadFaq` (same `SERVICE_FAQS`, id `service-faqs`).
  - Append `DawatnamaCTA`.
- [ ] **Step 5: Restyle** `DecorTraditionStudio` and `DisciplineInteractiveShowcase` to marble, arch frames and ruby active states. The logic stays unchanged.
- [ ] **Step 6: Verify.** Run `npx tsc --noEmit`. In the browser, on `/services/floral-decor` and `/services/corporate-events`:
  - hero parallax works
  - the filmstrip drags, and buttons and arrow keys move one frame
  - `?tradition=nikkah` still selects the tradition
  - FAQ knots tie when opened
  - no obsidian: `grep -n obsidian "src/app/services/[slug]/page.tsx" src/components/services/DecorTraditionStudio.tsx src/components/services/DisciplineInteractiveShowcase.tsx` returns nothing
- [ ] **Step 7: Commit.** `feat(inner): service template hero, sidebar, setups filmstrip, thread faq`

### Task 4: Baraat procession lane

**Files:**
- Create: `src/data/showcase.ts` (moves `ShowcaseItem` and `DATA_BY_SERVICE` out of `DisciplineInteractiveShowcase.tsx`, exported as `SHOWCASE_BY_SERVICE`)
- Create: `src/lib/landing/procession.test.ts`
- Create: `src/components/inner/ProcessionLane.tsx`
- Modify: `DisciplineInteractiveShowcase.tsx` (import data), `[slug]/page.tsx` (baraat renders `ProcessionLane` instead of the showcase)

**Interfaces:**
- `export const SHOWCASE_BY_SERVICE: Record<"baraat" | "corporate-events" | "family-celebrations", { scriptTag: string; heading: string; highlight: string; items: ShowcaseItem[] }>`, with the data copied verbatim.
- `ProcessionLane({ items: ShowcaseItem[] })`:
  - **Pinned (motion allowed, `min-width:768px`):** section `h-[220svh]` with a sticky `h-[100svh]` stage.
  - **Lane:** a gold road line (`h-px bg-brass`) across the stage. Cards (`ArchFrame` image, `tab`, `subtitle`, first two `cues`) sit in a row, and the row's `x` maps progress 0.05→0.95 to `[60vw, -(rowWidth - 40vw)]` via `useRange` on a measured width.
  - **Lead entry:** the lead index is `indexFromProgress((p-0.05)/0.9, items.length)`. That card gets `scale` keyframes `[1, 1.05, 1]` re-triggered each time the lead index changes (the "drum beat"), plus a ruby kicker "Now arriving".
  - **Otherwise:** a stacked list of the same cards along a vertical gold line.

- [ ] **Step 1: Write the failing test** in `procession.test.ts`: `SHOWCASE_BY_SERVICE.baraat.items` has length 4, and its `tab`s include "Hyderabadi Marfa & Walima" and an entry containing "Pallaki".
- [ ] **Step 2: Watch it fail.** Run `npm test -- procession`. Expected: FAIL (module missing).
- [ ] **Step 3: Make it pass.** Create `src/data/showcase.ts` and update the component import. Run `npm test`. Expected: PASS.
- [ ] **Step 4: Wire the lane.** Implement `ProcessionLane` and wire it on baraat: it replaces the showcase, and the filmstrip is placed after it.
- [ ] **Step 5: Verify.** Run `npx tsc --noEmit`. In the browser on `/services/baraat` at 1440:
  - entries march in, and the lead pulses
  - at 375, the stacked list shows
  - reduced motion gives a stacked list with no blank space
- [ ] **Step 6: Commit.** `feat(inner): baraat procession lane`

### Task 5: Catering experience

**Files:**
- Modify: `src/components/services/CateringPageExperience.tsx`, `src/components/services/CulinaryMenuExplorer.tsx` (restyle only)

**Interfaces:**
- Consumes `PageHero` (`side` slot), `DegIllustration` and `ThreadFaq`.

Steps:
- [ ] **Step 1: Deg hero.** The hero becomes `PageHero` with `side` = an interactive deg block:
  - `DegIllustration` with `open`/`steaming` as in `DegReveal`: steaming is `open && motionAllowed && inView`.
  - A "Break the dum" pill button toggles it.
  - Once open, a "Choose your kitchen ↓" link to the menu explorer's id appears.
- [ ] **Step 2: Kitchen split.** The obsidian `KITCHEN_STANDARDS` band becomes a marble split, using each item's copy verbatim, as in spec §5:
  - Veg arch: emerald accents, `/images/catering-indian-thali.webp`, "Locked Pure Veg & Jain Wing".
  - Non-veg arch: ruby accents, the band's deg photo, "Wood-Charcoal & Granite Hearth".
  - Shared row beneath both: "Calm Hospitality Across Scale" with the band's Irani chai photo.
- [ ] **Step 3: Menus, FAQs and tasting.** Restyle `CulinaryMenuExplorer`: marble tabs with a ruby underline and gold hairlines; ARIA and logic unchanged. FAQs become `ThreadFaq`. The tasting invitation gets marble with an arch frame and a ruby CTA.
- [ ] **Step 4: Verify.** Run `npx tsc --noEmit`. In the browser on `/services/catering`:
  - the deg opens, and the kitchen link scrolls to the menu
  - menu tabs keep arrow-key navigation
  - no steam under reduced motion
  - `grep -n obsidian src/components/services/CateringPageExperience.tsx src/components/services/CulinaryMenuExplorer.tsx` returns nothing
- [ ] **Step 5: Commit.** `feat(inner): catering deg hero and kitchen split`

### Task 6: About, Our qissa

**Files:**
- Create: `src/components/inner/QissaThread.tsx`
- Modify: `src/app/about/page.tsx`, `src/components/about/DeccaniCraftInteractive.tsx` (restyle only)

**Interfaces:**
- `QissaThread({ chapters: { title: string; body: React.ReactNode; image?: { src: string; alt: string } }[] })`:
  - **Not pinned.** A gold thread fills via `useRange` on the section's `useScroll` progress (offset `["start 70%", "end 50%"]`).
  - **Chapters:** each is a row with a knot at the thread and, when it has an image, an `ArchFrame` that slides in from the side (`whileInView`, once).
  - **Knots:** each turns ruby via `useInView` (`amount: 0.6`).
  - **Reduced motion:** the thread is full, knots are ruby and nothing animates.

Steps:
- [ ] **Step 1: Hero.** `PageHero`, with the existing `/about` hero image and its credit "Sailko / Wikimedia Commons (CC BY 3.0)" kept.
- [ ] **Step 2: Qissa.** The narrative section becomes `QissaThread`, with the existing paragraphs split into chapters by their existing subheadings and the existing narrative images.
- [ ] **Step 3: Craft and values.** `DeccaniCraftInteractive` goes from obsidian to marble with arch frames. The values grid becomes `ArchMedallionList`.
- [ ] **Step 4: Teams and close.** Team plates become `ArchFrame`s. The studio band is replaced by `DawatnamaCTA`.
- [ ] **Step 5: Verify.** Run `npx tsc --noEmit`. In the browser:
  - the thread fills and the knots tie
  - the craft selector works by keyboard
  - the credit is visible
  - `grep -n obsidian src/app/about/page.tsx src/components/about/DeccaniCraftInteractive.tsx` returns nothing
- [ ] **Step 6: Commit.** `feat(inner): about qissa thread`

### Task 7: Contact, write your dawat

**Files:**
- Create: `src/lib/landing/formProgress.ts`, `src/lib/landing/formProgress.test.ts`
- Create: `src/components/inner/ThreadProgress.tsx`
- Modify: `src/app/contact/page.tsx`, `src/components/contact/ContactForm.tsx`

**Interfaces:**
- `export interface FieldGroup { id: string; label: string; required: string[]; optional: string[] }`
- `export const CONTACT_GROUPS: FieldGroup[]`:
  - `about`, label "About you": required `["fullName","mobile"]`, optional `["email"]`
  - `event`, label "Your event": required `["eventType","eventLocation"]`, optional `["eventDate","expectedGuests"]`
  - `details`, label "Details": required `[]`, optional `["budgetRange","additionalDetails"]`
- `export function groupProgress(values: Record<string, unknown>, errors: Record<string, unknown>, groups: FieldGroup[]): Record<string, boolean>`
  - **Filled:** a value is filled when it is a non-empty string after trim, or a number.
  - **Group with required fields:** complete when every required field is filled and has no error, and no filled optional field has an error.
  - **All-optional group:** complete when at least one field is filled and no filled field has an error.
- `ThreadProgress({ groups: FieldGroup[]; complete: Record<string, boolean> })`: a vertical gold rail with knots (ruby when complete) and labels on `lg`; a horizontal slim thread on mobile. `aria-live="polite"` announces "About you complete".
- `ContactForm`:
  - Computes `complete` from `watch()` and `formState.errors`, then renders `ThreadProgress`. It exposes nothing new.
  - On the success state, a motion wax seal ("Dawat received", gold radial seal) scales in (`scale 1.4 → 1`, `rotate -8 → 0`) next to the existing reference code. It is static when motion is off.

- [ ] **Step 1: Write the failing tests** in `formProgress.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { groupProgress, CONTACT_GROUPS } from "./formProgress";

const G = CONTACT_GROUPS;
describe("groupProgress", () => {
  it("nothing is complete on an empty form", () => {
    expect(groupProgress({}, {}, G)).toEqual({ about: false, event: false, details: false });
  });
  it("prefilled eventType alone does not complete 'Your event'", () => {
    expect(groupProgress({ eventType: "Baraat" }, {}, G).event).toBe(false);
  });
  it("required fields valid completes the group; an errored optional field blocks it", () => {
    const v = { fullName: "Ayesha", mobile: "9876543210" };
    expect(groupProgress(v, {}, G).about).toBe(true);
    expect(groupProgress({ ...v, email: "x" }, { email: { message: "bad" } }, G).about).toBe(false);
  });
  it("a required field with an error is not complete", () => {
    expect(groupProgress({ fullName: "A", mobile: "98" }, { mobile: { message: "short" } }, G).about).toBe(false);
  });
  it("all-optional group needs one filled, error-free field", () => {
    expect(groupProgress({ additionalDetails: "  " }, {}, G).details).toBe(false);
    expect(groupProgress({ budgetRange: "5-10 Lakhs" }, {}, G).details).toBe(true);
  });
  it("numbers count as filled", () => {
    expect(groupProgress({ eventType: "Baraat", eventLocation: "Falaknuma", expectedGuests: 300 }, {}, G).event).toBe(true);
  });
});
```

- [ ] **Step 2: Watch them fail.** Run `npm test -- formProgress`. Expected: FAIL.
- [ ] **Step 3: Make them pass.** Implement `formProgress.ts`. Run `npm test`. Expected: PASS.
- [ ] **Step 4: Page layout.** On `contact/page.tsx`:
  - The hero is a `compact` `PageHero`.
  - The form column is wrapped in `Envelope`. It opens on mount when motion is allowed and is shown open otherwise. Its card is the form's existing card, at full height (`cardClassName` with no fixed height; the envelope sits behind the top of the card only).
  - The studio directory is restyled with an `ArchFrame` photo.
  - FAQs become `ThreadFaq`.
- [ ] **Step 5: Form.** In `ContactForm`, add `ThreadProgress` and the success seal; restyle the inputs to marble with gold focus and ruby errors. Validation, ARIA and the submit flow stay unchanged.
- [ ] **Step 6: Verify.** Run `npx tsc --noEmit`. In the browser:
  - an empty submit shows the error summary, focused
  - filling the name and phone ties "About you"
  - `/contact?eventType=Hyderabadi%20Nikkah%20%26%20Walima&brief=x` prefills, and "Your event" stays untied until the location is filled
  - a valid submit (no Telegram env) shows the reference code and the seal
  - at 375, the horizontal thread shows with no overflow
- [ ] **Step 7: Commit.** `feat(inner): contact dawat envelope, progress thread, seal`

### Task 8: Gallery, arch salon

**Files:**
- Modify: `src/app/gallery/page.tsx`

Decisions:
- Wrap the grid in `LayoutGroup`. Each card is a `motion.li` with `layout` and `AnimatePresence mode="popLayout"`: enter `opacity 0, y 20`, exit `opacity 0, scale .96`; under reduced motion `layout={false}` and no presence animation.
- Frames alternate by index: `i % 3 === 0` is an `ArchFrame`, the others are white mats with a gold hairline.
- Hover lifts `y: -4` with a gold edge glow.
- The hero becomes a `compact` `PageHero`.
- Chips: active is ruby; the rest have gold borders.
- Lightbox:
  - Backdrop `bg-[#2A1A14]/95`.
  - The image sits in an arch-topped frame (clip `ARCH_PATH` on a wrapper).
  - The focus trap, Escape, arrows and focus return stay unchanged.
- The "private albums" band becomes marble with a ruby CTA.

- [ ] **Step 1: Restyle and animate** as decided above.
- [ ] **Step 2: Verify.** Run `npx tsc --noEmit`. In the browser:
  - changing a chip glides the cards
  - `/gallery?category=Catering` opens filtered
  - the lightbox opens, the arrows work, and Escape returns focus to the opener
  - the `aria-live` count updates
  - `grep -n obsidian src/app/gallery/page.tsx` returns nothing
- [ ] **Step 3: Commit.** `feat(inner): gallery arch salon`

### Task 9: Privacy, sweep, docs and final verification

**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `AGENTS.md`

- [ ] **Step 1: Privacy.** A `compact` `PageHero` with no image; section numbers become small gold arch medallions; marble ground.
- [ ] **Step 2: Obsidian sweep.** Run `grep -rn "obsidian" src/app src/components --include=*.tsx | grep -v "landing/\|layout/"`. Expected: only the documented lightbox comment, or nothing. Fix any stragglers.
- [ ] **Step 3: Docs.** In `AGENTS.md`, add the inner-page primitives, `src/components/inner/`, and the new lib files.
- [ ] **Step 4: Checks.** Run `npx tsc --noEmit && npm test && npm run build` (stop the dev server first). Expected: all exit 0.
- [ ] **Step 5: Browser pass.** Every route at 1440, 1366 and 375, plus reduced motion: no overflow, no console errors, every signature works, and everything is visible statically.
- [ ] **Step 6: Commit.** `feat(inner): privacy restyle, docs`
