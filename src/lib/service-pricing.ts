import { cache } from "react";
import axiosServer from "./axios";

export type ServiceMenuItem = {
  name: string;
  price: string;
};

export type ServiceGalleryItem = {
  title: string;
  image: string;
};

export type ServiceMenuGroup = {
  title: string;
  items: ServiceMenuItem[];
};

export type ServiceDetailCard = {
  title: string;
  subtitle?: string | null;
  description: string;
  duration: string;
  price: string;
  image_url: string;
};

export type ServiceCategoryData = {
  id: number;
  title: string;
  subtitle?: string | null;
  description: string;
  slug: string;
  first_image_url: string;
  center_image_url: string;
  third_image_url: string;
  banner_image_url?: string;
  service_details: ServiceDetailCard[];
};

type ServiceDetailResponse = {
  success: boolean;
  data: ServiceCategoryData[];
};

const getServicePriceData = cache(async (
  id: string,
): Promise<ServiceDetailResponse | null> => {
  try {
    const res = await axiosServer.post("/api_service_details_list", { id });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch service price data:", error);
    return null;
  }
});

export const getServiceCategoryData = cache(async (
  id: string,
): Promise<ServiceCategoryData | null> => {
  const data = await getServicePriceData(id);
  return data?.data?.[0] || null;
});

export const getCoreServiceMenuGroups = cache(async (): Promise<ServiceMenuGroup[]> => {
  const [nailsData, lashesData, facialData] = await Promise.all([
    getServicePriceData("2"),
    getServicePriceData("3"),
    getServicePriceData("5"),
  ]);

  return [
    {
      title: "Nail Services",
      items:
        nailsData?.data?.[0]?.service_details?.map((item) => ({
          name: item.title,
          price: `SGD ${item.price}`,
        })) || [],
    },
    {
      title: "Facial Treatments",
      items:
        facialData?.data?.[0]?.service_details?.map((item) => ({
          name: item.title,
          price: `SGD ${item.price}`,
        })) || [],
    },
    {
      title: "Lash Treatments",
      items:
        lashesData?.data?.[0]?.service_details?.map((item) => ({
          name: item.title,
          price: `SGD ${item.price}`,
        })) || [],
    },
  ];
});

export const getCoreServiceGalleryItems = cache(async (): Promise<ServiceGalleryItem[]> => {
  const [nails, lashes, facial] = await Promise.all([
    getServiceCategoryData("2"),
    getServiceCategoryData("3"),
    getServiceCategoryData("5"),
  ]);

  return [nails, lashes, facial]
    .filter(Boolean)
    .flatMap((service) =>
      service!.service_details.slice(0, 3).map((item) => ({
        title: item.title,
        image: item.image_url,
      })),
    );
});
