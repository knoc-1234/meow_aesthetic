import Image from "next/image";

import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">
            {formatSgd(servicePackage.final_price || servicePackage.price)}
          </p>
          <AppDownloadModalButton
            className="border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-5 py-2 text-sm text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black"
          >
            Book Now
          </AppDownloadModalButton>
        </div>
      </div>
    </article>
  );
};

export default ServicePackageCard;
