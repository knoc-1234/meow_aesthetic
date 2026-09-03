export type ProductMedia = {
  id: number;
  product_id: number;
  type: "image" | "video" | string;
  path_url: string | null;
  sort_order: number;
};

export type SiteProduct = {
  id: number;
  brand_id: number;
  category_id: number;
  sub_category_id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string | null;
  stock_quantity: number;
  is_active: boolean;
  image_url: string | null;
  media?: ProductMedia[];
  media_list?: ProductMedia[];
  brand_name?: string;
  brand_phone_number?: string;
  category_name?: string;
  sub_category_name?: string;
  is_sold_out?: boolean;
  badges?: {
    is_top_seller?: boolean;
    people_looking?: number;
    just_checked_out?: number;
  };
};

export const getProductImage = (product: SiteProduct) =>
  product.image_url ||
  product.media_list?.find((item) => item.type === "image" && item.path_url)
    ?.path_url ||
  product.media?.find((item) => item.type === "image" && item.path_url)
    ?.path_url ||
  "/assets/keyprocedures.webp";

export const formatProductPrice = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") {
    return "Price on request";
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
};
