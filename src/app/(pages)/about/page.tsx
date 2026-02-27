import OurCommitment from "./sections/OurCommitment";
import AboutSection from "./sections/AboutSection";
import OurMottoSection from "./sections/OurMottoSection";
import axiosServer from "@/lib/axios";
import ApiError from "@/components/error/ApiError";

export const revalidate = 60;

export type AboutUsData = {
  id: number;
  type: string;
  big_image_url: string;
  title: string;
  description: string;
  small_image_url: string;
};

export type MotoAndValuesData = {
  id: number;
  type: string;
  title: string;
  description: string;
  small_image_url: string;
};

export type OurCommitmentData = {
  type: string;
  big_image_url: string;
  title: string;
  description: string;
};

const getAboutUsData = async () => {
  try {
    const res = await axiosServer.get("/api_about_us");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch about us data:", error);
    return null;
  }
};

const About = async () => {
  //
  const aboutUsData = await getAboutUsData();

  if (!aboutUsData) {
    return <ApiError />;
  }

  // Filter based on type
  const aboutUs = aboutUsData?.data.find(
    (item: AboutUsData) => item.type === "About Us",
  );

  const motoAndValues = aboutUsData?.data.filter(
    (item: MotoAndValuesData) => item.type === "Moto and Values",
  );

  const ourCommitment = aboutUsData?.data.find(
    (item: OurCommitmentData) => item.type === "Commitment",
  );

  return (
    <>
      <AboutSection data={aboutUs} />
      <OurMottoSection data={motoAndValues} />
      <OurCommitment data={ourCommitment} />
    </>
  );
};

export default About;
