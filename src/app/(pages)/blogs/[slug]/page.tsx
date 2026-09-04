import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogJsonLd from "@/components/seo/BlogJsonLd";
import HtmlContent from "@/components/pages/BlogView/sections/HtmlContent";
import { getBlogBySlug, getPublishedBlogs } from "@/app/actions";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import {
  estimateReadingTime,
  formatBlogDate,
  resolveBlogImage,
  stripHtml,
  truncateText,
} from "@/lib/blogs";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return createPageMetadata({
      title: "Blog | Meow Aesthetics",
      description: "Read the latest beauty articles from Meow Aesthetics.",
      path: `/blogs/${slug}`,
    });
  }

  const summarySource = blog.description || blog.content || "";
  const image = resolveBlogImage(blog);
  return createPageMetadata({
    title: blog.title,
    description: truncateText(stripHtml(summarySource), 160),
    path: `/blogs/${blog.slug}`,
    ...(image ? { image } : {}),
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([
    getBlogBySlug(slug),
    getPublishedBlogs(),
  ]);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  const summarySource = blog.description || blog.content || "";
  const plainDescription = truncateText(stripHtml(summarySource), 200);
  const coverImage = resolveBlogImage(blog);
  const readingTime = estimateReadingTime(blog.content || "");

  return (
    <main className="bg-[#F7F7F7]">
      <BlogJsonLd
        title={blog.title}
        description={plainDescription}
        url={absoluteUrl(`/blogs/${blog.slug}`)}
        datePublished={blog.published_at || blog.created_at}
        dateModified={blog.updated_at}
      />

      <article className="w-[90%] max-w-4xl mx-auto py-12 lg:py-16 flex flex-col gap-6">
        <Link
          href="/blogs"
          className="text-sm text-neutral-500 hover:text-black w-fit"
        >
          ← Back to blog
        </Link>

        <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
          Beauty journal
        </p>
        <h1 className="text-4xl lg:text-6xl font-[--font-playfair] leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
          <span>
            Published {formatBlogDate(blog.published_at || blog.created_at)}
          </span>
          <span aria-hidden>•</span>
          <span>{readingTime} min read</span>
          {blog.author ? (
            <>
              <span aria-hidden>•</span>
              <span>By {blog.author}</span>
            </>
          ) : null}
        </div>

        {blog.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-[0.12em] bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {coverImage ? (
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100">
            <Image
              src={coverImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-10">
          <HtmlContent html={blog.content || blog.description || ""} />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/blogs"
            className="border border-black px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            Back to blog
          </Link>
          <Link
            href="/contact"
            className="border border-black px-5 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            Book an appointment
          </Link>
        </div>
      </article>

      {relatedBlogs.length ? (
        <section className="w-[90%] max-w-6xl mx-auto pb-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-[--font-playfair]">Related articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => {
                const itemImage = resolveBlogImage(item);
                const itemSummary = truncateText(
                  stripHtml(item.description || item.content || ""),
                  130,
                );

                return (
                  <article
                    key={item.id}
                    className="group bg-white border border-neutral-200 rounded-3xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
                  >
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="flex flex-col h-full"
                    >
                      <div className="relative aspect-[16/10] bg-neutral-100 shrink-0">
                        {itemImage ? (
                          <Image
                            src={itemImage}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-[--font-playfair] text-lg">
                            Meow Aesthetics
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col gap-3 flex-1">
                        <p className="text-xs text-neutral-500">
                          {formatBlogDate(
                            item.published_at || item.created_at,
                          )}
                        </p>
                        <h3 className="text-lg font-[--font-playfair] leading-snug">
                          {item.title}
                        </h3>
                        <p className="leading-7 text-neutral-700 text-sm">
                          {itemSummary}
                        </p>
                        <span className="mt-auto pt-2 text-sm font-medium underline underline-offset-4 group-hover:no-underline">
                          Read article
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default page;
