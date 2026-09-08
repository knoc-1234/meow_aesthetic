import Image from "next/image";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { formatProductPrice } from "@/lib/product-utils";

const ProductQuickViewPopup = ({
  setShowPopup,
  onBuyNow,
  title,
  price,
  description,
  imageUrl,
}: {
  setShowPopup: (value: boolean) => void;
  onBuyNow: () => void;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopup]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex justify-center items-center z-50">
      <div
        ref={popupRef}
        className="bg-white shadow-lg relative py-10 px-7 w-full max-h-[90vh] max-w-3xl overflow-auto"
      >
        <div
          className="absolute top-2 right-2 p-1 cursor-pointer"
          onClick={() => setShowPopup(false)}
        >
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 w-full">
          <div className="relative size-full max-w-sm max-h-96">
            <Image
              quality={70}
              src={imageUrl || "/assets/keyprocedures.webp"}
              alt="meow-hero-section-img"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-5 justify-between overflow-auto max-h-96">
            <div className="flex flex-col gap-2">
              <h3>{title}</h3>
              <p>{formatProductPrice(price)}</p>
              <p>{description}</p>
            </div>
            <button
              type="button"
              onClick={onBuyNow}
              className="bg-[#76747B] text-white p-2 rounded-full my-2 text-center"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProductQuickViewPopup;
