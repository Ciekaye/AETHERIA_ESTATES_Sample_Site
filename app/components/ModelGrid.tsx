"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Estate = {
  name: string;
  location: string;
  price: string;
  image: string;
  specs: string;
};

const estates: Estate[] = [
  {
    name: "Villa L'Horizon",
    location: "Côte d'Azur, France",
    price: "$24,500,000",
    image: "/images/villa_horizon.png",
    specs: "6 BEDS · 8 BATHS · 12,400 SQ FT",
  },
  {
    name: "The Obsidian Penthouse",
    location: "Manhattan, New York",
    price: "$18,900,000",
    image: "/images/manhattan_penthouse.png",
    specs: "4 BEDS · 5.5 BATHS · 8,200 SQ FT",
  },
  {
    name: "Amanara Sanctuary",
    location: "Kyoto, Japan",
    price: "$15,200,000",
    image: "/images/kyoto_sanctuary.png",
    specs: "5 BEDS · 6 BATHS · 10,500 SQ FT",
  },
  {
    name: "Bel-Air Crest",
    location: "Los Angeles, California",
    price: "$32,000,000",
    image: "/images/bel_air_crest.png",
    specs: "7 BEDS · 10 BATHS · 18,600 SQ FT",
  },
];

export function ModelGrid() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.set([".grid-eyebrow", ".grid-heading", ".grid-link"], {
        opacity: 0,
        y: 24,
      });
      gsap.set(".estate-card", { opacity: 0, y: 48 });
      gsap.set(".card-gold-line", { scaleX: 0, transformOrigin: "left center" });

      gsap.to([".grid-eyebrow", ".grid-heading", ".grid-link"], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".grid-header",
          start: "top 85%",
          once: true,
        },
      });

      ScrollTrigger.batch(".estate-card", {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          });
          gsap.to(
            els.map((el) => el.querySelector(".card-gold-line")).filter(Boolean),
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.12,
              delay: 0.3,
            }
          );
        },
      });
    },
    { scope: root }
  );

  return (
    <section id="portfolio" ref={root} className="bg-canvas py-24 lg:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <p className="grid-eyebrow text-[12px] font-bold uppercase tracking-[0.2em] text-muted mb-3">
              The Private Collection
            </p>
            <h2 className="grid-heading text-[32px] lg:text-[48px] font-display font-light leading-[1.15] text-ink max-w-xl">
              Curated Architectural <br />
              <span className="font-display font-light text-primary">Sanctuaries</span>
            </h2>
          </div>
          <a
            href="#"
            className="grid-link text-[12px] uppercase font-bold tracking-[0.18em] text-primary hover:text-primary-active inline-flex items-center gap-2 group"
          >
            View Full Portfolio
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {estates.map((estate) => (
            <EstateCard key={estate.name} estate={estate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EstateCard({ estate }: { estate: Estate }) {
  return (
    <article className="estate-card group bg-canvas">
      <div className="relative aspect-[4/3] bg-surface-card overflow-hidden">
        <img
          src={estate.image}
          alt={`${estate.name}`}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="card-gold-line absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
      </div>
      <div className="pt-6 pb-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-primary">
          {estate.location}
        </p>
        <h3 className="mt-2 text-[22px] font-display font-light leading-[1.3] text-ink group-hover:text-primary transition-colors duration-300">
          {estate.name}
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted font-light">{estate.specs}</p>
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-[16px] font-medium text-ink">{estate.price}</span>
          <a
            href="#"
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary hover:text-primary-active inline-flex items-center gap-1 group/link"
          >
            Request Private Details
            <span
              aria-hidden
              className="transition-transform group-hover/link:translate-x-1"
            >
              ›
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

