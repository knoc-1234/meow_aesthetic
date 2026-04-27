import type { Metadata } from "next";
import {
  businessName,
  businessPhone,
  locationPages,
  siteUrl,
} from "./site-data";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export const absoluteUrl = (path = "/") =>
  new URL(path, siteUrl).toString();

export const createPageMetadata = ({
  title,
  description,
  path = "/",
}: MetadataInput): Metadata => ({
  title,
  description,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    siteName: businessName,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
});

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: businessName,
  url: siteUrl,
  telephone: businessPhone,
  areaServed: "Singapore",
  sameAs: [
    "https://www.instagram.com/meowaesthetics_sg/",
    "https://www.tiktok.com/@meowaesthetics_sg",
    "https://www.facebook.com/",
  ],
});

export const createLocationSchema = (slug: string) => {
  const location = locationPages.find((item) => item.slug === slug);

  if (!location) {
    return null;
  }

  if (location.isPhysicalLocation === false) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautySalon", "NailSalon"],
    name: location.name,
    url: absoluteUrl(`/${location.slug}`),
    telephone: businessPhone,
    priceRange: "$$",
    image: location.imageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: "SG",
    },
    openingHours: location.openingHours,
    areaServed: location.nearbyAreas,
    sameAs: createOrganizationSchema().sameAs,
  };
};

export const createServiceSchema = ({
  name,
  description,
  path,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  offers: Array<{ name: string; price: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  name,
  description,
  url: absoluteUrl(path),
  provider: {
    "@type": "BeautySalon",
    name: businessName,
    telephone: businessPhone,
    areaServed: "Singapore",
  },
  areaServed: "Singapore",
  offers: offers.map((offer) => ({
    "@type": "Offer",
    name: offer.name,
    price: offer.price,
    priceCurrency: "SGD",
  })),
});

export const createFaqSchema = (
  items: Array<{ question: string; answer: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
