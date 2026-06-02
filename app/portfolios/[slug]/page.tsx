"use client";

import { use, useState, useRef } from "react";
import { TopNav } from "../../components/TopNav";
import { Footer } from "../../components/Footer";
import { properties } from "../../data/properties";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const property = properties.find((p) => p.slug === slug);
  const root = useRef<HTMLDivElement | null>(null);

  const [activeImage, setActiveImage] = useState(property?.image ?? "");
  const [bookingDate, setBookingDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");

  if (!property) {
    return (
      <>
        <TopNav />
        <main className="flex-1 bg-canvas flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8">
            <h1 className="text-[28px] font-display font-light text-ink">Sanctuary Not Found</h1>
            <p className="text-[14px] text-muted mt-2">The property you are looking for does not exist in our active archives.</p>
            <Link
              href="/portfolios"
              className="mt-6 inline-flex h-11 items-center justify-center bg-primary text-white px-6 text-[12px] uppercase font-bold tracking-[0.15em] hover:bg-primary-active transition-colors"
            >
              Return to Portfolios
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !clientName || !clientEmail) return;
    setBookingStatus("submitting");
    setTimeout(() => {
      setBookingStatus("success");
    }, 1500);
  };

  useGSAP(
    () => {
      if (!property) return;
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
        {/* Editorial Property Header */}
        <section className="animate-fade-up bg-canvas border-b border-hairline py-12 lg:py-16">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <Link
                  href="/portfolios"
                  className="text-[11px] uppercase font-bold tracking-[0.18em] text-primary hover:text-primary-active inline-flex items-center gap-1 mb-4 group"
                >
                  ← Back to Collection
                </Link>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{property.location}</p>
                <h1 className="mt-2 text-[38px] sm:text-[48px] lg:text-[60px] font-display font-light leading-[1.1] text-ink">
                  {property.name}
                </h1>
              </div>
              <div className="lg:text-right border-l lg:border-l-0 lg:border-r border-primary/20 pl-6 lg:pl-0 lg:pr-6 py-1">
                <p className="text-[11px] uppercase font-bold tracking-[0.18em] text-muted">Aetheria Private Valuation</p>
                <p className="text-[28px] sm:text-[34px] lg:text-[40px] font-display font-light text-ink mt-1">
                  {property.price}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Gallery & Main Info */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Gallery Section */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] bg-surface-card overflow-hidden border border-hairline">
                <img
                  src={activeImage}
                  alt={`${property.name} Main View`}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {property.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                      activeImage === img ? "border-primary scale-[0.98]" : "border-hairline hover:border-muted"
                    }`}
                  >
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Spec Table & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-[20px] font-display font-light text-ink tracking-wide border-b border-hairline pb-4">
                  Architectural Narrative
                </h3>
                <p className="text-[15px] font-light text-body leading-[1.65] text-justify">
                  {property.narrative}
                </p>
                
                {/* Specs list */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-b border-hairline py-6 my-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Architect</p>
                    <p className="text-[14px] text-ink font-semibold mt-1">{property.architect}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Commissioned Year</p>
                    <p className="text-[14px] text-ink font-semibold mt-1">{property.yearBuilt}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Internal Area</p>
                    <p className="text-[14px] text-ink font-semibold mt-1">{property.sqft.toLocaleString()} SQ FT</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted">Layout Design</p>
                    <p className="text-[14px] text-ink font-semibold mt-1">{property.beds} Beds · {Math.floor(property.baths)} Baths</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Viewing Scheduler Container */}
              <div id="booking-widget" className="bg-surface-soft border border-hairline p-6 lg:p-8 shadow-sm">
                {bookingStatus === "success" ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary text-primary mb-4">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h4 className="text-[18px] font-display font-light text-ink">Viewing Requested</h4>
                    <p className="text-[13px] text-muted mt-2 leading-relaxed max-w-xs mx-auto">
                      Your viewing reservation on <strong>{bookingDate}</strong> has been received. Our concierge will coordinate coordinates.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-ink">Schedule Private Showing</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="h-10 bg-canvas border border-hairline px-3 text-[13px] text-ink placeholder-muted focus:outline-none focus:border-primary"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="h-10 bg-canvas border border-hairline px-3 text-[13px] text-ink placeholder-muted focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full h-10 bg-canvas border border-hairline px-3 text-[13px] text-ink focus:outline-none focus:border-primary cursor-pointer"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={bookingStatus === "submitting"}
                      className="w-full h-11 bg-primary hover:bg-primary-active text-white text-[12px] uppercase font-bold tracking-[0.15em] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {bookingStatus === "submitting" ? "Requesting Private Viewing..." : "Request Showing"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
