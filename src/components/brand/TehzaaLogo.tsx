import React from "react";
import { cn } from "@/lib/utils";

export interface TehzaaLogoProps {
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showEmblem?: boolean;
  className?: string;
}

/**
 * Editorial Deccani logo mark pairing a scalloped arch & lotus monogram
 * with Cormorant Garamond wordmark and tracked Manrope descriptor.
 */
export function TehzaaLogo({
  theme = "light",
  size = "md",
  showEmblem = true,
  className,
}: TehzaaLogoProps) {
  const isDark = theme === "dark";

  const sizeStyles = {
    sm: {
      svg: "w-7 h-7",
      title: "text-xl tracking-[0.22em]",
      subtitle: "text-[8.5px] tracking-[0.34em]",
      gap: "gap-2.5",
    },
    md: {
      svg: "w-9 h-9",
      title: "text-2xl sm:text-[26px] tracking-[0.24em]",
      subtitle: "text-[9px] sm:text-[9.5px] tracking-[0.36em]",
      gap: "gap-3",
    },
    lg: {
      svg: "w-11 h-11",
      title: "text-3xl sm:text-4xl tracking-[0.26em]",
      subtitle: "text-[10px] tracking-[0.4em]",
      gap: "gap-3.5",
    },
  }[size];

  return (
    <div className={cn("inline-flex items-center select-none", sizeStyles.gap, className)}>
      {showEmblem && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={cn(
            sizeStyles.svg,
            "shrink-0 transition-colors duration-300",
            isDark ? "text-brass-light" : "text-brass"
          )}
        >
          <path
            d="M20 3.5C18.2 6.8 14.5 7.8 11.8 10.6C9.1 13.4 8.5 17.2 8.5 21.5V34.5H31.5V21.5C31.5 17.2 30.9 13.4 28.2 10.6C25.5 7.8 21.8 6.8 20 3.5Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 12.5C17.6 16.2 16.5 19.6 16.5 23.2C16.5 26 18 28.2 20 29.5C22 28.2 23.5 26 23.5 23.2C23.5 19.6 22.4 16.2 20 12.5Z"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6 25.5C14.2 24.4 12.8 22.4 12.6 19.8C14.8 20 16.4 21.2 17.2 22.8"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.4 25.5C25.8 24.4 27.2 22.4 27.4 19.8C25.2 20 23.6 21.2 22.8 22.8"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 34.5H34"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      )}

      <div className="flex flex-col items-start leading-none">
        <span
          className={cn(
            "font-display font-medium uppercase transition-colors duration-300",
            isDark ? "text-ink-light" : "text-ink",
            sizeStyles.title
          )}
        >
          TEHZAA
        </span>
        <span
          className={cn(
            "font-sans font-semibold uppercase mt-1 transition-colors duration-300",
            isDark ? "text-brass-light" : "text-brass-dark",
            sizeStyles.subtitle
          )}
        >
          HYDERABAD CELEBRATIONS
        </span>
      </div>
    </div>
  );
}
