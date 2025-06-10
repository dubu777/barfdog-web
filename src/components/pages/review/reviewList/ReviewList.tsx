'use client';
import * as styles from './ReviewList.css';
import ReviewItemList from "@/components/pages/review/reviewList/reviewItemList/ReviewItemList";
import BestReview from "@/components/pages/review/reviewList/bestReview/BestReview";

const ReviewList = () => {
  return (
    <section className={styles.reviewListContainer}>
      <BestReview />
      <ReviewItemList />
    </section>
  );
};

export default ReviewList;