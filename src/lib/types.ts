export type BlogDataType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  featured_image: string;
  cover_photo: string;
  author: string;
  tags: string[];
  status: string;
  is_featured: boolean;
  published_at: string;
  views: number;
  created_at: string;
  updated_at: string;
  cover_photo_url: string;
  pivot: {
    site_id: number;
    blog_id: number;
    status: string;
    published_at: string;
    scheduled_for: string;
    created_at: string;
    updated_at: string;
  };
};
