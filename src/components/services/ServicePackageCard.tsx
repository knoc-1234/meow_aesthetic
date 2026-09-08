import Image from "next/image";

import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";
import { whatsappUrl } from "@/lib/site-data";
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
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-5 py-2 text-sm text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black inline-flex items-center gap-2"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <AppDownloadModalButton
              className="border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-5 py-2 text-sm text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black"
            >
              Book Now
            </AppDownloadModalButton>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServicePackageCard;
