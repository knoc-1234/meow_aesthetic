"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ReviewCard from "../components/ReviewCard";
import { useEffect, useRef, useState } from "react";
import type { ReviewCardData } from "@/lib/site-reviews";

const ReviewCards = ({ data }: { data: ReviewCardData[] }) => {
  //
  const reviewRef = useRef<HTMLDivElement>(null);
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

    if (reviewRef.current) {
      observer.observe(reviewRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full sm:max-w-[75%] mx-auto py-10 px-2 flex flex-col gap-10 relative z-10">
      {/* Heading */}
      <div className="text-center flex flex-col gap-2">
        <i className="text-xl">Customer Satisfactory</i>
        <h2
          ref={reviewRef}
          className={`font-semibold text-4xl lg:text-5xl font-[--font-playfair] transition-all duration-1000 delay-200 ease-in-out
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }
          `}
        >
          Reviews
        </h2>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          100: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          940: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="w-full"
      >
        {data?.length > 0 ? (
          data?.map((review) => (
            <SwiperSlide className="w-full" key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center w-full">No reviews available</p>
        )}
      </Swiper>
    </div>
  );
};

export default ReviewCards;
