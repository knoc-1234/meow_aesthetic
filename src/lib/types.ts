export type BlogPivotType = {
    site_id: number;
    blog_id: number;
    status: string;
    published_at: string | null;
    scheduled_for: string | null;
    created_at: string;
    updated_at: string;
};

export type BlogDataType = {
    id: number;
    title: string;
    description?: string;
    slug: string;
    content: string;
    featured_image: string | null;
    featured_image_url?: string | null;
    cover_photo: string | null;
    cover_photo_url?: string | null;
    author: string;
    tags: string[];
    status: "draft" | "published" | "archived"; // extend if needed
    is_featured?: boolean;
    published_at: string; // ISO date string
    views: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    pivot?: BlogPivotType;
};
