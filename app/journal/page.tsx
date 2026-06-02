"use client";

import { useRef } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const articles = [
  {
    title: "Living on the Edge: The Technical Feat of Cliffside Concrete Cantilevers",
    excerpt: "Building a structure suspended over the ocean requires engineering that blends architectural audacity with advanced material science. We dissect Paul McClean's masterclass in cantilevered structures.",
    image: "/images/hero_villa.png",
    date: "May 28, 2026",
    readTime: "6 Min Read",
    category: "Architecture & Engineering"
  },
  {
    title: "Zen Minimalism in Modern Hinoki Timber Construction",
    excerpt: "Hinoki wood construction relies on ancient interlocking joinery techniques that bypass metal fasteners entirely. In Kyoto, Kengo Kuma fuses this legacy with sweeping structural glass partitions.",
    image: "/images/kyoto_sanctuary.png",
    date: "May 15, 2026",
    readTime: "8 Min Read",
    category: "Heritage Design"
  },
  {
    title: "Sovereign Sanctuary: The Rise of Yacht-Accessible Deep-Water Palazzos",
    excerpt: "Direct dock connections represent the ultimate residential luxury. The Amalfi watchtowers occupy unique niches where naval architecture meets high-end heritage stone masonry.",
    image: "/images/villa_horizon.png",
    date: "May 02, 2026",
    readTime: "10 Min Read",
    category: "Elite Lifestyle"
  }
];

export default function JournalPage() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".animate-fade-up", { opacity: 0, y: 30 });
      gsap.set(".animate-article", { opacity: 0, y: 40 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.to(".animate-fade-up", { opacity: 1, y: 0, stagger: 0.08 })
        .to(".animate-article", { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" }, "-=0.3");
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
            <p className="animate-fade-up text-[11px] font-bold uppercase tracking-[0.25em] text-primary-light mb-3">Aetheria Journal</p>
            <h1 className="animate-fade-up text-[36px] sm:text-[44px] lg:text-[56px] font-display font-light leading-none tracking-tight">
              The Architecture & Design Ledger
            </h1>
            <p className="animate-fade-up mt-4 text-[15px] text-on-dark-soft max-w-xl font-light leading-relaxed">
              Curated essays, architectural logs, and elite lifestyle reviews compiled by our global design advisors.
            </p>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {articles.map((article) => (
                <article key={article.title} className="animate-article group cursor-pointer flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-card border border-hairline mb-6">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-3">
                      <span>{article.category}</span>
                      <span className="text-muted-soft">•</span>
                      <span className="text-muted">{article.date}</span>
                    </div>
                    <h2 className="text-[22px] sm:text-[24px] font-display font-light leading-[1.3] text-ink group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-[14px] text-body leading-relaxed font-light line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-hairline pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{article.readTime}</span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary hover:text-primary-active inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                      Read Essay ›
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
