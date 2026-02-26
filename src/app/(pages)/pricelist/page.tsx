import ApiError from "@/components/error/ApiError";
import axiosServer from "@/lib/axios";
import Image from "next/image";
import DownloadButton from "./DownloadButton";

export const dynamic = "force-dynamic";

type Pricelist = {
  id: number;
  image_url: string;
};

interface PricelistApiResponse {
  success: boolean;
  data: Pricelist[];
}

const getPricelistData = async (): Promise<PricelistApiResponse | null> => {
  try {
    const res = await axiosServer.get("/api_price_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch pricelist data:", error);
    return null;
  }
};

const page = async () => {
  //
  const pricelistData = await getPricelistData();

  if (!pricelistData) {
    return <ApiError />;
  }

  return (
    <>
      <div className="w-full py-10">
        <h1 className="text-xl lg:text-5xl text-center font-[--font-playfair]">
          Pricelist
        </h1>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10 place-content-center w-[80%] mx-auto py-10">
          {pricelistData?.data?.map((e, index) => (
            <Image
              key={index + "pricelist"}
              quality={75}
              src={e?.image_url || "/assets/MeowAstetic(2).jpeg"}
              alt="pricelist - meow aesthetic"
              width={500}
              height={800}
              className="w-full border-black border-2"
            />
          ))}
        </div>
        <div className="flex items-center justify-center w-full my-10">
          <DownloadButton />
        </div>
      </div>
    </>
  );
};

export default page;
