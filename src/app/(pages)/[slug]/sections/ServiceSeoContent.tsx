import Link from "next/link";

type ServiceSeoContentProps = {
  sections: Array<{ heading: string; body: string }>;
  internalLinks: Array<{ href: string; label: string }>;
};

const ServiceSeoContent = ({
  sections,
  internalLinks,
}: ServiceSeoContentProps) => {
  return (
    <section className="w-full bg-white py-14 lg:py-20">
      <div className="w-[90%] max-w-6xl mx-auto flex flex-col gap-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <article
              key={section.heading}
              className="border border-neutral-200 bg-neutral-50 p-6 rounded-3xl flex flex-col gap-3"
            >
              <h2 className="text-2xl font-[--font-playfair]">
                {section.heading}
              </h2>
              <p className="leading-7 text-neutral-700">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-black px-5 py-3 rounded-full"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSeoContent;
