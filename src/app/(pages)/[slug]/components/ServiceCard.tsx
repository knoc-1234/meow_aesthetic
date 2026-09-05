import Image from "next/image";
import AppDownloadModalButton from "@/components/booking/AppDownloadModalButton";

const ServiceCard = ({
  imgUrl,
  name,
  time,
  price,
  description,
}: {
  imgUrl: string;
  name: string;
  time: string;
  price: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full min-h-full max-w-[250px]">
      <Image
        quality={75}
        src={imgUrl || "/assets/keyprocedures.webp"}
        alt={`${name} at Meow Aesthetics`}
        width={500}
        height={500}
        className="sm:w-60 w-full sm:h-70 h-full object-cover"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <div>
        <p className="">Duration: {time}</p>
        <p className="">Price: ${price}</p>
      </div>
      <p className="grow">{description} </p>
      <AppDownloadModalButton
        className="text-white hover:text-black hover:border-black border bg-gradient-to-t from-[#A3A3A3] to-[#C7C7C7] hover:from-white hover:to-white px-6 py-1 w-fit transition-all duration-300"
      >
        Book Now
      </AppDownloadModalButton>
    </div>
  );
};

export default ServiceCard;
