import type { MetadataRoute } from "next";
import { getBlogs } from "@/app/actions";
import { siteUrl } from "@/lib/site-data";

const routes = [
  "",
  "/about",
  "/blogs",
  "/contact",
  "/faqs",
  "/services",
  "/pricelist",
  "/products",
  "/privacy-policy",
  "/terms-conditions",
  "/marine-parade",
  "/woods-square",
  "/punggol",
  "/nail-art-designs",
  "/gel-nails-price",
  "/facial-marine-parade",
  "/lash-extensions-singapore",
  "/nails",
  "/lashes",
  "/body-and-skin-treatments",
  "/facial",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogs = (await getBlogs({})).filter((blog) => blog.status === "published");

  return [
    ...routes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.published_at || blog.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
