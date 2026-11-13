# Contact Page & Telegram Backend Implementation Record

- **Owner**: `contact-api`
- **Completed Components & Modules**:
  1. `src/lib/validation.ts`:
     - Comprehensive Zod validation schema (`contactFormSchema`) covering Full Name, Mobile (Indian regex `^(?:(?:\+|0{0,2})91)?[6789]\d{9}$`), Email, Event Type (expanded `EVENT_TYPE_OPTIONS` for inclusive pan-Hyderabad communities—Telugu & South Indian Weddings, North Indian / Punjabi / Marwari Ceremonies, Hyderabadi Nikkah & Walima, Engagement, Sangeet & Haldi, Seemantham / Baby Shower, Naming Ceremony, Housewarming, Corporate Summit & Gala, Reception, etc.—while maintaining backward-compatible `EVENT_TYPES`), Event Date, Hyderabad Location/Venue, Expected Guests (1-50,000, string or number), Budget Range, Additional Details (max 2000 chars), and Honeypot anti-spam trap.
     - Full TypeScript types (`ContactFormData`, `EventType`, `BudgetRange`).
  2. `src/lib/rate-limit.ts`:
     - Sliding/window in-memory rate limiter strictly enforcing 5 requests per 15 minutes per IP.
     - Automated background cache purge preventing memory leaks.
     - Returns HTTP 429 Retry-After and rate limit headers.
  3. `src/lib/telegram.ts`:
     - Generates unique reference code format: `TEH-${year}-${4-char-alphanumeric}` (e.g., `TEH-2026-XXXX`).
     - Sanitizes user input with HTML entity escaping (`&`, `<`, `>`, `"`, `'`) to block Telegram injection attacks.
     - Dispatches formatted HTML messages to Telegram Bot API with 8s abort controller timeout.
     - Graceful offline/missing token simulation: logs preview cleanly without crashing or blocking user submission.
  4. `src/app/api/contact/route.ts`:
     - Server-side route handler for `POST /api/contact`.
     - Validates IP, rate limit, honeypot spam bot trapping, zod data validation, and Telegram notification.
  5. `src/components/contact/ContactForm.tsx`:
     - Client component using `react-hook-form` and `@hookform/resolvers/zod` styled in luminous Warm Ivory (`#F4EDE2`) & Cream (`#FAF7F2`) with `rounded-2xl` card framing, `rounded-lg` inputs/buttons, `text-xs` sentence-case labels (`text-taupe-dark`), `tabular-nums` booking code, and `1px` Antique Gold hairlines.
     - Inclusive Event Type selector (`EVENT_TYPE_OPTIONS`), Hyderabad localities datalist, Indian mobile validation, budget range options.
     - Responsive states: submitting spinner, live inline error alerts, and editorial success state with copyable Reference ID, Deep Emerald WhatsApp Desk button, direct phone call, and submission reset.
  6. `src/app/contact/page.tsx`:
     - Editorial luxury Contact page for Tehzaa Celebrations on Warm Ivory & Cream surfaces with crisp 1px Antique Gold architectural hairlines, `text-taupe-dark`/`text-gold-dark` contrast tokens, `rounded-lg` WhatsApp CTA, and zero dark card clutter or fabricated stats.
     - Jubilee Hills Atelier & Financial District Hub addresses, direct phone lines, consultation hours, inclusive pan-Hyderabad cultural positioning, and curated FAQs.
  7. `.env.example`:
     - Documents `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `NEXT_PUBLIC_SITE_URL`.
- **Testing & Verification**:
  - `npx tsc --noEmit`: 0 errors.
  - `npm run build`: Production build succeeded with all static routes and dynamic `/api/contact`.
  - Live server integration test: Verified valid submissions (`200 OK`, `referenceId`), Honeypot bot traps (`200 OK` simulated, no Telegram push), and IP rate limiting (5 requests allowed, 6th returns `429 Too Many Requests`).
