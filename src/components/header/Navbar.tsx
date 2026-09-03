import Link from "next/link";

type Props = {
  onLinkClick?: () => void;
};

const Navbar = ({ onLinkClick }: Props) => {
  return (
    <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-7 p-4 lg:p-0 *:hover:text-neutral-500">
      <Link href="/" onClick={onLinkClick}>
        Home
      </Link>
      <Link href="/about" onClick={onLinkClick}>
        About
      </Link>

      <Link href="/services" onClick={onLinkClick}>
        Services
      </Link>
      <Link href="/products" onClick={onLinkClick}>
        Products
      </Link>
      <Link href="/pricelist" onClick={onLinkClick}>
        Pricelist
      </Link>
      <Link href="/faqs" onClick={onLinkClick}>
        FAQ | T&C
      </Link>
      <Link href="/contact" onClick={onLinkClick}>
        Contact
      </Link>
      <Link href="/blogs" onClick={onLinkClick}>
        Blogs
      </Link>
    </nav>
  );
};

export default Navbar;
