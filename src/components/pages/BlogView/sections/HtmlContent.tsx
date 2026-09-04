import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

interface HtmlContentProps {
  html: string;
}

/**
 * Renders BlockNote "full HTML" (blocksToFullHTML output) for the blog body.
 * The `bn-root` / `bn-shadcn` wrapper supplies BlockNote's CSS variables and
 * theme scope, while `bn-editor bn-default-styles` gives the block/heading
 * typography. The editor chrome (padding, background) is stripped via the
 * `.blog-content` overrides in globals.css.
 */
const HtmlContent = ({ html }: HtmlContentProps) => {
  if (!html) {
    return null;
  }

  return (
    <div
      className="blog-content bn-root bn-shadcn"
      data-color-scheme="light"
    >
      <article
        className="bn-editor bn-default-styles max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default HtmlContent;
