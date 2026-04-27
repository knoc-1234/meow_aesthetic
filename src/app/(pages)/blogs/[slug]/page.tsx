import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogJsonLd from "@/components/seo/BlogJsonLd";
import { getBlogs } from "@/app/actions";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { formatBlogDate, stripHtml, truncateText } from "@/lib/blogs";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = (await getBlogs({})).filter((blog) => blog.status === "published");
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = (await getBlogs({ slug })).find(
    (item) => item.slug === slug && item.status === "published",
  );

  if (!blog) {
    return createPageMetadata({
      title: "Blog | Meow Aesthetics",
      description: "Read the latest beauty articles from Meow Aesthetics.",
      path: `/blogs/${slug}`,
    });
  }

  const summarySource = blog.description || blog.content || "";
  return createPageMetadata({
    title: blog.title,
    description: truncateText(stripHtml(summarySource), 160),
    path: `/blogs/${blog.slug}`,
  });
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const [blogList, allBlogs] = await Promise.all([getBlogs({ slug }), getBlogs({})]);
  const blog = blogList.find((item) => item.slug === slug && item.status === "published");

  if (!blog) {
    notFound();
  }

  const sortedAllBlogs = allBlogs
    .filter((item) => item.status === "published")
    .sort(
      (a, b) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime(),
    );

  const relatedBlogs = sortedAllBlogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  const summarySource = blog.description || blog.content || "";
  const plainDescription = truncateText(stripHtml(summarySource), 200);

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
        <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
          Beauty journal
        </p>
        <h1 className="text-4xl lg:text-6xl font-[--font-playfair] leading-tight">
          {blog.title}
        </h1>
        <p className="text-sm text-neutral-500">
          Published {formatBlogDate(blog.published_at || blog.created_at)}
        </p>
        <div
          className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-10 prose prose-neutral max-w-none prose-headings:font-[--font-playfair] prose-a:text-black"
          dangerouslySetInnerHTML={{ __html: blog.content || blog.description || "" }}
        />

        <div className="flex flex-wrap gap-3">
          <Link href="/blogs" className="border border-black px-5 py-3 rounded-full">
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
              {relatedBlogs.map((item) => {
                const itemSummary = item.description || item.content || "";
                return (
                  <article
                    key={item.id}
                    className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4"
                  >
                    <p className="text-sm text-neutral-500">
                      {formatBlogDate(item.published_at || item.created_at)}
                    </p>
                    <h3 className="text-xl font-[--font-playfair] leading-snug">
                      <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="leading-7 text-neutral-700">
                      {truncateText(stripHtml(itemSummary), 140)}
                    </p>
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="border border-black px-5 py-3 rounded-full w-fit"
                    >
                      Read article
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
