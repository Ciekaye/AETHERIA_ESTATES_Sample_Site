"use client";

import { useState, useRef } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AdvisoryPage() {
  const root = useRef<HTMLDivElement | null>(null);
  const [region, setRegion] = useState("French Riviera");
  const [sqft, setSqft] = useState(10000);
  const [acreage, setAcreage] = useState(1);
  const [architecturalEra, setArchitecturalEra] = useState("Contemporary Modern");

  // Dynamic Valuation Multipliers
  const getValuation = () => {
    let basePricePerSqft = 1500;
    if (region === "Manhattan NY") basePricePerSqft = 2400;
    if (region === "Los Angeles CA") basePricePerSqft = 1900;
    if (region === "French Riviera") basePricePerSqft = 2100;
    if (region === "Kyoto Japan") basePricePerSqft = 1600;

    let landPremium = acreage * 1200000;
    if (region === "Manhattan NY") landPremium = acreage * 3500000; // Manhattan land is exceptionally rare

    let eraMultiplier = 1.0;
    if (architecturalEra === "Historic Restoration") eraMultiplier = 1.25;
    if (architecturalEra === "Bespoke Architect Signature") eraMultiplier = 1.15;

    const estimatedValue = (sqft * basePricePerSqft + landPremium) * eraMultiplier;
    return estimatedValue;
  };

  const formattedValuation = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(getValuation());

  useGSAP(
    () => {
      gsap.set(".animate-fade-up", { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.to(".animate-fade-up", { opacity: 1, y: 0, stagger: 0.08 });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 bg-canvas">
        {/* Banner Section */}
        <section className="bg-surface-dark text-on-dark py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/concierge_study.png')" }} />
          <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-light mb-3">Aetheria Concierge</p>
            <h1 className="text-[36px] sm:text-[44px] lg:text-[56px] font-display font-light leading-none tracking-tight">
              Bespoke Advisory Services
            </h1>
            <p className="mt-4 text-[15px] text-on-dark-soft max-w-xl font-light leading-relaxed">
              Discrete transactions, architecture matchmakers, global valuations, and concierge advisory services.
            </p>
          </div>
        </section>

        {/* Advisory Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Discrete Placement</p>
                <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-display font-light leading-[1.2] text-ink">
                  Off-Market Transactions
                </h2>
                <p className="mt-3 text-[14px] text-body font-light leading-relaxed">
                  Over 85% of our high-volume real estate acquisitions transact quietly, outside public indices. We match high-value collectors with private islands, watchtowers, and legendary penthouses discretely.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Bespoke Curation</p>
                <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-display font-light leading-[1.2] text-ink">
                  Architectural Matchmakers
                </h2>
                <p className="mt-3 text-[14px] text-body font-light leading-relaxed">
                  We don't just search for square footage; we map your design affinities to structural heritages. Whether your preference leans to Hinoki wood interlocks by Kengo Kuma or structural glass cantilevers by Paul McClean, our advisors identify your architectural double.
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Sovereign Curation</p>
                <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-display font-light leading-[1.2] text-ink">
                  Global Legal & Tax Concierge
                </h2>
                <p className="mt-3 text-[14px] text-body font-light leading-relaxed">
                  Navigating private estate purchases across international boundaries demands elite administrative precision. Aetheria provides in-house legal and tax structures across Switzerland, Monaco, Singapore, and the US to preserve asset values.
                </p>
              </div>
            </div>

            {/* Interactive Valuation Estimator Column */}
            <div className="lg:col-span-6 bg-surface-soft border border-hairline p-8 lg:p-12 shadow-md relative">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />
              <h3 className="text-[22px] font-display font-light text-ink tracking-wide mb-2 border-b border-hairline pb-4">
                Interactive Estate Valuation Estimator
              </h3>
              <p className="text-[13px] text-muted leading-relaxed mb-6 font-light">
                Specify your target building stats to generate a discrete estimated guide price for custom portfolio valuations.
              </p>

              <div className="space-y-6">
                {/* Region Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted flex justify-between">
                    <span>Sanctuary Location</span>
                    <span className="text-primary font-semibold">{region}</span>
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full h-11 bg-canvas border border-hairline px-3 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="French Riviera">French Riviera, France</option>
                    <option value="Manhattan NY">Manhattan, New York</option>
                    <option value="Kyoto Japan">Kyoto, Japan</option>
                    <option value="Los Angeles CA">Los Angeles, California</option>
                  </select>
                </div>

                {/* Built Size (Slider) */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted flex justify-between">
                    <span>Internal Built Area</span>
                    <span className="text-primary font-semibold">{sqft.toLocaleString()} SQ FT</span>
                  </label>
                  <input
                    type="range"
                    min={4000}
                    max={25000}
                    step={500}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2 bg-hairline rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-soft">
                    <span>4,000 SQ FT</span>
                    <span>25,000 SQ FT</span>
                  </div>
                </div>

                {/* Land Size (Slider) */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted flex justify-between">
                    <span>Land Estate Acreage</span>
                    <span className="text-primary font-semibold">{acreage} Acre{acreage > 1 ? "s" : ""}</span>
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={acreage}
                    onChange={(e) => setAcreage(Number(e.target.value))}
                    className="w-full h-2 bg-hairline rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-soft">
                    <span>0.5 Acres</span>
                    <span>10 Acres</span>
                  </div>
                </div>

                {/* Architectural Signature */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted flex justify-between">
                    <span>Architectural Signature</span>
                    <span className="text-primary font-semibold">{architecturalEra}</span>
                  </label>
                  <select
                    value={architecturalEra}
                    onChange={(e) => setArchitecturalEra(e.target.value)}
                    className="w-full h-11 bg-canvas border border-hairline px-3 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Contemporary Modern">Contemporary Minimalist (Paul McClean)</option>
                    <option value="Bespoke Architect Signature">Bespoke Signature (Kengo Kuma)</option>
                    <option value="Historic Restoration">Historic Palazzo Restoration (Wilmotte)</option>
                  </select>
                </div>

                {/* Calculated Result Panel */}
                <div className="bg-canvas border border-hairline p-6 text-center shadow-inner mt-8">
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted">Estimated Asset Guide Value</p>
                  <p className="text-[28px] sm:text-[34px] lg:text-[40px] font-display font-light text-primary mt-2">
                    {formattedValuation}
                  </p>
                  <p className="text-[11px] text-muted-soft mt-3 leading-relaxed max-w-xs mx-auto font-light">
                    *Estimated valuation calculates real estate index rates, land premium, and architectural signature weights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
