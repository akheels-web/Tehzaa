# Tehzaa Landing Page Redesign: "Falaknuma Marble"

**Date:** 2026-11-25
**Status:** Approved by owner (2026-11-25)
**Scope:** Homepage (`/`) rebuilt; site-wide chrome (header, footer, colour tokens) aligned. Inner pages keep their layouts for now.

## 1. Intent and the why

The owner finds the current site **boring, flat, too generic and not Hyderabadi enough**. They want a landing page with a real **wow factor**: immersive, animated and interactive, in a **light theme**, and **without AI slop**.

The site has been redesigned roughly six times (see `AGENTS.md`). The Hyderabadi *content* is already strong: real monument photographs, researched Dawat and Vindhu menus, Pelli and Shaadi rituals, local slang. What has failed is the *presentation*. Content sits in static editorial grids, and an earlier "unslop" pass removed most of the motion. So this redesign keeps the content and photos and replaces how they are staged.

Success means a visitor in Hyderabad lands on the page and, within the first scroll, feels they have stepped into a Nizam's palace. They remember a specific interaction (the arch opening, breaking the dum on the deg, the invitation card), and they reach the contact call to action.

## 2. Goals, non-goals, anti-goals

**Goals**
- A light, ivory-marble landing page that feels three-dimensional and alive, not flat.
- Seven scroll "scenes", each with one signature interaction rooted in Hyderabadi culture.
- Smooth, premium scrolling (Lenis) and choreographed motion (Motion).
- Works on mid-range Android phones, by touch, and with reduced motion switched on.
- Header, footer and colour tokens updated so inner pages do not clash with the new homepage.

**Non-goals (this round)**
- Redesigning inner pages (`/services/*`, `/gallery`, `/about`, `/contact`) beyond the shared chrome and tokens.
- New photography or AI-generated images. Only the 21 existing WebP files in `public/images/` are used.
- Content rewrites beyond the homepage copy.
- Changes to the contact API or the Telegram backend.

**Anti-goals (a failure even if it "works")**
- **AI slop:** floating gradient blobs, glassmorphism cards, sparkle/star icons, emoji, "trusted by 500+ couples" stats, star ratings, generic stock-style phrasing, every heading in italic gold.
- **Beige flatness:** the page must not read as cream background plus grid of cards. Depth, layering and motion are the point.
- **Slang overload:** Hyderabadi/Dakhni phrases only where a local would naturally say them (a few per section, not every line).
- **Tech-demo feel:** animation must serve a cultural metaphor (arch, deg, dawatnama, map), never motion for its own sake.
- **Jank:** no scroll-jacking that fights the user, no layout shift, no sluggish phones.

## 3. Constraints

- **Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind 3.4, `motion` 12 (`motion/react`). Keep it.
- **New dependency:** `lenis` (smooth scroll) only. No GSAP, no Three.js.
- **Accessibility:** existing standards in `AGENTS.md` hold: skip link, focus-visible outlines, ARIA tabs and keyboard navigation, `MotionConfig reducedMotion="user"`. Every drag interaction has a button or keyboard alternative.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, Lenis is disabled, pinned scroll scenes become normal stacked sections, and the arch shows at full size.
- **Performance:** Largest Contentful Paint image is the hero arch photo, loaded with `priority`. Animations use `transform` and `opacity` only. No continuous JavaScript animation loops off-screen.
- **Fonts:** keep Cormorant Garamond (display) and Manrope (body), already loaded via `next/font`.
- **Build:** `npx tsc --noEmit` and `npm run build` must pass.

## 4. Approaches considered

| Approach | Trade-off | Decision |
|---|---|---|
| **Motion + Lenis** | Uses the library already in the codebase; small bundle; `useScroll` with sticky sections covers pinning and parallax. Complex multi-element sync needs hand-tuning. | **Chosen by owner** |
| GSAP + ScrollTrigger | Most precise scroll choreography, but adds a second animation system alongside Motion and more weight, for gains in only a couple of scenes. | Rejected |
| Three.js 3D marble arch | Biggest single wow, but heavy on mid-range phones and tends to read as a tech demo. | Rejected |

**Visual direction:** three directions were mocked (Nizam ki Raat, dark; Laad Bazaar, loud colour; Deccani Miniature, storybook). The owner picked Nizam ki Raat, then asked for a light theme. Of two light variants (L1 Falaknuma Marble, depth-led; L2 Chowmahalla Sunlight, colour-led), the **owner chose L1 Falaknuma Marble**. Mockups are in `.superpowers/brainstorm/` (gitignored).

## 5. Visual system (decided)

**Palette: Falaknuma Marble**
- Marble ivory ground `#FBF8F2` → warm marble `#F3ECE0` (subtle vertical gradient per scene; no flat single fill).
- Gold leaf `#B08A4A` (rules, arch borders, jaali), deep gold text `#7A5929` (AA on ivory).
- Ruby `#7A1F2B` (primary accent and buttons), ruby dark `#5C1F24` for hover.
- Ink `#2A1A14` headings, `#5A463A` body.
- Rose petal `#E9B8B8` (decorative only).
- These map onto the existing tokens (`alabaster`, `brass`, `garnet`, `ink`). Update values rather than adding parallel token families. `obsidian` stays in the config for inner pages that still use it.

**Texture and depth**
- **Gold jaali:** a repeating SVG lattice (eight-point Deccani star) masked to the edges of scenes, not a dot grid.
- **Layering:** every scene has at least three depth planes (jaali or background, photos, foreground text or ornament) that parallax at different rates on scroll and, on pointer devices, shift slightly with the cursor.
- **Frames:** photos sit in white mats with gold hairlines, or in Deccani arch masks (scalloped top). No rounded SaaS cards.
- **Shadows:** warm, soft and ruby-tinted (`rgba(92,31,36,.25)`), never grey.

**Type**
- Display: Cormorant Garamond 500, very large (hero `clamp(3rem, 7vw, 6.5rem)`), with one italic ruby phrase per heading at most.
- Body and UI: Manrope.
- Headline reveal: words rise from a gold hairline with a short stagger ("zardozi thread"). Used for scene titles only.

## 6. Page structure: seven scenes

Each scene lives in its own component under `src/components/landing/`. Content comes from the existing `src/data/*` files where possible.

### 01 The Arch opens (hero)
- **What you see:** ivory marble with gold jaali at the edges, two or three framed photos floating at different depths, and a central Deccani arch framing Falaknuma Palace. Title: "A Nizam's welcome, *for your wedding.*" Side copy, plus a ruby call to action ("Enter the Darbar" → scrolls to scene 03) and a secondary link to `/contact`.
- **Interaction:** the section is pinned for about 150vh of scroll. As you scroll, the arch grows from a doorway to full viewport and the photo crossfades from Falaknuma to Charminar to Chowmahalla, then releases into scene 02. Floating photos parallax outward, and the cursor tilts the depth planes slightly. A few rose petals drift down (CSS only, at most 8, paused off-screen).
- **Mobile:** shorter pin (about 100vh); no cursor tilt.

### 02 Pelli & Shaadi
- Reuse the logic from `PelliVsShaadiCurtain.tsx`, restyled: marble frame, gold divider with a small Charminar-finial handle.
- **Interaction:** drag or keyboard-arrow the divider. Ritual names (Pelli Pandiri, Jeelakarra Bellam / Nikkah, Sanchaq) fade in on the side that is dominant.
- **Keeps the conversion links** *(builder call)*: under the curtain, two buttons, "Plan a Telugu Pelli" and "Plan a Shaadi & Walima", link to `/contact?eventType=…&brief=…` exactly as `GangaJamuniShowcase.tsx` does today, so the homepage keeps its tradition-prefilled enquiries. The rest of `GangaJamuniShowcase` (tabs, long descriptions, ritual checklists) is dropped from the homepage; that depth lives on `/services/floral-decor`.

### 03 The Five Darbars (services)
- Five arched doorways, one per service in `SERVICES`: Decor, Catering, Baraat, Corporate, Family.
- **Interaction (desktop):** a sticky section where vertical scroll drives the arches sideways. The arch nearest the centre scales up, its gold edge glows, and its title and short description show. Clicking opens `/services/[slug]`.
- **Mobile:** a native horizontal swipe row with scroll-snap.

### 04 Lift the deg (catering)
- A copper biryani deg (illustrated SVG or CSS shapes, not a photo) sealed with a dough ring.
- **Interaction:** click, tap or drag the lid to "break the dum". The lid lifts and tilts, steam wisps rise, and menu dish cards fan out from the deg. Tabs switch between **Shaadi Dawat** and **Telugu Pelli Vindhu** (and Pure Veg), using dish data from `services.ts` (`menuCollections[].dishes`). A "Reset dum" control closes it.
- Keyboard: the lid is a button; tabs follow the existing ARIA tablist pattern.

### 05 Hyderabad by night lamps (venue map)
- A stylised gold-line map: the Musi river, the Old City cluster, Golconda to the west, HITEC City to the north-west. This is an illustrative, schematic SVG, not geographically exact.
- Glowing pins for the six monuments in `monuments.ts`, plus HICC/HITEC.
- **Interaction:** hover or tap a pin to show a framed photo, its name, era and "how we celebrate here" line. Pins pulse softly when the section enters view. A list fallback for keyboard and screen readers.

### 06 Hamari Rasmein (the moments we plan)
*Replaces the testimonials scene (owner decision: the existing testimonials are placeholder copy and are not shown on the homepage).*
- A walk through the real ceremonies Tehzaa plans, drawn from both traditions: **Sanchaq, Manjha / Haldi, Mehendi, Pelli Pandiri & Muhurtham, Baraat, Nikkah, Walima / Vindhu**. Each has one photo from `public/images/`, its name, a one-line meaning and "what we take care of" (from existing copy in `services.ts`).
- **Interaction:** a gold thread runs down the scene like a garland string, and as you scroll it "ties" each rasm in turn. The active rasm's photo slides into a large arch frame on one side while its text reveals on the other. The rasm list is also clickable (tabs), with arrow-key navigation.
- **Mobile:** stacked cards with the thread on the left edge; tap to expand.
- Footer link "See them in our gallery" → `/gallery`.
- No people's names, no quotes, no ratings.

### 07 Your dawatnama (call to action)
- A ruby invitation envelope with a gold wax seal.
- **Interaction:** as it scrolls into view the flap opens (3D `rotateX`) and the card slides up: "Chai pe milenge?", a short line, and buttons for **Plan Your Event** (`/contact`) and **WhatsApp**. The seal itself is also clickable to replay the animation.

**Order on the page:** 01 → 02 → 03 → 04 → 05 → 06 → 07 → footer.

**Replaced homepage components** *(builder call)*: every component in `src/components/home/` stops being used by `/`: `InteractiveHero`, `BrandMarquee`, `GangaJamuniShowcase`, `InteractiveBrandStory`, `InteractiveDisciplines`, `HomeCulinaryStage`, `ParallaxGalleryShowcase`, `AnimatedPlanningTimeline`, `InteractiveTestimonials`, `HyderabadPrecinctAtlas`, plus the inline promises grid and Falaknuma CTA in `page.tsx`. Before deleting, grep for imports elsewhere (`MotionReveal` and `PelliVsShaadiCurtain` may be reused). Delete the unused ones in the same change, since git keeps the history.

## 7. Site-wide chrome

- **Header:** transparent over the hero, turning into frosted ivory with a gold hairline after scrolling. Nav links underline in gold on hover. Mobile drawer becomes ivory with a jaali edge. Keyboard and ARIA behaviour unchanged.
- **Footer:** switches from obsidian to a light marble footer with a ruby band for the oversized TEHZAA wordmark and a gold Charminar skyline crest.
- **WhatsApp button:** ruby with a gold ring.
- **Lenis:** mounted once in a client `SmoothScroll` provider in `layout.tsx`, disabled when reduced motion is on. Anchor links and `scroll-padding-top` keep working.
- **Inner pages:** inherit the new token values automatically. No layout changes this round.

## 8. Motion rules

- Easing: one house curve (`[0.22, 1, 0.36, 1]`), with spring only for draggable elements.
- Durations: 0.4–0.9s for reveals; scroll-linked motion is tied to scroll progress, not time.
- Animate only `transform`, `opacity`, `clip-path` and `filter: blur` (sparingly).
- Each scene's entrance plays once (`viewport={{ once: true }}`); interactions are repeatable.
- No infinite animation except petals (CSS, paused via `IntersectionObserver` off-screen) and the soft pin pulse in scene 05.

## 9. Copy voice

Warm, confident Hyderabadi English with Dakhni and Telugu touches where natural: "Aadaab", "Namaskaram", "ekdum shahi", "chai pe milenge?", "nakko tension". At most one slang phrase per heading or call-to-action cluster. No invented numbers or awards.

## 10. Open items for the owner

1. **Testimonials** *(owner decided)*: the six testimonials in `src/data/testimonials.ts` are placeholder copy, so scene 06 becomes "Hamari Rasmein" instead. `testimonials.ts` is left untouched for now; real quotes can return as a scene later.
2. **Phone number** *(builder call)*: `+91 98765 43210` looks like a placeholder and is hard-coded in about 12 places. The new homepage uses the same number via one shared constant (e.g. `src/lib/contact.ts`) so the real number can be swapped in one place later. Other pages keep their hard-coded copies this round.

## 11. Left to the builder

- Exact component breakdown, hook names and file organisation within `src/components/landing/`.
- Precise jaali SVG motif, deg illustration and map drawing (must follow the descriptions above).
- Exact pin lengths, parallax rates and breakpoints, tuned by eye in the browser.
- Copy wording within the voice rules in §9.

## 12. Verification

- `npx tsc --noEmit` and `npm run build` pass.
- Manual check in the browser at 1440px, 768px and 375px: every scene's interaction works by mouse, touch emulation and keyboard.
- Reduced-motion emulation: page reads correctly with no pinning and no scroll-linked motion.
- No horizontal page scroll at any width; no console errors.
- Lighthouse mobile performance does not fall more than 10 points below the current homepage.
