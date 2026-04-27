import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogJsonLd from "@/components/seo/BlogJsonLd";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import {
  formatBlogDate,
  getBlogBySlug,
  getBlogs,
  stripHtml,
  truncateText,
} from "@/lib/blogs";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return createPageMetadata({
      title: "Blog | Meow Aesthetics",
      description: "Read the latest beauty articles from Meow Aesthetics.",
      path: `/blog/${slug}`,
    });
  }

  return createPageMetadata({
    title: blog.title,
    description: truncateText(stripHtml(blog.description), 160),
    path: `/blog/${blog.slug}`,
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([getBlogBySlug(slug), getBlogs()]);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);
  const plainDescription = truncateText(stripHtml(blog.description), 200);

  return (
    <main className="bg-[#F7F7F7]">
      <BlogJsonLd
        title={blog.title}
        description={plainDescription}
        url={absoluteUrl(`/blog/${blog.slug}`)}
        datePublished={blog.created_at}
        dateModified={blog.updated_at}
      />

      <article className="w-[90%] max-w-4xl mx-auto py-12 lg:py-16 flex flex-col gap-6">
        <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
          Beauty journal
        </p>
        <h1 className="text-4xl lg:text-6xl font-[--font-playfair] leading-tight">
          {blog.title}
        </h1>
        <p className="text-sm text-neutral-500">
          Published {formatBlogDate(blog.created_at)}
        </p>
        <div
          className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-10 prose prose-neutral max-w-none prose-headings:font-[--font-playfair] prose-a:text-black"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="border border-black px-5 py-3 rounded-full">
            Back to blog
          </Link>
          <Link
            href="/contact"
            className="border border-black px-5 py-3 rounded-full"
          >
            Book an appointment
          </Link>
        </div>
      </article>

      {relatedBlogs.length ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-[--font-playfair]">Related articles</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <article
                  key={item.id}
                  className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4"
                >
                  <p className="text-sm text-neutral-500">
                    {formatBlogDate(item.created_at)}
                  </p>
                  <h3 className="text-xl font-[--font-playfair] leading-snug">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="leading-7 text-neutral-700">
                    {truncateText(stripHtml(item.description), 140)}
                  </p>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="border border-black px-5 py-3 rounded-full w-fit"
                  >
                    Read article
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default page;
