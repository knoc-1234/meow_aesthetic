import ProductsSection from "./ProductsSection";
import ApiError from "@/components/error/ApiError";
import { getSiteProducts } from "@/lib/site-products";

const ShopWithUs = async () => {
  //
  const products = await getSiteProducts();

  if (!products) {
    return <ApiError />;
  }

  return (
    <section className="w-full bg-white">
      <div className="w-[75%] mx-auto py-14 flex flex-col gap-10 relative">
        <h2 className="font-semibold text-4xl lg:text-5xl text-center font-[--font-playfair]">
          Shop With Us
        </h2>
        <ProductsSection data={products} />
      </div>
    </section>
  );
};

export default ShopWithUs;
