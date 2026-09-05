"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AppDownloadModalButton, {
  AppDownloadModal,
} from "@/components/booking/AppDownloadModalButton";
import ProductQuickViewPopup from "./ProductQuickViewPopup";
import { formatProductPrice } from "@/lib/product-utils";

const ShopProductCard = ({
  addtoCart,
  title,
  description,
  price,
  imageUrl,
}: {
  addtoCart?: boolean;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}) => {
  //product popup
  const [showPopup, setShowPopup] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

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

  const openBuyModalFromQuickView = () => {
    setShowPopup(false);
    window.setTimeout(() => setShowBuyModal(true), 0);
  };

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
        <p>{title}</p>
        <p className="text-gray-500">{formatProductPrice(price)}</p>
        {addtoCart && (
          <AppDownloadModalButton
            modalTitle="buy now on the le meow app"
            modalDescription="Download the app to browse luxury products, place your order, and manage your Le Meow shopping experience."
            className="bg-[#76747B] text-white p-2 rounded-full my-2 text-center"
          >
            Buy Now
          </AppDownloadModalButton>
        )}
      </div>

      {showPopup && (
        <ProductQuickViewPopup
          setShowPopup={setShowPopup}
          onBuyNow={openBuyModalFromQuickView}
          title={title}
          price={price}
          description={description}
          imageUrl={imageUrl}
        />
      )}
      <AppDownloadModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        modalTitle="buy now on the le meow app"
        modalDescription="Download the app to browse luxury products, place your order, and manage your Le Meow shopping experience."
      />
    </>
  );
};

export default ShopProductCard;
