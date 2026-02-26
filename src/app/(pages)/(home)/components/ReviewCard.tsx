"use client";

import Popup from "@/components/Popup/Popup";
import Image from "next/image";
import { useEffect, useState } from "react";

const ReviewCard = ({ imageUrl }: { imageUrl: string }) => {
  //product popup
  const [showPopup, setShowPopup] = useState(false);

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
        className="relative aspect-square h-96 w-full rounded-2xl group overflow-hidden cursor-pointer"
      >
        <Image
          quality={60}
          src={imageUrl || "/assets/keyprocedures.webp"}
          alt="meow-hero-section-img"
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-2xl transition-all duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-all duration-500 flex items-center justify-center" />
      </div>

      {showPopup && (
        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <div className="">
            <Image
              quality={60}
              src={imageUrl || "/assets/keyprocedures.webp"}
              alt="meow-hero-section-img"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </Popup>
      )}
    </>
  );
};

export default ReviewCard;
