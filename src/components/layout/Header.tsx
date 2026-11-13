"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TehzaaLogo } from "@/components/brand/TehzaaLogo";

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string; description?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    children: [
      {
        name: "Floral & Event Decorations",
        href: "/services/floral-decor",
        description: "Kalyana Mandapams, Nikkah arches & botanical courtyards",
      },
      {
        name: "Catering & Food Services",
        href: "/services/catering",
        description: "Hyderabadi Dastarkhwan, Telugu Vindhu & Pure Veg kitchens",
      },
      {
        name: "Baraat & Grand Entries",
        href: "/services/baraat",
        description: "Heritage processions, Phoolon ki Chadar & brass ensembles",
      },
      {
        name: "Corporate Events",
        href: "/services/corporate-events",
        description: "HITEC City summits, AV staging & executive galas",
      },
      {
        name: "Social & Family Celebrations",
        href: "/services/family-celebrations",
        description: "Seemantham, Namakaranam, anniversaries & farmhouses",
      },
    ],
  },
  { name: "Our Work", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesDropdownOpen && !mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (servicesDropdownOpen) {
          setServicesDropdownOpen(false);
          servicesToggleRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          mobileToggleRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [servicesDropdownOpen, mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] border-b",
        isScrolled
          ? "bg-ivory/95 backdrop-blur-md border-gold/25 shadow-sm py-3"
          : "bg-ivory/90 backdrop-blur-md border-gold/15 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Tehzaa Celebrations Home"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory group"
          >
            <TehzaaLogo theme="dark" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <div
                    key={item.name}
                    ref={dropdownRef}
                    className="relative flex items-center"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                        setServicesDropdownOpen(false);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "pl-4 pr-1.5 py-2 text-sm font-medium transition-colors duration-200 rounded-l-lg",
                        isActive
                          ? "text-burgundy"
                          : "text-charcoal/85 hover:text-burgundy"
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>

                    <button
                      ref={servicesToggleRef}
                      type="button"
                      onClick={() => setServicesDropdownOpen((prev) => !prev)}
                      aria-label="Toggle services submenu"
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                      aria-controls="desktop-services-menu"
                      className="pr-3 pl-1 py-2 rounded-r-lg text-gold-dark hover:text-burgundy transition-colors cursor-pointer"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "w-4 h-4 transition-transform duration-200 stroke-[1.5]",
                          servicesDropdownOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {/* Editorial Dropdown */}
                    <div
                      id="desktop-services-menu"
                      className={cn(
                        "absolute top-full left-0 w-80 pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        servicesDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="bg-ivory-light border border-gold/25 rounded-xl shadow-luxury p-2 overflow-hidden">
                        <div className="text-xs font-medium text-gold-dark px-3 py-2 border-b border-gold/20">
                          Curated disciplines
                        </div>
                        <div className="mt-1 space-y-1">
                          {item.children.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                aria-current={isSubActive ? "page" : undefined}
                                onClick={() => setServicesDropdownOpen(false)}
                                className={cn(
                                  "block px-3 py-2 rounded-lg hover:bg-ivory-dark/60 transition-colors group/sub",
                                  isSubActive ? "bg-ivory-dark/50" : ""
                                )}
                              >
                                <div className="text-xs font-semibold text-charcoal group-hover/sub:text-burgundy transition-colors flex items-center justify-between">
                                  <span>{sub.name}</span>
                                  <ArrowUpRight
                                    aria-hidden="true"
                                    className="w-4 h-4 text-gold-dark stroke-[1.5] opacity-0 group-hover/sub:opacity-100 group-focus-visible/sub:opacity-100 transition-opacity"
                                  />
                                </div>
                                {sub.description && (
                                  <div className="text-xs text-taupe-dark line-clamp-1 mt-1">
                                    {sub.description}
                                  </div>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-200 relative group rounded-lg",
                    isActive
                      ? "text-burgundy"
                      : "text-charcoal/85 hover:text-burgundy"
                  )}
                >
                  <span>{item.name}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-1 left-4 right-4 h-px bg-gold transition-transform origin-left duration-200",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs font-medium text-charcoal/85 hover:text-burgundy transition-colors tabular-nums rounded-lg px-2 py-1.5"
            >
              <Phone aria-hidden="true" className="w-4 h-4 text-gold-dark stroke-[1.5]" />
              <span>+91 98765 43210</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium bg-burgundy hover:bg-burgundy-dark active:scale-[0.98] text-ivory border border-gold/30 transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <span>Plan Your Event</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-lg text-xs font-medium bg-burgundy text-ivory"
            >
              Plan Event
            </Link>
            <button
              ref={mobileToggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-charcoal hover:text-burgundy hover:bg-ivory-dark/50 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu aria-hidden="true" className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-ivory-light border-t border-gold/25 px-5 pt-4 pb-8 shadow-luxury max-h-[calc(100vh-4.5rem)] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <div key={item.name} className="border-b border-gold/20 pb-3">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-base font-serif font-medium hover:text-burgundy py-1.5",
                      isActive ? "text-burgundy" : "text-charcoal"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-3 mt-1 space-y-1 border-l border-gold/30">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          aria-current={pathname === sub.href ? "page" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "block text-xs hover:text-burgundy py-1.5",
                            pathname === sub.href ? "text-burgundy font-medium" : "text-charcoal/80"
                          )}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gold/30 text-xs font-medium text-charcoal hover:bg-ivory-dark/40 transition-colors tabular-nums"
              >
                <Phone aria-hidden="true" className="w-4 h-4 text-gold-dark stroke-[1.5]" />
                <span>Call +91 98765 43210</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-3 px-4 rounded-lg text-xs font-medium bg-burgundy text-ivory"
              >
                Plan Your Event
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
