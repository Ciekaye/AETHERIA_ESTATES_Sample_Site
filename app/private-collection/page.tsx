"use client";

import { useState, useRef } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { properties, Property } from "../data/properties";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PrivateCollectionPage() {
  const root = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve off-market properties exclusively
  const offMarketEstates = properties.filter((p) => p.offMarket);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey) return;
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      // Key can be case insensitive for client comfort
      if (accessKey.trim().toUpperCase() === "AETHERIA-OFFMARKET") {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setError("Invalid access credentials. Please consult your Aetheria advisory associate.");
        setIsLoading(false);
      }
    }, 1200);
  };

  useGSAP(
    () => {
      if (!isAuthenticated) {
        // Animate the auth box
        gsap.set(".animate-auth-box", { opacity: 0, y: 30 });
        gsap.to(".animate-auth-box", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      } else {
        // Animate the unlocked layout
        gsap.set(".animate-header", { opacity: 0, y: 25 });
        gsap.set(".animate-private-card", { opacity: 0, y: 35 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
        tl.to(".animate-header", { opacity: 1, y: 0, stagger: 0.1 })
          .to(".animate-private-card", { opacity: 1, y: 0, stagger: 0.1 }, "-=0.4");
      }
    },
    { dependencies: [isAuthenticated], scope: root }
  );

  return (
    <div ref={root} className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 bg-canvas flex flex-col justify-center">
        {!isAuthenticated ? (
          /* Authentication Lock Screen Overlay */
          <section className="relative w-full flex-1 flex items-center justify-center py-20 overflow-hidden bg-surface-dark min-h-[85vh]">
            {/* Background Image of a luxurious study with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none scale-105"
              style={{
                backgroundImage: "url('/images/concierge_study.png')",
              }}
              aria-hidden
            />
            {/* Smooth Royal dark gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/85 via-[#0e2f75]/20 to-black/90 pointer-events-none"
              aria-hidden
            />

            {/* Glassmorphic Ambient Glow */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary-light/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="animate-auth-box relative z-10 w-full max-w-[480px] mx-6">
              <div className="bg-surface-dark-elevated/75 backdrop-blur-2xl border border-white/10 p-8 lg:p-12 shadow-2xl relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
                <div className="text-center mb-8">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary-light/30 text-primary-light mb-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary-light">Off-Market Portal</p>
                  <h1 className="text-[28px] font-display font-light text-on-dark mt-2">Private Authentication</h1>
                  <p className="text-[13px] text-on-dark-soft leading-relaxed mt-3 font-light">
                    This database indexes discrete corporate acquisitions, private islands, and sovereign estates. Entering an authorized portfolio key is required.
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-primary-light">Access Credentials</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter Private Portfolio Key"
                      value={accessKey}
                      onChange={(e) => {
                        setAccessKey(e.target.value);
                        setError("");
                      }}
                      className="w-full h-11 bg-white/5 border border-white/15 px-4 text-[14px] text-on-dark placeholder-white/30 focus:outline-none focus:border-primary-light transition-all text-center tracking-[0.1em]"
                    />
                    {error && <p className="text-[11px] text-red-400 mt-1 font-light leading-tight text-center">{error}</p>}
                    <p className="text-[10px] text-on-dark-soft/50 text-center italic mt-2">
                      Tip: Enter key <strong className="text-primary-light/80">AETHERIA-OFFMARKET</strong> to test.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary-active text-white text-[12px] uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? "Verifying Keys..." : "Verify Credentials"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        ) : (
          /* Locked Off-Market Database Screen */
          <section className="bg-canvas py-16 lg:py-24">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
              <div className="border-b border-hairline pb-8 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="animate-header text-[11px] font-bold uppercase tracking-[0.25em] text-primary mb-3">Discrete Portfolios</p>
                  <h1 className="animate-header text-[36px] sm:text-[44px] lg:text-[56px] font-display font-light leading-none tracking-tight text-ink">
                    The Private Collection
                  </h1>
                  <p className="animate-header mt-4 text-[15px] text-muted max-w-xl font-light leading-relaxed">
                    Access Granted. You are currently viewing off-market sovereign estates and private archipelagos curated discretely.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setAccessKey("");
                    }}
                    className="animate-header h-10 border border-ink text-ink hover:bg-ink hover:text-canvas px-5 text-[12px] uppercase font-bold tracking-[0.15em] transition-colors cursor-pointer"
                  >
                    Lock Database
                  </button>
                </div>
              </div>

              {/* Private Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {offMarketEstates.map((estate) => (
                  <article key={estate.slug} className="animate-private-card bg-surface-soft border border-hairline p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between">
                    <div className="absolute top-6 right-6 bg-red-800 text-white font-bold text-[9px] px-3 py-1 uppercase tracking-[0.2em] shadow-md">
                      OFF-MARKET
                    </div>
                    <div>
                      <div className="relative aspect-[16/10] bg-surface-card overflow-hidden border border-hairline mb-6">
                        <img
                          src={estate.image}
                          alt={`${estate.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">{estate.location}</p>
                      <h3 className="mt-2 text-[26px] font-display font-light leading-[1.2] text-ink">
                        {estate.name}
                      </h3>
                      <p className="mt-1 text-[12px] font-medium tracking-[0.1em] text-muted uppercase border-b border-hairline pb-4 mb-4">
                        {estate.specs}
                      </p>
                      <p className="text-[14px] text-body leading-relaxed font-light mb-6">
                        {estate.narrative}
                      </p>
                    </div>

                    <div className="border-t border-hairline pt-4 flex items-center justify-between mt-6">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Confidential Guide</p>
                        <span className="text-[20px] font-display font-light text-primary">{estate.price}</span>
                      </div>
                      <Link
                        href={`/portfolios/${estate.slug}`}
                        className="h-11 bg-primary hover:bg-primary-active text-white px-6 text-[12px] uppercase font-bold tracking-[0.15em] transition-colors flex items-center"
                      >
                        Acquire Sanctions
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
