import Image from "next/image";
import reviewbg from "@/../public/assets/homeReviewBg.png";
import Link from "next/link";
import ApiError from "@/components/error/ApiError";
import SiteServiceCard from "@/components/services/SiteServiceCard";
import { getSiteServices } from "@/lib/site-services";

const OurServicesSection = async () => {
  const services = await getSiteServices();

  if (!services) {
    return <ApiError />;
  }

  const featuredServices = services.slice(0, 4);

  return (
    <section className="relative w-full py-14">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          quality={75}
          src={reviewbg}
          alt="review-bg"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>

      <div className="relative mx-auto flex w-full sm:max-w-[75%] flex-col gap-8 px-5 lg:gap-10">
        <h2 className="text-4xl lg:text-5xl text-center py-5 font-[--font-playfair]">
          Our Services
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <SiteServiceCard key={service.id} service={service} />
          ))}
        </div>

        <Link
          href="/services"
          className="mx-auto border border-black px-8 py-3 text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white"
        >
          More Services
        </Link>
      </div>
    </section>
  );
};

export default OurServicesSection;
