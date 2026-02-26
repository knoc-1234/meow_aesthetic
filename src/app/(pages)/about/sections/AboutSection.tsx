import Image from "next/image";
import { AboutUsData } from "../page";

const AboutSection = ({ data }: { data: AboutUsData }) => {
  return (
    <section className="grid lg:grid-cols-2 grid-rows-[100svh] relative">
      <div className="h-full bg-black relative">
        <Image
          quality={75}
          src={data?.big_image_url || "/assets/keyprocedures.webp"}
          alt="about meow"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />
        <Image
          quality={75}
          src={data?.big_image_url || "/assets/keyprocedures.webp"}
          alt="about meow"
          width={1000}
          height={1000}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full object-cover  aspect-square"
        />
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col justify-end-safe gap-3 lg:gap-8 flex-grow p-10 bg-[#DBDBDB]">
          <p>Your Beauty Journey Starts Here</p>
          <h2 className="font-semibold text-2xl lg:text-4xl font-[--font-playfair]">
            {data?.title}
          </h2>
          <p>{data?.description}</p>
        </div>
        <div className="relative bg-white p-10">
          <Image
            quality={75}
            src={data?.small_image_url || "/assets/keyprocedures.webp"}
            alt="about meow"
            width={1000}
            height={1080}
            className="relative w-full aspect-video object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
