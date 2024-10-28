import React from 'react';
import * as styles from './main.css';
import Link from "next/link";
import ReviewCardSlider from "@/components/pages/main/slider/ReviewCardSlider";

export interface ReviewDataProps {
  id: number;
  titleByAdmin: string | null;
  contents: string;
  imageUrl: string;
  orderType: string;
  username: string;
  leakedOrder: number;
}

const MainReview = ({ reviewData }: { reviewData: ReviewDataProps[] }) => {
  return (
    <article className={styles.mainReviewWrapper}>
      <h2 className={styles.mainTitle({ size: 'titleLg' })}>
        160,000마리<br/>
        보호자 리얼 리뷰!
      </h2>
      <ReviewCardSlider reviewData={reviewData} />
      <Link href='/review' className={`${styles.mainLink({ type: 'button' })}`}>최근 리뷰 더 보기</Link>
    </article>
  );
};

export default MainReview;