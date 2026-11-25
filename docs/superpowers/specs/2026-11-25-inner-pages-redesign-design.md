# Tehzaa Inner Pages Redesign: Falaknuma Marble, Part 2

**Date:** 2026-11-25
**Status:** Approved by owner (2026-11-25)
**Builds on:** `docs/superpowers/specs/2026-11-25-landing-page-redesign-design.md` (palette, motion rules, anti-slop rules, primitives). Everything in that spec's §3, §5, §8 and §9 applies here unchanged.
**Branch:** continue on `feat/falaknuma-landing`.

## 1. Intent and the why

The homepage is now immersive and unmistakably Hyderabadi. The inner pages picked up the marble colours automatically, but they still use the old flat editorial layouts, and several keep dark obsidian bands that read as holes on a light site. The owner wants the rest of the site to match the landing page's level.

**Owner's choice (approach B):** a consistency pass on every page, plus **one signature interaction per page** built from the landing page's pieces. Practical content (comparing services, reading menus, filling in the form) must stay easy to scan. Pages are not rebuilt as pinned scroll stories.

## 2. Goals, non-goals, anti-goals

**Goals**
- Every inner page uses the Falaknuma Marble language: marble grounds, gold jaali depth, arch frames, ruby accents, word-reveal headings.
- No obsidian (dark) bands remain on these pages. The one exception is the gallery lightbox backdrop, which stays dark for photo viewing.
- Each page has one signature interaction (§5) that feels like the homepage.
- All existing behaviour keeps working (§3).

**Non-goals**
- No new content, services, photos, people, testimonials or numbers.
- No changes to the contact API, validation rules, Telegram dispatch or data files' meaning. Restyling and component props are fine.
- No pinned full-page scroll stories. The baraat procession is the one pinned scene, and it is short.

**Anti-goals:** same as the landing spec. In particular: no slop (blobs, glass, sparkle icons, emoji, invented stats or ratings), no beige flatness, and no animation that slows down reading a menu or filling in a form.

## 3. Constraints: behaviour that must survive

- **Contact form** (`ContactForm.tsx`): Zod validation, honeypots, error summary with links, `aria-invalid`/`aria-describedby`, character counter, `?eventType=` and `?brief=` prefill, success state with reference code, and the `/api/contact` POST. All unchanged in behaviour.
- **Gallery** (`/gallery`): `?category=` deep link, filter chips with `aria-pressed`, `aria-live` count, and the focus-trapped lightbox that restores focus. All unchanged in behaviour.
- **Services:** `generateStaticParams`, the five canonical slugs, the catering page's separate experience, `DecorTraditionStudio` `?tradition=` handling, the existing ARIA tab patterns, and `JsonLd`.
- **Reduced motion:** every signature has a static, fully visible fallback through `useMotionAllowed()`.
- **Mobile:** works by touch at 375px with no horizontal page scroll.
- **Build:** `npx tsc --noEmit`, `npm test` and `npm run build` pass.

## 4. Approaches considered

| Approach | Trade-off | Decision |
|---|---|---|
| A. Consistency pass only | Fast and safe, but the pages stay "nice documents" with no wow moment. | Rejected |
| **B. Consistency pass + one signature per page** | The homepage feeling on every page, with practical content still scannable. Moderate work, mostly reusing primitives. | **Chosen by owner** |
| C. Full scroll-scene rebuild of every page | Most dramatic, but about 3× the work, and it fights the practical jobs of these pages. | Rejected |

## 5. Page by page

### Shared pieces (new, in `src/components/landing/primitives/` unless noted)
- **`PageHero`**: the inner-page hero. Breadcrumbs, kicker, `RevealTitle` h1 with an italic ruby tail, intro, up to two CTAs, and on the right an `ArchFrame` photo with one or two floating photos at different parallax depths, over `DepthJaali`. It is static under reduced motion and stacks on mobile (arch below the copy, floating photos hidden).
- **`ThreadFaq`**: replaces the hairline and obsidian FAQs. Native `<details>`/`<summary>` hang on a vertical gold thread; each question's knot fills ruby when open, and the answer height animates (motion `height: auto`; instant under reduced motion). The FAQ content is unchanged.
- **`ArchMedallionList`**: replaces the numbered "promises" and "values" grids, including the obsidian "Four Things We Never Compromise On". Each item gets a small gold arch medallion holding its numeral, and items reveal with a short stagger.
- **`DawatnamaCTA`**: reused unchanged as the closing CTA on `/services`, `/about` and the four template service pages. The catering page keeps its own tasting invitation, restyled. Every page therefore ends in the invitation.

### `/services`: "Darbar doors"
- **Hero:** `PageHero` with the five service photos as the floating layer.
- **Signature:** the five services as large arched **double doors**. Each door leaf is ivory with a gold jaali panel. Hover or keyboard focus swings the two leaves open (`rotateY` ±70°, perspective) to reveal the service photo, title and short description behind; click goes to `/services/[slug]`.
  - **Touch:** doors open one by one as they scroll into view.
  - **Reduced motion:** doors render open.
  - The existing `ServicesTraditionIndex` tradition filter stays above the doors, restyled. Filtering dims non-matching doors rather than removing them.
  - *(Builder call)* The doors are a **visual index above** the five long service sections in `ServicesTraditionIndex` (inclusions, occasions, "From ₹…", quote and detail buttons). Those sections stay, restyled in marble with arch frames, because they are the page's comparison content. The tradition filter dims non-matching doors and sections alike. Each door links to its detail page.
- **Consistency:** the obsidian promises band becomes `ArchMedallionList`; the venues spread is restyled; the page closes with `DawatnamaCTA`.

### `/services/[slug]` (decor, baraat, corporate, family)
- **Hero:** `PageHero` using `service.heroImage` in the arch and `service.galleryImages[1..2]` as the floating photos.
- **Main column:** restyled. `DecorTraditionStudio` and `DisciplineInteractiveShowcase` keep their logic, with obsidian and limestone styling swapped for marble, arch frames and ruby active states.
- **Sidebar:** the obsidian concierge sidebar becomes a sticky ivory card with a gold border and a ruby CTA.
- **"Real setups" band (signature for decor, corporate and family):** the obsidian band becomes a **draggable marble filmstrip** of arch-framed photos. *(Builder call)* The photos come from **`GALLERY_ITEMS` filtered by the service's category**, as the current band does, and each frame is captioned with its title and venue and links to `/gallery`. `galleryImages` would repeat the hero photos, carry no captions and give too few frames to drag. It drags horizontally with momentum (motion `drag="x"` with constraints), and also has arrow buttons and keyboard (focusable list, ArrowLeft/Right moves one frame). Reduced motion gives a plain scroll-snap row with buttons.
- **Baraat signature, "procession lane":** a short pinned scene (about 220vh) where the baraat entries march in from the right along a gold road line as you scroll. The leading entry gets a small drum-beat scale pulse tied to scroll progress. It falls back to a stacked list on mobile and under reduced motion.
  - *(Builder call)* The procession marches the **four entries in `DisciplineInteractiveShowcase`'s baraat data**: Hyderabadi Marfa, Punjabi/Marwari Bagghi, Telugu Pallaki and Phoolon ki Chadar. `service.offerings` has only two.
  - On `/services/baraat` the procession **replaces the tabbed showcase**, so the same four entries aren't shown twice. "Everything We Take Care Of" stays.
  - The baraat page keeps the filmstrip too, placed after the procession.
- **FAQs:** `ThreadFaq`. Closes with `DawatnamaCTA`.

### `/services/catering` (`CateringPageExperience`)
- **Hero signature:** `PageHero` variant with the interactive deg (reuse `DegIllustration`) in place of the arch photo. Breaking the dum shows a "Choose your kitchen" prompt that scrolls to the menu explorer. Steam rules are as on the homepage.
- **Consistency:**
  - The obsidian "Separate Kitchens. Real Fire. Honest Taste." band becomes a marble split of two kitchen arches. *(Builder call)* The three existing standards are placed without writing new copy:
    - **Veg kitchen** arch (emerald accents, Tailwind `emerald-*` reserved for veg): "Locked Pure Veg & Jain Wing", with the existing `/images/catering-indian-thali.webp`.
    - **Non-veg kitchen** arch (ruby accents): "Wood-Charcoal & Granite Hearth", with the band's deg photo.
    - "Calm Hospitality Across Scale" is a shared gold-ruled row beneath both, with the band's Irani chai photo.
  - `CulinaryMenuExplorer` is restyled (marble tabs with a ruby active underline, gold hairlines); its logic is unchanged.
  - FAQs move to `ThreadFaq`, and the tasting invitation is restyled.

### `/about`: "Our qissa"
- **Hero:** `PageHero`.
- **Signature:** the narrative section becomes **"Our qissa"**: the studio's existing story paragraphs as chapters strung on a vertical gold thread. The thread fills as you scroll (`useRange` on the section's scroll progress, not pinned), and each chapter's knot ties ruby and its arch photo slides in as it reaches the middle of the screen. Under reduced motion the thread is full and nothing moves.
- **Consistency:**
  - `DeccaniCraftInteractive` loses its obsidian band and gets marble with arch frames; its logic is unchanged.
  - The values grid becomes `ArchMedallionList`, and the team plates become arch frames.
  - The studio band is replaced by `DawatnamaCTA`.

### `/contact`: "Write your dawat"
- **Hero:** `PageHero` (compact) with Jubilee Hills studio copy.
- **Signature:** the form lives on an **invitation card that slides out of a ruby envelope** on load (the envelope and flap visuals reused from `DawatnamaCTA`, factored into a shared `Envelope` piece).
  - A **gold-thread progress rail** beside the form ties a knot as each group becomes complete. *(Builder call)* Groups are by meaning, not by row:
    - **About you:** name, phone and email (email is optional).
    - **Your event:** event type, date, venue/location if present, and guests.
    - **Details:** budget and notes.
  - Completion rules:
    - A group with required fields ties once every required field in it is valid and no filled optional field in it has an error.
    - An all-optional group ties once at least one field in it is filled and error-free, so it never ties on page load.
    - Prefilled values count, so `?eventType=` alone does not tie "Your event"; the venue or location is still required (it is the schema's required field; the date is optional).
  - The rule is a pure function, `groupProgress(values, errors, groups)`, and is unit-tested.
  - On successful submit, a **wax seal stamps** onto the card, reading "Dawat received", alongside the existing reference code.
  - **Reduced motion:** the card shows out of the envelope, and the knots fill without animation.
  - **Mobile:** the progress rail becomes a slim horizontal thread above the form.
- **Consistency:** the studio directory is restyled with an arch-framed studio photo; FAQs move to `ThreadFaq`.

### `/gallery`: "Arch salon"
- **Hero:** `PageHero` (compact).
- **Signature:** a masonry of photos whose frames alternate between arch-topped and white-matted. Changing a filter chip **re-flows the grid smoothly** (motion `layout` + `AnimatePresence` popLayout), so cards glide to their new places, and new ones rise in. Hovering a card lifts it slightly with a gold edge glow. The lightbox shows the full, uncropped photo in a gold-edged marble frame on a dark ink backdrop (owner decision, 2026-11-25: an arch crop would hide the photo's corners). Under reduced motion, filtering is instant.
- **Consistency:** the obsidian styling in chips and the lightbox moves to the marble and ink palette; the "private albums" CTA band is restyled.

### Photo credits
*(Builder call)* `PageHero` gets an optional `credit` slot. Any hero whose arch shows a CC-licensed monument photo displays its `creditLicense` from `monuments.ts` in small text under the arch, so the existing `/about` credit stays. The homepage venue-map card also shows the active monument's credit. The CC BY and BY-SA licences on these photos require attribution.

### `/privacy`
- Restyle only: marble ground, `PageHero` (compact, no photo), and section numbers as gold arch medallions. No signature.

## 6. Decided vs left to the builder

**Decided:** the approach (B); the signatures above; no obsidian bands except the lightbox backdrop; DawatnamaCTA as the shared closing CTA (except catering); the veg = emerald / non-veg = ruby kitchen split; and preserving every behaviour in §3.

**Settled after the builder check (marked "Builder call" above):** the services doors as an index above the kept sections; the baraat procession's data source, and the procession replacing the baraat showcase; filmstrip photos from `GALLERY_ITEMS`; the catering kitchen split; the contact progress groups and rules; and monument photo credits.

**Left to the builder:**
- Exact component APIs.
- Door and jaali panel drawing.
- Procession pin length and pulse timing.
- Filmstrip drag constraints.
- How to factor `Envelope` out of `DawatnamaCTA`.
- Copy wording within the landing spec's voice rules (§9).

## 7. Verification

- `npx tsc --noEmit`, `npm test` and `npm run build` pass. Pure logic added (e.g. contact-form group completion, procession index mapping) is unit-tested with Vitest.
- **Browser checks** at 1440×900, 1366×657 and 375×812 for every route: signature works by mouse, touch emulation and keyboard; no horizontal overflow; no console errors.
- **Reduced-motion emulation:** every page fully visible and static.
- **Regression checks:**
  - The contact form submits successfully (simulated without Telegram credentials) and shows the reference code.
  - Prefill works from homepage scene 02 links.
  - `/gallery?category=…` deep link and lightbox focus return work.
  - Decor `?tradition=` works.
- **Anti-slop grep:** no matches. No `obsidian` class remains in these pages, except the gallery lightbox.
- A final whole-branch review by a fresh reviewer.
