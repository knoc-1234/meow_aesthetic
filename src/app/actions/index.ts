import "server-only";
import { BlogDataType } from "@/lib/types";

export const getBlogs = async ({
  slug = "",
}: {
  slug?: string;
}): Promise<BlogDataType[]> => {
  try {
    const res = await fetch(
      `https://manageblog.meowadvancedintelligence.com/api/v1/sites/meowaesthetics/blogs?slug=${slug ?? ""}`,
      {
        headers: {
          "X-API-Key": "meow_blogs_2024_secure_key_8d7f9e2a",
          "X-API-Token": "meow_blogs_2024_secure_token_x9k2p7m4n6b8v3c1",
        },
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
