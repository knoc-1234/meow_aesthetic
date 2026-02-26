import Image from "next/image";
import { MotoAndValuesData } from "../page";

const OurMottoSection = ({ data }: { data: MotoAndValuesData[] }) => {
  return (
    <section className="relative w-full min-h-svh flex justify-center items-center p-10 sm:p-20 lg:p-0 overflow-hidden">
      {/* bg image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center before:absolute before:inset-0 before:bg-white/70 before:z-10"
        style={{
          backgroundImage: "url('/assets/ourmottosection.avif')",
        }}
      />
      {/* content */}
      <div className="w-full sm:w-[70%] mx-auto min-h-full flex flex-col gap-8 justify-center items-center text-center">
        {data &&
          data?.map((e, index) => (
            <>
              <div
                key={index + "about"}
                className="flex flex-col gap-5 relative z-50"
              >
                <h2 className="text-xl sm:text-2xl lg:text-5xl font-[--font-playfair] font-semibold">
                  {e?.title}
                </h2>
                <p className="lg:text-xl font-light">{e?.description}</p>
              </div>
              {e?.id === 3 && (
                <Image
                  quality={75}
                  src={e?.small_image_url}
                  alt={e?.title}
                  width={500}
                  height={500}
                  className="absolute left-0 lg:left-40 top-0 size-20 sm:size-40 xl:size-50 2xl:h-64 2xl:w-[450px] object-cover"
                />
              )}
              {e?.id === 4 && (
                <Image
                  quality={75}
                  src={e?.small_image_url}
                  alt={e?.title}
                  width={500}
                  height={500}
                  className="absolute right-0 lg:right-40 top-0 size-20 sm:size-40 xl:size-50 2xl:size-72 object-cover"
                />
              )}

              {e?.id === 5 && (
                <Image
                  quality={75}
                  src={e?.small_image_url}
                  alt={e?.title}
                  width={500}
                  height={500}
                  className="absolute right-0 -translate-y-1/2 top-1/2 size-12 sm:size-32 lg:size-40 object-cover"
                />
              )}
              {e?.id === 6 && (
                <Image
                  quality={75}
                  src={e?.small_image_url}
                  alt={e?.title}
                  width={500}
                  height={500}
                  className="absolute right-0 2xl:right-28 bottom-0 size-20 sm:size-40 xl:size-50 2xl:size-72 object-cover"
                />
              )}
              {e?.id === 7 && (
                <Image
                  quality={75}
                  src={e?.small_image_url}
                  alt={e?.title}
                  width={500}
                  height={500}
                  className="absolute left-0 bottom-0 size-20 sm:size-40 xl:size-50 2xl:size-72 object-cover"
                />
              )}
            </>
          ))}
      </div>
    </section>
  );
};

export default OurMottoSection;
