"use client";

import React from "react";
import { JaaliLattice } from "./JaaliLattice";
import { ParallaxLayer } from "./ParallaxLayer";

/** Back depth plane: the gold jaali, drifting slower than the page (oversized so edges never show). */
export function DepthJaali() {
  return (
    <ParallaxLayer speed={-0.25} className="pointer-events-none absolute inset-x-0 -inset-y-[15%]">
      <JaaliLattice />
    </ParallaxLayer>
  );
}
