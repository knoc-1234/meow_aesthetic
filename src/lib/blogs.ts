import { cache } from "react";
import axiosServer from "./axios";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type BlogsResponse = {
  status: number;
  message: string;
  data: BlogPost[];
};

export const getBlogs = cache(async (slug?: string): Promise<BlogPost[]> => {
  try {
    const res = await axiosServer.get<BlogsResponse>("/blogs_list", {
      params: slug ? { slug } : undefined,
    });

    return res.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
});

export const getBlogBySlug = cache(async (
  slug: string,
): Promise<BlogPost | null> => {
  const blogs = await getBlogs(slug);
  return blogs[0] || null;
});

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
