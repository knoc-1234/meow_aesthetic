import SiteServiceCard from "@/components/services/SiteServiceCard";
import ApiError from "@/components/error/ApiError";
import { createPageMetadata } from "@/lib/seo";
import { getSiteServices } from "@/lib/site-services";

export const revalidate = 60;

export const metadata = createPageMetadata({
  title: "Services | Meow Aesthetics Singapore",
  description:
    "Explore all Meow Aesthetics services in Singapore, including nails, lashes, facials, body treatments, spa treatments and book through the Le Meow app.",
  path: "/services",
});

const ServicesPage = async () => {
  const services = await getSiteServices(); 
  if (!services) {
    return <ApiError />;
  }

  return (
    <main className="bg-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-[--font-playfair] text-4xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-5 leading-7 text-neutral-600">
            Browse Meow Aesthetics services and book your preferred treatment
            through the Le Meow app.
          </p>
        </div>

        {services.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <SiteServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-600">
            No services are available right now.
          </p>
        )}
      </section>
    </main>
  );
};

export default ServicesPage;
