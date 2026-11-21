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
  children?: { num: string; name: string; href: string; description?: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    children: [
      {
        num: "01",
        name: "Floral & Event Decor",
        href: "/services/floral-decor",
        description: "Mandaps, Nikkah arches, Sanchaq & Haldi vibes",
      },
      {
        num: "02",
        name: "Catering & Dawat",
        href: "/services/catering",
        description: "Proper Dum Biryani, Sufiyani, Vindhu & Pure Veg",
      },
      {
        num: "03",
        name: "Baraat & Grand Entries",
        href: "/services/baraat",
        description: "Hyderabadi Marfa, Punjabi Dhol & filmy entries",
      },
      {
        num: "04",
        name: "Corporate Events",
        href: "/services/corporate-events",
        description: "HITEC City summits & palace dinners minus the bore",
      },
      {
        num: "05",
        name: "Family & Ghar Functions",
        href: "/services/family-celebrations",
        description: "Seemantham, Aqiqah, Manjha & villa parties",
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
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
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
        "fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,padding,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled
          ? "bg-alabaster/95 backdrop-blur-xl border-stone-line shadow-gallery py-3"
          : "bg-alabaster/65 backdrop-blur-md border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Tehzaa Celebrations Home"
            className="rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-alabaster"
          >
            <TehzaaLogo theme="light" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
          >
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
                        "pl-4 pr-1 py-2 text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 rounded-l-[2px]",
                        isActive
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink"
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
                      className="pr-3 pl-1 py-2 rounded-r-[2px] text-brass-dark hover:text-ink transition-colors cursor-pointer"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200 stroke-[1.5]",
                          servicesDropdownOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {/* Architectural Silk Dropdown */}
                    <div
                      id="desktop-services-menu"
                      className={cn(
                        "absolute top-full left-0 w-[340px] pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        servicesDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="bg-silk border border-stone-line rounded-[2px] shadow-gallery p-2.5 overflow-hidden">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass-dark px-3 py-2 border-b border-stone-line">
                          What we handle for you
                        </div>
                        <div className="mt-1.5 divide-y divide-stone-line/60">
                          {item.children.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                aria-current={isSubActive ? "page" : undefined}
                                onClick={() => setServicesDropdownOpen(false)}
                                className={cn(
                                  "block px-3 py-2.5 rounded-[2px] hover:bg-alabaster transition-colors group/sub",
                                  isSubActive ? "bg-alabaster" : ""
                                )}
                              >
                                <div className="text-xs font-semibold text-ink flex items-center justify-between gap-2">
                                  <span className="flex items-center gap-2.5">
                                    <span className="text-[11px] font-medium text-brass-dark tabular-nums">
                                      {sub.num}
                                    </span>
                                    <span>{sub.name}</span>
                                  </span>
                                  <ArrowUpRight
                                    aria-hidden="true"
                                    className="w-3.5 h-3.5 text-brass stroke-[1.5] opacity-0 group-hover/sub:opacity-100 group-focus-visible/sub:opacity-100 transition-opacity shrink-0"
                                  />
                                </div>
                                {sub.description && (
                                  <div className="text-xs text-ink-subtle line-clamp-1 mt-0.5 pl-6">
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
                    "px-4 py-2 text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 relative group rounded-[2px]",
                    isActive
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  <span>{item.name}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-1 left-4 right-4 h-px bg-brass transition-transform origin-left duration-200",
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
              className="flex items-center gap-2 text-xs font-medium text-ink-muted hover:text-ink transition-colors tabular-nums rounded-[2px] px-2 py-1.5"
            >
              <Phone aria-hidden="true" className="w-3.5 h-3.5 text-brass-dark stroke-[1.5]" />
              <span>+91 98765 43210</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.15em] bg-obsidian hover:bg-brass-dark active:scale-[0.98] text-alabaster transition-[background-color,transform] duration-200"
            >
              Let&apos;s Plan
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/contact"
              className="px-4 py-2 rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.14em] bg-obsidian text-alabaster"
            >
              Let&apos;s Plan
            </Link>
            <button
              ref={mobileToggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-[2px] text-ink hover:bg-limestone/60 transition-colors cursor-pointer"
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
          className="md:hidden bg-alabaster border-t border-stone-line px-5 pt-4 pb-8 shadow-gallery max-h-[calc(100vh-4.5rem)] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <div key={item.name} className="border-b border-stone-line pb-3">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-xl font-display font-medium py-1.5",
                      isActive
                        ? "text-ink underline decoration-brass underline-offset-4"
                        : "text-ink-muted"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-3 mt-1.5 space-y-1 border-l border-stone-line">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          aria-current={pathname === sub.href ? "page" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-2 text-xs hover:text-ink py-1.5",
                            pathname === sub.href
                              ? "text-ink font-semibold"
                              : "text-ink-muted"
                          )}
                        >
                          <span className="text-[11px] text-brass-dark tabular-nums">
                            {sub.num}
                          </span>
                          <span>{sub.name}</span>
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
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-[2px] border border-stone-line bg-silk text-xs font-medium text-ink hover:border-obsidian transition-colors tabular-nums"
              >
                <Phone aria-hidden="true" className="w-4 h-4 text-brass-dark stroke-[1.5]" />
                <span>Call +91 98765 43210</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-3.5 px-4 rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.15em] bg-obsidian text-alabaster"
              >
                Chai Pe Charcha — Let&apos;s Plan
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
