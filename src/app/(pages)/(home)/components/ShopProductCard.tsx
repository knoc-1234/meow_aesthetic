"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductQuickViewPopup from "./ProductQuickViewPopup";
import { formatProductPrice } from "@/lib/product-utils";

const ShopProductCard = ({
  addtoCart,
  title,
  description,
  price,
  imageUrl,
  slug,
}: {
  addtoCart?: boolean;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  slug?: string;
}) => {
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
      <div className="flex flex-col gap-1 relative w-full">
        <div
          className="relative aspect-square w-full overflow-hidden cursor-pointer group bg-slate-100"
          onClick={() => setShowPopup(!showPopup)}
        >
          <Image
            quality={75}
            src={imageUrl || "/assets/keyprocedures.webp"}
            alt="meow-hero-section-img"
            width={500}
            height={500}
            className="size-full object-contain border-2 border-white"
          />
          <div
            className="bg-white/90 w-full text-center p-2 absolute bottom-0 left-0 
                           translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 
                           transition-all duration-500 ease-in-out"
          >
            <p>Quick View</p>
          </div>
        </div>
        {slug ? (
          <Link href={`/products/${slug}`} className="hover:underline">
            <p className="font-medium">{title}</p>
          </Link>
        ) : (
          <p className="font-medium">{title}</p>
        )}
        <p className="text-gray-500">{formatProductPrice(price)}</p>
        {addtoCart && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] px-6 py-2 text-xs font-medium text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black cursor-pointer"
            >
              View
            </button>
          </div>
        )}
      </div>

      {showPopup && (
        <ProductQuickViewPopup
          setShowPopup={setShowPopup}
          title={title}
          price={price}
          description={description}
          imageUrl={imageUrl}
          slug={slug}
        />
      )}
    </>
  );
};

export default ShopProductCard;
