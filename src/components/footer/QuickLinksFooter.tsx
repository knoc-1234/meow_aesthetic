import Link from "next/link";

const QuickLinksFooter = () => {

  return (
    <div className="flex flex-col gap-2 lg:gap-5">
      <h3 className="font-semibold text-lg lg:text-xl">Quick links</h3>
      <ul className="flex flex-col gap-1 lg:gap-3 lg:whitespace-nowrap lg:text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/pricelist">Pricelist</Link>
        </li>
        <li>
          <Link href="/faqs">FAQ | T&C</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinksFooter;
