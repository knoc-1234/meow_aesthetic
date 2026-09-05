import ApiError from "@/components/error/ApiError";
import ServiceMoneyPage from "@/components/money/ServiceMoneyPage";
import { createPageMetadata } from "@/lib/seo";
import { getServiceCategoryData } from "@/lib/service-pricing";

export const metadata = createPageMetadata({
  title: "Lash Extensions Singapore Price | Meow Aesthetics",
  description:
    "See lash extension and lash lift prices at Meow Aesthetics in Singapore, with styles, treatment options, Marine Parade access, and Le Meow app booking.",
  path: "/lash-extensions-singapore",
});

const page = async () => {
  const lashes = await getServiceCategoryData("3");

  if (!lashes) {
    return <ApiError />;
  }

  return (
    <ServiceMoneyPage
      eyebrow="Lash extensions and lifts"
      title="Lash Extensions Singapore Price | Meow Aesthetics"
      intro="Review Meow Aesthetics lash extension and lash lift prices before booking. From classic and natural looks to wispy, wetlook, and volume styles, this page brings together treatment options, pricing, and location details for visitors ready to compare and book."
      path="/lash-extensions-singapore"
      schemaDescription="Lash extensions Singapore price page for Meow Aesthetics with lash lift, lash extension styles, and booking information."
      ctaLabel="Book Lash Extensions"
      secondaryLinks={[
        { href: "/marine-parade", label: "Marine Parade location" },
        { href: "/pricelist", label: "Full price list" },
      ]}
      services={lashes.service_details}
      galleryTitle="Lash Styles & Before Booking Inspiration"
      galleryItems={lashes.service_details.map((item) => ({
        title: item.title,
        image: item.image_url,
      }))}
      faqs={[
        {
          question: "How much do lash extensions cost at Meow Aesthetics?",
          answer:
            "Lash prices currently start from SGD 68 for Lash Lift / 1D Classic and increase depending on fullness, style, and appointment length.",
        },
        {
          question: "Do you offer both lash lift and lash extension services?",
          answer:
            "Yes. Meow Aesthetics offers both lash lifts and lash extension styles, ranging from natural enhancement to fuller volume and more dramatic looks.",
        },
        {
          question: "Where can I book lash appointments?",
          answer:
            "Lash appointments can be arranged through the Le Meow app and are associated with Marine Parade and Woods Square booking options.",
        },
      ]}
      locationCardTitle="Lash Booking Options"
      locationCardBody="This page is built for clients who want to compare lash extension prices, style options, and location choices quickly before sending a booking enquiry."
      locationCardLinks={[
        { href: "/marine-parade", label: "Marine Parade location" },
        {
          href: "/lashes",
          label: "Full lashes page",
        },
        { href: "/contact", label: "Contact and booking" },
      ]}
    />
  );
};

export default page;
