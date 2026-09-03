"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AboutSection = ({
  data,
}: {
  data: {
    title: string;
    subtitle: string;
    description: string;
    small_image_url: string;
  };
}) => {
  //
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full min-h-full grid lg:grid-cols-2 gap-10 relative">
      <div
        ref={sectionRef}
        className={`w-full lg:w-[70%] mx-auto flex flex-col gap-7 p-10 2xl:p-20 transition-all duration-1000 delay-200 ease-in-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
        }`}
      >
        <h1 className="text-4xl lg:text-5xl font-[--font-playfair]">
          {data?.title}
        </h1>

        <h2 className="text-xl lg:text-2xl text-neutral-700">
          {data?.subtitle || "Nail Salon Marine Parade & Woods Square"}
        </h2>
        <p>{data?.description}</p>
        <div className="flex flex-wrap gap-4"> 
          <Link
            href={"/about"}
            className="bg-white w-fit px-8 py-3.5 border border-[#000] text-black text-center"
          >
            Our Mission
          </Link>
        </div>
      </div>
      <Image
        quality={75}
        src={data?.small_image_url || "/assets/keyprocedures.webp"}
        alt="Meow Aesthetics salon services"
        width={700}
        height={700}
        className="hidden lg:block 2xl:max-w-4xl max-w-2xl w-full min-h-full h-[60vh] absolute bottom-0 right-0 object-cover border-2 border-white"
      />
    </section>
  );
};

export default AboutSection;
