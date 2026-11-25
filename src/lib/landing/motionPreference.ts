"use client";

import { useSyncExternalStore } from "react";

interface MotionInputs {
  prefersReduced: boolean;
  isDev: boolean;
  search: string;
}

/**
 * Whether full motion may run. Follows the OS reduced-motion setting, except that
 * `?motion=full` overrides it during development (for previewing on machines with
 * animations turned off). The override never applies in production builds.
 */
export function resolveMotionAllowed({ prefersReduced, isDev, search }: MotionInputs): boolean {
  if (!prefersReduced) return true;
  return isDev && new URLSearchParams(search).get("motion") === "full";
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return resolveMotionAllowed({
    prefersReduced: window.matchMedia(QUERY).matches,
    isDev: process.env.NODE_ENV !== "production",
    search: window.location.search,
  });
}

/** Client hook: true when full motion may run. Server render assumes false (static layout). */
export function useMotionAllowed(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Non-hook check for effects (e.g. Lenis setup). */
export function isMotionAllowed(): boolean {
  return typeof window !== "undefined" && getSnapshot();
}
