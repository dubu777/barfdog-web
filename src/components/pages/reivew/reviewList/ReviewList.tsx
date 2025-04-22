'use client';
import * as styles from './ReviewList.css';
import ReviewItemList from "@/components/pages/reivew/reviewList/reviewItemList/ReviewItemList";
import BestReview from "@/components/pages/reivew/reviewList/bestReview/BestReview";
import ReviewBanner from "@/components/pages/reivew/reviewList/reviewBanner/ReviewBanner";
const ReviewList = () => {

  return (
    <section className={styles.reviewListContainer}>
      <BestReview />
      <ReviewBanner />
      <ReviewItemList />
    </section>
  );
};

export default ReviewList;