"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/contact";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = whatsappHref(
    "Aadaab & Namaskaram Tehzaa! Would love to chat about planning an event in Hyderabad."
  );

  return (
    <aside
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-auto"
    >
      {/* Marble tooltip */}
      <div
        aria-hidden="true"
        className={`hidden sm:flex items-center gap-2.5 bg-marble text-ink text-xs px-4 py-2.5 border border-brass/50 shadow-ruby transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        }`}
      >
        <span className="w-1.5 h-1.5 rotate-45 bg-brass inline-block" />
        <span className="font-medium text-ink">
          Ping us on WhatsApp
        </span>
        <span className="text-ink-muted text-xs">· Chai pe milenge?</span>
      </div>

      {/* Ruby button with a gold ring */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ping Tehzaa on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ruby hover:bg-ruby-dark text-marble shadow-ruby active:scale-[0.97] transition-[background-color,color,transform] duration-200 ring-2 ring-brass ring-offset-2 ring-offset-marble focus-visible:outline-none focus-visible:ring-4"
      >
        <MessageCircle aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
      </a>
    </aside>
  );
}
