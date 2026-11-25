"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { isMotionAllowed } from "@/lib/landing/motionPreference";

let activeLenis: Lenis | null = null;

/** The running Lenis instance, or null when smooth scroll is off (reduced motion / SSR). */
export function getLenis(): Lenis | null {
  return activeLenis;
}

/**
 * Mounts one Lenis smooth-scroll instance for the whole site.
 * Skipped entirely when the visitor prefers reduced motion (see motionPreference.ts).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!isMotionAllowed()) return;
    // Dev-only ?motion=full override: lift the global reduced-motion CSS clamp too.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.motion = "full";
    }

    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    activeLenis = lenis;

    // Back/forward between same-page anchors (e.g. "#darbars" → "") changes only the hash;
    // Lenis keeps its own target, so move it explicitly to the anchor (or the top).
    const onHashChange = () => {
      requestAnimationFrame(() => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = id ? document.getElementById(id) : null;
        lenis.scrollTo(target instanceof HTMLElement ? target : 0, { immediate: true });
      });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);

  return <>{children}</>;
}
