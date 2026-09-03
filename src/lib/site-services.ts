const SITE_API_BASE_URL =
  process.env.MEOW_SERVICE_API_BASE_URL ||
  "https://meow-service-test.flutterclone.com";
const SITE_SLUG = process.env.MEOW_SITE_SLUG || "meowaesthetics-1785928248";
const HELPERS_SECRET =
  process.env.HELPERS_HEAD || process.env.NEXT_PUBLIC_HELPERS_HEAD || "";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T | { data?: T };
};

export type ServiceMedia = {
  id: number;
  service_id: number;
  type: "image" | "video" | string;
  path_url: string | null;
  sort_order: number;
};

export type SiteService = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  price_from: string | null;
  is_active: boolean;
  packages_count?: number;
  media?: ServiceMedia[];
  brand_name?: string;
  brand_phone_number?: string;
  booking_before_hours?: number;
  category_name?: string;
  sub_category_name?: string;
  avg_rating?: number;
  badges?: {
    is_top_seller?: boolean;
    people_looking?: number;
    just_checked_out?: number;
  };
};

export type ServicePackageDetail = {
  id: number;
  label: string;
  image_url: string | null;
};

export type SiteServicePackage = {
  id: number;
  service_id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: string | null;
  final_price?: string | null;
  duration_minutes: number | null;
  is_active: boolean;
  is_discounted?: boolean;
  discount_price?: string | null;
  service_mode_name?: string;
  category_name?: string;
  sub_category_name?: string;
  included_details?: ServicePackageDetail[];
  highlight_details?: ServicePackageDetail[];
  badges?: {
    is_top_seller?: boolean;
  };
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

const fetchSiteList = async <T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T[]> => { 
  if (!HELPERS_SECRET) {
    console.error("Missing HELPERS_HEAD for site API requests.");
    return [];
  }

  const url = new URL(path, SITE_API_BASE_URL);
  url.searchParams.set("nopaginate", "1");

  Object.entries(params || {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  }); 
  const response = await fetch(url, {
    headers: { 
      "X-Site-API-Key": HELPERS_SECRET,
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });
   if (!response.ok) {
    console.error(
      `Site API request failed: ${response.status} ${url.pathname}`,
    );
    return [];
  }

  const payload = (await response.json()) as ApiEnvelope<T[]> | T[];

  if (!Array.isArray(payload) && payload.success === false) {
    console.error(payload.message || "Site API request was not successful.");
    return [];
  }

  return unwrapList<T>(payload);
};

export const getSiteServices = async () => {
  const services = await fetchSiteList<SiteService>(
    `/api/sites/${SITE_SLUG}/services`,
  ); 
  return services
    .filter((service) => service.is_active)
    .sort((a, b) => a.id - b.id);
};

export const getSiteServiceBySlug = async (slug: string) => {
  const services = await getSiteServices();

  return services.find((service) => service.slug === slug) || null;
};

export const getSiteServicePackages = async (serviceId: number) => {
  const packages = await fetchSiteList<SiteServicePackage>(
    `/api/sites/${SITE_SLUG}/packages`,
    { service_id: serviceId },
  );

  return packages.filter((item) => item.is_active);
};

export const getAllSitePackages = async () => {
  const packages = await fetchSiteList<SiteServicePackage>(
    `/api/sites/${SITE_SLUG}/packages`,
  );

  return packages.filter((item) => item.is_active);
};

export const getServiceImage = (service: SiteService) =>
  service.image_url ||
  service.media?.find((item) => item.type === "image" && item.path_url)
    ?.path_url ||
  "/assets/keyprocedures.webp";

export const getPackageImage = (servicePackage: SiteServicePackage) =>
  servicePackage.image_url || "/assets/keyprocedures.webp";

export const formatSgd = (value?: string | number | null) => {
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

export const serviceBookingHref = (name: string) =>
  `https://wa.me/6587713358?text=${encodeURIComponent(
    `Hi Meow Aesthetics, I want to book ${name}.`,
  )}`;
