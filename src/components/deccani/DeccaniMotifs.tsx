import React from "react";
import { cn } from "@/lib/utils";

interface DeccaniArchFrameProps {
  children: React.ReactNode;
  variant?: "mehrab" | "dome" | "plinth";
  theme?: "alabaster" | "ivory" | "light" | "dark" | "obsidian" | "emerald";
  className?: string;
}

/**
 * Architectural gallery frame inspired by Chowmahalla scalloped arches & crisp editorial mats.
 * Uses sharp rectangular or micro-chamfer bases rather than rounded SaaS cards.
 */
export function DeccaniArchFrame({
  children,
  variant = "mehrab",
  theme = "alabaster",
  className,
}: DeccaniArchFrameProps) {
  const isDark = theme === "dark" || theme === "obsidian" || theme === "emerald";

  const shapeClass =
    variant === "dome"
      ? "rounded-t-[140px] rounded-b-[2px]"
      : variant === "plinth"
        ? "rounded-[2px]"
        : "rounded-t-[44px] rounded-b-[2px]";

  const innerShapeClass =
    variant === "dome"
      ? "rounded-t-[134px] rounded-b-none"
      : variant === "plinth"
        ? "rounded-none"
        : "rounded-t-[38px] rounded-b-none";

  return (
    <div
      className={cn(
        "relative p-2 sm:p-3 overflow-hidden transition-colors duration-300",
        isDark
          ? "bg-obsidian-elevated border border-brass/30 shadow-obsidian"
          : "bg-silk border border-stone-line shadow-gallery",
        shapeClass,
        className
      )}
    >
      {variant !== "plinth" && (
        <svg
          viewBox="0 0 240 20"
          fill="none"
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 z-20 w-24 sm:w-32 h-3.5",
            isDark ? "text-brass-light/75" : "text-brass/70"
          )}
        >
          <path
            d="M12 15C52 15 80 11 98 6C108 3 114 2 120 2C126 2 132 3 142 6C160 11 188 15 228 15"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="120" cy="2" r="1.6" fill="currentColor" />
        </svg>
      )}

      <div className={cn("relative h-full w-full overflow-hidden", innerShapeClass)}>
        {children}
      </div>
    </div>
  );
}

/**
 * Whisper-subtle geometric Deccani lattice motif for optional atmospheric chapter depth.
 */
export function JaaliPattern({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const strokeColor = tone === "dark" ? "#C7A36B" : "#A27B43";
  const patternId = tone === "dark" ? "jaali-dark" : "jaali-light";

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none w-full h-full",
        tone === "dark" ? "opacity-[0.04]" : "opacity-[0.035]",
        className
      )}
    >
      <defs>
        <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M16 0L32 16L16 32L0 16Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.75"
          />
          <circle cx="16" cy="16" r="2.2" fill="none" stroke={strokeColor} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

interface TehzeebDividerProps {
  theme?: "light" | "dark";
  className?: string;
}

/**
 * Minimalist architectural 1px hairline divider centered with a scalloped Deccani crest.
 */
export function TehzeebDivider({ theme = "light", className }: TehzeebDividerProps) {
  const isDark = theme === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-4 w-full", className)}
    >
      <span
        className={cn(
          "h-px flex-1 max-w-[140px]",
          isDark ? "bg-obsidian-line" : "bg-stone-line"
        )}
      />
      <svg
        viewBox="0 0 40 22"
        fill="none"
        className={cn("w-8 h-4 shrink-0", isDark ? "text-brass-light" : "text-brass")}
      >
        <path
          d="M4 17C10 17 14 13 16.5 9C18 6.5 19.2 5 20 3.5C20.8 5 22 6.5 23.5 9C26 13 30 17 36 17"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <circle cx="20" cy="11" r="1.4" fill="currentColor" />
      </svg>
      <span
        className={cn(
          "h-px flex-1 max-w-[140px]",
          isDark ? "bg-obsidian-line" : "bg-stone-line"
        )}
      />
    </div>
  );
}

/**
 * Minimalist 1px brass hairline elevation uniting Hyderabad's real architectural landmarks:
 * Taramati Baradari, Kakatiya Gopuram, Charminar four minarets, Falaknuma dome, and Cathedral spire.
 */
export function CharminarSkylineCrest({
  theme = "light",
  className,
}: {
  theme?: "dark" | "light";
  className?: string;
}) {
  const isDark = theme === "dark";

  return (
    <svg
      viewBox="0 0 720 68"
      fill="none"
      aria-hidden="true"
      className={cn(
        "w-full max-w-3xl h-11 sm:h-14 mx-auto",
        isDark ? "text-brass-light/80" : "text-brass/75",
        className
      )}
    >
      <path d="M16 62H704" stroke={isDark ? "#2E2823" : "#E2DAD0"} strokeWidth="1" />

      {/* Taramati Baradari 3-Arch Silhouette */}
      <path
        d="M48 62V36H112V62M56 62V47C56 43 60 40 65 40C70 40 74 43 74 47V62M86 62V47C86 43 90 40 95 40C100 40 104 43 104 47V62M42 36H118"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Kakatiya / Telugu Temple Gopuram */}
      <path
        d="M160 62L170 28H200L210 62M175 28L180 18H190L195 28M185 18V12M166 44H204M164 52H206"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="185" cy="11" r="1.5" fill="currentColor" />

      {/* Charminar Four Minarets & Grand Arch */}
      <path
        d="M312 62V16M312 16L316 10L320 16M320 62V16M311 26H321M311 40H321"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M400 62V16M400 16L404 10L408 16M408 62V16M399 26H409M399 40H409"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M320 34H400M320 42H400M338 62V49C338 43 349 38 360 35C371 38 382 43 382 49V62"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* Taj Falaknuma Palace Pediment */}
      <path
        d="M506 62V40H564V62M502 40L535 24L568 40M518 62V47M535 62V47M552 62V47"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Sanctuary Spire */}
      <path
        d="M622 62V42L640 20L658 42V62M640 20V13M633 62V49C633 44 636 40 640 38C644 40 647 44 647 49V62"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Architectural Hyderabadi greeting index uniting communities cleanly.
 */
export function HeritageGreetingBanner({
  theme = "light",
  className,
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const isDark = theme === "dark";
  const greetings = ["Aadaab", "Namaskaram", "Sat Sri Akal", "All Vibes Welcome"];

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-1.5 rounded-[2px] border text-[11px] sm:text-xs font-sans font-medium tracking-[0.06em]",
        isDark
          ? "bg-obsidian-elevated/90 border-obsidian-line text-ink-lightMuted"
          : "bg-silk/90 border-stone-line text-ink-muted",
        className
      )}
    >
      {greetings.map((item, idx) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          {idx < greetings.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                "w-1 h-1 rotate-45",
                isDark ? "bg-brass-light" : "bg-brass"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
