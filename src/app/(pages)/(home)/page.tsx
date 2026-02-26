import ShopWithUs from "./sections/ShopWithUs";
import LocationSection from "./sections/LocationSection";
import ReviewSection from "./sections/ReviewSection";
import FollowUsSection from "./sections/FollowUsSection";
import OurServicesSection from "./sections/OurServicesSection";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import axiosServer from "@/lib/axios";
import ApiError from "@/components/error/ApiError";

export const dynamic = "force-dynamic";

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
