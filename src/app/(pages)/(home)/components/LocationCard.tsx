import Image from "next/image";

const LocationCard = ({
  addressTitle,
  address,
  mon_to_fri_time,
  imageUrl,
}: {
  addressTitle: string;
  address: string;
  mon_to_fri_time: string;
  imageUrl: string;
}) => {
  return (
    <div className="flex flex-col gap-5 max-w-sm">
      <div className="relative aspect-square size-full">
        <Image
          quality={75}
          src={imageUrl || "/assets/keyprocedures.webp"}
          alt="meow-hero-section-img"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
      <ul className="flex flex-col gap-3 list-disc list-inside text-2xl">
        {addressTitle}
        <li>{address}</li>
        <li>Mon-Sun {mon_to_fri_time}</li>
      </ul>
    </div>
  );
};

export default LocationCard;
