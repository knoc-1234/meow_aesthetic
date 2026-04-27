import axiosServer from "@/lib/axios";
import FaqSection from "./sections/FaqSection";
import ApiError from "@/components/error/ApiError";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { createFaqSchema, createPageMetadata } from "@/lib/seo";
import { sharedFaq } from "@/lib/site-data";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "FAQ | Meow Aesthetics Singapore",
  description:
    "Read FAQs about Meow Aesthetics services, locations, bookings, first-time visits, and treatment information for Singapore clients.",
  path: "/faqs",
});

const getFaqData = async () => {
  try {
    const res = await axiosServer.get("/api_faq_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch faqs data:", error);
    return null;
  }
};

const Page = async () => {
  //
  const faqData = await getFaqData();

  if (!faqData) {
    return <ApiError />;
  }

  return (
    <div className="w-full min-h-svh py-10 bg-[#F7F7F7]">
      <JsonLd data={createFaqSchema([...faqData.data, ...sharedFaq])} />
      <div className="flex items-center justify-end gap-5 sm:gap-10 px-3 text-sm underline w-full">
        <Link href={"/terms-conditions"}>Terms & Conditions</Link>
        <Link href={"/privacy-policy"}>Privacy Policy</Link>
      </div>
      <h1 className="text-xl lg:text-4xl font-medium py-5 text-center">
        Frequently Asked Questions
      </h1>
      <FaqSection data={faqData?.data} />
    </div>
  );
};

export default Page;
