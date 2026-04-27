export type BlogDataType = {
    id: number;
    title: string;
    description?: string;
    slug: string;
    content: string;
    featured_image: string | null;
    cover_photo: string | null;
    author: string;
    tags: string[];
    status: "draft" | "published" | "archived"; // extend if needed
    published_at: string; // ISO date string
    views: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
};
