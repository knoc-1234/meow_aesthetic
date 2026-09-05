import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ServicePackageCard from "@/components/services/ServicePackageCard";
import JsonLd from "@/components/seo/JsonLd";
import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";
import { createPageMetadata, createServiceSchema } from "@/lib/seo";
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

          <AppDownloadModalButton
            className="w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-8 py-3 text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black"
          >
            Book Now
          </AppDownloadModalButton>
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
