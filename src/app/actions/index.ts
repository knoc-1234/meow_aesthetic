import "server-only";
import { BlogDataType } from "@/lib/types";

export const blogApiUrl = "https://meow-service-test.flutterclone.com";
const blogSiteSlug = "meowaesthetics-1785928248";

export const getBlogs = async (): Promise<BlogDataType[]> => {
  try {
    const res = await fetch(
      `${blogApiUrl}/api/sites/${blogSiteSlug}/blogs?nopaginate=1`,
      {
        // headers: {
        //   "X-API-Key": "meow_blogs_2024_secure_key_8d7f9e2a",
        //   "X-API-Token": "meow_blogs_2024_secure_token_x9k2p7m4n6b8v3c1",
        // },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch");
    const readData = await res.json();
    const data = readData?.data ?? [];
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.log("BLOGS GET ERROR /", error);
    return [];
  }
};

export const getPublishedBlogs = async (): Promise<BlogDataType[]> => {
  const blogs = await getBlogs();
  return blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime(),
    );
};

export const getBlogBySlug = async (
  slug: string,
): Promise<BlogDataType | undefined> => {
  const blogs = await getBlogs();
  return blogs.find(
    (blog) => blog.slug === slug && blog.status === "published",
  );
};
