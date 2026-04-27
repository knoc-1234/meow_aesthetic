import { createOrganizationSchema, createPageMetadata } from "@/lib/seo";
import ApiError from "@/components/error/ApiError";
import axiosServer from "@/lib/axios";
import JsonLd from "@/components/seo/JsonLd";

import AboutSection from "./sections/AboutSection";
import FollowUsSection from "./sections/FollowUsSection";
import HeroSection from "./sections/HeroSection";
import LocationSection from "./sections/LocationSection";
import OurServicesSection from "./sections/OurServicesSection";
import ReviewSection from "./sections/ReviewSection";
import ShopWithUs from "./sections/ShopWithUs";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Meow Aesthetics | Nail Salon, Facial & Lash Treatment Singapore",
  description:
    "Meow Aesthetics offers gel nails, lash extensions, facials and skin treatments in Marine Parade and Woods Square. Book via WhatsApp today. Open daily 11:30am-7pm.",
});

const getHeroData = async () => {
  try {
    const res = await axiosServer.get("/api_hero_section_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch hero data:", error);
    return null;
  }
};

const Home = async () => {
  //
  const heroData = await getHeroData();

  if (!heroData) {
    return <ApiError />;
  }

  const data = heroData?.data[0];

  return (
    <main>
      <JsonLd data={createOrganizationSchema()} />
      <HeroSection
        desktopUrl={data?.background_image_url}
        mobileUrl={data?.mobile_video_url}
      />
      <AboutSection data={data} />
      <OurServicesSection />
      <ShopWithUs />
      <LocationSection />
      <ReviewSection />
      <FollowUsSection />
    </main>
  );
};

export default Home;
