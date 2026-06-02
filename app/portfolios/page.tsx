"use client";

import { useState, useRef } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { properties, Property } from "../data/properties";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PortfoliosPage() {
  const root = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(40000000);
  const [minBeds, setMinBeds] = useState<number>(0);

  // Filter out off-market listings for the public search catalog
  const publicEstates = properties.filter((p) => !p.offMarket);

  const filteredEstates = publicEstates.filter((estate) => {
    const matchesSearch =
      estate.name.toLowerCase().includes(search.toLowerCase()) ||
      estate.location.toLowerCase().includes(search.toLowerCase()) ||
      estate.architect.toLowerCase().includes(search.toLowerCase());

    const matchesRegion = selectedRegion === "All" || estate.region === selectedRegion;
    const matchesPrice = estate.numericPrice <= maxPrice;
    const matchesBeds = estate.beds >= minBeds;

    return matchesSearch && matchesRegion && matchesPrice && matchesBeds;
  });

  const regions = [
    "All",
    "French Riviera",
    "Manhattan NY",
    "Kyoto Japan",
    "Los Angeles CA",
    "Swiss Alps",
    "Algarve Portugal",
    "Tuscany Italy",
    "Nordic Fjords",
    "Mojave Desert",
  ];

  useGSAP(
    () => {
      gsap.set(".animate-fade-up", { opacity: 0, y: 30 });
      gsap.set(".estate-card", { opacity: 0, y: 40 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.to(".animate-fade-up", { opacity: 1, y: 0, stagger: 0.1 })
        .to(".estate-card", { opacity: 1, y: 0, stagger: 0.06, ease: "power2.out" }, "-=0.4");
    },
    { scope: root }
  );

  return (
    <div ref={root} className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 bg-canvas">
        {/* Banner Section */}
        <section className="bg-surface-dark text-on-dark py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/hero_villa.png')" }} />
          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
            <p className="animate-fade-up text-[11px] font-bold uppercase tracking-[0.25em] text-primary-light mb-3">Aetheria Portfolios</p>
            <h1 className="animate-fade-up text-[36px] sm:text-[44px] lg:text-[56px] font-display font-light leading-none tracking-tight">
              Estate Collections
            </h1>
            <p className="animate-fade-up mt-4 text-[15px] text-on-dark-soft max-w-xl font-light leading-relaxed">
              Explore our highly vetted catalog of global sanctuaries, clifftop modern villas, and architectural legends.
            </p>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <section className="border-b border-hairline py-8 bg-surface-soft">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Search Input */}
            <div className="lg:col-span-4 space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Search Estates</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, city, architect..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 bg-canvas border border-hairline-strong px-4 text-[14px] text-ink placeholder-muted-soft focus:outline-none focus:border-primary transition-colors"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 inset-y-0 flex items-center text-muted hover:text-ink">
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Region Filtering Chips */}
            <div className="lg:col-span-5 space-y-2 overflow-hidden">
              <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Select Destination</label>
              <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`h-9 px-4 text-[12px] uppercase tracking-[0.1em] font-medium transition-all border cursor-pointer snap-center shrink-0 ${
                      selectedRegion === region
                        ? "bg-primary border-primary text-white font-bold"
                        : "bg-canvas border-hairline text-ink hover:border-muted"
                    }`}
                  >
                    {region === "All" ? "All Regions" : region}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Limit */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Max Budget</label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-11 bg-canvas border border-hairline px-3 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value={15000000}>$15.0M Max</option>
                  <option value={20000000}>$20.0M Max</option>
                  <option value={25000000}>$25.0M Max</option>
                  <option value={35000000}>$35.0M Max</option>
                  <option value={50000000}>$50.0M+ Max</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Bedrooms</label>
                <select
                  value={minBeds}
                  onChange={(e) => setMinBeds(Number(e.target.value))}
                  className="w-full h-11 bg-canvas border border-hairline px-3 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value={0}>Any Beds</option>
                  <option value={4}>4+ Beds</option>
                  <option value={5}>5+ Beds</option>
                  <option value={6}>6+ Beds</option>
                  <option value={7}>7+ Beds</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Property Grid Section */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            {filteredEstates.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-hairline">
                <h3 className="text-[20px] font-display font-light text-muted">No matching properties found</h3>
                <p className="text-[13px] text-muted-soft mt-2">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedRegion("All");
                    setMaxPrice(40000000);
                    setMinBeds(0);
                  }}
                  className="mt-6 inline-flex h-10 items-center justify-center bg-primary text-white px-6 text-[12px] uppercase font-bold tracking-[0.15em] hover:bg-primary-active transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-[12px] font-semibold text-muted mb-8 uppercase tracking-[0.15em]">
                  Showing {filteredEstates.length} curated sanctuaries
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {filteredEstates.map((estate) => (
                    <article key={estate.slug} className="estate-card group bg-canvas border border-hairline flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                      <div className="relative aspect-[4/3] bg-surface-card overflow-hidden">
                        <img
                          src={estate.image}
                          alt={`${estate.name}`}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-surface-dark-elevated/75 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-primary-light uppercase tracking-[0.1em]">
                          {estate.region}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex-1">
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">{estate.location}</p>
                          <h3 className="mt-2 text-[22px] font-display font-light leading-[1.3] text-ink group-hover:text-primary transition-colors duration-300">
                            {estate.name}
                          </h3>
                          <p className="mt-1 text-[12px] font-light text-muted uppercase tracking-[0.1em]">{estate.specs}</p>
                          <p className="mt-3 text-[14px] text-body line-clamp-3 font-light leading-relaxed">
                            {estate.narrative}
                          </p>
                        </div>
                        <div className="mt-6 border-t border-hairline pt-4 flex items-center justify-between">
                          <span className="text-[18px] font-bold text-ink">{estate.price}</span>
                          <Link
                            href={`/portfolios/${estate.slug}`}
                            className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary hover:text-primary-active inline-flex items-center gap-1 group/link"
                          >
                            Explore Estate
                            <span aria-hidden className="transition-transform group-hover/link:translate-x-1">›</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
