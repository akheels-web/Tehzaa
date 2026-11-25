"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Live result of a CSS media query. The server render (and hydration) assume false;
 * client-side navigations read the real value immediately, so pinned scenes don't render
 * their fallback layout first (which shifted page height after Back/scroll restoration).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
