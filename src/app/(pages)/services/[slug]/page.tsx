import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ServicePackageCard from "@/components/services/ServicePackageCard";
import JsonLd from "@/components/seo/JsonLd";
import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";
import { createPageMetadata, createServiceSchema } from "@/lib/seo";
import { whatsappUrl } from "@/lib/site-data";
import {
  formatSgd,
  getServiceImage,
  getSiteServiceBySlug,
  getSiteServicePackages,
} from "@/lib/site-services";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getSiteServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Service | Meow Aesthetics Singapore",
      description:
        "Explore Meow Aesthetics services and packages in Singapore.",
      path: `/services/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${service.name} | Meow Aesthetics Singapore`,
    description:
      service.description ||
      `Book ${service.name} at Meow Aesthetics Singapore through the Le Meow app.`,
    path: `/services/${service.slug}`,
  });
}

const ServiceDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const service = await getSiteServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const packages = await getSiteServicePackages(service.id);
  const description =
    service.description || "Explore this Meow Aesthetics service.";

  return (
    <main className="bg-white">
      <JsonLd
        data={createServiceSchema({
          name: service.name,
          description,
          path: `/services/${service.slug}`,
          offers: packages.map((item) => ({
            name: item.name,
            price: item.final_price || item.price || "",
          })),
        })}
      />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg lg:min-h-[520px]">
          <Image
            priority
            quality={80}
            src={getServiceImage(service)}
            alt={`${service.name} at Meow Aesthetics`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-neutral-500">
              {service.category_name || "Meow Aesthetics"}
            </p>
            <h1 className="mt-3 font-[--font-playfair] text-4xl leading-tight lg:text-6xl">
              {service.name}
            </h1>
          </div>

          <p className="leading-7 text-neutral-700">{description}</p>

          <div className="grid gap-4 border-y border-neutral-200 py-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">Price from</p>
              <p className="font-semibold">{formatSgd(service.price_from)}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Category</p>
              <p className="font-semibold">
                {service.sub_category_name || service.category_name || "Beauty"}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Rating</p>
              <p className="font-semibold">
                {service.avg_rating ? `${service.avg_rating}/5` : "New service"}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Advance booking</p>
              <p className="font-semibold">
                {service.booking_before_hours
                  ? `${service.booking_before_hours} hours`
                  : "Contact to confirm"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-8 py-3 text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black inline-flex items-center gap-2"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <AppDownloadModalButton
              className="w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-8 py-3 text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black"
            >
              Book Now
            </AppDownloadModalButton>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-16">
          <div>
            <h2 className="font-[--font-playfair] text-3xl lg:text-5xl">
              Packages
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
              Choose a package for {service.name} and book through the Le Meow
              app.
            </p>
          </div>

          {packages.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((servicePackage) => (
                <ServicePackageCard
                  key={servicePackage.id}
                  servicePackage={servicePackage}
                />
              ))}
            </div>
          ) : (
            <p className="text-neutral-600">
              No packages are available for this service right now.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;
