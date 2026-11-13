"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "919876543210";
  const defaultMessage = encodeURIComponent(
    "Namaste / Adaab Tehzaa Celebrations, I would like to inquire about planning an event in Hyderabad."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Contact Concierge via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto"
    >
      {/* Editorial Tooltip on Hover or Focus */}
      <div
        aria-hidden="true"
        className={`hidden sm:flex items-center gap-2 bg-ivory-light text-charcoal text-xs px-4 py-2 rounded-lg border border-gold/30 shadow-luxury transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-deep inline-block" />
        <span className="font-medium text-charcoal">
          Event Concierge
        </span>
        <span className="text-taupe-dark text-xs">• WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Tehzaa Event Concierge on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-deep hover:bg-emerald-light text-ivory shadow-luxury active:scale-[0.98] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] border border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
      >
        <MessageCircle aria-hidden="true" className="w-5 h-5 text-ivory stroke-[1.5]" />
      </a>
    </aside>
  );
}
