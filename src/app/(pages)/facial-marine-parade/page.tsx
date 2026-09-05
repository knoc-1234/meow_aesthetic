import ApiError from "@/components/error/ApiError";
import ServiceMoneyPage from "@/components/money/ServiceMoneyPage";
import { createPageMetadata } from "@/lib/seo";
import { getServiceCategoryData } from "@/lib/service-pricing";

export const metadata = createPageMetadata({
  title: "Facial Marine Parade Packages | Meow Aesthetics",
  description:
    "Explore facial treatments at Marine Parade from Meow Aesthetics, including Bojin Meridian Facial, Hydrafacial, deep cleansing options, prices, and booking details.",
  path: "/facial-marine-parade",
});

const page = async () => {
  const facial = await getServiceCategoryData("5");

  if (!facial) {
    return <ApiError />;
  }

  return (
    <ServiceMoneyPage
      eyebrow="Marine Parade facial packages"
      title="Facial Marine Parade Packages | Meow Aesthetics"
      intro="Book facial treatments near Marine Parade with Meow Aesthetics, including Bojin Meridian Facial, Hydrafacial with Serum, deep cleansing facial options, hydration treatments, and anti-ageing care. This page brings together the treatments, prices, and location details that booking-intent visitors usually need before messaging the salon."
      path="/facial-marine-parade"
      schemaDescription="Marine Parade facial packages page for Meow Aesthetics with prices, Hydrafacial, Bojin Meridian Facial, and booking information."
      ctaLabel="Book A Marine Parade Facial"
      secondaryLinks={[
        { href: "/marine-parade", label: "Marine Parade location" },
        { href: "/pricelist", label: "Full price list" },
      ]}
      services={facial.service_details}
      galleryTitle="Facial Treatments At Meow Aesthetics"
      galleryItems={facial.service_details.map((item) => ({
        title: item.title,
        image: item.image_url,
      }))}
      faqs={[
        {
          question: "Which facial treatments are available at Marine Parade?",
          answer:
            "Marine Parade clients can enquire about Hydrafacial with Serum, Bojin Meridian Facial, deep cleansing facials, hydration treatments, Vitamin C brightening, and anti-ageing facial options.",
        },
        {
          question: "How much does a facial cost at Meow Aesthetics?",
          answer:
            "Facial treatments currently start from SGD 68, with Hydrafacial, Bojin, deep cleansing, and premium anti-ageing options listed on this page.",
        },
        {
          question: "Is Bojin Facial available at Marine Parade?",
          answer:
            "Yes. Bojin Meridian Facial is one of the signature facial treatments associated with Meow Aesthetics and is highlighted strongly on this page for Marine Parade visitors.",
        },
      ]}
      locationCardTitle="Marine Parade Booking Details"
      locationCardBody="Marine Parade is a strong booking option for facial clients who want east-side convenience, transparent pricing, and the ability to message the salon directly before confirming their treatment."
      locationCardLinks={[
        { href: "/marine-parade", label: "View Marine Parade page" },
        {
          href: "/facial",
          label: "Full facial services page",
        },
        { href: "/contact", label: "Contact and booking" },
      ]}
      mapTitle="Marine Parade Location"
      mapEmbedUrl="https://maps.google.com/maps?q=86%20Marine%20Parade%20Central%20%2303-202B%20Singapore%20440086&z=15&output=embed"
    />
  );
};

export default page;
