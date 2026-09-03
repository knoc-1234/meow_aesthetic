const REVIEWS_API_BASE_URL =
  process.env.MEOW_REVIEWS_API_BASE_URL ||
  "https://meow-service-test.flutterclone.com";
const REVIEWS_SITE_SLUG =
  process.env.MEOW_REVIEWS_SITE_SLUG ||
  process.env.MEOW_SITE_SLUG ||
  "meowaesthetics-1785928248";
const REVIEWS_SITE_API_KEY =
  process.env.MEOW_REVIEWS_SITE_API_KEY || process.env.HELPERS_HEAD || "";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T | { data?: T };
};

type ReviewMedia = {
  id: number;
  review_id: number;
  type: "image" | "video" | string;
  path_url: string | null;
  thumbnail_url?: string | null;
};

export type SiteReview = {
  id: number;
  rating: number | null;
  review: string | null;
  caption?: string | null;
  is_view?: boolean;
  user_name?: string | null;
  worker_name?: string | null;
  service_name?: string | null;
  package_name?: string | null;
  outlet_name?: string | null;
  video_thumb_url?: string | null;
  media?: ReviewMedia[];
};

export type ReviewCardData = {
  id: number;
  image_url: string;
  user_name: string;
  rating: number | null;
  review: string;
  service_name: string;
  outlet_name: string;
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

const getReviewImage = (review: SiteReview) =>
  review.media?.find((item) => item.type === "image" && item.path_url)
    ?.path_url ||
  review.video_thumb_url ||
  "/assets/keyprocedures.webp";

export const getSiteReviews = async (): Promise<ReviewCardData[]> => {
  if (!REVIEWS_SITE_API_KEY) {
    console.error("Missing MEOW_REVIEWS_SITE_API_KEY for reviews API requests.");
    return [];
  }

  const url = new URL(
    `/api/sites/${REVIEWS_SITE_SLUG}/reviews`,
    REVIEWS_API_BASE_URL,
  );
  url.searchParams.set("nopaginate", "1");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        "x-site-api-key": REVIEWS_SITE_API_KEY,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
      signal: controller.signal,
    });
  } catch (error) {
    console.error("Reviews API request failed:", error);
    return [];
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    console.error(`Reviews API request failed: ${response.status} ${url.pathname}`);
    return [];
  }

  const payload = (await response.json()) as ApiEnvelope<SiteReview[]> | SiteReview[];

  if (!Array.isArray(payload) && payload.success === false) {
    console.error(payload.message || "Reviews API request was not successful.");
    return [];
  }

  return unwrapList<SiteReview>(payload)
    .filter((review) => review.is_view !== false)
    .map((review) => ({
      id: review.id,
      image_url: getReviewImage(review),
      user_name: review.user_name || "Customer",
      rating: review.rating,
      review: review.caption || review.review || "",
      service_name: review.service_name || review.package_name || "Service",
      outlet_name: review.outlet_name || "",
    }));
};
