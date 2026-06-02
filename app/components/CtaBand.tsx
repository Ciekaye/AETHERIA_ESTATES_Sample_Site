"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CtaBand() {
  const root = useRef<HTMLElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    region: "French Riviera",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useGSAP(
    () => {
      gsap.set(".cta-bg", { scale: 1.18 });
      gsap.set([".cta-eyebrow", ".cta-heading", ".cta-copy", ".cta-form-container"], {
        opacity: 0,
        y: 28,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".cta-bg", { scale: 1, duration: 2.4, ease: "power2.out" })
        .to(".cta-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, "-=2.0")
        .to(".cta-heading", { opacity: 1, y: 0, duration: 0.8 }, "-=1.7")
        .to(".cta-copy", { opacity: 1, y: 0, duration: 0.7 }, "-=1.4")
        .to(".cta-form-container", { opacity: 1, y: 0, duration: 0.8 }, "-=1.1");
    },
    { scope: root }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section
      id="inquire"
      ref={root}
      className="relative bg-surface-dark text-on-dark overflow-hidden py-24 lg:py-[120px]"
    >
      <div
        className="cta-bg absolute inset-0 bg-cover bg-center opacity-45 will-change-transform"
        style={{
          backgroundImage: "url('/images/concierge_study.png')",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,15,17,0.7) 0%, rgba(14,15,17,0.95) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6">
          <p className="cta-eyebrow text-[12px] font-bold uppercase tracking-[0.2em] text-primary-light mb-4">
            Private Access
          </p>
          <h2 className="cta-heading text-[36px] sm:text-[44px] lg:text-[56px] font-display font-light leading-[1.1] max-w-xl">
            Acquire Your <br />
            <span className="font-display font-light text-primary-light">Sanctuary.</span>
          </h2>
          <p className="cta-copy mt-6 text-[16px] font-light text-on-dark-soft leading-[1.65] max-w-lg">
            Connect with a global Aetheria advisory partner to obtain bespoke, off-market real estate portfolios, arrange discrete private viewings, or arrange a private portfolio consultation.
          </p>
        </div>

        <div className="cta-form-container lg:col-span-6 bg-surface-dark-elevated/75 backdrop-blur-xl border border-white/10 p-8 lg:p-12 shadow-2xl relative">
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary-light text-primary-light mb-6">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[24px] font-display font-light text-on-dark mb-3">
                Invitation Requested
              </h3>
              <p className="text-[14px] font-light text-on-dark-soft leading-[1.6] max-w-sm mx-auto">
                Thank you for your interest. A private portfolio advisor will contact you discretely within 24 hours to coordinate your request.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-[20px] font-display font-light text-on-dark tracking-wide mb-2 border-b border-white/10 pb-4">
                Advisory Consultation Request
              </h3>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-primary-light">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Vane"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 bg-white/5 border border-white/15 px-4 text-[14px] text-on-dark placeholder-white/30 focus:outline-none focus:border-primary-light transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-primary-light">
                  Private Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. julian@vaneholdings.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 bg-white/5 border border-white/15 px-4 text-[14px] text-on-dark placeholder-white/30 focus:outline-none focus:border-primary-light transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-primary-light">
                  Preferred Sanctuary Region
                </label>
                <div className="relative">
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full h-11 bg-surface-dark-elevated border border-white/15 px-4 text-[14px] text-on-dark appearance-none focus:outline-none focus:border-primary-light transition-all duration-300 cursor-pointer"
                  >
                    <option value="French Riviera">French Riviera, France</option>
                    <option value="Manhattan NY">Manhattan, New York</option>
                    <option value="Kyoto Japan">Kyoto, Japan</option>
                    <option value="Los Angeles CA">Los Angeles, California</option>
                    <option value="Private Islands">Private Islands / Archipelago</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-12 bg-primary hover:bg-primary-active text-white text-[12px] uppercase font-bold tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span>Requesting Private Invitation...</span>
                ) : (
                  <span>Request Private Invitation</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

