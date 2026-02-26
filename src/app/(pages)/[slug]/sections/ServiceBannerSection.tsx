import Image from "next/image";

const ServiceBannerSection = ({
  title,
  description,
  first_image_url,
  third_image_url,
  center_image_url,
}: {
  title: string;
  description: string;
  first_image_url: string;
  third_image_url: string;
  center_image_url: string;
}) => {
  return (
    <section className="bg-[#EEEEEE] w-full h-svh">
      <div className="w-full h-full flex flex-col gap-5 py-10 px-5 justify-center items-center">
        <div className="w-full lg:w-[60%] mx-auto flex flex-col text-center gap-5 2xl:gap-10">
          <h1 className="text-xl lg:text-4xl 2xl:text-7xl font-[--font-playfair]">
            {title}
          </h1>
          <p className="lg:text-xl">{description}</p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-2xl h-full ">
            <Image
              quality={75}
              src={first_image_url || "/assets/keyprocedures.webp"}
              alt={title || "service banner"}
              width={500}
              height={500}
              className="absolute left-0 bottom-20 sm:bottom-10 w-40 sm:w-60 lg:w-70 h-50 lg:h-80 2xl:h-90 z-10 object-cover"
            />
            <Image
              quality={75}
              src={center_image_url || "/assets/keyprocedures.webp"}
              alt={title || "service banner"}
              width={800}
              height={800}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 aspect-video lg:max-w-sm w-fit lg:w-full h-36 lg:h-48 z-30 object-cover"
            />
            <Image
              quality={75}
              src={third_image_url || "/assets/keyprocedures.webp"}
              alt={title || "service banner"}
              width={500}
              height={500}
              className="absolute right-0 bottom-10 sm:bottom-0 w-40 sm:w-52 lg:w-64 h-50 lg:h-80 2xl:h-90 z-10 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBannerSection;
