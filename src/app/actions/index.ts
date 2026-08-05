import { BlogDataType } from "@/lib/types";

const blogApiUrl = "https://lemeowapis.meowadvancedintelligence.com";
const blogSiteSlug = "meowaesthetics-1785928248";

export const getBlogs = async (): Promise<BlogDataType[]> => {
  try {
    const res = await fetch(
      `${blogApiUrl}/api/sites/${blogSiteSlug}/blogs?nopaginate=1`,
      {
        // headers: {
        //     "X-API-Key": "meow_blogs_2024_secure_key_8d7f9e2a",
        //     "X-API-Token": "meow_blogs_2024_secure_token_x9k2p7m4n6b8v3c1"
        // },
        next: { revalidate: 1 },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch");

    const data = (await res.json())?.data ?? [];
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.log("BLOGS GET ERROR /", error);
    return [];
  }
};
