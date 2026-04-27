import Link from "next/link";
import { getBlogs } from "@/app/actions";
import { createPageMetadata } from "@/lib/seo";
import { formatBlogDate, stripHtml, truncateText } from "@/lib/blogs";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Beauty Blog Singapore | Meow Aesthetics",
  description:
    "Read the Meow Aesthetics beauty blog for advice on gel nails, facials, lash treatments, skin care, and beauty services in Singapore.",
  path: "/blogs",
});

const page = async () => {
  const blogs = (await getBlogs({})).filter((blog) => blog.status === "published");
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.published_at || b.created_at).getTime() -
      new Date(a.published_at || a.created_at).getTime(),
  );

  return (
    <main className="bg-[#F7F7F7]">
      <section className="w-[90%] max-w-6xl mx-auto py-12 lg:py-16 flex flex-col gap-5">
        <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
          Beauty journal
        </p>
        <h1 className="text-4xl lg:text-6xl font-[--font-playfair]">
          Meow Aesthetics Blog
        </h1>
        <p className="max-w-3xl leading-8">
          Explore beauty advice, treatment guides, nail care tips, facial
          explainers, and lash comparisons from Meow Aesthetics in Singapore.
        </p>
      </section>

      <section className="w-[90%] max-w-6xl mx-auto pb-16 grid lg:grid-cols-2 gap-6">
        {sortedBlogs.map((blog) => {
          const summarySource = blog.description || blog.content || "";
          const plainText = truncateText(stripHtml(summarySource), 220);

          return (
            <article
              key={blog.id}
              className="bg-white border border-neutral-200 rounded-3xl p-6 flex flex-col gap-4"
            >
              <p className="text-sm text-neutral-500">
                {formatBlogDate(blog.published_at || blog.created_at)}
              </p>
              <h2 className="text-2xl font-[--font-playfair] leading-snug">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p className="leading-7 text-neutral-700">{plainText}</p>
              <Link
                href={`/blogs/${blog.slug}`}
                className="border border-black px-5 py-3 rounded-full w-fit"
              >
                Read article
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default page;
