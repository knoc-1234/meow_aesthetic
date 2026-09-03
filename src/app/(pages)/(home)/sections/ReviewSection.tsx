import Image from "next/image";
import reviewbg from "@/../public/assets/homeReviewBg.png";
import ReviewCards from "./ReviewCards";
import ApiError from "@/components/error/ApiError";
import { getSiteReviews } from "@/lib/site-reviews";

const ReviewSection = async () => {
  //
  const reviews = await getSiteReviews();

  if (!reviews) {
    return <ApiError />;
  }

  return (
    <section className="w-full relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          quality={75}
          src={reviewbg}
          alt="review-bg"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Container */}
      <ReviewCards data={reviews} />
    </section>
  );
};

export default ReviewSection;
