export const siteUrl = "https://meowaesthetics.com";
export const businessName = "Meow Aesthetics";
export const businessPhone = "+65 8771 3358";
export const businessEmail = "meowaestheticssg@gmail.com";
export const appStoreUrl =
  "https://apps.apple.com/my/app/le-meow/id6763483119";
export const googlePlayUrl =
  "https://play.google.com/store/apps/details?id=com.meow.lemeow";
export const whatsappUrl = "https://wa.me/6587713358";

export const serviceRouteById = {
  2: "/nails",
  3: "/lashes",
  4: "/body-and-skin-treatments",
  5: "/facial",
} as const;

export const resolveServicePath = ({
  id,
  slug,
}: {
  id?: number | string | null;
  slug?: string | null;
}) => {
  const numericId = Number(id);

  if (Number.isFinite(numericId) && numericId in serviceRouteById) {
    return serviceRouteById[numericId as keyof typeof serviceRouteById];
  }

  if (!slug) {
    return "/";
  }

  if (slug === "gel-nail-services-singapore-meow-aesthetics") {
    return "/nails";
  }

  if (slug === "lash-extensions-lash-lift-singapore-meow-aesthetics") {
    return "/lashes";
  }

  if (
    slug ===
    "facial-treatments-singapore-bojin-hydrafacial-more-meow-aesthetics"
  ) {
    return "/facial";
  }

  return `/${slug}`;
};

export type LocationContent = {
  slug: "marine-parade" | "woods-square" | "punggol";
  isPhysicalLocation?: boolean;
  name: string;
  shortName: string;
  title: string;
  description: string;
  address: string;
  locality: string;
  region: string;
  postalCode?: string;
  openingHours: string[];
  mapUrl: string;
  mapEmbedUrl?: string;
  imageUrl: string;
  heroTitle: string;
  heroIntro: string;
  bookingMessage?: string;
  serviceHighlights: string[];
  nearbyAreas: string[];
  serviceMenuIntro?: string;
  serviceMenuGroups?: Array<{
    title: string;
    items: Array<{ name: string; price: string }>;
  }>;
  travelRoutes?: Array<{
    title: string;
    summary: string;
    href: string;
  }>;
  photoGallery?: Array<{
    title: string;
    image: string;
  }>;
  faq: Array<{ question: string; answer: string }>;
};

export const homepageIntro = [
  "Located at Marine Parade Central and Woods Square, Meow Aesthetics is a Singapore beauty destination for gel nails, facials, lash treatments, and personalised skin services. Clients visit us for long-lasting gel manicures, Bojin Meridian facials, hydrating facial treatments, lash lifts, lash extensions, and polished service in a welcoming studio environment.",
  "We regularly welcome clients from Marine Parade, Bedok, Tampines, and the east side of Singapore, and we also serve customers travelling from Punggol and other parts of the island. From unlimited nail art and chrome finishes to acne-friendly facials and lash styling, every appointment is designed to feel personal, polished, and easy to book through the Le Meow app.",
];

export const sharedFaq = [
  {
    question: "Where is Meow Aesthetics located?",
    answer:
      "Meow Aesthetics serves clients from Marine Parade Central and Woods Square in Singapore. Marine Parade appointments are available daily from 11:30am to 7pm, with late-night appointments available.",
  },
  {
    question: "What is a Bojin Meridian Facial?",
    answer:
      "A Bojin Meridian Facial uses a specialised tool to stimulate meridian points on the face and neck, helping to relieve facial tension, support lymphatic drainage, and improve circulation for a fresher, more lifted appearance.",
  },
  {
    question: "Do you accept walk-ins?",
    answer:
      "Walk-ins are welcome subject to availability, but booking ahead through the Le Meow app is recommended if you want your preferred timeslot or a same-day appointment.",
  },
];

export const serviceSeoContent = {
  nails: {
    serviceId: 2,
    metadataTitle:
      "Gel Nails Singapore | Manicure & Pedicure - Meow Aesthetics",
    metadataDescription:
      "Gel manicure, pedicure, extensions & unlimited nail art designs from $88 at Meow Aesthetics Marine Parade & Woods Square. Book your nail appointment today.",
    h1: "Gel Nail Services Singapore - Meow Aesthetics",
    intro:
      "Available at our Marine Parade and Woods Square salons, Meow Aesthetics offers long-lasting gel manicure and pedicure services for clients who want quality, style, and staying power. Our nail menu includes classic gel mani-pedi sessions, structured gel extensions, chrome and cat eye finishes, ombre sets, marble designs, and spa add-ons. Popular with clients from Marine Parade, Bedok, and the east side of Singapore, these services combine careful prep, detailed finishing, and personalised design work without compromising on comfort.",
    sections: [
      {
        heading: "Gel Manicure & Pedicure Marine Parade",
        body: "Our gel nail appointments focus on prep, cuticle care, sealing, and durable colour application so your manicure stays glossy and chip-resistant in Singapore's humid weather.",
      },
      {
        heading: "Nail Extensions Singapore",
        body: "If you want added structure or more room for custom design work, our gel extension services give you a stronger canvas without losing the polished Meow Aesthetics finish.",
      },
      {
        heading: "Nail Art Designs",
        body: "From minimalist looks to chrome, cat eye, ombre, and marble finishes, the team creates personalised designs for short nails, statement sets, and everyday wear.",
      },
    ],
    internalLinks: [
      { href: "/gel-nails-price", label: "View the gel nails price page" },
      { href: "/marine-parade", label: "See our Marine Parade location" },
      { href: "/nail-art-designs", label: "Browse nail art inspiration" },
    ],
  },
  facial: {
    serviceId: 5,
    metadataTitle:
      "Facial Singapore | Bojin, Hydrafacial & Skin Treatments - Meow Aesthetics",
    metadataDescription:
      "Hydrafacial, Bojin Meridian, 24K Gold anti-aging, Vitamin C and deep cleansing facials from $68 at Meow Aesthetics. Two locations in Singapore.",
    h1: "Facial Treatments Singapore - Bojin, Hydrafacial & More",
    intro:
      "Meow Aesthetics offers personalised facial treatments in Singapore for hydration, acne support, brightening, anti-ageing, and relaxation. The menu includes Hydrafacial with Serum, Bojin Meridian Facial, deep cleansing facial treatments, hydration treatments, Vitamin C brightening, and 24K Gold anti-ageing options. Every facial is tailored to your skin goals and carried out in a calm studio setting designed for visible results and repeat visits.",
    sections: [
      {
        heading: "Bojin Meridian Facial Singapore",
        body: "Our Bojin treatment helps reduce facial tension, improve circulation, and support a more sculpted glow for clients who want both relaxation and visible freshness.",
      },
      {
        heading: "Anti-Ageing Facial Treatments",
        body: "For clients focused on firmness, radiance, and smoother-looking skin, the 24K Gold anti-ageing facial and Vitamin C treatments offer a more refined, luminous finish.",
      },
      {
        heading: "Deep Cleansing Facials",
        body: "Deep cleansing, aqua cleansing, and blackhead-focused treatments are ideal for clients dealing with congestion, excess oil, or blemish-prone skin.",
      },
    ],
    internalLinks: [
      { href: "/pricelist", label: "Compare facial prices" },
      {
        href: "/facial-marine-parade",
        label: "Explore the Marine Parade facial page",
      },
      {
        href: "/body-and-skin-treatments",
        label: "See body and skin treatment options",
      },
    ],
  },
  lashes: {
    serviceId: 3,
    metadataTitle: "Lash Extensions & Lash Lift Singapore - Meow Aesthetics",
    metadataDescription:
      "Professional lash extensions and lash lifts at Meow Aesthetics, Marine Parade & Woods Square. Achieve your dream lashes by booking through the Le Meow app.",
    h1: "Lash Extensions & Lash Lift Singapore - Meow Aesthetics",
    intro:
      "Whether you want a clean lash lift, classic lash extensions, or fuller volume sets, Meow Aesthetics offers lash services in Singapore designed around comfort, style, and retention. Clients can explore styles, prices, and treatment durations before booking the look that suits their routine, face shape, and maintenance preference.",
    sections: [
      {
        heading: "Classic To Volume Lash Sets",
        body: "From 1D classic lashes to 8D mega volume, the service menu covers natural enhancement, wispy styling, and dramatic sets for clients who want visible definition.",
      },
      {
        heading: "Lash Lift For Low-Maintenance Results",
        body: "Lash lifts are a strong fit for clients who want a cleaner daily routine, especially if they are comparing lash lift vs lash extension and want a natural look with less upkeep.",
      },
      {
        heading: "Choosing The Right Lash Style",
        body: "Clear service descriptions, practical aftercare guidance, and visible pricing make it easier to choose the right lash treatment with confidence.",
      },
    ],
    internalLinks: [
      { href: "/lash-extensions-singapore", label: "See lash prices" },
      {
        href: "/marine-parade",
        label: "Visit the Marine Parade location page",
      },
      { href: "/contact", label: "Book your lash appointment" },
    ],
  },
  "body-and-skin-treatments": {
    serviceId: 4,
    metadataTitle: "Body & Skin Treatments Singapore - Meow Aesthetics",
    metadataDescription:
      "Professional body and skin treatments at Meow Aesthetics. Personalised solutions for your skin goals. Marine Parade & Woods Square, Singapore.",
    h1: "Body & Skin Treatments Singapore - Meow Aesthetics",
    intro:
      "Meow Aesthetics offers body and skin treatment options for clients looking for personalised support beyond nails, lashes, and facials. Services may include IPL-focused care, slimming support, and treatment plans tailored during consultation so you can choose the option that best fits your goals and comfort level.",
    sections: [
      {
        heading: "IPL Hair Removal Singapore",
        body: "IPL treatments are suitable for clients looking for a smoother, lower-maintenance routine with guidance tailored to their skin and hair profile.",
      },
      {
        heading: "Slimming Treatment Singapore",
        body: "For body contouring and slimming support, consultations help match each client with a treatment approach that feels realistic, comfortable, and personalised.",
      },
      {
        heading: "Personalised Skin Support",
        body: "This service category complements facial care and gives clients another way to build a more complete beauty and skin routine with the team.",
      },
    ],
    internalLinks: [
      {
        href: "/facial",
        label: "Compare with our facial treatments",
      },
      { href: "/contact", label: "Ask about current treatment availability" },
      { href: "/pricelist", label: "Review the visible service pricing" },
    ],
  },
} as const;

export const locationPages: LocationContent[] = [
  {
    slug: "marine-parade",
    isPhysicalLocation: true,
    name: "Meow Aesthetics Marine Parade",
    shortName: "Marine Parade",
    title:
      "Nail Salon Marine Parade | Facial & Lash Treatments - Meow Aesthetics",
    description:
      "Visit Meow Aesthetics Marine Parade for gel nails, facials, lash treatments, pricing, opening hours, and Le Meow app booking details.",
    address: "86 Marine Parade Central #03-202B",
    locality: "Singapore",
    region: "SG",
    postalCode: "440086",
    openingHours: ["Mo-Su 11:30-19:00"],
    mapUrl:
      "https://maps.google.com/?q=86+Marine+Parade+Central+03-202B+Singapore+440086",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=86%20Marine%20Parade%20Central%20%2303-202B%20Singapore%20440086&z=15&output=embed",
    imageUrl:
      "https://admin-panel.meowaesthetics.com/storage/locations/image/WNnQBBFFG3up2JqgZmWJ70W8RUolrQGwN0skcEuG.jpg",
    heroTitle:
      "Nail Salon Marine Parade With Facials, Lashes & Late Appointments",
    heroIntro:
      "Visit Meow Aesthetics in Marine Parade for gel nails, facials, lash treatments, and flexible appointment options in a polished, welcoming setting. This location is especially convenient for clients in Marine Parade, Katong, Bedok, and the wider east side of Singapore.",
    serviceHighlights: [
      "Gel manicure and pedicure services from SGD 88",
      "Bojin Meridian Facial, Hydrafacial, deep cleansing and anti-ageing options",
      "Lash lift, classic lash extensions, wispy sets and volume styles",
      "Late-night appointments available at Marine Parade",
    ],
    nearbyAreas: ["Marine Parade", "Katong", "Bedok", "East Coast"],
    faq: [
      {
        question: "Do you offer late-night appointments in Marine Parade?",
        answer:
          "Yes. The Marine Parade location offers late-night appointments by arrangement for clients who need more flexibility after regular hours.",
      },
      {
        question: "What can I book at the Marine Parade outlet?",
        answer:
          "You can book gel nails, nail art, facials, lash lifts, lash extensions, and related beauty treatments. Popular services include gel manicures, Bojin facials, and Hydrafacial sessions.",
      },
    ],
  },
  {
    slug: "woods-square",
    isPhysicalLocation: true,
    name: "Meow Aesthetics Woods Square",
    shortName: "Woods Square",
    title:
      "Beauty Salon Woods Square | Nails, Facials & Lashes - Meow Aesthetics",
    description:
      "Discover Meow Aesthetics Woods Square for gel nails, facials, lash services, and clear booking details for north and northeast Singapore clients.",
    address: "Woods Square Tower 1 #06-80",
    locality: "Singapore",
    region: "SG",
    openingHours: ["Mo-Su 11:30-19:00"],
    mapUrl: "https://maps.google.com/?q=Woods+Square+Tower+1+05-62+Singapore",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Woods%20Square%20Tower%201%20%2305-62%20Singapore&z=15&output=embed",
    imageUrl:
      "https://admin-panel.meowaesthetics.com/storage/services/image/Tr9RZQLjAtkB37WVnJs8ED54rzOBO0rsYGiDzelX.jpg",
    heroTitle:
      "Beauty Services Near Woods Square With Clear Pricing And Booking",
    heroIntro:
      "Visit Meow Aesthetics near Woods Square for nails, facials, and lash appointments in a setting that feels calm, convenient, and easy to work into your schedule. This location suits clients living, working, or commuting through Woodlands and the north of Singapore.",
    serviceHighlights: [
      "Convenient booking for Woods Square and Woodlands clients",
      "Transparent pricing for nails, facials, and lash services",
      "Suitable for weekday and after-work appointments",
      "Le Meow app booking for same-day appointment enquiries",
    ],
    nearbyAreas: ["Woods Square", "Woodlands", "Admiralty", "North Singapore"],
    faq: [
      {
        question: "Is Woods Square good for after-work appointments?",
        answer:
          "Yes. Woods Square is convenient for weekday and after-work bookings, especially for clients coming from Woodlands and surrounding north-side areas.",
      },
      {
        question: "Which services are most popular at Woods Square?",
        answer:
          "Gel nails, facials, lash lifts, and lash extensions are all popular choices at Woods Square, and you can review prices before booking.",
      },
    ],
  },
  {
    slug: "punggol",
    isPhysicalLocation: false,
    name: "Meow Aesthetics Punggol Service Area",
    shortName: "Punggol",
    title:
      "Nail Salon & Beauty Services Near Punggol | Meow Aesthetics Singapore",
    description:
      "Serving Punggol clients with gel nails, facials, lash treatments, pricing, route details, FAQs, and Le Meow app booking from Meow Aesthetics Singapore.",
    address: "Serving Punggol clients from Marine Parade and Woods Square",
    locality: "Singapore",
    region: "SG",
    openingHours: ["Mo-Su 11:30-19:00"],
    mapUrl: "https://maps.google.com/?q=Punggol+MRT+Singapore",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Punggol%20MRT%20Singapore&z=13&output=embed",
    imageUrl:
      "https://admin-panel.meowaesthetics.com/storage/services/image/z1OXqMFaMoxotXnry2vumrnxdHZ3JbTNfxoK2DCJ.jpg",
    heroTitle:
      "Nail Salon & Beauty Services Near Punggol | Meow Aesthetics Singapore",
    heroIntro:
      "Punggol residents can visit Meow Aesthetics for gel nails, facials, lash treatments, and personalised beauty services with a convenient journey to either Marine Parade or Woods Square. If you are based in Punggol and want a salon experience worth the trip, you can compare locations, review prices, and message the team directly before booking.",
    bookingMessage: "Hi, I am based in Punggol and would like to book...",
    serviceHighlights: [
      "Serving clients from Punggol and across Northeast Singapore",
      "Le Meow app booking for Punggol enquiries",
      "Easy route options to Marine Parade and Woods Square",
      "Popular gel nails, facials, and lash treatments in one place",
    ],
    nearbyAreas: ["Punggol", "Sengkang", "Northeast Singapore"],
    serviceMenuIntro:
      "Serving clients from Punggol and across Northeast Singapore, Meow Aesthetics offers a full beauty menu with transparent pricing so you can decide what to book before making the trip.",
    travelRoutes: [
      {
        title: "Punggol MRT to Marine Parade",
        summary:
          "A convenient option for east-side appointments, especially if you want late-night availability at Marine Parade.",
        href: "https://www.google.com/maps/dir/Punggol+MRT/86+Marine+Parade+Central+%2303-202B+Singapore+440086",
      },
      {
        title: "Punggol MRT to Woods Square",
        summary:
          "A practical route for northeast and north-side clients looking for weekday or after-work bookings.",
        href: "https://www.google.com/maps/dir/Punggol+MRT/Woods+Square+Tower+1+%2305-62+Singapore",
      },
    ],
    faq: [
      {
        question: "How far is Meow Aesthetics from Punggol?",
        answer:
          "Meow Aesthetics serves Punggol clients from Marine Parade and Woods Square. Depending on which salon suits your service and schedule best, you can choose the route that feels more convenient before booking.",
      },
      {
        question: "Can I book gel nails or facials if I live in Punggol?",
        answer:
          "Yes. Punggol clients can book gel nails, facials, lash treatments, and other beauty services through the Le Meow app before visiting the location that suits them best.",
      },
    ],
  },
];
