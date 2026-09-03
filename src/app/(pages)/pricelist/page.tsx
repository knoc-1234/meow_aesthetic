import { createPageMetadata, createServiceSchema } from "@/lib/seo";
import ApiError from "@/components/error/ApiError";
import JsonLd from "@/components/seo/JsonLd";
import {
  getAllSitePackages,
  formatSgd,
  serviceBookingHref,
  type SiteServicePackage,
} from "@/lib/site-services";

import DownloadButton from "./DownloadButton";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Service Price List 2026 - Meow Aesthetics Singapore",
  description:
    "View all Meow Aesthetics service prices for 2026: gel nails, facials, lash treatments, body treatments. Marine Parade & Woods Square.",
  path: "/pricelist",
});

const groupPackagesByCategory = (packages: SiteServicePackage[]) => {
  const grouped: Record<string, SiteServicePackage[]> = {};
  packages.forEach((pkg) => {
    const category = pkg.category_name || "Other Services";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(pkg);
  });
  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
};

const page = async () => {
  const packages = await getAllSitePackages();

  if (!packages.length) {
    return <ApiError />;
  }

  const grouped = groupPackagesByCategory(packages);

  const priceSchema = createServiceSchema({
    name: "Meow Aesthetics Service Price List",
    description:
      "Price list for Meow Aesthetics nail, lash, facial, IPL and spa services in Singapore.",
    path: "/pricelist",
    offers: packages.map((pkg) => ({
      name: pkg.name,
      price: pkg.final_price || pkg.price || "",
    })),
  });

  return (
    <main className="bg-[#F7F7F7]">
      <JsonLd data={priceSchema} />
      <section className="w-[90%] max-w-6xl mx-auto py-12 lg:py-16 flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
            Transparent pricing
          </p>
          <h1 className="text-3xl lg:text-5xl font-[--font-playfair]">
            Meow Aesthetics Price List 2026
          </h1>
          <p className="max-w-3xl mx-auto leading-8">
            Review the full Meow Aesthetics price list for all services
            including nails, lashes, facials, IPL, and spa treatments.
          </p>
        </div>

        {grouped.map(([category, categoryPackages]) => (
          <section key={category} className="flex flex-col gap-6">
            <h2 className="text-2xl lg:text-3xl font-[--font-playfair]">
              {category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryPackages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {pkg.duration_minutes
                        ? `${pkg.duration_minutes} mins`
                        : ""}
                      {pkg.service_mode_name
                        ? pkg.duration_minutes
                          ? ` | ${pkg.service_mode_name}`
                          : pkg.service_mode_name
                        : ""}
                    </p>
                  </div>
                  {pkg.description && (
                    <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
                      {pkg.description}
                    </p>
                  )}
                  {pkg.included_details && pkg.included_details.length > 0 && (
                    <ul className="grid gap-1 text-sm text-neutral-700">
                      {pkg.included_details.slice(0, 4).map((detail) => (
                        <li key={detail.id}>- {detail.label}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between gap-3 mt-auto pt-2">
                    <p className="font-semibold">
                      {formatSgd(pkg.final_price || pkg.price)}
                    </p>
                    <a
                      href={serviceBookingHref(pkg.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-5 py-2 text-sm text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black"
                    >
                      Book Now
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <p className="text-sm text-neutral-500 text-center">
          All prices are in SGD. Prices valid for 2026.
        </p>
      </section>
      <div className="flex items-center justify-center w-full my-10">
        <DownloadButton />
      </div>
    </main>
  );
};

export default page;
