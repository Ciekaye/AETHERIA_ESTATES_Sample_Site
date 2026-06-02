"use client";

import { useRef } from "react";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const milestones = [
  { year: "1996", title: "Monaco Inception", desc: "Aetheria was established on the cliffs of Monte Carlo, providing highly discrete property acquisitions for European sovereign families." },
  { year: "2005", title: "Manhattan Off-Market Network", desc: "Launched our first metropolitan office in New York, pioneered the Private Access portal to index off-market residential penthouses." },
  { year: "2014", title: "Kyoto Heritage Sanctuary", desc: "Opened our Asian flagship office in Kyoto, specializing in traditional Hinoki timber structures and heritage design preservation." },
  { year: "2023", title: "Sovereign Volume Milestone", desc: "Aetheria reached a combined global transaction volume exceeding $4.8B annually, solidifying our boutique leadership status." }
];

const offices = [
  { city: "Monte Carlo, Monaco", address: "7 Avenue d'Ostende, 98000 Monaco", phone: "+377 93 50 60 70", email: "monaco@aetheria.com" },
  { city: "Manhattan, New York", address: "730 Fifth Avenue, New York, NY 10019", phone: "+1 (212) 555-0190", email: "ny@aetheria.com" },
  { city: "Kyoto, Japan", address: "Higashiyama-ku, Kyoto 605-0001", phone: "+81 3-5555-0143", email: "kyoto@aetheria.com" },
  { city: "Mayfair, London", address: "14 Berkeley Square, London W1J 6BD", phone: "+44 20 7946 0958", email: "london@aetheria.com" }
];

export default function AboutPage() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".animate-fade-up", { opacity: 0, y: 30 });
      gsap.set(".animate-milestone", { opacity: 0, y: 35 });
      gsap.set(".animate-office", { opacity: 0, y: 35 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
      tl.to(".animate-fade-up", { opacity: 1, y: 0, stagger: 0.08 })
        .to(".animate-milestone", { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" }, "-=0.3")
        .to(".animate-office", { opacity: 1, y: 0, stagger: 0.08, ease: "power2.out" }, "-=0.3");
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
            <p className="animate-fade-up text-[11px] font-bold uppercase tracking-[0.25em] text-primary-light mb-3">Aetheria Legacy</p>
            <h1 className="animate-fade-up text-[36px] sm:text-[44px] lg:text-[56px] font-display font-light leading-none tracking-tight">
              Our Heritage & Curation
            </h1>
            <p className="animate-fade-up mt-4 text-[15px] text-on-dark-soft max-w-xl font-light leading-relaxed">
              Discover the timeline of Aetheria Luxury Estates, our architectural philosophies, and global advisory network.
            </p>
          </div>
        </section>

        {/* Legacy Description */}
        <section className="animate-fade-up py-16 lg:py-24 border-b border-hairline">
          <div className="mx-auto max-w-[1000px] px-6 text-center space-y-6">
            <h2 className="text-[28px] sm:text-[36px] font-display font-light text-ink">
              Three Decades of Architectural Matchmaking
            </h2>
            <p className="text-[16px] text-body leading-[1.75] font-light max-w-3xl mx-auto text-justify sm:text-center">
              Aetheria was born from a singular insight: high-value real estate is not merely a transaction of square footage; it is the pairing of architectural legacy with extraordinary lives. Over the years, we have intentionally avoided mass listings to maintain absolute boutique standards, ensuring that every clifftop villa, private archipelago, and Manhattan penthouse in our archives is an authentic design masterpiece.
            </p>
          </div>
        </section>

        {/* Timeline Timeline */}
        <section className="py-16 lg:py-24 bg-surface-soft border-b border-hairline">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <h2 className="animate-fade-up text-center text-[28px] sm:text-[36px] font-display font-light text-ink mb-16">
              Corporate Chronology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((item) => (
                <div key={item.year} className="animate-milestone bg-canvas border border-hairline p-8 relative flex flex-col justify-between h-full">
                  <div className="absolute top-4 right-4 text-[32px] font-display font-light text-primary/20">{item.year}</div>
                  <div>
                    <h3 className="text-[18px] font-bold text-ink mb-3">{item.title}</h3>
                    <p className="text-[13px] text-body font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Office Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <h2 className="animate-fade-up text-center text-[28px] sm:text-[36px] font-display font-light text-ink mb-16">
              Global Advisory Network
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {offices.map((office) => (
                <div key={office.city} className="animate-office border border-hairline p-8 space-y-4">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary">{office.city}</p>
                  <p className="text-[13px] text-body font-light leading-relaxed min-h-[50px]">{office.address}</p>
                  <div className="border-t border-hairline pt-4 space-y-2 text-[12px] font-medium text-ink">
                    <p className="flex justify-between">
                      <span className="text-muted font-light">Phone:</span>
                      <a href={`tel:${office.phone.replace(/[\s\(\)-]/g, "")}`} className="hover:text-primary transition-colors">
                        {office.phone}
                      </a>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-muted font-light">Email:</span>
                      <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">
                        {office.email}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
