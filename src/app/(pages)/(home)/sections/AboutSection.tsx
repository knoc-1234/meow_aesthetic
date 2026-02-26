"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AboutSection = ({
  data,
}: {
  data: { title: string; description: string; small_image_url: string };
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
        <h2 className="text-4xl lg:text-5xl font-[--font-playfair]">
          {data?.title}
        </h2>
        <p>{data?.description}</p>
        <Link
          href={"/about"}
          className="bg-[#B9B9B9] w-fit px-10 xl:min-w-[300px] py-3.5 border border-[#000] text-white text-center"
        >
          <button>Our Mission</button>
        </Link>
      </div>
      <Image
        quality={60}
        src={data?.small_image_url || "/assets/keyprocedures.webp"}
        alt="meow-hero-section-img"
        width={700}
        height={700}
        className="hidden lg:block 2xl:max-w-4xl max-w-2xl w-full min-h-full h-[60vh] absolute bottom-0 right-0 object-cover border-2 border-white"
      />
      {/* <div className="hidden lg:block relative size-full h-[70vh]">
        <div className="absolute right-0 bottom-0 w-full h-full 2xl:w-4xl 2xl:max-w-2xl">
          <Image
            quality={60}
            src={data?.small_image_url || "/assets/keyprocedures.webp"}
            alt="meow-hero-section-img"
            width={500}
            height={500}
            className="w-full h-full object-cover border-2 border-white"
          />
        </div>
      </div> */}
    </section>
  );
};

export default AboutSection;
