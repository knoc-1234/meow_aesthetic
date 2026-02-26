import Image from "next/image";
import reviewbg from "@/../public/assets/homeReviewBg.png";
import Link from "next/link";
import ApiError from "@/components/error/ApiError";
import axiosServer from "@/lib/axios";

type Serivce = {
  id: number;
  title: string;
  description: string;
  slug: string;
  price: string;
  banner_image_url: string;
};

interface SerivceApiResponse {
  success: boolean;
  data: Serivce[];
}

const getServiceData = async (): Promise<SerivceApiResponse | null> => {
  try {
    const res = await axiosServer.get("/api_service_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch service data:", error);
    return null;
  }
};

const OurServicesSection = async () => {
  const serviceData = await getServiceData();

  if (!serviceData) {
    return <ApiError />;
  }

  const services = serviceData.data;
  const isFewServices = services.length <= 5;

  return (
    <section className="w-full relative pt-14 pb-1">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          quality={75}
          src={reviewbg}
          alt="review-bg"
          width={500}
          height={500}
          className="w-full h-full"
        />
      </div>

      <div className="w-full relative flex flex-col gap-5 lg:gap-10">
        <h2 className="text-4xl lg:text-5xl text-center py-5 font-[--font-playfair]">
          Our Services
        </h2>

        <div className="bg-white w-full overflow-x-auto overflow-y-clip px-2 sm:px-10">
          <div
            className={`flex items-center ${
              isFewServices ? "w-full" : "w-max"
            }`}
          >
            {services.map((e, index) => (
              <Link
                href={`/${e?.slug}?id=${e?.id}`}
                key={index + "service"}
                className={`relative h-[480px] rounded-4xl group transition-all duration-300 cursor-pointer ${
                  isFewServices ? "flex-1 min-w-0" : "w-64"
                }`}
                style={{
                  marginLeft: index === 0 ? 0 : "-50px",
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-4xl transition-all duration-300 group-hover:z-50 group-hover:scale-105">
                  <Image
                    quality={75}
                    src={e?.banner_image_url}
                    alt={e?.title}
                    width={1000}
                    height={500}
                    className="w-full h-full rounded-4xl object-cover border-7 border-white"
                  />
                  <h4 className="transition-all absolute bottom-5 left-5 text-white font-semibold text-2xl">
                    {e?.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
