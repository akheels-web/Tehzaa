"use client";

import React, { useEffect, useRef, useState } from "react";
import { Envelope } from "@/components/landing/primitives/Envelope";
import { useMotionAllowed } from "@/lib/landing/motionPreference";

/**
 * Contact signature, "Write your dawat": a ruby envelope opens on arrival and the enquiry
 * card rises into place beneath it. The card is visible throughout; with motion off it is
 * simply shown.
 */
export function DawatFormEnvelope({ children }: { children: React.ReactNode }) {
  const motionAllowed = useMotionAllowed();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    timer.current = window.setTimeout(() => setOpen(true), 250);
    return () => window.clearTimeout(timer.current);
  }, []);

  // No replay here: closing the envelope would move the form while someone is filling it in.
  return (
    <Envelope variant="letterhead" open={open} motionAllowed={motionAllowed}>
      {children}
    </Envelope>
  );
}
