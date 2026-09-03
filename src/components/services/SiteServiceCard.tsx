import Image from "next/image";
import Link from "next/link";

import {
  formatSgd,
  getServiceImage,
  type SiteService,
} from "@/lib/site-services";

type SiteServiceCardProps = {
  service: SiteService;
};

const SiteServiceCard = ({ service }: SiteServiceCardProps) => {
  return (
    <article className="flex min-h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <Link href={`/services/${service.slug}`} className="block">
        <Image
          quality={75}
          src={getServiceImage(service)}
          alt={`${service.name} at Meow Aesthetics`}
          width={700}
          height={520}
          className="h-64 w-full object-cover"
        />
      </Link>
      <div className="flex grow flex-col gap-4 p-5">
        <div className="flex grow flex-col gap-2">
          <p className="text-sm text-neutral-500">
            {service.category_name || "Service"}
          </p>
          <Link href={`/services/${service.slug}`}>
            <h3 className="text-xl font-semibold leading-snug">
              {service.name}
            </h3>
          </Link>
          <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
            {service.description || "Explore this Meow Aesthetics service."}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">
            From {formatSgd(service.price_from)}
          </p>
          <Link
            href={`/services/${service.slug}`}
            className="border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-5 py-2 text-sm text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SiteServiceCard;
