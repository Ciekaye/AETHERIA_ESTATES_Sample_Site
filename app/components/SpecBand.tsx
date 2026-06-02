"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const specs: {
  raw?: number;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
}[] = [
  { staticValue: "$4.8B", label: "Annual Volume" },
  { raw: 85, decimals: 0, suffix: "%", label: "Off-Market Sales" },
  { raw: 24, decimals: 0, label: "Sovereign Hubs" },
  { staticValue: "$18.5M", label: "Average Transaction" },
];

function formatInt(n: number) {
  return Math.round(n).toLocaleString();
}

export function SpecBand() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.set(
        [".spec-eyebrow", ".spec-heading", ".spec-copy", ".spec-link"],
        { opacity: 0, y: 24 }
      );
      gsap.set(".spec-cell", { opacity: 0, y: 32 });

      gsap.to(
        [".spec-eyebrow", ".spec-heading", ".spec-copy", ".spec-link"],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".spec-text",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.to(".spec-cell", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".spec-grid",
          start: "top 85%",
          once: true,
          onEnter: () => {
            const nums = gsap.utils.toArray<HTMLElement>(".spec-num");
            nums.forEach((el) => {
              const target = Number(el.dataset.target ?? "0");
              const decimals = Number(el.dataset.decimals ?? "0");
              const suffix = el.dataset.suffix ?? "";
              if (Number.isNaN(target)) return;
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power2.out",
                delay: 0.2,
                onUpdate: () => {
                  const formatted =
                    decimals === 0
                      ? formatInt(obj.val)
                      : obj.val.toFixed(decimals);
                  el.textContent = `${formatted}${suffix}`;
                },
              });
            });
          },
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-surface-soft py-24 lg:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="spec-text lg:col-span-5">
            <p className="spec-eyebrow text-[12px] font-bold uppercase tracking-[0.2em] text-muted mb-3">
              The Art of Advisory
            </p>
            <h2 className="spec-heading text-[32px] lg:text-[48px] font-display font-light leading-[1.15] text-ink">
              Discrete Expertise. <br />
              <span className="font-display font-light text-primary">Unrivaled Access.</span>
            </h2>
            <p className="spec-copy mt-6 text-[15px] font-light leading-[1.65] text-body max-w-md">
              For over three decades, Aetheria has set the standard for high-value real estate. We manage private listings, provide discrete global acquisition services, and match legendary architecture with legacy collectors.
            </p>
            <a
              href="#"
              className="spec-link mt-8 inline-flex items-center gap-2 text-[12px] uppercase font-bold tracking-[0.18em] text-primary hover:text-primary-active group"
            >
              Read Our Legacy
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="spec-grid lg:col-span-7 grid grid-cols-2 gap-px bg-hairline">
            {specs.map((spec) => (
              <div key={spec.label} className="spec-cell bg-canvas p-8 lg:p-12">
                <div className="text-[40px] lg:text-[48px] font-display font-light leading-none text-ink tabular-nums">
                  {spec.staticValue ? (
                    <span className="text-primary font-display font-light">{spec.staticValue}</span>
                  ) : (
                    <span
                      className="spec-num text-primary font-display font-light"
                      data-target={spec.raw}
                      data-decimals={spec.decimals ?? 0}
                      data-suffix={spec.suffix ?? ""}
                    >
                      0
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

