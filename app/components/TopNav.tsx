"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { properties } from "../data/properties";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Portfolios", href: "/portfolios" },
  { label: "Vault", href: "/private-collection" },
  { label: "Advisory", href: "/advisory" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export function TopNav() {
  const root = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const searchResults = searchQuery.trim()
    ? properties.filter(
        (p) =>
          !p.offMarket &&
          (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.architect.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  useGSAP(
    () => {
      gsap.set(root.current, { y: -64, opacity: 0 });
      gsap.set(".nav-item", { opacity: 0, y: -8 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(root.current, { y: 0, opacity: 1, duration: 0.6 })
        .to(
          ".nav-item",
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          "-=0.3"
        );
    },
    { scope: root }
  );

  return (
    <>
      <header
        ref={root}
        className="sticky top-0 z-50 bg-canvas border-b border-hairline backdrop-blur-md bg-opacity-95"
      >
        <div className="mx-auto grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] h-16 max-w-[1440px] items-center px-6 lg:px-10">
          {/* Logo (Left Column) */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              aria-label="Aetheria Estates Home"
              className="nav-item flex items-center gap-2 group"
            >
              <span className="font-display text-[20px] font-semibold tracking-[0.25em] text-primary transition-colors duration-300">
                AETHERIA
              </span>
              <span className="hidden sm:inline-block font-sans text-[10px] uppercase tracking-[0.3em] text-muted -ml-1 mt-1">
                ESTATES
              </span>
            </Link>
          </div>

          {/* Centered Navigation Menu (Center Column) */}
          <nav className="hidden lg:flex items-center justify-center lg:gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`nav-item relative text-[13px] uppercase tracking-[0.12em] transition-colors py-1 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-ink hover:text-primary font-medium"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="active-indicator absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Right Column) */}
          <div className="flex items-center justify-end lg:gap-4 xl:gap-6 gap-6">
            <Link
              href="/portfolios"
              className="nav-item hidden md:inline-flex h-9 items-center justify-center border border-primary px-5 text-[12px] uppercase font-bold tracking-[0.15em] text-ink hover:bg-primary hover:text-white transition-all duration-300"
            >
              Private Viewing
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="nav-item text-ink hover:text-primary transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => setIsAccountOpen(true)}
              aria-label="Account"
              className="nav-item text-ink hover:text-primary transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="4" />
                <path
                  d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Mobile Hamburger Toggle (Bespoke Curation Menu) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Toggle Navigation Directory"
              className="nav-item lg:hidden text-ink hover:text-primary transition-colors cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE DIRECTORY DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-surface-dark/98 backdrop-blur-2xl flex flex-col justify-between p-8 lg:hidden animate-[fadeIn_0.25s_ease-out]">
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-6">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="font-display text-[18px] font-semibold tracking-[0.25em] text-primary-light">
                AETHERIA
              </span>
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-on-dark-soft mt-1">
                ESTATES
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-on-dark-soft hover:text-primary-light text-[11px] uppercase font-bold tracking-[0.2em] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Close</span>
              <span className="text-[16px] font-normal">×</span>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center space-y-8 my-12">
            <p className="text-[9px] uppercase font-bold tracking-[0.25em] text-primary-light">Explore Directory</p>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-[28px] sm:text-[34px] font-display tracking-[0.05em] transition-colors uppercase border-b border-white/5 pb-2 flex items-center justify-between group ${
                    isActive ? "font-normal" : "font-light"
                  }`}
                >
                  <span className={
                    isActive
                      ? "text-primary-light"
                      : "text-on-dark group-hover:text-primary-light transition-colors"
                  }>
                    {link.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-primary-light rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 pt-8 flex flex-col gap-4">
            <Link
              href="/portfolios"
              onClick={() => setIsMenuOpen(false)}
              className="h-12 w-full bg-primary hover:bg-primary-active text-white flex items-center justify-center text-[12px] uppercase font-bold tracking-[0.18em] transition-all duration-300"
            >
              Private Viewing
            </Link>
            <div className="flex justify-between items-center text-[10px] text-on-dark-soft/50 uppercase tracking-[0.15em] mt-2">
              <span>© {new Date().getFullYear()} Aetheria Estates</span>
              <span>Geneva · Monaco · NY · Tokyo</span>
            </div>
          </div>
        </div>
      )}

      {/* SOVEREIGN MEMBER CONSOLE DRAWER (Bespoke Concierge VIP Side Panel) */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex justify-end animate-[fadeIn_0.25s_ease-out]">
          {/* Click outside to close overlay */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsAccountOpen(false)} />
          
          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-w-[460px] bg-[#0e0f11] p-10 lg:p-12 flex flex-col justify-between h-full shadow-none overflow-y-auto scrollbar-none animate-[slideLeft_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="space-y-12">
              {/* Drawer Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-primary-light/60">Bespoke Curation</p>
                  <h3 className="text-[22px] font-display font-light text-white tracking-[0.08em] uppercase">Sovereign Console</h3>
                </div>
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="text-white/30 hover:text-white text-[10px] uppercase font-light tracking-[0.3em] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Close</span>
                  <span className="text-[16px] font-normal leading-none -mt-0.5">×</span>
                </button>
              </div>

              {/* Profile Section (Boundaryless Editorial Design) */}
              <div className="space-y-4">
                <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-primary-light/60">Membership Profile</p>
                <div className="space-y-3">
                  <h4 className="text-[26px] font-display font-light text-white tracking-[0.12em] uppercase leading-none">
                    Sovereign Collector
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] text-white/50 uppercase tracking-[0.2em] font-light">
                    <span>ID: #AE-008749</span>
                    <span className="text-white/20">•</span>
                    <span>Geneva Repository</span>
                    <span className="text-white/20">•</span>
                    <span className="text-primary-light font-medium tracking-[0.25em]">Tier I</span>
                  </div>
                </div>
              </div>

              {/* Section: Dedicated Advisor */}
              <div className="space-y-4">
                <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-primary-light/60">Dedicated Advisor</p>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-display font-light text-white tracking-[0.15em] uppercase">Julian Vane</h4>
                    <p className="text-[9px] text-white/40 uppercase tracking-[0.18em] font-light">Senior Acquisition Partner · Europe</p>
                  </div>
                  
                  <div className="space-y-2 text-[12px] font-light text-white/70">
                    <div className="flex justify-between items-baseline py-1">
                      <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-light">Secure Phone</span>
                      <a href="tel:+41225550199" className="text-white hover:text-primary-light transition-colors tracking-wide font-light">+41 22 555 0199</a>
                    </div>
                    <div className="flex justify-between items-baseline py-1">
                      <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-light">Concierge Email</span>
                      <a href="mailto:j.vane@aetheria.com" className="text-white hover:text-primary-light transition-colors tracking-wide font-light">j.vane@aetheria.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Quick Actions */}
              <div className="space-y-4">
                <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-primary-light/60">Secure Credentials</p>
                <div className="space-y-3.5">
                  <Link
                    href="/private-collection"
                    onClick={() => setIsAccountOpen(false)}
                    className="w-full h-12 bg-white text-black text-[10px] uppercase font-bold tracking-[0.3em] flex items-center justify-center transition-all duration-300 hover:bg-[#7ba4ff] hover:text-white cursor-pointer"
                  >
                    Access Private Collection
                  </Link>
                  <div className="flex items-center justify-between text-[9px] tracking-[0.25em] text-white/40 uppercase">
                    <span>Active Key</span>
                    <span className="font-mono text-primary-light font-medium tracking-[0.2em] select-all hover:text-white transition-colors cursor-pointer">
                      AETHERIA-OFFMARKET
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Watchlist */}
              <div className="space-y-5">
                <p className="text-[8px] uppercase tracking-[0.3em] font-medium text-primary-light/60">Sovereign Watchlist</p>
                <div className="space-y-6">
                  <Link
                    href="/portfolios/villa-horizon"
                    onClick={() => setIsAccountOpen(false)}
                    className="group block space-y-2.5"
                  >
                    <div className="aspect-[21/9] w-full overflow-hidden bg-[#17181c] relative">
                      <img 
                        src="/images/villa_horizon.png" 
                        alt="Villa L'Horizon" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]" 
                      />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-display font-light uppercase tracking-[0.18em] text-white group-hover:text-primary-light transition-colors">
                        01  /  Villa L'Horizon
                      </span>
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-light">
                        Saint-Jean-Cap-Ferrat
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/portfolios/amanara-sanctuary"
                    onClick={() => setIsAccountOpen(false)}
                    className="group block space-y-2.5"
                  >
                    <div className="aspect-[21/9] w-full overflow-hidden bg-[#17181c] relative">
                      <img 
                        src="/images/kyoto_sanctuary.png" 
                        alt="Amanara Sanctuary" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.03]" 
                      />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-display font-light uppercase tracking-[0.18em] text-white group-hover:text-primary-light transition-colors">
                        02  /  Amanara Sanctuary
                      </span>
                      <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-light">
                        Kyoto, Japan
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="mt-16 text-[8px] text-white/20 uppercase tracking-[0.3em] font-light text-center w-full">
              Aetheria Concierge Services &nbsp;·&nbsp; Geneva &nbsp;·&nbsp; Monaco &nbsp;·&nbsp; NY &nbsp;·&nbsp; Tokyo
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN ROYAL SEARCH OVERLAY (Premium Bespoke Concierge Interface) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[9999] bg-surface-dark/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-28 px-6 animate-[fadeIn_0.3s_ease-out]">
          {/* Close Trigger Button */}
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="absolute top-8 right-8 text-on-dark-soft hover:text-primary-light text-[12px] uppercase font-bold tracking-[0.2em] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Close</span>
            <span className="text-[16px] font-normal">×</span>
          </button>

          <div className="w-full max-w-4xl space-y-12">
            {/* Search Input block */}
            <div className="text-center space-y-4">
              <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary-light">Aetheria Private Archives</p>
              <input
                type="text"
                autoFocus
                placeholder="Type to search exclusive portfolios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 bg-transparent border-b border-white/20 text-[24px] sm:text-[38px] font-display font-light text-on-dark text-center placeholder-white/10 focus:outline-none focus:border-primary-light transition-all duration-300 tracking-[0.05em] uppercase pb-2"
              />
            </div>

            {/* Dynamic Results suggestions overlay */}
            <div className="space-y-6">
              {searchQuery.trim() && (
                <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-on-dark-soft/50 text-center">
                  {searchResults.length > 0 ? "Curated Real-Time Suggestions" : "No results match your archives"}
                </p>
              )}

              {searchResults.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((estate) => (
                    <Link
                      key={estate.slug}
                      href={`/portfolios/${estate.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="group bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:border-primary-light hover:bg-white/10 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="aspect-[16/10] overflow-hidden bg-surface-dark relative">
                          <img src={estate.image} alt={estate.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary-light">{estate.location}</p>
                          <h4 className="text-[15px] font-display font-light text-on-dark group-hover:text-primary-light transition-colors mt-0.5">{estate.name}</h4>
                          <p className="text-[9px] tracking-[0.1em] text-on-dark-soft/60 uppercase mt-1">{estate.specs.split(" · ")[0]}</p>
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-3 mt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em]">
                        <span className="text-on-dark">{estate.price}</span>
                        <span className="text-primary-light group-hover:translate-x-1 transition-transform">Explore ›</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
