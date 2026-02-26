import Image from "next/image";
import followUsbg from "@/../public/assets/followus-bg.webp";
import axiosServer from "@/lib/axios";
import Link from "next/link";

// Define a type for the social data
type SocialDataItem = {
  link: string;
  type: string;
  image_url: string;
  title: string;
};

const getSocialData = async () => {
  try {
    const res = await axiosServer.get("/api_social_media_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch social data:", error);
    return null;
  }
};

const FollowUsSection = async () => {
  //
  const socialData = await getSocialData();

  const extractProfileName = (url: string, type: string): string => {
    try {
      const u = new URL(url);
      if (type === "instagram" || type === "tiktok") {
        const paths = u.pathname.split("/").filter(Boolean);
        return paths[0] ? "@" + paths[0] : "";
      } else if (type === "facebook") {
        const paths = u.pathname.split("/").filter(Boolean);
        return paths[0] ? "@" + paths[0] : "";
      }
    } catch (error) {
      console.error("Invalid URL format:", error, url);
    }
    return "";
  };

  return (
    <section className="w-full relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          quality={75}
          src={followUsbg}
          alt="review-bg"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[95%] mx-auto flex flex-col gap-3 items-center justify-center py-10 lg:py-20">
        <h2 className="font-semibold text-4xl lg:text-5xl text-center font-[--font-playfair] pb-10">
          Follow us on Social Media
        </h2>
        <div className="grid lg:grid-cols-3 justify-center gap-20 py-5">
          {socialData?.data?.map((e: SocialDataItem, index: number) => {
            const profileName = extractProfileName(e?.link, e?.type);
            return (
              <div key={index + "social"} className="max-w-[250px] size-full">
                <Link
                  href={e?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-5"
                >
                  <Image
                    src={e?.image_url || "/assets/keyprocedures.webp"}
                    alt={e?.type}
                    width={500}
                    height={500}
                    className="size-full max-w-[250px] aspect-square rounded-xl object-cover"
                  />
                  <p>{e?.title}</p>
                  <p>{profileName}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FollowUsSection;
