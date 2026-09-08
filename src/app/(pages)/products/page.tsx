import ShopProductCard from "../(home)/components/ShopProductCard";
import ApiError from "@/components/error/ApiError";
import {
  getProductImage,
  type SiteProduct,
} from "@/lib/product-utils";
import { getSiteProducts } from "@/lib/site-products";

export const revalidate = 60;

const groupByType = (products: SiteProduct[]) => {
  return products.reduce(
    (acc, product) => {
      const type = product.category_name || product.brand_name || "Products";

      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(product);
      return acc;
    },
    {} as Record<string, SiteProduct[]>,
  );
};

const Product = async () => {
  const data = await getSiteProducts();

  if (!data) {
    return <ApiError />;
  }

  const groupedProducts = data ? groupByType(data) : {};

  return (
    <div>
      <h1 className="text-xl lg:text-5xl font-medium py-10 text-center font-[--font-playfair]">
        Products
      </h1>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([type, products]) => (
          <div key={type}>
            <div className="bg-[#F7F7F7] py-10">
              <h3 className="w-[80%] mx-auto text-4xl font-medium font-[--font-playfair]">
                {type}
              </h3>
            </div>
            <div className="w-[80%] mx-auto grid sm:grid-cols-3 xl:grid-cols-5 justify-center gap-10 py-5">
              {products.map((product) => (
                <ShopProductCard
                  key={product.id}
                  title={product.name}
                  description={product.description || ""}
                  price={product.price || ""}
                  imageUrl={getProductImage(product)}
                  slug={product.slug || String(product.id)}
                  addtoCart={true}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center w-full">No products available</p>
      )}
    </div>
  );
};

export default Product;
