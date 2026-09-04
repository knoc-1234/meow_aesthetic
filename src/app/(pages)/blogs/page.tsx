import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogs } from "@/app/actions";
import { createPageMetadata } from "@/lib/seo";
import {
  estimateReadingTime,
  formatBlogDate,
  resolveBlogImage,
  stripHtml,
  truncateText,
} from "@/lib/blogs";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "Beauty Blog Singapore | Meow Aesthetics",
  description:
    "Read the Meow Aesthetics beauty blog for advice on gel nails, facials, lash treatments, skin care, and beauty services in Singapore.",
  path: "/blogs",
});

const page = async () => {
  const blogs = await getPublishedBlogs();

  if (!blogs.length) {
    return (
      <main className="bg-[#F7F7F7] min-h-[60vh]">
        <section className="w-[90%] max-w-6xl mx-auto py-16 flex flex-col gap-5">
          <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
            Beauty journal
          </p>
          <h1 className="text-4xl lg:text-6xl font-[--font-playfair]">
            Meow Aesthetics Blog
          </h1>
          <p className="max-w-2xl leading-8 text-neutral-600">
            New articles are on the way. Check back soon for beauty advice, nail
            care tips, and treatment guides from our team in Singapore.
          </p>
        </section>
      </main>
    );
  }

  const [featured, ...rest] = blogs;
  const featuredImage = resolveBlogImage(featured);
  const featuredSummary = truncateText(
    stripHtml(featured.description || featured.content || ""),
    240,
  );

  return (
    <main className="bg-[#F7F7F7]">
      <section className="w-[90%] max-w-6xl mx-auto pt-12 lg:pt-16 flex flex-col gap-4">
        <p className="uppercase tracking-[0.2em] text-sm text-neutral-500">
          Beauty journal
        </p>
        <h1 className="text-4xl lg:text-6xl font-[--font-playfair]">
          Meow Aesthetics Blog
        </h1>
        <p className="max-w-3xl leading-8 text-neutral-600">
          Explore beauty advice, treatment guides, nail care tips, facial
          explainers, and lash comparisons from Meow Aesthetics in Singapore.
        </p>
      </section>

      {/* Featured article */}
      <section className="w-[90%] max-w-6xl mx-auto pt-10">
        <Link
          href={`/blogs/${featured.slug}`}
          className="group grid lg:grid-cols-2 gap-0 bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-neutral-100">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-[--font-playfair] text-2xl">
                Meow Aesthetics
              </div>
            )}
            <span className="absolute top-4 left-4 bg-black text-white text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
              Featured
            </span>
          </div>
          <div className="p-6 lg:p-10 flex flex-col gap-4 justify-center">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
              <span>
                {formatBlogDate(featured.published_at || featured.created_at)}
              </span>
              <span aria-hidden>•</span>
              <span>{estimateReadingTime(featured.content || "")} min read</span>
              {featured.author ? (
                <>
                  <span aria-hidden>•</span>
                  <span>By {featured.author}</span>
                </>
              ) : null}
            </div>
            <h2 className="text-3xl lg:text-4xl font-[--font-playfair] leading-snug">
              {featured.title}
            </h2>
            <p className="leading-7 text-neutral-700">{featuredSummary}</p>
            <span className="mt-2 border border-black px-5 py-3 rounded-full w-fit group-hover:bg-black group-hover:text-white transition-colors">
              Read article
            </span>
          </div>
        </Link>
      </section>

      {/* Article grid */}
      {rest.length ? (
        <section className="w-[90%] max-w-6xl mx-auto py-12 lg:py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((blog) => {
            const image = resolveBlogImage(blog);
            const summary = truncateText(
              stripHtml(blog.description || blog.content || ""),
              150,
            );

            return (
              <article
                key={blog.id}
                className="group bg-white border border-neutral-200 rounded-3xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] bg-neutral-100 shrink-0">
                    {image ? (
                      <Image
                        src={image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-[--font-playfair] text-xl">
                        Meow Aesthetics
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
                      <span>
                        {formatBlogDate(blog.published_at || blog.created_at)}
                      </span>
                      <span aria-hidden>•</span>
                      <span>
                        {estimateReadingTime(blog.content || "")} min read
                      </span>
                    </div>
                    <h2 className="text-xl font-[--font-playfair] leading-snug">
                      {blog.title}
                    </h2>
                    <p className="leading-7 text-neutral-700 text-sm">{summary}</p>
                    <span className="mt-auto pt-2 text-sm font-medium underline underline-offset-4 group-hover:no-underline">
                      Read article
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="pb-16" />
      )}
    </main>
  );
};

export default page;
