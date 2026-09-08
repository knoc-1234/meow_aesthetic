import { appStoreUrl, googlePlayUrl, whatsappUrl } from "@/lib/site-data";

type ServiceActionButtonsProps = {
  size?: "sm" | "md";
  className?: string;
};

export default function ServiceActionButtons({
  size = "md",
  className = "",
}: ServiceActionButtonsProps) {
  const isSm = size === "sm";

  return (
    <div className={`flex flex-col ${isSm ? "gap-2.5" : "gap-6 pt-2"} ${className}`}>
      {/* App booking section */}
      <div className={`flex flex-col ${isSm ? "gap-1.5" : "gap-3"}`}>
        <p
          className={`${
            isSm
              ? "text-[10px] font-semibold tracking-wide text-neutral-500 uppercase"
              : "text-xs font-semibold uppercase tracking-wider text-neutral-500"
          }`}
        >
          Book an appointment on Le Meow app
        </p>
        <div className={`flex flex-wrap items-center ${isSm ? "gap-1.5" : "gap-3"}`}>
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on App Store to book an appointment"
            className={`w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black inline-flex items-center ${
              isSm
                ? "px-2.5 py-1.5 text-xs gap-1.5 font-medium"
                : "px-6 py-3 text-sm gap-2.5 font-medium"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="-1 -2 26 28"
              className={`${isSm ? "h-3.5 w-3.5" : "h-5 w-5"} fill-current`}
            >
              <path
                fill="currentColor"
                d="M16.2 1.9c.1 1.1-.3 2.2-1 3-1 1.1-2.3 1.8-3.5 1.7-.1-1.1.4-2.2 1.1-3 1-1.1 2.4-1.8 3.4-1.7Zm3.7 16.8c-.6 1-1 1.5-1.8 2.4-1.1 1.2-2.6 2.7-4.5 2.7-1.7 0-2.1-.9-4.4-.9s-2.8.9-4.4 1c-1.8.1-3.1-1.3-4.2-2.5-2.3-2.5-4-7.2-1.7-10.4 1.1-1.6 3.1-2.6 5.3-2.6 1.7 0 3.2 1 4.3 1s2.9-1.2 4.9-1c.8 0 3.2.3 4.7 2.5-.1.1-2.8 1.6-2.8 4.9.1 3.9 3.5 5.2 3.6 5.2-.1.2-.4 1.1-1 2Z"
              />
            </svg>
            <span>App Store</span>
          </a>

          <a
            href={googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play to book an appointment"
            className={`w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black inline-flex items-center ${
              isSm
                ? "px-2.5 py-1.5 text-xs gap-1.5 font-medium"
                : "px-6 py-3 text-sm gap-2.5 font-medium"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={isSm ? "h-3.5 w-3.5" : "h-5 w-5"}
            >
              <path fill="#34A853" d="M3.6 2.4 14.7 12 3.6 21.6V2.4Z" />
              <path fill="#FBBC04" d="m14.7 12 3.1-2.7 3.7 2.1c.7.4.7 1.5 0 1.9l-3.7 2.1-3.1-3.4Z" />
              <path fill="#4285F4" d="m3.6 2.4 14.2 6.9-3.1 2.7L3.6 2.4Z" />
              <path fill="#EA4335" d="m3.6 21.6 11.1-9.6 3.1 3.4-14.2 6.2Z" />
            </svg>
            <span>Google Play</span>
          </a>
        </div>
      </div>

      {/* Support / inquiries section */}
      <div
        className={`flex flex-col ${
          isSm ? "gap-1.5 pt-2 border-t border-neutral-100" : "gap-3 pt-3 border-t border-neutral-200"
        }`}
      >
        <p
          className={`${
            isSm
              ? "text-[10px] font-semibold tracking-wide text-neutral-500 uppercase"
              : "text-xs font-semibold uppercase tracking-wider text-neutral-500"
          }`}
        >
          Questions? Contact us
        </p>
        <div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp for questions"
            className={`w-fit border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] text-white transition-all duration-300 hover:border-black hover:from-white hover:to-white hover:text-black inline-flex items-center ${
              isSm
                ? "px-3 py-1.5 text-xs gap-1.5 font-medium"
                : "px-8 py-3 text-sm gap-2.5 font-medium"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`${isSm ? "h-3.5 w-3.5" : "h-5 w-5"} fill-current`}
            >
              <path
                fill="currentColor"
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
              />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
