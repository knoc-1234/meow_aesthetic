"use client";

import Popup from "@/components/Popup/Popup";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReviewCardData } from "@/lib/site-reviews";

const ReviewCard = ({ review }: { review: ReviewCardData }) => {
  //product popup
  const [showPopup, setShowPopup] = useState(false);
  const imageUrl = review.image_url || "/assets/keyprocedures.webp";

  // Prevent scroll when Popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPopup]);

  return (
    <>
      <div
        onClick={() => setShowPopup(!showPopup)}
        className="group relative flex h-[430px] w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
      >
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            quality={75}
            src={imageUrl}
            alt="Customer review image for Meow Aesthetics"
            width={500}
            height={500}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex grow flex-col gap-2 p-4">
          <p className="text-sm font-semibold">
            {review.rating
              ? "★".repeat(review.rating) + "☆".repeat(5 - review.rating)
              : "Review"}
          </p>
          <p className="line-clamp-3 text-sm leading-6 text-neutral-700">
            {review.review || "Thank you for reviewing Meow Aesthetics."}
          </p>
          <div className="mt-auto">
            <p className="font-semibold">{review.user_name}</p>
            <p className="text-xs text-neutral-500">
              {[review.service_name, review.outlet_name]
                .filter(Boolean)
                .join(" | ")}
            </p>
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <div className="grid gap-5">
            <Image
              quality={75}
              src={imageUrl}
              alt="Customer review image for Meow Aesthetics"
              width={500}
              height={500}
              className="max-h-[70vh] w-full object-contain"
            />
            <div className="grid gap-2">
              <p className="font-semibold">
                {review.user_name} {review.rating ? `- ${review.rating}/5` : ""}
              </p>
              <p className="leading-7 text-neutral-700">{review.review}</p>
              <p className="text-sm text-neutral-500">
                {[review.service_name, review.outlet_name]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default ReviewCard;
