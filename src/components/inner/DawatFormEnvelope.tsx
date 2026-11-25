"use client";

import React, { useEffect, useRef, useState } from "react";
import { Envelope } from "@/components/landing/primitives/Envelope";
import { useMotionAllowed } from "@/lib/landing/motionPreference";

/**
 * Contact signature, "Write your dawat": a ruby envelope opens on arrival and the enquiry
 * card rises into place beneath it. The seal replays the opening. With motion off the card
 * is simply shown.
 */
export function DawatFormEnvelope({ children }: { children: React.ReactNode }) {
  const motionAllowed = useMotionAllowed();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    timer.current = window.setTimeout(() => setOpen(true), 250);
    return () => window.clearTimeout(timer.current);
  }, []);

  const replay = () => {
    setOpen(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), 700);
  };

  return (
    <Envelope variant="letterhead" open={open} motionAllowed={motionAllowed} onReplay={replay} sealLabel="Replay the envelope">
      {children}
    </Envelope>
  );
}
