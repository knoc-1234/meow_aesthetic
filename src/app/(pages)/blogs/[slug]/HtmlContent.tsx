import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
interface BlogContentProps {
  html: string;
}

const HtmlContent = ({ html }: BlogContentProps) => {
  console.log(html, "html");
  return (
    <article
      className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-10 prose prose-neutral max-w-none prose-headings:font-[--font-playfair] prose-a:text-black"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlContent;
