export const stripHtml = (html: string) =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

export const truncateText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trimEnd()}...`;
};

export const formatBlogDate = (value: string) =>
  new Intl.DateTimeFormat("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const BLOG_ASSET_BASE = "https://meow-service-test.flutterclone.com";

type BlogImageSource = {
  cover_photo_url?: string | null;
  cover_photo?: string | null;
  featured_image_url?: string | null;
  featured_image?: string | null;
};

export const resolveBlogImage = (blog: BlogImageSource): string | null => {
  const candidate =
    blog.cover_photo_url ||
    blog.featured_image_url ||
    blog.cover_photo ||
    blog.featured_image;

  if (!candidate) {
    return null;
  }

  if (/^https?:\/\//i.test(candidate)) {
    return candidate;
  }

  return `${BLOG_ASSET_BASE}/${candidate.replace(/^\/+/, "")}`;
};

export const estimateReadingTime = (html: string): number => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};
