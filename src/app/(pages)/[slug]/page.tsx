import axiosServer from "@/lib/axios";
import ServiceBannerSection from "./sections/ServiceBannerSection";
import ServiceCardsSection from "./sections/ServiceCardsSection";
import ApiError from "@/components/error/ApiError";

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export type ServiceData = {
  id: string;
  title: string;
  description: string;
  slug: string;
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

const getServiceDetailsData = async (id: string) => {
  try {
    const res = await axiosServer.post("/api_service_details_list", { id });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch service details data:", error);
    return null;
  }
};

const page = async ({ searchParams }: Props) => {
  //
  const params = await searchParams;
  const id = params?.id || "";

  //
  const serviceDetailsData = await getServiceDetailsData(id);

  if (!serviceDetailsData) {
    return <ApiError />;
  }

  const service = serviceDetailsData?.data?.find(
    (item: ServiceData) => String(item?.id) === id,
  );

  return (
    <>
      <ServiceBannerSection
        title={service.title}
        description={service.description}
        first_image_url={service.first_image_url}
        center_image_url={service.center_image_url}
        third_image_url={service.third_image_url}
      />
      <ServiceCardsSection serviceDetails={service?.service_details} />
    </>
  );
};

export default page;
