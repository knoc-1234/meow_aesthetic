import { getLocationData } from "@/lib/locations";
import ApiError from "../error/ApiError";
import QuickLinksFooter from "./QuickLinksFooter";

const Footer = async () => {
  const locationData = await getLocationData();

  if (!locationData?.data) {
    return <ApiError />;
  }

  return (
    <footer className="w-full bg-[#DBDBDB] lg:py-20 p-5 lg:px-10">
      <div className="sm:w-[95%] mx-auto flex flex-col gap-5 lg:gap-10">
        <div className="grid lg:grid-cols-[500px_auto] gap-10 lg:gap-20">
          <QuickLinksFooter />

          <div className="flex flex-col gap-5 lg:gap-7 max-w-sm">
            <div className="flex flex-col gap-2 lg:gap-5">
              <h3 className="font-semibold text-lg lg:text-xl">Location</h3>
              {locationData.data.map((location, index) => (
                <ul key={index} className="flex flex-col gap-3 lg:text-lg">
                  <li>
                    {location?.title} {location?.address}
                  </li>
                  <li>Daily {location?.mon_to_fri_time}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#76747B] text-white flex items-center justify-center p-1 sm:p-5 text-xs sm:text-base">
          {"(c)"} {new Date().getFullYear()} Meow Aesthetics Clinic. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
