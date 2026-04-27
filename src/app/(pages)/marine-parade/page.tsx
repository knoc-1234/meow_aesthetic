import LocationLandingPage from "@/components/location/LocationLandingPage";
import { createPageMetadata } from "@/lib/seo";
import { locationPages } from "@/lib/site-data";
import {
  getCoreServiceGalleryItems,
  getCoreServiceMenuGroups,
} from "@/lib/service-pricing";

const location = locationPages.find((item) => item.slug === "marine-parade")!;

export const metadata = createPageMetadata({
  title: location.title,
  description: location.description,
  path: "/marine-parade",
});

const page = async () => {
  const [serviceMenuGroups, photoGallery] = await Promise.all([
    getCoreServiceMenuGroups(),
    getCoreServiceGalleryItems(),
  ]);

  return (
    <LocationLandingPage
      location={location}
      serviceMenuGroups={serviceMenuGroups}
      photoGallery={photoGallery}
    />
  );
};

export default page;
