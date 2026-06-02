export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: string;
  numericPrice: number;
  image: string;
  specs: string;
  beds: number;
  baths: number;
  sqft: number;
  region: string;
  offMarket?: boolean;
  architect: string;
  yearBuilt: number;
  narrative: string;
  gallery: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "villa-horizon",
    name: "Villa L'Horizon",
    location: "Côte d'Azur, France",
    price: "$24,500,000",
    numericPrice: 24500000,
    image: "/images/villa_horizon.png",
    specs: "6 BEDS · 8 BATHS · 12,400 SQ FT",
    beds: 6,
    baths: 8,
    sqft: 12400,
    region: "French Riviera",
    architect: "Jean-Michel Wilmotte",
    yearBuilt: 2021,
    narrative: "Poised majestically on the cliffs of Saint-Jean-Cap-Ferrat, Villa L'Horizon represents the pinnacle of modern architectural expression on the French Riviera. Crafted with pure white limestone facades and floor-to-ceiling structural glass, this masterpiece offers panoramic views of the Mediterranean Sea. The interior features book-matched Calacatta marble, a fully equipped wellness pavilion, and bespoke sound systems integrated into the very structure of the building. Outside, a multi-tier landscaped garden frames a spectacular heated infinity pool that merges seamlessly with the azure sea horizon.",
    gallery: [
      "/images/villa_horizon.png",
      "/images/hero_villa.png",
      "/images/concierge_study.png"
    ]
  },
  {
    id: "2",
    slug: "obsidian-penthouse",
    name: "The Obsidian Penthouse",
    location: "Manhattan, New York",
    price: "$18,900,000",
    numericPrice: 18900000,
    image: "/images/manhattan_penthouse.png",
    specs: "4 BEDS · 5.5 BATHS · 8,200 SQ FT",
    beds: 4,
    baths: 5.5,
    sqft: 8200,
    region: "Manhattan NY",
    architect: "Robert A.M. Stern",
    yearBuilt: 2023,
    narrative: "Hovering high above Central Park, The Obsidian Penthouse redefines metropolitan elite living. Spread across two entire floor plates, this double-height residential sanctuary features soaring 20-foot ceilings and 360-degree glass curtain walls offering unrivaled skyline views. Engineered with absolute privacy in mind, the residence features a private high-speed elevator opening directly into a grand mahogany gallery. Amenities include a solid marble double-sided fireplace, a temperature-controlled 1,200-bottle wine room, and a state-of-the-art home theater draped in plush cashmere acoustic panels.",
    gallery: [
      "/images/manhattan_penthouse.png",
      "/images/concierge_study.png",
      "/images/hero_villa.png"
    ]
  },
  {
    id: "3",
    slug: "amanara-sanctuary",
    name: "Amanara Sanctuary",
    location: "Kyoto, Japan",
    price: "$15,200,000",
    numericPrice: 15200000,
    image: "/images/kyoto_sanctuary.png",
    specs: "5 BEDS · 6 BATHS · 10,500 SQ FT",
    beds: 5,
    baths: 6,
    sqft: 10500,
    region: "Kyoto Japan",
    architect: "Kengo Kuma",
    yearBuilt: 2019,
    narrative: "Tucked away in the serene foothills of Kyoto's Higashiyama district, Amanara Sanctuary represents a harmonious dialogue between historic Japanese craft and modern minimalist design. Constructed using ancient interlocking Hinoki wood techniques and local granite, the villa features an active private hot spring (Onsen) pavilion and an expansive dry rock Zen garden with authentic stone lanterns. Sliding cedar Shoji screens partition the sprawling living quarters, opening up to a tranquil central koi pond spanned by a hand-carved wooden bridge.",
    gallery: [
      "/images/kyoto_sanctuary.png",
      "/images/hero_villa.png",
      "/images/concierge_study.png"
    ]
  },
  {
    id: "4",
    slug: "bel-air-crest",
    name: "Bel-Air Crest",
    location: "Los Angeles, California",
    price: "$32,000,000",
    numericPrice: 32000000,
    image: "/images/bel_air_crest.png",
    specs: "7 BEDS · 10 BATHS · 18,600 SQ FT",
    beds: 7,
    baths: 10,
    sqft: 18600,
    region: "Los Angeles CA",
    architect: "Paul McClean",
    yearBuilt: 2024,
    narrative: "Located on a highly secure, private promontory in Los Angeles' prestigious Bel-Air community, Bel-Air Crest is a modern estate of monumental proportions. Conceived with seamless indoor-outdoor transition, the home is bisected by a dramatic water-cascade structure and features a glass helipad platform. Multi-level limestone terraces wrap around a spectacular cantilevered pool overlooking the downtown LA skyline. Smart home automated systems integrate climate, lighting, and security with biometric sensors throughout.",
    gallery: [
      "/images/bel_air_crest.png",
      "/images/hero_villa.png",
      "/images/manhattan_penthouse.png"
    ]
  },
  {
    id: "5",
    slug: "isola-bella",
    name: "Isola Bella Sanctuary",
    location: "Amalfi Coast, Italy",
    price: "$45,000,000",
    numericPrice: 45000000,
    image: "/images/hero_villa.png",
    specs: "8 BEDS · 10 BATHS · 22,000 SQ FT",
    beds: 8,
    baths: 10,
    sqft: 22000,
    region: "Private Islands",
    offMarket: true,
    architect: "Billi & Associate",
    yearBuilt: 2022,
    narrative: "Isola Bella is an ultra-private compound occupying a dramatic cliff edge on the legendary Amalfi Coast. Only accessible via a private security gate or by helicopter, this off-market masterpiece comprises a grand central manor, three private guest pavilions, a historic watchtower, and a deep-water yacht dock carved directly into the basalt cliffs. The interiors showcase timeless Italian heritage with restored frescoes, Venetian terrazzo floors, and modern furnishings from the finest Milanese design houses.",
    gallery: [
      "/images/hero_villa.png",
      "/images/villa_horizon.png",
      "/images/concierge_study.png"
    ]
  },
  {
    id: "6",
    slug: "villa-nebra",
    name: "Villa Nebra",
    location: "Majorca, Spain",
    price: "$28,000,000",
    numericPrice: 28000000,
    image: "/images/villa_horizon.png",
    specs: "6 BEDS · 7 BATHS · 15,400 SQ FT",
    beds: 6,
    baths: 7,
    sqft: 15400,
    region: "Private Islands",
    offMarket: true,
    architect: "Studio de Blacam & Meagher",
    yearBuilt: 2020,
    narrative: "Nestled quietly on a remote Mediterranean ridge in Majorca, Villa Nebra is a masterclass in modern brutalist architecture blending in with nature. Crafted using warm local marés stone, the estate forms a series of intersecting stone blocks that shade internal courtyards. Features include a fully automated skylight roof, a subterranean private spa, and a high-yield organic olive orchard supplying private house-pressed olive oil.",
    gallery: [
      "/images/villa_horizon.png",
      "/images/bel_air_crest.png",
      "/images/manhattan_penthouse.png"
    ]
  },
  {
    id: "7",
    slug: "quartz-chalet",
    name: "The Quartz Chalet",
    location: "Zermatt, Switzerland",
    price: "$21,000,000",
    numericPrice: 21000000,
    image: "/images/hero_villa.png",
    specs: "5 BEDS · 5.5 BATHS · 9,400 SQ FT",
    beds: 5,
    baths: 5.5,
    sqft: 9400,
    region: "Swiss Alps",
    architect: "Peter Zumthor",
    yearBuilt: 2022,
    narrative: "Carved directly into the pristine, snow-clad cliffs of Zermatt, The Quartz Chalet is a tour de force of high-alpine thermal-stone architecture. Featuring glass elevator tubes offering private ski-in/ski-out runway runs, this retreat overlooks the dramatic peaks of the Matterhorn. The interiors highlight hand-brushed larch beams, floating fireplaces, and a heated glass-wrapped thermal pool room.",
    gallery: [
      "/images/hero_villa.png",
      "/images/manhattan_penthouse.png",
      "/images/concierge_study.png"
    ]
  },
  {
    id: "8",
    slug: "vila-do-sul",
    name: "Vila do Sul",
    location: "Algarve, Portugal",
    price: "$16,800,000",
    numericPrice: 16800000,
    image: "/images/villa_horizon.png",
    specs: "5 BEDS · 6 BATHS · 11,200 SQ FT",
    beds: 5,
    baths: 6,
    sqft: 11200,
    region: "Algarve Portugal",
    architect: "Álvaro Siza Vieira",
    yearBuilt: 2021,
    narrative: "Perched majestically above the golden sea pillars of Portugal's Algarve Coast, Vila do Sul is a masterclass in organic white concrete minimalism. Sweeping architectural curves frame the Atlantic wind, opening up to a cantilevered negative-edge pool that stretches towards the horizon. Featuring local cork panel insulation and absolute energy independence.",
    gallery: [
      "/images/villa_horizon.png",
      "/images/kyoto_sanctuary.png",
      "/images/bel_air_crest.png"
    ]
  },
  {
    id: "9",
    slug: "tuscany-chateau",
    name: "Château des Vignes",
    location: "Tuscany, Italy",
    price: "$19,500,000",
    numericPrice: 19500000,
    image: "/images/tuscany_chateau.png",
    specs: "5 BEDS · 6 BATHS · 9,800 SQ FT",
    beds: 5,
    baths: 6,
    sqft: 9800,
    region: "Tuscany Italy",
    architect: "Renzo Piano",
    yearBuilt: 2022,
    narrative: "Nestled in the rolling sun-drenched hills of Florence, Château des Vignes is a stunning fusion of a historic 16th-century Italian estate with high-modernist glass and steel extensions. Conceived by Renzo Piano, the estate sits atop a private organic vineyard producing estate-bottled Chianti Classico. Floor-to-ceiling glass pavilions frame sweeping views of cypress lanes and olive groves, while the interiors boast vaulted brick ceilings, reclaimed oak beams, and a state-of-the-art temperature-controlled wine cellar capable of housing 3,000 bottles.",
    gallery: [
      "/images/tuscany_chateau.png",
      "/images/hero_villa.png",
      "/images/concierge_study.png"
    ]
  },
  {
    id: "10",
    slug: "fjord-retreat",
    name: "The Fjord Retreat",
    location: "Geiranger Fjord, Norway",
    price: "$22,000,000",
    numericPrice: 22000000,
    image: "/images/fjord_retreat.png",
    specs: "4 BEDS · 4.5 BATHS · 8,500 SQ FT",
    beds: 4,
    baths: 4.5,
    sqft: 8500,
    region: "Nordic Fjords",
    architect: "Snøhetta",
    yearBuilt: 2023,
    narrative: "Perched on a sheer granite cliff towering 300 feet above the crystalline waters of Geiranger Fjord, The Fjord Retreat is a breathtaking triumph of Nordic organic modernism. Designed by Snøhetta to float effortlessly above the valley, this residence is wrapped in dark kebony pine and structural triple-pane glass engineered to withstand arctic winters. Highlights include a private funicular elevator ascending from the private yacht dock, an outdoor geothermal pool that projects over the cliff edge, and minimalist spruce-clad interior spaces framing majestic waterfall vistas.",
    gallery: [
      "/images/fjord_retreat.png",
      "/images/villa_horizon.png",
      "/images/manhattan_penthouse.png"
    ]
  },
  {
    id: "11",
    slug: "desert-oasis",
    name: "Desert Oasis Pavilion",
    location: "Mojave Desert, Utah",
    price: "$17,500,000",
    numericPrice: 17500000,
    image: "/images/desert_oasis.png",
    specs: "4 BEDS · 5 BATHS · 10,200 SQ FT",
    beds: 4,
    baths: 5,
    sqft: 10200,
    region: "Mojave Desert",
    architect: "Kendrick Bangs Kellogg",
    yearBuilt: 2024,
    narrative: "Emerging seamlessly from the ancient weathered red rocks of the high Utah desert, the Desert Oasis Pavilion is a legendary organic modernist masterpiece. Its striking silhouette comprises overlapping curved white concrete and steel petals that mimic desert flowers. Large structural glass domes flood the earth-walled rooms with natural desert light. Features include an indoor subterranean pool fed by an artisan well, a private astronomical observatory under crystal-clear dark skies, and custom-sculpted sandstone furnishings built directly into the structure.",
    gallery: [
      "/images/desert_oasis.png",
      "/images/bel_air_crest.png",
      "/images/kyoto_sanctuary.png"
    ]
  }
];

