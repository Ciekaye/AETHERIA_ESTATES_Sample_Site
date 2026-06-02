import Link from "next/link";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Collections",
    links: [
      { label: "Exclusive Villas", href: "/portfolios" },
      { label: "Penthouses", href: "/portfolios" },
      { label: "Private Islands", href: "/portfolios" },
      { label: "Historic Estates", href: "/portfolios" },
      { label: "Private Archipelago", href: "/portfolios" },
    ],
  },
  {
    title: "Advisory",
    links: [
      { label: "Off-Market Listings", href: "/private-collection" },
      { label: "Property Valuations", href: "/advisory" },
      { label: "Private Concierge", href: "/advisory" },
      { label: "Investment Advisory", href: "/advisory" },
      { label: "Private Viewing Requests", href: "/portfolios" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "French Riviera, France", href: "/portfolios" },
      { label: "Manhattan, New York", href: "/portfolios" },
      { label: "Kyoto, Japan", href: "/portfolios" },
      { label: "Los Angeles, California", href: "/portfolios" },
      { label: "Monte Carlo, Monaco", href: "/portfolios" },
    ],
  },
  {
    title: "Legacy",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Journal", href: "/journal" },
      { label: "Bespoke Architecture", href: "/about" },
      { label: "Global Offices", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-soft text-body">
      <div className="h-[2px] bg-primary/20" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] font-light text-body hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-[16px] font-semibold tracking-[0.2em] text-primary">
                AETHERIA
              </span>
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-muted mt-0.5">
                ESTATES
              </span>
            </div>
            <p className="text-[11px] tracking-[0.5px] text-muted leading-relaxed">
              © {new Date().getFullYear()} Aetheria Luxury Estates. All rights reserved.
              <br />
              Aetheria and the Aetheria logomark are registered trademarks of Aetheria International.
            </p>
          </div>
          <ul className="flex flex-wrap gap-6 text-[11px] text-muted">
            <li>
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Cookie Settings
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors duration-200">
                Discrete Disclosures
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

