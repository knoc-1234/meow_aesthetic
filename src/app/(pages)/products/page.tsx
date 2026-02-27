import axiosServer from "@/lib/axios";
import ShopProductCard from "../(home)/components/ShopProductCard";
import ApiError from "@/components/error/ApiError";

export const revalidate = 60;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  image_url: string;
};

interface ProductApiResponse {
  success: boolean;
  data: Product[];
}

const getProductData = async (): Promise<ProductApiResponse | null> => {
  try {
    const res = await axiosServer.get("/api_product_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return null;
  }
};

const groupByType = (products: Product[]) => {
  return products.reduce(
    (acc, product) => {
      if (!acc[product.type]) {
        acc[product.type] = [];
      }
      acc[product.type].push(product);
      return acc;
    },
    {} as Record<string, Product[]>,
  );
};

const Product = async () => {
  const productData = await getProductData();

  if (!productData) {
    return <ApiError />;
  }

  const data = productData?.data;
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
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.image_url}
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
