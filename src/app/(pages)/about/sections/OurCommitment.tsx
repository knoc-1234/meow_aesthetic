import Image from "next/image";
import { OurCommitmentData } from "../page";

const OurCommitment = ({ data }: { data: OurCommitmentData }) => {
  return (
    <section className="w-full h-svh py-20">
      <div className="w-[90%] h-full mx-auto grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col items-center justify-center gap-5 lg:gap-10">
          <h2 className="text-lg lg:text-4xl font-semibold font-[--font-playfair]">
            {data?.title}
          </h2>
          <p>{data?.description}</p>
        </div>
        <div className="relative w-full min-h-full ">
          <Image
            quality={60}
            src={data?.big_image_url || "/assets/keyprocedures.webp"}
            alt="about meow"
            width={1000}
            height={1000}
            className="size-full absolute top-0 left-0 object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;
