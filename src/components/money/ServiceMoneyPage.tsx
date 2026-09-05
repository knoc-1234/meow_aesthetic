import Image from "next/image";
import Link from "next/link";
import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";
import JsonLd from "@/components/seo/JsonLd";
import { createFaqSchema, createServiceSchema } from "@/lib/seo";
import {
  ServiceDetailCard,
  ServiceGalleryItem,
} from "@/lib/service-pricing";

type ServiceMoneyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  path: string;
  schemaDescription: string;
  ctaLabel: string;
  secondaryLinks: Array<{ href: string; label: string }>;
  services: ServiceDetailCard[];
  galleryTitle: string;
  galleryItems: ServiceGalleryItem[];
  faqs: Array<{ question: string; answer: string }>;
  locationCardTitle: string;
  locationCardBody: string;
  locationCardLinks: Array<{ href: string; label: string }>;
  mapTitle?: string;
  mapEmbedUrl?: string;
};

const ServiceMoneyPage = ({
  eyebrow,
  title,
  intro,
  path,
  schemaDescription,
  ctaLabel,
  secondaryLinks,
  services,
  galleryTitle,
  galleryItems,
  faqs,
  locationCardTitle,
  locationCardBody,
  locationCardLinks,
  mapTitle,
  mapEmbedUrl,
}: ServiceMoneyPageProps) => {
  return (
    <main className="bg-[#F7F7F7]">
      <JsonLd
        data={createServiceSchema({
          name: title,
          description: schemaDescription,
          path,
          offers: services.map((service) => ({
            name: service.title,
            price: service.price,
          })),
        })}
      />
      <JsonLd data={createFaqSchema(faqs)} />

      <section className="w-[90%] max-w-6xl mx-auto py-12 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div className="flex flex-col gap-5">
          <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
            {eyebrow}
          </p>
          <h1 className="text-4xl lg:text-6xl font-[--font-playfair] leading-tight">
            {title}
          </h1>
          <p className="text-base lg:text-lg leading-8">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <AppDownloadModalButton
              className="bg-black text-white px-6 py-3 rounded-full"
            >
              {ctaLabel}
            </AppDownloadModalButton>
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-black px-6 py-3 rounded-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {galleryItems.slice(0, 4).map((item) => (
            <article
              key={item.title}
              className="relative min-h-[180px] rounded-[1.75rem] overflow-hidden bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="w-[90%] max-w-6xl mx-auto pb-12">
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-8 flex flex-col gap-6">
          <h2 className="text-2xl lg:text-3xl font-[--font-playfair]">
            Prices & Treatments
          </h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="border border-neutral-200 rounded-3xl p-5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-[--font-playfair]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {service.duration}
                    </p>
                  </div>
                  <p className="font-semibold whitespace-nowrap">
                    SGD {service.price}
                  </p>
                </div>
                <p className="leading-7 text-neutral-700 whitespace-pre-line">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-[90%] max-w-6xl mx-auto pb-12 grid lg:grid-cols-2 gap-6">
        <article className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-[--font-playfair]">
            {locationCardTitle}
          </h2>
          <p className="leading-7 text-neutral-700">{locationCardBody}</p>
          <div className="flex flex-wrap gap-3">
            {locationCardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-black px-5 py-3 rounded-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </article>

        <article className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-[--font-playfair]">{galleryTitle}</h2>
          <div className="grid grid-cols-2 gap-4">
            {galleryItems.slice(0, 4).map((item) => (
              <div
                key={item.title}
                className="relative min-h-[180px] rounded-3xl overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </article>
      </section>

      {mapEmbedUrl ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-12">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-5">
            <h2 className="text-2xl font-[--font-playfair]">
              {mapTitle || "Location"}
            </h2>
            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="w-[90%] max-w-6xl mx-auto pb-16">
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-5">
          <h2 className="text-2xl font-[--font-playfair]">
            Frequently Asked Questions
          </h2>
          {faqs.map((item) => (
            <article
              key={item.question}
              className="border-b border-neutral-200 pb-4"
            >
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-neutral-700 leading-7">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServiceMoneyPage;
