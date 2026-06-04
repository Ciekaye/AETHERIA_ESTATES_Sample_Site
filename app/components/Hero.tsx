"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface FeaturedEstate {
  name: string;
  location: string;
  image: string;
  price: string;
  slug: string;
  description: string;
  specs: string[];
  coordinates: string;
}

const featuredEstates: FeaturedEstate[] = [
  {
    name: "VILLA L'HORIZON",
    location: "Saint-Jean-Cap-Ferrat, France",
    image: "/images/villa_horizon.png",
    price: "$24,500,000",
    slug: "villa-horizon",
    description: "A modern glass sanctuary perched high on Cap-Ferrat, merging pure white stone blocks with structural ocean glass.",
    specs: ["6 Bedrooms", "8 Bathrooms", "12,400 Sq Ft", "Private Yacht Cove"],
    coordinates: "43.6874° N, 7.3323° E",
  },
  {
    name: "THE OBSIDIAN PENTHOUSE",
    location: "Fifth Avenue, Manhattan",
    image: "/images/manhattan_penthouse.png",
    price: "$18,900,000",
    slug: "obsidian-penthouse",
    description: "Double-height ceilings floating high above Central Park, clad in obsidian wood panels and solid marble fireplaces.",
    specs: ["4 Bedrooms", "5.5 Bathrooms", "8,200 Sq Ft", "360° Park Views"],
    coordinates: "40.7580° N, 73.9781° W",
  },
  {
    name: "AMANARA SANCTUARY",
    location: "Higashiyama-ku, Kyoto",
    image: "/images/kyoto_sanctuary.png",
    price: "$15,200,000",
    slug: "amanara-sanctuary",
    description: "Constructed using interlocking Hinoki wood timber joints by Kengo Kuma, surrounded by serene cherry blossom gardens.",
    specs: ["5 Bedrooms", "6 Bathrooms", "10,500 Sq Ft", "Private Hot Onsen"],
    coordinates: "35.0116° N, 135.7681° E",
  },
];

export function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEstate = featuredEstates[activeIndex];

  const { contextSafe } = useGSAP(
    () => {
      // Intro animations - Handcrafted organic reveal
      gsap.set(".hero-layer-num", { opacity: 0, scale: 0.8 });
      gsap.set(".hero-eyebrow-item", { opacity: 0, x: -20 });
      gsap.set(".hero-main-title", { opacity: 0, y: 35 });
      gsap.set(".hero-main-desc", { opacity: 0, y: 20 });
      gsap.set(".hero-main-btn", { opacity: 0, y: 15 });
      gsap.set(".bleed-image-panel", { xPercent: 100 });
      gsap.set(".floating-spec-overlay", { opacity: 0, y: 30 });
      gsap.set(".filmstrip-card", { opacity: 0, x: -30 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".bleed-image-panel", { xPercent: 0, duration: 1.6, ease: "power3.inOut" })
        .to(".hero-layer-num", { opacity: 1, scale: 1, duration: 1.2 }, "-=0.9")
        .to(".hero-eyebrow-item", { opacity: 1, x: 0, duration: 0.6 }, "-=0.8")
        .to(".hero-main-title", { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
        .to(".hero-main-desc", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(".hero-main-btn", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .to(".floating-spec-overlay", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(".filmstrip-card", { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 }, "-=0.5");
    },
    { scope: root }
  );

  const handleTransition = contextSafe((index: number) => {
    if (index === activeIndex) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 0.65 },
      onComplete: () => {
        setActiveIndex(index);
        // Reveal new assets
        gsap.to(".hero-layer-num", { opacity: 0.05, y: 0, scale: 1 });
        gsap.to(".bleed-slide-img", { scale: 1, opacity: 1, xPercent: 0 });
        gsap.to([".hero-dyn-title", ".hero-dyn-location", ".hero-dyn-desc", ".hero-dyn-price", ".hero-dyn-coords"], {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "power3.out",
        });
        gsap.to(".floating-spec-item", { opacity: 1, y: 0, stagger: 0.04 });
      },
    });

    // Fade out current values
    tl.to(".bleed-slide-img", { scale: 1.05, opacity: 0, xPercent: -5 })
      .to(".hero-layer-num", { opacity: 0, scale: 0.9, y: 20 }, "-=0.5")
      .to(
        [".hero-dyn-title", ".hero-dyn-location", ".hero-dyn-desc", ".hero-dyn-price", ".hero-dyn-coords"],
        { opacity: 0, y: -20, stagger: 0.02 },
        "-=0.5"
      )
      .to(".floating-spec-item", { opacity: 0, y: 15, stagger: 0.02 }, "-=0.5");
  });

  return (
    <section
      ref={root}
      className="relative bg-canvas text-ink overflow-hidden lg:min-h-[92vh] flex flex-col lg:flex-row lg:items-center"
    >
      {/* GIANT LAYERED BACKGROUND NUMBER (Bespoke Human-Crafted Depth) */}
      <div className="hero-layer-num absolute left-12 lg:left-24 top-20 text-[24vw] font-display font-extrabold text-ink/[0.03] select-none pointer-events-none uppercase tracking-widest leading-none z-0">
        {`0${activeIndex + 1}`}
      </div>

      {/* RIGHT PORTFOLIO BLEED IMAGE PANEL (Cinematic Editorial Cut) */}
      <div className="bleed-image-panel relative lg:absolute right-0 top-0 w-full lg:w-[52vw] h-[40vh] lg:h-full overflow-hidden bg-surface-dark z-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-canvas via-canvas/10 to-transparent lg:to-black/20 z-20 pointer-events-none" />
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={activeEstate.image}
            alt={activeEstate.name}
            className="bleed-slide-img w-full h-full object-cover transition-transform duration-[3000ms] ease-out will-change-transform scale-100"
          />
        </div>

        {/* FLOATING CORNER COORDINATES (Discrete Architectural Tags) */}
        <div className="absolute top-8 right-8 z-30 hidden lg:block text-right">
          <p className="hero-dyn-coords text-[10px] font-bold tracking-[0.25em] text-white uppercase opacity-75">
            {activeEstate.coordinates}
          </p>
          <p className="text-[9px] tracking-[0.2em] text-primary-light uppercase font-bold mt-1">AETHERIA ESTATES</p>
        </div>
      </div>

      {/* CORE CONTAINER */}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10 flex flex-col justify-center z-20 pt-8 pb-16 lg:py-0 lg:min-h-[92vh] lg:h-full">
        {/* LEFT COLUMN: Clean Minimalist Layout */}
        <div className="w-full lg:w-[46vw] space-y-8 pr-0 lg:pr-10">
          <div className="hero-eyebrow-item flex items-center gap-2">
            <span className="h-[2px] w-8 bg-primary" />
            <p className="hero-dyn-location text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              {activeEstate.location}
            </p>
          </div>

          <div className="space-y-4">
            <h1 className="hero-main-title hero-dyn-title text-[38px] sm:text-[56px] lg:text-[76px] font-display font-light leading-[1.02] tracking-tighter text-ink border-l-[3px] border-primary pl-6 lg:pl-8">
              ARCHITECTURAL <br />
              <span className="font-display font-bold text-primary">{activeEstate.name}</span>
            </h1>
            <p className="hero-main-desc hero-dyn-desc mt-6 max-w-lg text-[15px] font-light leading-[1.7] text-body min-h-[75px]">
              {activeEstate.description}
            </p>
          </div>

          {/* Premium Floating Actions */}
          <div className="hero-actions flex flex-wrap gap-4 pt-2">
            <a
              href={`/portfolios/${activeEstate.slug}`}
              className="hero-main-btn inline-flex h-12 items-center justify-center bg-primary text-white px-8 text-[12px] uppercase font-bold tracking-[0.2em] hover:bg-primary-active transition-all duration-300 shadow-xl"
              style={{ color: "#ffffff" }}
            >
              Acquire Residence
            </a>
            <a
              href="#inquire"
              className="hero-main-btn inline-flex h-12 items-center justify-center border border-ink/10 text-ink px-8 text-[12px] uppercase font-bold tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-300"
            >
              Private Viewing
            </a>
          </div>
        </div>
      </div>

      {/* FLOATING GLASS SPECIFICATIONS PANEL (Grounded Overlap) */}
      <div className="floating-spec-overlay relative lg:absolute bottom-8 right-6 lg:right-[54vw] z-30 bg-canvas border border-hairline p-6 shadow-2xl w-full sm:w-[260px] hidden sm:block mt-6 lg:mt-0">
        <p className="hero-dyn-price text-[18px] font-semibold text-primary tracking-wide">
          {activeEstate.price}
        </p>
        <div className="border-t border-hairline pt-3 mt-3 grid grid-cols-2 gap-3 text-[10px] uppercase font-bold tracking-[0.15em] text-muted">
          {activeEstate.specs.map((spec) => (
            <div key={spec} className="floating-spec-item flex flex-col">
              <span className="text-[9px] font-normal text-muted-soft">FEATURE</span>
              <span className="text-ink mt-0.5">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DYNAMIC FILMSTRIP CONTROLLER (Bespoke Filmstrip Nav) */}
      <div className="relative lg:absolute right-6 bottom-8 lg:right-10 lg:bottom-10 z-30 flex flex-col items-start lg:items-center gap-3 mt-8 lg:mt-0 px-6 lg:px-5 lg:py-4 lg:bg-canvas/75 lg:backdrop-blur-md lg:border lg:border-white/20 lg:shadow-2xl">
        <p className="text-[9px] uppercase font-bold tracking-[0.25em] text-muted lg:text-ink/80 text-left lg:text-center mb-1 w-full">
          Select Sanctuary Portfolio
        </p>
        <div className="flex flex-row gap-3 w-full lg:w-auto">
          {featuredEstates.map((estate, idx) => (
            <button
              key={estate.name}
              onClick={() => handleTransition(idx)}
              className="filmstrip-card relative flex-1 aspect-[4/3] max-w-[120px] lg:flex-none lg:w-20 lg:h-14 border overflow-hidden cursor-pointer transition-all duration-300 ease-out group"
              style={{
                borderColor: activeIndex === idx ? "var(--color-primary)" : "var(--color-hairline-strong)"
              }}
            >
              <img
                src={estate.image}
                alt={estate.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  activeIndex === idx ? "grayscale-0" : "grayscale contrast-125 group-hover:grayscale-0"
                }`}
              />
              <div className={`absolute inset-0 bg-primary/20 transition-opacity duration-300 ${activeIndex === idx ? "opacity-100" : "opacity-0"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}


