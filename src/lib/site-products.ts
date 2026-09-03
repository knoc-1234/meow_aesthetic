import type { SiteProduct } from "./product-utils";

const PRODUCT_API_BASE_URL =
  process.env.MEOW_PRODUCT_API_BASE_URL ||
  "https://meow-service-test.flutterclone.com";
const PRODUCT_SITE_SLUG =
  process.env.MEOW_PRODUCT_SITE_SLUG || "meow-luxury-1788437524";
const PRODUCT_HELPERS_SECRET =
  process.env.MEOW_PRODUCT_HELPERS_HEAD ||
  process.env.NEXT_PUBLIC_MEOW_PRODUCT_HELPERS_HEAD ||
  "";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T | { data?: T };
};

const unwrapList = <T>(payload: ApiEnvelope<T[]> | T[]): T[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (
    payload.data &&
    typeof payload.data === "object" &&
    "data" in payload.data &&
    Array.isArray(payload.data.data)
  ) {
    return payload.data.data;
  }

  return [];
};

export const getSiteProducts = async () => {
  if (!PRODUCT_HELPERS_SECRET) {
    console.error("Missing MEOW_PRODUCT_HELPERS_HEAD for product API requests.");
    return [];
  }

  const url = new URL(
    `/api/sites/${PRODUCT_SITE_SLUG}/products`,
    PRODUCT_API_BASE_URL,
  );
  url.searchParams.set("nopaginate", "1");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        "X-Site-API-Key": PRODUCT_HELPERS_SECRET,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
      signal: controller.signal,
    });
  } catch (error) {
    console.error("Product API request failed:", error);
    return [];
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    console.error(`Product API request failed: ${response.status} ${url.pathname}`);
    return [];
  }

  const payload = (await response.json()) as ApiEnvelope<SiteProduct[]> | SiteProduct[];

  if (!Array.isArray(payload) && payload.success === false) {
    console.error(payload.message || "Product API request was not successful.");
    return [];
  }

  return unwrapList<SiteProduct>(payload)
    .filter((product) => product.is_active)
    .sort((a, b) => a.id - b.id);
};
