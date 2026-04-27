import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { getServiceCategoryData } from "@/lib/service-pricing";

export const metadata = createPageMetadata({
  title: "Nail Art Designs Singapore | Meow Aesthetics",
  description:
    "Browse nail art designs from Meow Aesthetics in Singapore, from chrome and cat eye finishes to ombre and marble gel sets.",
  path: "/nail-art-designs",
});

const page = async () => {
  const nails = await getServiceCategoryData("2");
  const designs =
    nails?.service_details?.map((item) => ({
      title: item.title,
      image: item.image_url,
    })) || [];

  return (
    <main className="bg-[#F7F7F7]">
      <section className="w-[90%] max-w-6xl mx-auto py-12 lg:py-16 flex flex-col gap-5">
        <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
          Gallery
        </p>
        <h1 className="text-4xl lg:text-6xl font-[--font-playfair]">
          Nail Art Designs Singapore
        </h1>
        <p className="max-w-3xl leading-8">
          Browse a selection of Meow Aesthetics nail looks, from chrome and cat
          eye finishes to ombre blends, marble textures, extensions, and classic
          gel sets.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/nails"
            className="border border-black px-5 py-3 rounded-full"
          >
            View nail services
          </Link>
          <Link
            href="/gel-nails-price"
            className="border border-black px-5 py-3 rounded-full"
          >
            Gel nails prices
          </Link>
          <Link
            href="/pricelist"
            className="border border-black px-5 py-3 rounded-full"
          >
            Check nail pricing
          </Link>
        </div>
      </section>

      <section className="w-[90%] max-w-6xl mx-auto pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <article
            key={design.title}
            className="bg-white border border-neutral-200 rounded-3xl overflow-hidden"
          >
            <div className="relative h-80">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-[--font-playfair]">
                {design.title}
              </h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default page;
