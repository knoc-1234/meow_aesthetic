import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductActionButtons from "@/components/products/ProductActionButtons";
import { createPageMetadata } from "@/lib/seo";
import {
  formatProductPrice,
  getProductImage,
} from "@/lib/product-utils";
import {
  getSiteProductBySlug,
  getSiteProducts,
} from "@/lib/site-products";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getSiteProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: "Product | Meow Aesthetics Singapore",
      description:
        "Explore Meow Aesthetics luxury products and beauty essentials in Singapore.",
      path: `/products/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${product.name} | Meow Aesthetics Singapore`,
    description:
      product.description ||
      `Buy ${product.name} at Meow Aesthetics Singapore through the Le Meow app.`,
    path: `/products/${product.slug || product.id}`,
  });
}

export async function generateStaticParams() {
  const products = await getSiteProducts();
  return products.map((product) => ({
    slug: product.slug || String(product.id),
  }));
}

const ProductDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getSiteProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const description =
    product.description || "Explore this authentic Meow Aesthetics product.";

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 pt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition-colors"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all products
        </Link>
      </div>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex items-center justify-center lg:min-h-[520px]">
          <div className="relative h-full min-h-[300px] w-full max-h-[500px]">
            <Image
              priority
              quality={80}
              src={getProductImage(product)}
              alt={`${product.name} at Meow Aesthetics`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-neutral-500">
              {product.category_name || product.brand_name || "Meow Aesthetics"}
            </p>
            <h1 className="mt-3 font-[--font-playfair] text-4xl leading-tight lg:text-5xl">
              {product.name}
            </h1>
          </div>

          <p className="leading-7 text-neutral-700">{description}</p>

          <div className="grid gap-4 border-y border-neutral-200 py-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-neutral-500">Price</p>
              <p className="font-semibold text-lg">
                {formatProductPrice(product.price)}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Category</p>
              <p className="font-semibold">
                {product.sub_category_name || product.category_name || "Beauty"}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Brand</p>
              <p className="font-semibold">
                {product.brand_name || "Meow Aesthetics"}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Availability</p>
              <p className="font-semibold">
                {product.is_sold_out ? "Sold Out" : "In Stock"}
              </p>
            </div>
          </div>

          <ProductActionButtons size="md" />
        </div>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
