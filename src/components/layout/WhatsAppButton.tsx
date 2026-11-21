"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "919876543210";
  const defaultMessage = encodeURIComponent(
    "Aadaab & Namaskaram Tehzaa! Would love to chat about planning an event in Hyderabad."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto"
    >
      {/* Architectural Deep Obsidian Tooltip */}
      <div
        aria-hidden="true"
        className={`hidden sm:flex items-center gap-2.5 bg-obsidian-elevated text-alabaster text-xs px-4 py-2.5 rounded-[2px] border border-brass/35 shadow-obsidian transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <span className="w-1.5 h-1.5 rotate-45 bg-brass-light inline-block" />
        <span className="font-medium text-alabaster">
          Ping us on WhatsApp
        </span>
        <span className="text-ink-lightMuted text-xs">• Chai pe milenge!</span>
      </div>

      {/* Floating Deep Obsidian & Burnished Brass Concierge Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ping Tehzaa on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-[2px] bg-obsidian hover:bg-brass-dark text-alabaster shadow-obsidian active:scale-[0.97] transition-[background-color,color,transform,border-color] duration-200 border border-brass/45 hover:border-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-light focus-visible:ring-offset-2 focus-visible:ring-offset-alabaster"
      >
        <MessageCircle aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
      </a>
    </aside>
  );
}
