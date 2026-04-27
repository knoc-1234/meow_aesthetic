import Link from "next/link";
import { useEffect, useState } from "react";
import { resolveServicePath } from "@/lib/site-data";

type Props = {
  onLinkClick?: () => void;
};

type Service = {
  id: number;
  title: string;
  slug: string;
};

const Navbar = ({ onLinkClick }: Props) => {
  //
  const [serviceDropDown, setServiceDropDown] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api_service_list`,
        );
        const data = await res.json();
        setServices(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-7 p-4 lg:p-0 *:hover:text-neutral-500">
      <Link href="/" onClick={onLinkClick}>
        Home
      </Link>
      <Link href="/about" onClick={onLinkClick}>
        About
      </Link>

      {/* Desktop Dropdown */}
      <div className="relative group cursor-pointer hidden lg:block">
        Services
        <div className="min-w-40 absolute left-0 hidden group-hover:block px-3 py-5 bg-[#DBDBDB] z-50">
          <div className="flex flex-col gap-2 lg:whitespace-nowrap text-base *:hover:text-neutral-800">
            {services?.map((service) => (
              <Link
                key={service.id}
                href={resolveServicePath({ id: service?.id, slug: service?.slug })}
                onClick={onLinkClick}
              >
                {service?.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        onClick={() => setServiceDropDown(!serviceDropDown)}
        className="flex lg:hidden flex-col items-center gap-2 justify-between cursor-pointer"
      >
        <div className="w-full flex items-center gap-2 justify-between">
          <span>Services</span>
          <span className="size-5">
            <svg
              className={`transition-all duration-500 ${
                serviceDropDown ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="#000000"
                />{" "}
              </g>
            </svg>
          </span>
        </div>

        {serviceDropDown && (
          <>
            <ul className="flex flex-col gap-2 px-3 lg:whitespace-nowrap text-base">
              {services?.map((service) => (
                <li key={service.id}>
                  <Link
                    href={resolveServicePath({
                      id: service?.id,
                      slug: service?.slug,
                    })}
                    onClick={onLinkClick}
                  >
                    {service?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
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
      <Link href="/blog" onClick={onLinkClick}>
        Blog
      </Link>
    </nav>
  );
};

export default Navbar;
