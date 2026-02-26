"use client";

import FbIcon from "../../../public/assets/icons/FbIcon";
import InstaIcon from "../../../public/assets/icons/InstaIcon";
import TikTokIcon from "../../../public/assets/icons/TikTokIcon";
import Link from "next/link";
import { useEffect, useState } from "react";

type Service = {
  id: number;
  type: string;
  link: string;
};

const SocialHeader = () => {
  //
  const [socialMedia, setSocialMedia] = useState<Service[]>([]);

  //
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api_social_media_list`,
        );
        const data = await response.json();
        setSocialMedia(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  const getLabel = (type: string) => {
    switch (type) {
      case "instagram":
        return "Visit our Instagram page";
      case "tiktok":
        return "Visit our TikTok page";
      case "facebook":
        return "Visit our Facebook page";
      default:
        return "Visit our social media page";
    }
  };

  return (
    <div className="flex items-center gap-3 justify-end w-[95%] mx-auto">
      {socialMedia.map((e, index) => (
        <Link
          key={index + "social-links"}
          href={e?.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={getLabel(e?.type)}
          className="size-6 focus:outline-none focus:rounded-full focus:ring-2 focus:ring-gray-400"
        >
          {e?.type === "instagram" && <InstaIcon />}
          {e?.type === "tiktok" && <TikTokIcon />}
          {e?.type === "facebook" && <FbIcon />}
        </Link>
      ))}
    </div>
  );
};

export default SocialHeader;
