import { cache } from "react";
import axiosServer from "./axios";
import { locationPages } from "./site-data";

export type LocationItem = {
  title: string;
  address: string;
  mon_to_fri_time: string;
  image_url: string;
};

type LocationApiResponse = {
  success: boolean;
  data: LocationItem[];
};

const fallbackLocations: LocationItem[] = locationPages
  .filter((location) => location.isPhysicalLocation !== false)
  .map((location) => ({
    title: location.shortName,
    address: location.address,
    mon_to_fri_time: "11:30am to 7pm",
    image_url: location.imageUrl,
  }));

export const getLocationData = cache(async (): Promise<LocationApiResponse | null> => {
  try {
    const res = await axiosServer.get("/api_location_list");
    if (res.data?.data?.length) {
      return res.data;
    }
  } catch (error) {
    console.error("Failed to fetch location data:", error);
  }

  return {
    success: true,
    data: fallbackLocations,
  };
});
