import ApiError from "@/components/error/ApiError";
import ServiceMoneyPage from "@/components/money/ServiceMoneyPage";
import { createPageMetadata } from "@/lib/seo";
import { getServiceCategoryData } from "@/lib/service-pricing";

export const metadata = createPageMetadata({
  title: "Gel Nails Singapore Price | Meow Aesthetics",
  description:
    "See Meow Aesthetics gel nails prices in Singapore, including classic gel manicures, extensions, chrome finishes, and Marine Parade booking options.",
  path: "/gel-nails-price",
});

const page = async () => {
  const nails = await getServiceCategoryData("2");

  if (!nails) {
    return <ApiError />;
  }

  return (
    <ServiceMoneyPage
      eyebrow="Gel nails pricing"
      title="Gel Nails Singapore Price | Meow Aesthetics"
      intro="Compare Meow Aesthetics gel nail prices before booking. Our nail services cover classic gel manicures and pedicures, structured extensions, chrome and cat eye finishes, ombre blends, marble nail art, and spa add-ons, with appointments available at Marine Parade and Woods Square."
      path="/gel-nails-price"
      schemaDescription="Gel nails price page for Meow Aesthetics in Singapore with manicure, pedicure, extension, and nail art pricing."
      ctaHref="https://wa.me/6587713358?text=Hi%20Meow%20Aesthetics%2C%20I%20want%20to%20book%20a%20gel%20nails%20appointment."
      ctaLabel="Book Gel Nails On WhatsApp"
      secondaryLinks={[
        { href: "/marine-parade", label: "Marine Parade location" },
        { href: "/nail-art-designs", label: "See nail art gallery" },
      ]}
      services={nails.service_details}
      galleryTitle="Nail Art & Finish Options"
      galleryItems={nails.service_details.map((item) => ({
        title: item.title,
        image: item.image_url,
      }))}
      faqs={[
        {
          question: "How much do gel nails cost at Meow Aesthetics?",
          answer:
            "Gel nail services at Meow Aesthetics start from SGD 88 for Classic Gel Mani/Pedi with unlimited designs, with extensions and add-ons priced separately.",
        },
        {
          question: "Where can I book gel nails?",
          answer:
            "Gel nail appointments are available at Marine Parade and Woods Square. Marine Parade is especially useful if you want late-night appointment flexibility.",
        },
        {
          question: "Do your gel nail services include nail art?",
          answer:
            "Yes. Popular gel nail packages include custom design options such as chrome, cat eye, ombre, marble, and more personalised looks.",
        },
      ]}
      locationCardTitle="Book Gel Nails At Marine Parade Or Woods Square"
      locationCardBody="Compare gel nail prices here, then choose the location and appointment style that suits you best before booking with the team."
      locationCardLinks={[
        { href: "/marine-parade", label: "Visit Marine Parade" },
        { href: "/woods-square", label: "Visit Woods Square" },
        {
          href: "/nails",
          label: "Full nail services page",
        },
      ]}
    />
  );
};

export default page;
