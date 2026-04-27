import JsonLd from "./JsonLd";

type BlogJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
};

const BlogJsonLd = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: BlogJsonLdProps) => {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url,
        datePublished,
        dateModified,
        author: {
          "@type": "Organization",
          name: "Meow Aesthetics",
        },
        publisher: {
          "@type": "Organization",
          name: "Meow Aesthetics",
        },
      }}
    />
  );
};

export default BlogJsonLd;
