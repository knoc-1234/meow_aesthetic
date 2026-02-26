import Image from "next/image";
import reviewbg from "@/../public/assets/homeReviewBg.png";
import ReviewCards from "./ReviewCards";
import axiosServer from "@/lib/axios";
import ApiError from "@/components/error/ApiError";

const getReviewData = async () => {
  try {
    const res = await axiosServer.get("/api_review_list");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch review data:", error);
    return null;
  }
};

const ReviewSection = async () => {
  //
  const reviewData = await getReviewData();

  if (!reviewData) {
    return <ApiError />;
  }

  return (
    <section className="w-full relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          quality={60}
          src={reviewbg}
          alt="review-bg"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Container */}
      <ReviewCards data={reviewData?.data} />
    </section>
  );
};

export default ReviewSection;
