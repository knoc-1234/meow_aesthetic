"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { resolveServicePath } from "@/lib/site-data";

type Service = {
  id: number;
  title: string;
  slug: string;
};

const QuickLinksFooter = () => {
  //
  const [serviceDropDown, setServiceDropDown] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  //fetchServices
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
          <button
            type="button"
            onClick={() => setServiceDropDown(!serviceDropDown)}
            aria-expanded={serviceDropDown}
            aria-controls="footer-services"
            className="w-full flex items-center justify-between text-left"
          >
            <span>Services</span>
            <svg
              className={`size-5 duration-500 transition-all ${
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
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </button>

          {serviceDropDown && (
            <ul className="flex flex-col gap-2 px-3 lg:whitespace-nowrap text-base">
              {services?.map((service) => (
                <li key={service.id}>
                  <Link
                    href={resolveServicePath({
                      id: service?.id,
                      slug: service?.slug,
                    })}
                  >
                    {service?.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinksFooter;
