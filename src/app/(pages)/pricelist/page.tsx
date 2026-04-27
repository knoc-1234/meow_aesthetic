import Link from "next/link";

import { createPageMetadata, createServiceSchema } from "@/lib/seo";
import { priceListSections } from "@/lib/price-list-data";
import ApiError from "@/components/error/ApiError";
import axiosServer from "@/lib/axios";
import JsonLd from "@/components/seo/JsonLd";

import DownloadButton from "./DownloadButton";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Service Price List 2026 - Meow Aesthetics Singapore",
  description:
    "View all Meow Aesthetics service prices for 2026: gel nails from $88, facials from $68, lash treatments, body treatments. Marine Parade & Woods Square.",
  path: "/pricelist",
});

type Pricelist = {
  id: number;
  image_url: string;
};

interface PricelistApiResponse {
  success: boolean;
  data: Pricelist[];
}

const getPricelistData = async (): Promise<PricelistApiResponse | null> => {
  try {
    const res = await axiosServer.get("/api_price_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch pricelist data:", error);
    return null;
  }
};

const page = async () => {
  //
  const pricelistData = await getPricelistData();

  if (!pricelistData) {
    return <ApiError />;
  }

  const priceSchema = createServiceSchema({
    name: "Meow Aesthetics Service Price List",
    description:
      "Price list for Meow Aesthetics nail, lash, facial, IPL and spa services in Singapore.",
    path: "/pricelist",
    offers: priceListSections.flatMap((section) =>
      section.items.map((item) => ({
        name: item.title,
        price: item.price,
      })),
    ),
  });

  return (
    <>
      <div className="w-full py-10 bg-[#F7F7F7]">
        <JsonLd data={priceSchema} />
        <div className="w-[90%] max-w-6xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
              Transparent pricing
            </p>
            <h1 className="text-3xl lg:text-5xl font-[--font-playfair]">
              Meow Aesthetics Price List 2026 - Singapore
            </h1>
            <p className="max-w-3xl mx-auto leading-8">
              Review the full Meow Aesthetics price list,
              including nails, lashes, facials, IPL services, and spa add-ons
              before booking your visit.
            </p>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <Link
                href="/gel-nails-price"
                className="border border-black px-5 py-3 rounded-full"
              >
                Gel nails price
              </Link>
              <Link
                href="/lash-extensions-singapore"
                className="border border-black px-5 py-3 rounded-full"
              >
                Lash extensions
              </Link>
              <Link
                href="/facial-marine-parade"
                className="border border-black px-5 py-3 rounded-full"
              >
                Marine Parade facials
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {priceListSections.map((section) => (
              <section
                key={section.title}
                className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4"
              >
                <h2 className="text-2xl font-[--font-playfair]">
                  {section.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start justify-between gap-4 border-b border-dashed border-neutral-200 pb-3"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                      </div>
                      <span className="font-semibold">SGD {item.price}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="text-sm text-neutral-500 text-center">
            All prices are in SGD. Prices valid for 2026. Late-night
            appointments are available at Marine Parade.
          </p>
        </div>
        <div className="flex items-center justify-center w-full my-10">
          <DownloadButton />
        </div>
      </div>
    </>
  );
};

export default page;
