import type { Metadata } from "next";

import { createPageMetadata, createServiceSchema } from "@/lib/seo";
import { serviceSeoContent } from "@/lib/site-data";
import ApiError from "@/components/error/ApiError";
import axiosServer from "@/lib/axios";
import JsonLd from "@/components/seo/JsonLd";

import ServiceBannerSection from "./sections/ServiceBannerSection";
import ServiceCardsSection from "./sections/ServiceCardsSection";
// import ServiceSeoContent from "./sections/ServiceSeoContent";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
};

export type ServiceData = {
  id: string;
  title: string;
  description: string;
  slug: string;
  subtitle?: string;
  first_image_url: string;
  center_image_url: string;
  third_image_url: string;
  service_details: {
    title: string;
    description: string;
    image_url: string;
    duration: string;
    price: string;
  }[];
};

const getServiceDetailsData = async (
  id: string,
): Promise<{ data: ServiceData[] } | null> => {
  try {
    const res = await axiosServer.post("/api_service_details_list", { id });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch service details data:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = serviceSeoContent[slug as keyof typeof serviceSeoContent];

  if (!seo) {
    return createPageMetadata({
      title: "Services | Meow Aesthetics Singapore",
      description:
        "Explore beauty services from Meow Aesthetics in Singapore, including nails, facials, lashes and skin treatments.",
      path: `/${slug}`,
    });
  }

  return createPageMetadata({
    title: seo.metadataTitle,
    description: seo.metadataDescription,
    path: `/${slug}`,
  });
}

const page = async ({ params, searchParams }: Props) => {
  //
  const route = await params;
  const seo = serviceSeoContent[route.slug as keyof typeof serviceSeoContent];
  const query = await searchParams;
  const id = query?.id || String(seo?.serviceId || "");

  //
  const serviceDetailsData = await getServiceDetailsData(id);

  if (!serviceDetailsData) {
    return <ApiError />;
  }

  const service = serviceDetailsData?.data?.find(
    (item: ServiceData) => String(item?.id) === id,
  );

  if (!service) {
    return <ApiError />;
  }

  const heading = service.title || seo?.h1;
  const subHeading = service.subtitle;
  const description = service.description || seo?.intro;
  const offers =
    service?.service_details?.map((item) => ({
      name: item.title,
      price: item.price,
    })) || [];

  return (
    <>
      {seo ? (
        <JsonLd
          data={createServiceSchema({
            name: heading,
            description,
            path: `/${route.slug}`,
            offers,
          })}
        />
      ) : null}
      <ServiceBannerSection
        title={heading}
        subtitle={subHeading}
        description={description}
        first_image_url={service.first_image_url}
        center_image_url={service.center_image_url}
        third_image_url={service.third_image_url}
      />
      {/* {seo ? (
        <ServiceSeoContent
          sections={seo.sections}
          internalLinks={seo.internalLinks}
        />
      ) : null} */}
      <ServiceCardsSection serviceDetails={service?.service_details} />
    </>
  );
};

export default page;
