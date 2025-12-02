import Image from "next/image";
import { ellipsis, marginStyles, paddingStyles } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import {
  mainReviewCard,
  mainReviewCardContent,
  mainReviewDescription,
  mainReviewImage,
} from "@/components/pages/main/common/MainCommon.css";
import MainContainer from "@/components/pages/main/layout/MainContainer";
import MainTitle from "@/components/pages/main/common/MainTitle";
import Button from "@/components/ui/button/Button";
import Text from "@/components/ui/text/Text";
import RateStar from "@/components/ui/rateStar/RateStar";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";
import { MAIN_DATA } from "@/constants/main";
import { useGetBestReviewList } from "@/api/review/queries/useGetBestReviewList";

export default function ReviewSection() {
  const router = useRouter();

  const { data: bestReviewList } = useGetBestReviewList();

  const title = MAIN_DATA.REVIEW.title;
  const subTitle = MAIN_DATA.REVIEW.subTitle;
  const description = MAIN_DATA.REVIEW.description;
  const action = MAIN_DATA.REVIEW.action;

  if (!bestReviewList) return null;
  return (
    <MainContainer backgroundColor="pinkWhite">
      <MainTitle title={title} subTitle={subTitle} hasInteraction />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Text type="body2" block className={mainReviewDescription}>
          {description}
        </Text>
      </motion.div>
      <Marquee speed={100}>
        {[...bestReviewList, ...bestReviewList].map((review, index) => (
          <div key={`${review.reviewId}-${index}`} className={mainReviewCard}>
            <Image
              src={review.reviewImageList[0].displayImageUrl.url}
              alt={review.reviewer}
              width={120}
              height={120}
              className={mainReviewImage}
            />
            <div className={mainReviewCardContent}>
              <div>
                <Text type="headline4">{review.reviewer.split("@")[0]}</Text>
                <Text
                  type="caption"
                  className={ellipsis({ lineSize: "line2" })}
                >
                  {review.contents}
                </Text>
              </div>
              <RateStar rateLength={5} value={5} size={11} />
            </div>
          </div>
        ))}
      </Marquee>
      <div className={paddingStyles({ all: 20 })}>
        <Button
          onClick={() => router.push(action.url)}
          variant={action.variant}
          fullWidth={action.fullWidth}
        >
          {action.label}
        </Button>
      </div>
    </MainContainer>
  );
}
