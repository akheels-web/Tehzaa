"use client";

import React from "react";
import { motion } from "motion/react";
import { HOUSE_EASE } from "@/lib/landing/motion";

const STEAM = [
  "M175 96 C165 76 185 64 175 44 C167 28 182 18 176 4",
  "M200 92 C190 70 212 58 200 36 C192 20 208 10 202 -6",
  "M226 96 C236 76 216 64 226 44 C234 28 219 18 225 4",
];

/**
 * A copper biryani deg sealed with a dough ring. When `open`, the dough cracks,
 * the lid lifts and tilts away, and steam rises.
 */
export function DegIllustration({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 -20 400 380" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="deg-copper" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6E3D18" />
          <stop offset="0.35" stopColor="#C98A4A" />
          <stop offset="0.55" stopColor="#B87333" />
          <stop offset="1" stopColor="#5A3013" />
        </linearGradient>
        <linearGradient id="deg-lid" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7A4520" />
          <stop offset="0.45" stopColor="#D69A5A" />
          <stop offset="1" stopColor="#6E3D18" />
        </linearGradient>
        <radialGradient id="deg-ember" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF9A3C" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FF9A3C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* coals glow */}
      <ellipse cx="200" cy="342" rx="150" ry="22" fill="url(#deg-ember)" />

      {/* body */}
      <path
        d="M118 122 C70 150 36 196 44 248 C52 300 118 334 200 334 C282 334 348 300 356 248 C364 196 330 150 282 122 Z"
        fill="url(#deg-copper)"
      />
      {/* embossed bands */}
      <path d="M62 214 C120 238 280 238 338 214" fill="none" stroke="#E7B27A" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M58 254 C120 280 280 280 342 254" fill="none" stroke="#E7B27A" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* rim */}
      <ellipse cx="200" cy="122" rx="84" ry="14" fill="#5A3013" />

      {/* steam */}
      {STEAM.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ filter: "blur(3px)" }}
          initial={false}
          animate={
            open
              ? { opacity: [0, 0.7, 0], y: [10, -10, -36] }
              : { opacity: 0, y: 10 }
          }
          transition={
            open
              ? { duration: 2.4, repeat: Infinity, delay: 0.5 + i * 0.4, ease: "easeOut" }
              : { duration: 0.3 }
          }
        />
      ))}

      {/* dough seal: whole when closed, broken into crumbs when open */}
      <motion.ellipse
        cx="200"
        cy="118"
        rx="90"
        ry="15"
        fill="none"
        stroke="#EAD9B5"
        strokeWidth="9"
        initial={false}
        animate={{ strokeDasharray: open ? "14 22" : "600 0", opacity: open ? 0.55 : 1 }}
        transition={{ duration: 0.5, ease: HOUSE_EASE }}
      />

      {/* lid */}
      <motion.g
        initial={false}
        animate={open ? { x: 96, y: -64, rotate: 18 } : { x: 0, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        style={{ originX: "200px", originY: "110px" }}
      >
        <path d="M108 112 C120 70 280 70 292 112 Z" fill="url(#deg-lid)" />
        <ellipse cx="200" cy="112" rx="96" ry="12" fill="#8A5428" />
        <circle cx="200" cy="68" r="9" fill="#D69A5A" stroke="#6E3D18" strokeWidth="2" />
      </motion.g>
    </svg>
  );
}
