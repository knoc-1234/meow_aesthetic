import Image from "next/image";
import Link from "next/link";
import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";
import JsonLd from "@/components/seo/JsonLd";
import { createFaqSchema, createLocationSchema } from "@/lib/seo";
import { LocationContent, businessPhone } from "@/lib/site-data";
import { ServiceGalleryItem, ServiceMenuGroup } from "@/lib/service-pricing";

type LocationLandingPageProps = {
  location: LocationContent;
  serviceMenuGroups?: ServiceMenuGroup[];
  photoGallery?: ServiceGalleryItem[];
};

const LocationLandingPage = ({
  location,
  serviceMenuGroups,
  photoGallery,
}: LocationLandingPageProps) => {
  const schema = createLocationSchema(location.slug);
  const menuGroups = serviceMenuGroups || location.serviceMenuGroups;
  const galleryItems = photoGallery || location.photoGallery;
  const isPhysicalLocation = location.isPhysicalLocation !== false;

  return (
    <main className="bg-[#F7F7F7]">
      {schema ? <JsonLd data={schema} /> : null}
      <JsonLd data={createFaqSchema(location.faq)} />

      <section className="w-[90%] max-w-6xl mx-auto py-12 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div className="flex flex-col gap-5">
          <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
            {isPhysicalLocation ? "Our location" : "Service area"}
          </p>
          <h1 className="text-4xl lg:text-6xl font-[--font-playfair] leading-tight">
            {location.heroTitle}
          </h1>
          <p className="text-base lg:text-lg leading-8">{location.heroIntro}</p>
          <div className="flex flex-wrap gap-3">
            <AppDownloadModalButton
              className="bg-black text-white px-6 py-3 rounded-full"
            >
              Book on Le Meow
            </AppDownloadModalButton>
            <Link
              href={location.mapUrl}
              target="_blank"
              className="border border-black px-6 py-3 rounded-full"
            >
              Open map
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] rounded-[2rem] overflow-hidden">
          <Image
            src={location.imageUrl}
            alt={location.name}
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="w-[90%] max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 pb-12">
        <article className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-4">
          <h2 className="text-2xl font-[--font-playfair]">
            {isPhysicalLocation
              ? `Visit ${location.shortName}`
              : `Booking From ${location.shortName}`}
          </h2>
          <p>{location.address}</p>
          <p>Open daily 11:30am to 7pm</p>
          <p>Call or WhatsApp: {businessPhone}</p>
          <Link href="/pricelist" className="underline underline-offset-4">
            View prices before you book
          </Link>
        </article>

        <article className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-4">
          <h2 className="text-2xl font-[--font-playfair]">
            Best for nearby areas
          </h2>
          <ul className="list-disc list-inside flex flex-col gap-2">
            {location.nearbyAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="w-[90%] max-w-6xl mx-auto pb-12">
        <div className="grid lg:grid-cols-2 gap-6">
          <article className="bg-white rounded-3xl p-6 border border-neutral-200">
            <h2 className="text-2xl font-[--font-playfair] mb-4">
              Services clients book here
            </h2>
            <ul className="list-disc list-inside flex flex-col gap-3">
              {location.serviceHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="bg-white rounded-3xl p-6 border border-neutral-200">
            <h2 className="text-2xl font-[--font-playfair] mb-4">
              Useful links
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/nails"
                className="border border-black px-5 py-3 rounded-full"
              >
                Nail services
              </Link>
              <Link
                href="/facial"
                className="border border-black px-5 py-3 rounded-full"
              >
                Facial treatments
              </Link>
              <Link
                href="/lashes"
                className="border border-black px-5 py-3 rounded-full"
              >
                Lash treatments
              </Link>
              <Link
                href="/contact"
                className="border border-black px-5 py-3 rounded-full"
              >
                Contact and booking
              </Link>
            </div>
          </article>
        </div>
      </section>

      {location.travelRoutes?.length ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-12">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-5">
            <h2 className="text-2xl font-[--font-playfair]">
              Travel Routes From Punggol MRT
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {location.travelRoutes.map((route) => (
                <article
                  key={route.title}
                  className="border border-neutral-200 rounded-3xl p-5 flex flex-col gap-3"
                >
                  <h3 className="text-xl font-[--font-playfair]">
                    {route.title}
                  </h3>
                  <p className="text-neutral-700 leading-7">{route.summary}</p>
                  <Link
                    href={route.href}
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    Open Google Maps route
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {menuGroups?.length ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-12">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-5">
            <h2 className="text-2xl font-[--font-playfair]">
              Full Service Menu With Pricing
            </h2>
            {location.serviceMenuIntro ? (
              <p className="text-neutral-700 leading-7">
                {location.serviceMenuIntro}
              </p>
            ) : null}
            <div className="grid lg:grid-cols-3 gap-6">
              {menuGroups.map((group) => (
                <section
                  key={group.title}
                  className="border border-neutral-200 rounded-3xl p-5"
                >
                  <h3 className="text-xl font-[--font-playfair] mb-4">
                    {group.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-start justify-between gap-4 border-b border-dashed border-neutral-200 pb-3"
                      >
                        <span>{item.name}</span>
                        <span className="font-medium whitespace-nowrap">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {location.mapEmbedUrl ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-12">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-5">
            <h2 className="text-2xl font-[--font-playfair]">
              Find {location.shortName}
            </h2>
            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              <iframe
                src={location.mapEmbedUrl}
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      ) : null}

      {galleryItems?.length ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-12">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-5">
            <h2 className="text-2xl font-[--font-playfair]">
              Recent Work & Service Photos
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <article
                  key={item.title}
                  className="bg-neutral-50 border border-neutral-200 rounded-3xl overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="w-[90%] max-w-6xl mx-auto pb-16">
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col gap-5">
          <h2 className="text-2xl font-[--font-playfair]">
            Frequently asked questions
          </h2>
          {location.faq.map((item) => (
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

export default LocationLandingPage;
