"use client";

import ShopProductCard from "../components/ShopProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { getProductImage, type SiteProduct } from "@/lib/product-utils";

const ProductsSection = ({ data }: { data: SiteProduct[] }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative flex items-center">
      {/* Left Button */}
      <div
        className={`swiper-button-prev-custom z-10 cursor-pointer w-10 h-10 flex items-center justify-center absolute -left-10 transition-all duration-300 ease-in-out
        ${isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 7L10 12L15 17"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        spaceBetween={10}
        slidesPerView={5}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          100: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
          1300: { slidesPerView: 4, spaceBetween: 10 },
          1600: { slidesPerView: 5, spaceBetween: 10 },
        }}
        className="w-full"
      >
        {data?.length > 0 ? (
          data.map((e, index) => (
            <SwiperSlide key={index} className="w-full">
              <ShopProductCard
                title={e.name}
                description={e.description || ""}
                price={e.price || ""}
                imageUrl={getProductImage(e)}
                slug={e.slug || String(e.id)}
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center w-full">No products available</p>
        )}
      </Swiper>

      {/* Right Button */}
      <div
        className={`swiper-button-next-custom z-10 cursor-pointer w-10 h-10 flex items-center justify-center absolute -right-10 transition-all duration-300 ease-in-out
        ${isEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 7L15 12L10 17"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProductsSection;
