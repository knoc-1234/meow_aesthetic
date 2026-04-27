import LocationCard from "../components/LocationCard";
import LocationHeader from "../components/LocationHeader";
import ApiError from "@/components/error/ApiError";
import { getLocationData } from "@/lib/locations";

const LocationSection = async () => {
  //
  const locationData = await getLocationData();

  if (!locationData?.data) {
    return <ApiError />;
  }

  return (
    <section className="w-full bg-[#DBDBDB]">
      <div className="w-[75%] mx-auto py-20 flex flex-col gap-14">
        <LocationHeader />
        <div className="w-full flex items-center justify-center gap-5">
          {locationData?.data?.map((e, index) => (
            <LocationCard
              key={index}
              addressTitle={e?.title}
              address={e?.address}
              mon_to_fri_time={e?.mon_to_fri_time}
              imageUrl={e?.image_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
