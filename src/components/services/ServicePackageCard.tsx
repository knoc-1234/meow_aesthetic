import Image from "next/image";

import ServiceActionButtons from "@/components/services/ServiceActionButtons";
import {
  formatSgd,
  getPackageImage,
  type SiteServicePackage,
} from "@/lib/site-services";

type ServicePackageCardProps = {
  servicePackage: SiteServicePackage;
};

const ServicePackageCard = ({ servicePackage }: ServicePackageCardProps) => {
  const details = [
    ...(servicePackage.highlight_details || []),
    ...(servicePackage.included_details || []),
  ].slice(0, 5);

  return (
    <article className="flex min-h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <Image
        quality={75}
        src={getPackageImage(servicePackage)}
        alt={`${servicePackage.name} package`}
        width={700}
        height={520}
        className="h-56 w-full object-cover"
      />
      <div className="flex grow flex-col gap-4 p-5">
        <div className="flex grow flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-xl font-semibold leading-snug">
              {servicePackage.name}
            </h3>
            {servicePackage.badges?.is_top_seller ? (
              <span className="rounded bg-neutral-900 px-2 py-1 text-xs text-white">
                Top seller
              </span>
            ) : null}
          </div>
          <p className="text-sm text-neutral-500">
            {servicePackage.duration_minutes
              ? `${servicePackage.duration_minutes} mins`
              : "Duration on request"}
            {servicePackage.service_mode_name
              ? ` | ${servicePackage.service_mode_name}`
              : ""}
          </p>
          <p className="line-clamp-4 text-sm leading-6 text-neutral-600">
            {servicePackage.description ||
              "Contact Meow Aesthetics for package details."}
          </p>
          {details.length ? (
            <ul className="grid gap-1 text-sm text-neutral-700">
              {details.map((detail) => (
                <li key={detail.id}>- {detail.label}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="mt-auto pt-4 border-t border-neutral-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-neutral-400">Price</p>
            <p className="font-bold text-neutral-900 text-lg">
              {formatSgd(servicePackage.final_price || servicePackage.price)}
            </p>
          </div>
          <ServiceActionButtons size="sm" />
        </div>
      </div>
    </article>
  );
};

export default ServicePackageCard;
